import { createContext, useContext, useEffect, useState } from "react";

type AudienceContextType = {
  joinedSessionId: string;
  setJoinedSessionId: (id: string) => void;
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

  // Cache to local storage
  useEffect(() => {
    localStorage.setItem("joinedSessionId", joinedSessionId);
  }, [joinedSessionId]);

  return (
    <AudienceContext.Provider value={{ joinedSessionId, setJoinedSessionId }}>
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

