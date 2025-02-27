import { createContext, useContext, useEffect, useState } from "react";

export type StateContextType = {
  // Active
  activeRoomId: string;
  setActiveRoomId: (roomId: string) => void;
  activeSlideId: string;
  setActiveSlideId: (slideId: string) => void;
  activePageId: string;
  setActivePageId: (pageId: string) => void;
};

const StateContext = createContext<StateContextType>({
  activeRoomId: "",
  setActiveRoomId: () => { },
  activeSlideId: "",
  setActiveSlideId: () => { },
  activePageId: "",
  setActivePageId: () => { },
});

interface StateProviderProps {
  children: React.ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [activeRoomId, setActiveRoomId] = useState<string>(localStorage.getItem("activeRoomId") || "");
  const [activeSlideId, setActiveSlideId] = useState<string>(localStorage.getItem("activeSlideId") || "");
  const [activePageId, setActivePageId] = useState<string>(localStorage.getItem("activePageId") || "");

  // Cache to localstorage
  useEffect(() => {
    localStorage.setItem("activeRoomId", activeRoomId);
  }, [activeRoomId]);

  useEffect(() => {
    localStorage.setItem("activeSlideId", activeSlideId);
  }, [activeSlideId]);

  useEffect(() => {
    localStorage.setItem("activePageId", activePageId);
  }, [activePageId]);

  return (
    <StateContext.Provider value={{ activeRoomId, setActiveRoomId, activeSlideId, setActiveSlideId, activePageId, setActivePageId }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
}
