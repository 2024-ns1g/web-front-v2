import { BodyMarkdownViewer } from "@/components/audience/body/markdown-viewer";
import { Header } from "@/components/audience/header";
import { VoteDrawerBody } from "@/components/audience/vote";
import { useAudienceContext } from "@/contexts/audience-context";
import { SessionInfo } from "@/types/audience/session-info-schema";
import { Button, CardBody, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Select, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function AudienceIndexPage() {
  const audience = useAudienceContext();

  // State
  const [isVoteDrawerOpen, setIsVoteDrawerOpen] = useState(false);

  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);

  const [state, setState] = useState(audience.state);

  useEffect(() => {
    audience.sessionInfo.then((info) => {
      setSessionInfo(info);
    });
  }, []);

  // WS
  useEffect(() => {
    audience.connectWs().then(() => {

      audience.setWsMessageHandler((message) => {
        console.log("Message received: ", message);
      });
      audience.sendWsMessage({ requestType: "PING" });
    });
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Header
        totalSlides={sessionInfo?.pages.length ?? 0}
        currentSlideIndex={state.currentPage}
        sessionName={sessionInfo?.title ?? "Loading..."}
        currentSlideName={sessionInfo?.pages[state.currentPage].title ?? "Loading..."}
        activeVoteCount={state.activeVoteIds.length}
        isWsConnected={audience.isWsConnected}
        wsClickedHandler={() => { }}
        voteClickedHandler={() => setIsVoteDrawerOpen(true)}
      />
      <Drawer isOpen={isVoteDrawerOpen} onClose={() => setIsVoteDrawerOpen(false)}>
        <DrawerContent>
          {(onClose) => (
            <>
              {/* いまActiveなVoteから選択させる */}
              <DrawerHeader>てすと</DrawerHeader>
              <DrawerBody>
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

      <div className="flex-grow flex items-center justify-center">
        <div className="container h-full px-4 py-8">

          {/*高さはfullに*/}
          <Tabs items={sessionInfo?.pages ?? []} classNames={{ tab: "h-full", tabContent: "h-full", panel: "h-full" }}>
            {(item) => (
              <Tab key={item.pageId} title={item.title}>
                <div className="h-full">
                  {/* <BodyMarkdownViewer content={item.scripts[0].content} /> */}
                  <BodyMarkdownViewer content={`
# あああああああああああ
## あああああ
ああ

あああ

ｓださｄｄだｄｓｄ

ｆｄｓｆｓｄｆｓｄｆ


ｆｄｓｆｓｄｆｄｆｓ


ｆｓｄｆｓｄｆｓｄｆｓｆ




ｆｄｓｆｄｆｓｆｄｆ
# あああああああああああ
## あああああ
ああ

あああ

ｓださｄｄだｄｓｄ

ｆｄｓｆｓｄｆｓｄｆ


ｆｄｓｆｓｄｆｄｆｓ


ｆｓｄｆｓｄｆｓｄｆｓｆ




ｆｄｓｆｄｆｓｆｄｆ
# あああああああああああ
## あああああ
ああ

あああ

ｓださｄｄだｄｓｄ

ｆｄｓｆｓｄｆｓｄｆ


ｆｄｓｆｓｄｆｄｆｓ


ｆｓｄｆｓｄｆｓｄｆｓｆ




ｆｄｓｆｄｆｓｆｄｆ
                    `}/>
                </div>
              </Tab>
            )}
          </Tabs>
        </div>
      </div>
    </div>

  );
}
