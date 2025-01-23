import { SessionInfo, SessionInfoSchema } from "@/types/audience/session-info-schema";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

type AudienceContextType = {
  joinedSessionId: string;
  setJoinedSessionId: (id: string) => void;
  attachedToken: string;
  setAttachedToken: (token: string) => void;
  aggregatorUrl: string;
  setAggregatorUrl: (url: string) => void;
  setWsMessageHandler: (handler: (message: any) => void) => void;
  connectWs: () => Promise<void>;
  sendWsMessage: (message: any) => void;
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
  // 各選択肢の得票数
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

  // Cache to local storage
  useEffect(() => {
    localStorage.setItem("joinedSessionId", joinedSessionId);
  }, [joinedSessionId]);

  useEffect(() => {
    localStorage.setItem("attachedToken", attachedToken);
  }, [attachedToken]);

  useEffect(() => {
    localStorage.setItem("aggregatorUrl", aggregatorUrl);
  }, [aggregatorUrl]);

  // connection
  const [ws, setWs] = useState<WebSocket | null>(null);

  const connectWs = async () => {
    console.log("Connecting to WebSocket server...");
    console.debug("aggregatorUrl: " + aggregatorUrl + "replaced: " + aggregatorUrl.replace("http", "ws"));
    const ws = new WebSocket(aggregatorUrl.replace("http", "ws"));
    setWs(ws);
  };

  const setWsMessageHandler = (handler: (message: any) => void) => {
    if (!ws) {
      throw new Error("WebSocket is not connected");
    }
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handler(message);
    }
  };

  const sendWsMessage = (message: any) => {
    if (!ws) {
      throw new Error("WebSocket is not connected");
    }
    ws.send(JSON.stringify(message));
  }

  const getSessionInfo = async () => {
    if (!sessionInfo) {
      return updateSessionInfo().catch((error) => {
        console.error("Failed to get session info", error);
        return Promise.reject(error);
      });
    }
    return Promise.resolve(sessionInfo);
  }

  const updateSessionInfo = async () => {
    return axios.get(`${aggregatorUrl}/api/session/${joinedSessionId}/audience/info`, {
      headers: {
        Authorization: `Bearer ${attachedToken}`
      }
    }).then((response) => {
      try {
        let data = response.data;
        console.log("data: " + data);
        if (typeof response.data === "string") {
          data = JSON.parse(response.data);
        }
        const parsed = SessionInfoSchema.parse(data)
        if (!parsed) {
          return Promise.reject("Failed to parse response");
        }
        setSessionInfo(parsed);
        return Promise.resolve(parsed);
      } catch (error) {
        console.error("Failed to parse response", error);
        return Promise.reject(error);
      }
    });
  }

  const updateState = (newState: Partial<SessionState>) => {
    setState((prev) => {
      return {
        ...prev,
        ...newState,
      };
    });
  };

  return (
    <AudienceContext.Provider value={{ joinedSessionId, setJoinedSessionId, attachedToken, setAttachedToken, aggregatorUrl, setAggregatorUrl, setWsMessageHandler, connectWs, sendWsMessage, sessionInfo: getSessionInfo(), updateSessionInfo, state, setState, updateState }}>
      {children}
    </AudienceContext.Provider>
  );
}

export const useAudienceContext = () => {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error("useAudienceContext must be used within a AudienceProvider");
  }
  return context;
}

