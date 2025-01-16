import { InputOtp } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function AudienceEntrancePage() {

  const [value, setValue] = useState("");

  const [sessionId, setSessionId] = useState("");

  const handleSessionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionId(e.target.value);
  }

  // Debug
  useEffect(() => {
    console.log(sessionId);
  }, [sessionId]);

  const handleWorkaroundSubmit = () => {
    // 暫定: セッションIDを直接入力
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
        {/* 暫定: セッションIDを直接入力 */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg">
          <p className="text-center text-lg">セッションIDを入力してください。</p>
          <input type="text" onChange={handleSessionIdChange} className="w-full p-2 border border-gray-300 rounded mt-2" />
          <button className="w-full p-2 bg-gray-800 text-white rounded mt-2" onClick={handleWorkaroundSubmit}>Submit</button>
        </div>
      </div>
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
