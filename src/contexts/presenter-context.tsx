import { createContext, useContext } from "react";

type PresenterContextType = {
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

export const usePresenter = () => {
  const context = useContext(PresenterContext);
  if (!context) {
    throw new Error("usePresenter must be used within a PresenterProvider");
  }
  return context;
}

function getKey(key: string) {
  return `presenter_session.${key}`;
}
