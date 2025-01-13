import { createContext, useContext, useState } from "react";

type StateContextType = {
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
  const [activeRoomId, setActiveRoomId] = useState<string>("");
  const [activeSlideId, setActiveSlideId] = useState<string>("");
  const [activePageId, setActivePageId] = useState<string>("");
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
