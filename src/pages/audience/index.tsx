import { Header } from "@/components/audience/header";
import { VoteDrawerBody } from "@/components/audience/vote";
import { useAudienceContext } from "@/contexts/audience-context";
import { SessionInfo } from "@/types/audience/session-info-schema";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Select } from "@nextui-org/react";
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

  const connectToWs = async () => {
    await audience.connectWs();
  }

  useEffect(() => {
    connectToWs();
  }, []);

  useEffect(() => {
    audience.setWsMessageHandler((message) => {
      console.log("Received message:", message);
    });

    // ping
    audience.sendWsMessage({ type: "PING" });
  }, [audience.ws]);

  return (
    <>
      <Header
        totalSlides={sessionInfo?.pages.length ?? 0}
        currentSlideIndex={state.currentPage}
        sessionName={sessionInfo?.title ?? "Loading..."}
        currentSlideName={sessionInfo?.pages[state.currentPage].title ?? "Loading..."} />

      <Button color="primary" onClick={() => setIsVoteDrawerOpen(true)}>test</Button>

      <Drawer isOpen={isVoteDrawerOpen} >
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
    </>
  );
}
