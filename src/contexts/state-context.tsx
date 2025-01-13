import { createContext, useContext, useState } from "react";

type StateContextType = {
  // Active
  activeRoomId: string;
  setActiveRoomId: (roomId: string) => void;
  activeSlideId: string;
  setActiveSlideId: (slideId: string) => void;
  activePageId: string;
  setActivePageId: (pageId: string) => void;

  // Cache
  roomCache: Record<string, Room>;
