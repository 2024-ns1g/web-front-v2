import { createContext, useContext, useState } from "react";

type LayoutContextType = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

type LayoutProviderProps = {
  children: React.ReactNode;
};

export const LayoutProvider = ({ children }: LayoutProviderProps) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContext.Provider value={{ isSidebarOpen, toggleSidebar, setSidebarOpen: setIsSidebarOpen }}>
      {children}
    </LayoutContext.Provider>
  );

};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within an LayoutProvider");
  }
  return context;
}
