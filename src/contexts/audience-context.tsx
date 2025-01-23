import { SessionInfo, SessionInfoSchema } from "@/types/audience/session-info-schema";
import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type AudienceContextType = {
  joinedSessionId: string;
  setJoinedSessionId: (id: string) => void;
  attachedToken: string;
  setAttachedToken: (token: string) => void;
  aggregatorUrl: string;
  setAggregatorUrl: (url: string) => void;
  setWsMessageHandler: (handler: (message: any) => void) => void;
  connectWs: () => Promise<void>;
  sendWsMessage: (message: any) => Promise<void>;
  sessionInfo: Promise<SessionInfo>;
  updateSessionInfo: () => Promise<SessionInfo>;
  state: SessionState;
  setState: (state: SessionState) => void;
  updateState: (state: Partial<SessionState>) => void;
}

const AudienceContext = createContext<AudienceContextType | null>(null);

interface AudienceProviderProps {
  children: React.ReactNode;
}

export type Vote = {
  voteId: string;
  choiceId: string;
  voterId: string;
};

export type VoteSummary = {
  voteId: string;
  choiceVotes: {
    [choiceId: string]: number;
  };
};

export type SessionState = {
  currentPage: number;
  activeVoteIds: string[];
  votes: Vote[];
};

export const AudienceProvider = ({ children }: AudienceProviderProps) => {
  const [joinedSessionId, setJoinedSessionId] = useState(() => {
    const sessionId = localStorage.getItem("joinedSessionId");
    return sessionId || "";
  });

  const [attachedToken, setAttachedToken] = useState(() => {
    const token = localStorage.getItem("attachedToken");
    return token || "";
  });

  const [aggregatorUrl, setAggregatorUrl] = useState(() => {
    const url = localStorage.getItem("aggregatorUrl");
    return url || "";
  });

  const [state, setState] = useState<SessionState>({
    currentPage: 0,
    activeVoteIds: [],
    votes: [],
  });

  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);

  // WebSocket関連のリファレンス
  const ws = useRef<WebSocket | null>(null);
  const messageHandlerRef = useRef<(message: any) => void>(() => { });
  const connectionPromiseRef = useRef<Promise<void> | null>(null);

  // ローカルストレージのキャッシュ
  useEffect(() => {
    localStorage.setItem("joinedSessionId", joinedSessionId);
  }, [joinedSessionId]);

  useEffect(() => {
    localStorage.setItem("attachedToken", attachedToken);
  }, [attachedToken]);

  useEffect(() => {
    localStorage.setItem("aggregatorUrl", aggregatorUrl);
  }, [aggregatorUrl]);

  // WebSocket接続管理
  const connectWs = async () => {
    if (!joinedSessionId || !aggregatorUrl) {
      throw new Error("Missing session ID or aggregator URL");
    }

    // 既に接続済みの場合
    if (ws.current?.readyState === WebSocket.OPEN) {
      return;
    }

    // 接続中の場合は既存のPromiseを返す
    if (connectionPromiseRef.current) {
      return connectionPromiseRef.current;
    }

    // 既存の接続があれば閉じる
    if (ws.current) {
      ws.current.close();
    }

    const wsUrl = aggregatorUrl.replace("http", "ws") + "/audience?sessionId=" + joinedSessionId;

    const promise = new Promise<void>((resolve, reject) => {
      const newWs = new WebSocket(wsUrl);

      newWs.onopen = () => {
        ws.current = newWs;
        // メッセージハンドラを設定
        newWs.onmessage = (event) => {
          const message = JSON.parse(event.data);
          messageHandlerRef.current(message);
        };
        resolve();
      };

      newWs.onerror = (error) => {
        connectionPromiseRef.current = null;
        reject(error);
      };

      newWs.onclose = () => {
        ws.current = null;
        connectionPromiseRef.current = null;
      };
    });

    connectionPromiseRef.current = promise;
    return promise;
  };

  const setWsMessageHandler = (handler: (message: any) => void) => {
    messageHandlerRef.current = handler;
    // 既存の接続がある場合は即時適用
    if (ws.current) {
      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        handler(message);
      };
    }
  };

  const sendWsMessage = async (message: any) => {
    await connectWs();
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }
    ws.current.send(JSON.stringify(message));
  };

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const updateSessionInfo = async () => {
    const response = await axios.get(
      `${aggregatorUrl}/api/session/${joinedSessionId}/audience/info`,
      {
        headers: {
          Authorization: `Bearer ${attachedToken}`,
        },
      }
    );

    const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
    const parsed = SessionInfoSchema.parse(data);
    setSessionInfo(parsed);
    return parsed;
  };

  const updateState = (newState: Partial<SessionState>) => {
    setState((prev) => ({
      ...prev,
      ...newState,
    }));
  };

  return (
    <AudienceContext.Provider
      value={{
        joinedSessionId,
        setJoinedSessionId,
        attachedToken,
        setAttachedToken,
        aggregatorUrl,
        setAggregatorUrl,
        setWsMessageHandler,
        connectWs,
        sendWsMessage,
        sessionInfo: sessionInfo ? Promise.resolve(sessionInfo) : updateSessionInfo(),
        updateSessionInfo,
        state,
        setState,
        updateState,
      }}
    >
      {children}
    </AudienceContext.Provider>
  );
};

export const useAudienceContext = () => {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error("useAudienceContext must be used within a AudienceProvider");
  }
  return context;
};
