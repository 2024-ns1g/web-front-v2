import { Header } from "@/components/audience/header";
import { VoteDrawerBody } from "@/components/audience/vote";
import { useAudienceContext } from "@/contexts/audience-context";
import { SessionInfo } from "@/types/audience/session-info-schema";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function AudienceIndexPage() {
  const audience = useAudienceContext();

  // State
  const [isVoteDrawerOpen, setIsVoteDrawerOpen] = useState(false);

  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);

  const [state, setState] = useState(audience.state);

  // debug, when the page is loaded, show the session info
  useEffect(() => {
    audience.sessionInfo.then((info) => {
      setSessionInfo(info);
    });
  }, []);

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
              <DrawerHeader>てすと</DrawerHeader>
              <DrawerBody>
                <VoteDrawerBody voteTitle="てすと" voteSummary="てすと" choices={[]} stats={[]} />
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
