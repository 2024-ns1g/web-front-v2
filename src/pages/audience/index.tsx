import { BodyMarkdownViewer } from "@/components/audience/body/markdown-viewer";
import { Header } from "@/components/audience/header";
import { BodyPageSelector } from "@/components/audience/tab-selector";
import { VoteDrawerBody } from "@/components/audience/vote";
import { useAudienceContext } from "@/contexts/audience-context";
import { SessionInfo } from "@/types/session/session-info";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Select,
  SelectItem
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AudienceIndexPage() {
  const audience = useAudienceContext();

  // 各種状態
  const [isVoteDrawerOpen, setIsVoteDrawerOpen] = useState(false);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [selectedVoteId, setSelectedVoteId] = useState<string | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  // 各投票の統計情報を保持（voteId をキーに choiceVotes の配列）
  const [voteStats, setVoteStats] = useState<Record<string, { choiceId: string; count: number }[]>>({});

  // セッション情報の取得
  useEffect(() => {
    audience.sessionInfo.then((info) => {
      console.log("Session info loaded:", info);
      setSessionInfo(info);
    });
  }, [audience.sessionInfo]);

  // activeVoteIds の変更を監視してデバッグ出力
  useEffect(() => {
    console.log("activeVoteIds updated:", audience.state.activeVoteIds);
  }, [audience.state.activeVoteIds]);

  // WS からのメッセージハンドラ
  const wsMessageHandler = (message: any) => {
    console.log("WS Message received:", message);
    switch (message.requestType) {
      case "CHANGE_CURRENT_PAGE": {
        console.log("Before CHANGE_CURRENT_PAGE, currentPage:", audience.state.currentPage);
        audience.updateState({ currentPage: message.data.newPageIndex });
        toast.info(`スライドが${message.data.newPageIndex + 1}枚目に変更されました`);
        break;
      }
      case "ACTIVATE_VOTE": {
        console.log("ACTIVATE_VOTE received. Current activeVoteIds:", audience.state.activeVoteIds);
        const newVoteId = message.data.voteId;
        const newActiveVotes = [...audience.state.activeVoteIds, newVoteId];
        console.log("Appending newVoteId:", newVoteId, " -> New activeVoteIds:", newActiveVotes);
        audience.updateState({
          activeVoteIds: newActiveVotes
        });
        toast.info("新しい投票が開始されました");
        break;
      }
      case "VOTE_PROGRESS_BROADCAST": {
        const { voteId, choiceVotes } = message.data;
        console.log("VOTE_PROGRESS_BROADCAST for voteId:", voteId, "choiceVotes:", choiceVotes);
        const stats = Object.entries(choiceVotes).map(([choiceId, count]) => ({
          choiceId,
          count: Number(count)
        }));
        setVoteStats(prev => ({ ...prev, [voteId]: stats }));
        break;
      }
      default:
        console.warn("未対応のWSメッセージ", message);
    }
  };

  // WS 接続の初期化
  useEffect(() => {
    audience.connectWs().then(() => {
      console.log("WebSocket connected.");
      audience.setWsMessageHandler((message) => {
        wsMessageHandler(message);
      });
      audience.sendWsMessage({ requestType: "PING" });
    });
  }, []);

  // activeVoteIds が 1 件の場合、自動選択する
  useEffect(() => {
    console.log("Checking auto-selection for activeVoteIds:", audience.state.activeVoteIds, "selectedVoteId:", selectedVoteId);
    if (
      audience.state.activeVoteIds.length === 1 &&
      !selectedVoteId &&
      sessionInfo?.availableVotes?.length
    ) {
      const onlyVoteId = audience.state.activeVoteIds[0];
      console.log("Auto-selecting vote:", onlyVoteId);
      setSelectedVoteId(onlyVoteId.toString());
    }
  }, [audience.state.activeVoteIds, selectedVoteId, sessionInfo]);

  // 選択中の voteId が activeVoteIds に含まれていない場合はクリアする
  useEffect(() => {
    if (
      selectedVoteId &&
      !audience.state.activeVoteIds.some((id) => id.toString() === selectedVoteId)
    ) {
      console.log("Clearing selectedVoteId because it is not in activeVoteIds:", selectedVoteId);
      setSelectedVoteId(null);
      setSelectedChoice(null);
    }
  }, [audience.state.activeVoteIds, selectedVoteId]);

  // 選択中の投票が変わったら、キャッシュから選択済みの選択肢を読み込む
  useEffect(() => {
    if (selectedVoteId) {
      const cachedChoice = localStorage.getItem(`vote_${selectedVoteId}`);
      console.log("Loaded cached choice for vote", selectedVoteId, ":", cachedChoice);
      if (cachedChoice) {
        setSelectedChoice(cachedChoice);
      } else {
        setSelectedChoice(null);
      }
    }
  }, [selectedVoteId]);

  // 投票送信処理（選択が変更されたときに即時送信）
  const handleVoteSubmit = async () => {
    if (!selectedVoteId || !selectedChoice) return;
    console.log("Submitting vote. voteId:", selectedVoteId, "choice:", selectedChoice);
    try {
      await audience.sendWsMessage({
        requestType: "SUBMIT_VOTE",
        data: { voteId: selectedVoteId, choiceId: selectedChoice }
      });
      localStorage.setItem(`vote_${selectedVoteId}`, selectedChoice);
      toast.success("投票が送信されました");
    } catch (error) {
      console.error("Error submitting vote:", error);
      toast.error("投票送信に失敗しました");
    }
  };

  // selectedChoice の変更を検知して即時投票送信
  useEffect(() => {
    if (selectedVoteId && selectedChoice) {
      handleVoteSubmit();
    }
  }, [selectedChoice, selectedVoteId]);

  // 現在選択されている投票オブジェクト（voteId の型が一致するよう toString() で比較）
  const currentVote = sessionInfo?.availableVotes?.find(
    (v) => v.voteId.toString() === selectedVoteId
  );

  return (
    <div className="flex flex-col h-full">
      <Header
        totalSlides={sessionInfo?.pages.length ?? 0}
        currentSlideIndex={audience.state.currentPage}
        sessionName={sessionInfo?.title ?? "Loading..."}
        currentSlideName={
          sessionInfo?.pages[audience.state.currentPage]?.title ?? "Loading..."
        }
        activeVoteCount={audience.state.activeVoteIds.length}
        isWsConnected={audience.isWsConnected}
        wsClickedHandler={() => {}}
        voteClickedHandler={() => setIsVoteDrawerOpen(true)}
      />
      <Drawer isOpen={isVoteDrawerOpen} onClose={() => setIsVoteDrawerOpen(false)}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader>投票</DrawerHeader>
              <DrawerBody>
                {sessionInfo ? (
                  <>
                    {/* 投票選択用の Select コンポーネント */}
                    <Select
                      aria-label="投票を選択"
                      placeholder="投票を選択してください"
                      items={audience.state.activeVoteIds.map((voteId) => {
                        const vote = sessionInfo.availableVotes?.find(
                          (v) => v.voteId.toString() === voteId.toString()
                        );
                        return {
                          label: vote?.title ?? "未定義",
                          value: voteId.toString()
                        };
                      })}
                      selectedKeys={
                        selectedVoteId ? new Set([selectedVoteId]) : new Set()
                      }
                      onSelectionChange={(val) => {
                        const voteId = Array.from(val)[0] || null;
                        console.log("Select changed. New voteId:", voteId);
                        setSelectedVoteId(voteId !== null ? voteId.toString() : null);
                        setSelectedChoice(null);
                      }}
                    >
                      {(item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      )}
                    </Select>
                    {/* 現在選択されている投票がある場合、投票内容コンポーネントを表示 */}
                    {currentVote ? (
                      <VoteDrawerBody
                        voteId={currentVote.voteId.toString()}
                        voteTitle={currentVote.title}
                        voteQuestion={currentVote.question}
                        choices={currentVote.choices}
                        stats={voteStats[selectedVoteId as string] ?? []}
                        selectedChoice={selectedChoice}
                        onChoiceChange={(choiceId) => {
                          console.log("Choice changed:", choiceId);
                          setSelectedChoice(choiceId);
                        }}
                        votedHandler={(voteId, choiceId) => {
                          console.log("Voted:", voteId, choiceId);
                        }}
                      />
                    ) : (
                      <p>投票が選択されていません</p>
                    )}
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <div className="flex-grow h-full w-full flex justify-center">
        <div className="flex flex-col container px-4 py-8 h-full">
          <BodyPageSelector
            defaultPageIndex={0}
            onSelectedPageChanged={(pageId) => {
              console.log("Page selected:", pageId);
              setSelectedPageId(pageId);
            }}
            pages={sessionInfo?.pages ?? []}
          />
          <BodyMarkdownViewer
            content={
              (sessionInfo?.pages ?? []).find((p) => p.pageId === selectedPageId)
                ?.scripts[0].content ?? ""
            }
          />
        </div>
      </div>
    </div>
  );
}
