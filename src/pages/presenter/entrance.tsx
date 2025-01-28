import { useAudienceContext } from "@/contexts/audience-context";
import { usePresenterContext } from "@/contexts/presenter-context";
import { useApis } from "@/hooks/use-api";
import { Button, InputOtp } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AudienceEntrancePage() {
  const api = useApis();
  const presenter = usePresenterContext();
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  const handleJoinToSession = () => {
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
