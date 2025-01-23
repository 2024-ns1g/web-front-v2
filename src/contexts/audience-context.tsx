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
}

const AudienceContext = createContext<AudienceContextType | null>(null);

interface AudienceProviderProps {
  children: React.ReactNode;
}

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

  return (
    <AudienceContext.Provider value={{ joinedSessionId, setJoinedSessionId, attachedToken, setAttachedToken, aggregatorUrl, setAggregatorUrl, setWsMessageHandler, connectWs, sendWsMessage }}>
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

