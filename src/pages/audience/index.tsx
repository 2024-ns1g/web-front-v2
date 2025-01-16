import { useAudienceContext } from "@/contexts/audience-context";
import { Card, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";

type SessionCache = {
  sessionId: string;
  slideId: string;
  pages: {
    pageId: string;
    title: string;
    scripts: {
      content: string;
      // isEnabled: boolean
    }[];
  }[];
  availableVotes: {
    voteId: string;
    title: string;
    description: string;
    choices: {
      choiceId: string;
      title: string;
      description: string | null;
      color: string | null;
    }[];
  }[];
  state: {
    currentPage: number;
    activeVote: {
      voteId: string;
    } | null;
  };
};

export default function AudienceIndexPage() {

  const audience = useAudienceContext();

  const [currentShowingSlideId, setCurrentShowingSlideid] = useState("");

  const [pages, setPages] = useState<SessionCache["pages"]>([]);

  useEffect(() => {
    const sessionId = audience.joinedSessionId;

    // localhost:8081/api/session/{sessionId}/ をGET
    fetch(`http://localhost:8081/api/session/${sessionId}/`)
      .then((res) => res.json())
      .then((data: {
        cachedData: string
      }) => {
          const sessionCache = JSON.parse(data.cachedData) as SessionCache;
          setPages(sessionCache.pages);
      });
  }, [audience.joinedSessionId]);


  return (
    <>
      <Tabs aria-label="Dynamic tabs" isVertical={true} items={pages} classNames={{ wrapper: "w-full", tabList: "w-[8em]" }} variant='bordered' onSelectionChange={(key) => { setCurrentShowingSlideid(key as string) }}>
        {(item) => (
          <Tab key={item.pageId} title={item.title} className="w-full">
            <Card className="flex-1 overflow-hidden w-full">
              <div className="flex flex-col items-center justify-center h-full">
                <div>
                  <p className="text-center text-xl">{item.title}</p>
                  <p className="text-center text-gray-500">説明</p>
                </div>
                <div>
                  {item.scripts.map((script, index) => (
                    <div key={index}>
                      <p>{script.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Tab>
        )}
      </Tabs>
    </>
  );
}
