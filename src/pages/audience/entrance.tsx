import { useAudienceContext } from "@/contexts/audience-context";
import { Button, InputOtp } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function AudienceEntrancePage() {

  const audience = useAudienceContext();

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
