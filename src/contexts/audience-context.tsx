import { createContext, useContext, useEffect, useState } from "react";

type AudienceContextType = {
  joinedSessionId: string;
  setJoinedSessionId: (id: string) => void;
  attachedToken: string;
  setAttachedToken: (token: string) => void;
  setWsMessageHandler: (handler: (message: any) => void) => void;
  connectWs: () => Promise<void>;
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

  // Cache to local storage
  useEffect(() => {
    localStorage.setItem("joinedSessionId", joinedSessionId);
  }, [joinedSessionId]);

  useEffect(() => {
    localStorage.setItem("attachedToken", attachedToken);
  }, [attachedToken]);

  // connection
  const [ws, setWs] = useState<WebSocket | null>(null);

  const connectWs = async () => {
    const ws = new WebSocket("ws://localhost:8081/ws");
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

  return (
    <AudienceContext.Provider value={{ joinedSessionId, setJoinedSessionId, attachedToken, setAttachedToken }}>
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

