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

  // Too many pages for debug
  const debugPages = [
    {
      pageId: "1",
      title: "Page 1",
    },
    {
      pageId: "2",
      title: "Page 2",
    },
    {
      pageId: "3",
      title: "Page 3",
    },
    {
      pageId: "4",
      title: "Page 4",
    },
    {
      pageId: "5",
      title: "Page 5",
    },
    {
      pageId: "6",
      title: "Page 6",
    },
    {
      pageId: "7",
      title: "Page 7",
    },
    {
      pageId: "8",
      title: "Page 8",
    },
    {
      pageId: "9",
      title: "Page 9",
    },
    {
      pageId: "10",
      title: "Page 10",
    },
    {
      pageId: "11",
      title: "Page 11",
    },
    {
      pageId: "12",
      title: "Page 12",
    },
    {
      pageId: "13",
      title: "Page 13",
    },
    {
      pageId: "14",
      title: "Page 14",
    },
    {
      pageId: "15",
      title: "Page 15",
    },
    {
      pageId: "16",
      title: "Page 16",
    },
    {
      pageId: "17",
      title: "Page 17",
    },
    {
      pageId: "18",
      title: "Page 18",
    },
    {
      pageId: "19",
      title: "Page 19",
    },
    {
      pageId: "20",
      title: "Page 20",
    },
    {
      pageId: "21",
      title: "Page 21",
    },
    {
      pageId: "22",
      title: "Page 22",
    },
    {
      pageId: "23",
      title: "Page 23",
    },
    {
      pageId: "24",
      title: "Page 24",
    },
    {
      pageId: "25",
      title: "Page 25",
    },
    {
      pageId: "26",
      title: "Page 26",
    },
    {
      pageId: "27",
      title: "Page 27",
    },
    {
      pageId: "28",
      title: "Page 28",
    },
    {
      pageId: "29",
      title: "Page 29",
    },
    {
      pageId: "30",
      title: "Page 30",
    },
    {
      pageId: "31",
      title: "Page 31",
    },
    {
      pageId: "32",
      title: "Page 32",
    },
    {
      pageId: "33",
      title: "Page 33",
    },
    {
      pageId: "34",
      title: "Page 34",
    },
    {
      pageId: "35",
      title: "Page 35",
    },
    {
      pageId: "36",
      title: "Page 36",
    },
    {
      pageId: "37",
      title: "Page 37",
    },
    {
      pageId: "38",
      title: "Page 38",
    },
    {
      pageId: "39",
      title: "Page 39",
    },
    {
      pageId: "40",
      title: "Page 40",
    },
    {
      pageId: "41",
      title: "Page 41",
    },
    {
      pageId: "42",
      title: "Page 42",
    },
    {
      pageId: "43",
      title: "Page 43",
    },
    {
      pageId: "44",
      title: "Page 44",
    },
    {
      pageId: "45",
      title: "Page 45",
    },
    {
      pageId: "46",
      title: "Page 46",
    },
  ]

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

          <Tabs items={debugPages ?? []} classNames={{ tabList: "bg-blue-500", tab: "bg-red-500", tabContent: "h-full", panel: "h-full" }}>
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
