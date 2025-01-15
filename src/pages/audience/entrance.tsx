import { InputOtp } from "@nextui-org/react";
import { useState } from "react";

export default function AudienceEntrancePage() {

  const [value, setValue] = useState("");

  return (
    <>
      {/* 画面真ん中に説明と入力欄を表示 */}
      <div className="flex flex-col items-center justify-center h-full">
        <div>
          <p className="text-center text-xl">認証コード</p>
          <p className="text-center text-gray-500">認証コードを入力してください。</p>
        </div>
        <InputOtp length={6} value={value} onValueChange={setValue} />
      </div>
    </>
  );
}
