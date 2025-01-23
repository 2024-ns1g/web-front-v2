import { Header } from "@/components/audience/header";
import { useAudienceContext } from "@/contexts/audience-context";
import { useEffect, useState } from "react";

export default function AudienceIndexPage() {
  const audience = useAudienceContext();

  // debug, when the page is loaded, show the session info
  useEffect(() => {
    audience.sessionInfo.then((info) => {
      console.log(info);
    });
  }, []);

  return (
    <>
      <Header 
        totalSlides={10} 
        currentSlideIndex={3} 
        sessionName="Session Name" 
        currentSlideName="Current Slide Name" />
    </>
  );
}
