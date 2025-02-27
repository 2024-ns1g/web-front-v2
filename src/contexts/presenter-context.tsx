import { useLogger } from "@/hooks/use-logger";
import { SessionInfo, SessionInfoSchema } from "@/types/session/session-info";
import { SessionState } from "@/types/session/session-state";
import { presenterWsRegistMessage } from "@/types/session/ws-message/presenter/regist-message";
import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type PresenterContextType = {
  joinedSessionId: string;
  setJoinedSessionId: (id: string) => void;
  attachedToken: string;
  setAttachedToken: (token: string) => void;
  aggregatorUrl: string;
  setAggregatorUrl: (url: string) => void;
  setWsMessageHandler: (handler: (message: any) => void) => void;
  connectWs: () => Promise<void>;
  isWsConnected: boolean;
  sendWsMessage: (message: any) => Promise<void>;
  sessionInfo: Promise<SessionInfo>;
  updateSessionInfo: () => Promise<SessionInfo>;
  state: SessionState;
  setState: (state: SessionState) => void;
  updateState: (state: Partial<SessionState>) => void;
};

const PresenterContext = createContext<PresenterContextType | null>(null);

interface PresenterProviderProps {
  children: React.ReactNode;
};

export const PresenterProvider = ({ children }: PresenterProviderProps) => {

  const logger = useLogger("presenter-context");

  const [joinedSessionId, setJoinedSessionId] = useState(() => {
    const sessionId = localStorage.getItem(getKey("sessionId"));
    return sessionId || "";
  });

  const [attachedToken, setAttachedToken] = useState(() => {
    const token = localStorage.getItem(getKey("token"));
    return token || "";
  });

  const [aggregatorUrl, setAggregatorUrl] = useState(() => {
    const url = localStorage.getItem(getKey("aggregatorUrl"));
    return url || "";
  });

  const setJoinedSessionIdAndStore = (id: string) => {
    setJoinedSessionId(id);
    localStorage.setItem(getKey("sessionId"), id);
  };

  const setAttachedTokenAndStore = (token: string) => {
    setAttachedToken(token);
    localStorage.setItem(getKey("token"), token);
  };

  const setAggregatorUrlAndStore = (url: string) => {
    setAggregatorUrl(url);
    localStorage.setItem(getKey("aggregatorUrl"), url);
  };

  const [state, setState] = useState<SessionState>({
    currentPage: 0,
    activeVoteIds: [],
    currentStep: 0,
    votes: [],
    voteSummaries: {}
  });

  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);

  // WebSocket
  const ws = useRef<WebSocket | null>(null);
  const messageHandlerRef = useRef<(message: any) => void>(() => { });
  const connectionPromiseRef = useRef<Promise<void> | null>(null);

  const connectWs = async () => {
    if (!joinedSessionId || !aggregatorUrl) {
      throw new Error("Missing session ID or aggregator URL");
    }

    if (ws.current?.readyState === WebSocket.OPEN) {
      logger.info("WebSocket is already connected");
      return;
    }

    if (connectionPromiseRef.current) {
      return connectionPromiseRef.current;
    }

    if (ws.current) {
      ws.current.close();
    }

    const wsUrl = aggregatorUrl.replace("http", "ws") + "/presenter?sessionId=" + joinedSessionId;

    const promise = new Promise<void>((resolve, reject) => {
      const newWs = new WebSocket(wsUrl);
      ws.current = newWs;

      // send regist message
      const message = {
        requestType: "REGIST_PRESENTER",
        data: {
          token: attachedToken,
        },
      } as presenterWsRegistMessage;

      newWs.onopen = () => {
        newWs.send(JSON.stringify(message));
        // set message handler
        newWs.onmessage = (event) => {
          const message = JSON.parse(event.data);
          messageHandlerRef.current(message);
        };
        resolve();
      };

      newWs.onerror = (event) => {
        connectionPromiseRef.current = null;
        reject(event);
      };

      newWs.onclose = () => {
        connectionPromiseRef.current = null;
      };
    });

    connectionPromiseRef.current = promise;
    return promise;
  }

  const setWsMessageHandler = (handler: (message: any) => void) => {
    messageHandlerRef.current = handler;
    if (ws.current) {
      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        messageHandlerRef.current(message);
      };
    }
  }

  const isWsConnected = ws.current?.readyState === WebSocket.OPEN;

  const sendWsMessage = async (message: any) => {
    await connectWs();
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }
    ws.current.send(JSON.stringify(message));
  };

  // Do cleanup
  useEffect(() => {
    return () => {
      if (ws.current) {
        logger.info("Closing WebSocket connection on cleanup");
        ws.current.close();
      }
    }
  }, []);

  const updateSessionInfo = async () => {
    const response = await axios.get(
      `${aggregatorUrl}/api/session/${joinedSessionId}/presenter/info`,
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
    if (!state) {
      throw new Error("State is not initialized");
    }
    setState({
      ...state,
      ...newState,
    });
  };

  return (
    <PresenterContext.Provider value={{
      joinedSessionId,
      setJoinedSessionId: setJoinedSessionIdAndStore,
      attachedToken,
      setAttachedToken: setAttachedTokenAndStore,
      aggregatorUrl,
      setAggregatorUrl: setAggregatorUrlAndStore,
      setWsMessageHandler,
      connectWs,
      isWsConnected,
      sendWsMessage,
      sessionInfo: sessionInfo ? Promise.resolve(sessionInfo) : updateSessionInfo(),
      updateSessionInfo,
      state,
      setState,
      updateState,
    }}>
      {children}
    </PresenterContext.Provider>
  );
}

export const usePresenterContext = () => {
  const context = useContext(PresenterContext);
  if (!context) {
    throw new Error("usePresenter must be used within a PresenterProvider");
  }
  return context;
}

function getKey(key: string) {
  return `presenter_session.${key}`;
}
