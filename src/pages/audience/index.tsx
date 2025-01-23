import { useAudienceContext } from "@/contexts/audience-context";
import { Card, Tab, Tabs } from "@nextui-org/react";
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
    </>
  );
}
