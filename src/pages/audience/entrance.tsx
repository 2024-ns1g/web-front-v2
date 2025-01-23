import { useAudienceContext } from "@/contexts/audience-context";
import { useApis } from "@/hooks/use-api";
import { Button, InputOtp } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AudienceEntrancePage() {

  const api = useApis();
  const audience = useAudienceContext();
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  const handleJoinToSession = () => {
    api.session.audience.verifyAudienceOtp({
      otp: value
    }).then((response) => {
      if (!response || !response.sessionId) { // TODO: Improve handling
        console.log("OTP verification failed");
        return
      }
      console.log("OTP verified");
      audience.setJoinedSessionId(response.sessionId);
      audience.setAttachedToken(response.token);
      audience.setAggregatorUrl(response.aggregatorUrl);

      navigate("/audience");
    });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <div>
          <p className="text-center text-xl">認証コード</p>
          <p className="text-center text-gray-500">認証コードを入力してください。</p>
        </div>
        <InputOtp length={6} value={value} onValueChange={setValue} />
        <Button
          onPress={handleJoinToSession}
          variant="bordered"
        >参加</Button>
      </div>
    </>
  );
}
