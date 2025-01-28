import { usePresenterContext } from "@/contexts/presenter-context";
import { useApis } from "@/hooks/use-api";
import { Button, InputOtp } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AudienceEntrancePage() {
  const api = useApis();
  const presenter = usePresenterContext();
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  const handleJoinToSession = () => {
    api.session.presenter.verifyPresenterOtp({
      otp: value
    }).then((response) => {
      if (!response || !response.sessionId) { // TODO: Improve handling
        console.log("OTP verification failed");
        toast.error("認証コードが正しくありません");
        return
      }
      console.log("OTP verified");
      presenter.setJoinedSessionId(response.sessionId);
      presenter.setAttachedToken(response.token);
      presenter.setAggregatorUrl(response.aggregatorUrl);
      navigate("/presenter");
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
