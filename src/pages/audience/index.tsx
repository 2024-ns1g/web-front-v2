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
  // 現在選択中の投票ID（string）と、選択された選択肢（string）
  const [selectedVoteId, setSelectedVoteId] = useState<string | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  // セッション情報の取得
  useEffect(() => {
    audience.sessionInfo.then((info) => {
      setSessionInfo(info);
    });
  }, [audience.sessionInfo]);

  // WS からのメッセージハンドラ
  const wsMessageHandler = (message: any) => {
    switch (message.requestType) {
      case "CHANGE_CURRENT_PAGE": {
        audience.updateState({ currentPage: message.data.newPageIndex });
        toast.info(`スライドが${message.data.newPageIndex + 1}枚目に変更されました`);
        break;
      }
      case "ACTIVATE_VOTE": {
        audience.updateState({
          activeVoteIds: [...audience.state.activeVoteIds, message.data.voteId]
        });
        toast.info("新しい投票が開始されました");
        break;
      }
      default:
        console.warn("未対応のWSメッセージ", message);
    }
  };

  // WS 接続の初期化
  useEffect(() => {
    audience.connectWs().then(() => {
      audience.setWsMessageHandler((message) => {
        console.log("Message received:", message);
        wsMessageHandler(message);
      });
      audience.sendWsMessage({ requestType: "PING" });
    });
  }, []);

  // activeVoteIds が 1 件の場合、自動選択する
  useEffect(() => {
    if (
      audience.state.activeVoteIds.length === 1 &&
      !selectedVoteId &&
      sessionInfo?.availableVotes?.length
    ) {
      const onlyVoteId = audience.state.activeVoteIds[0];
      setSelectedVoteId(onlyVoteId.toString());
    }
  }, [audience.state.activeVoteIds, selectedVoteId, sessionInfo]);

  // 選択中の投票が変わったら、キャッシュ（localStorage）から選択済みの選択肢を読み込む
  useEffect(() => {
    if (selectedVoteId) {
      const cachedChoice = localStorage.getItem(`vote_${selectedVoteId}`);
      if (cachedChoice) {
        setSelectedChoice(cachedChoice);
      } else {
        setSelectedChoice(null);
      }
    }
  }, [selectedVoteId]);

  // 投票送信処理（選択が変更されたときに即時送信）
  const handleVoteSubmit = async () => {
    if (!selectedVoteId || !selectedChoice) {
      return;
    }
    try {
      await audience.sendWsMessage({
        requestType: "SUBMIT_VOTE",
        data: { voteId: selectedVoteId, choiceId: selectedChoice }
      });
      // キャッシュに保存
      localStorage.setItem(`vote_${selectedVoteId}`, selectedChoice);
      toast.success("投票が送信されました");
    } catch (error) {
      toast.error("投票送信に失敗しました");
    }
  };

  // selectedChoice の変更を検知して即時投票送信（既にキャッシュがある場合も再送信可能）
  useEffect(() => {
    if (selectedVoteId && selectedChoice) {
      handleVoteSubmit();
    }
    // selectedChoice の変更のたびに投票を送信
  }, [selectedChoice, selectedVoteId]);

  // 現在選択されている投票オブジェクト
  const currentVote = sessionInfo?.availableVotes?.find(
    (v) => v.voteId === selectedVoteId
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
        wsClickedHandler={() => { }}
        voteClickedHandler={() => setIsVoteDrawerOpen(true)}
      />
      <Drawer isOpen={isVoteDrawerOpen} onClose={() => setIsVoteDrawerOpen(false)}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader>投票</DrawerHeader>
              <DrawerBody>
                {/* 投票選択用の Select コンポーネント */}
                <Select
                  aria-label="投票を選択"
                  placeholder="投票を選択してください"
                  items={audience.state.activeVoteIds.map((voteId) => {
                    const vote = sessionInfo?.availableVotes?.find(
                      (v) => v.voteId === voteId
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
                    // val は Set 型なので先頭要素を取り出し、文字列に変換
                    const voteId = Array.from(val)[0] || null;
                    setSelectedVoteId(voteId !== null ? voteId.toString() : null);
                    // 投票が変更されたら選択肢もリセット（キャッシュ読み込み用 useEffect が働く）
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
                    voteId={currentVote.voteId}
                    voteTitle={currentVote.title}
                    voteQuestion={currentVote.question}
                    choices={currentVote.choices}
                    stats={[
                      { choiceId: "1", count: 10 },
                      { choiceId: "2", count: 20 },
                      { choiceId: "3", count: 30 }
                    ]}
                    selectedChoice={selectedChoice}
                    onChoiceChange={(choiceId) => {
                      // ラジオボタンで選択されたとき、即座に状態更新
                      setSelectedChoice(choiceId);
                    }}
                    // votedHandler はここでは単にログ出力（必要に応じて処理を追加）
                    votedHandler={(voteId, choiceId) => {
                      console.log("Voted:", voteId, choiceId);
                    }}
                  />
                ) : (
                  <p>投票が選択されていません</p>
                )}
              </DrawerBody>
              <DrawerFooter>
                {/* Close ボタンのみ残す。投票はラジオ選択時に即時送信される */}
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
            onSelectedPageChanged={(pageId) => setSelectedPageId(pageId)}
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
