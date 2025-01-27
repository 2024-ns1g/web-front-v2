import { BodyMarkdownViewer } from "@/components/audience/body/markdown-viewer";
import { Header } from "@/components/audience/header";
import { BodyPageSelector } from "@/components/audience/tab-selector";
import { VoteDrawerBody } from "@/components/audience/vote";
import { useAudienceContext } from "@/contexts/audience-context";
import { SessionInfo } from "@/types/audience/session-info-schema";
import { Button, CardBody, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Select, SelectItem, SharedSelection, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AudienceIndexPage() {
  const audience = useAudienceContext();

  // State
  const [isVoteDrawerOpen, setIsVoteDrawerOpen] = useState(false);

  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);

  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  const [showingVote, setShowingVote] = useState<SharedSelection>(new Set());

  useEffect(() => {
    audience.sessionInfo.then((info) => {
      setSessionInfo(info);
    });
  }, []);

  const wsMessageHandler = (message: any) => {
    switch (message.requestType) {
      case "CHANGE_CURRENT_PAGE": {
        audience.updateState({ currentPage: message.data.newPageIndex });
        toast.info(`スライドが${message.data.newPageIndex + 1}枚目に変更されました`);
        break;
      }
      case "ACTIVATE_VOTE": {
        audience.updateState({ activeVoteIds: [...audience.state.activeVoteIds, message.data.voteId] });
        toast.info(`新しい投票が開始されました`);
        break;
      }
    }
  };

  // WS
  useEffect(() => {
    audience.connectWs().then(() => {

      audience.setWsMessageHandler((message) => {
        console.log("Message received: ", message);
        wsMessageHandler(message);
      });
      audience.sendWsMessage({ requestType: "PING" });
    });
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Header
        totalSlides={sessionInfo?.pages.length ?? 0}
        currentSlideIndex={audience.state.currentPage}
        sessionName={sessionInfo?.title ?? "Loading..."}
        currentSlideName={sessionInfo?.pages[audience.state.currentPage].title ?? "Loading..."}
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
                <Select
                  placeholder="選択してください"
                  items={audience.state.activeVoteIds.map((voteId) => {
                    const vote = sessionInfo?.availableVotes?.find((v) => v.voteId === voteId);
                    return {
                      label: vote?.title,
                      value: voteId,
                    };
                  })}
                  onSelectionChange={setShowingVote}
                >
                  {(item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>}
                </Select>
                <VoteDrawerBody
                  voteTitle={sessionInfo?.availableVotes?.find((v) => v.voteId === showingVote)?.title ?? "Loading..."}
                  voteQuestion={sessionInfo?.availableVotes?.find((v) => v.voteId === showingVote.valueOf())?.question ?? "Loading..."}
                  choices={sessionInfo?.availableVotes?.find((v) => v.voteId === showingVote)?.choices ?? []}
                  stats={[
                    { choiceId: "1", count: 10 },
                    { choiceId: "2", count: 20 },
                    { choiceId: "3", count: 30 },
                  ]}
                  votedHandler={(voteId, choiceId) => {
                    console.log("Voted: ", voteId, choiceId);
                  }}
                />
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      <div className="flex-grow h-full w-full flex justify-center">
        <div className="flex flex-col container px-4 py-8 h-full">
          <BodyPageSelector defaultPageIndex={0} onSelectedPageChanged={(pageId) => { setSelectedPageId(pageId) }} pages={sessionInfo?.pages ?? []} />

          <BodyMarkdownViewer content={(sessionInfo?.pages ?? []).find((p) => p.pageId === selectedPageId)?.scripts[0].content ?? ""} />
        </div>
      </div>

    </div>
  );
}
