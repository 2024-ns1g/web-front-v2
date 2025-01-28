import { SessionInfo } from "@/types/session/session-info";
import { SessionState } from "@/types/session/session-state";
import { createContext, useContext } from "react";

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

  return (
    <PresenterContext.Provider value={{}}>
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
