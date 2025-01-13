import { Page } from "@/types/object/page";
import { Room } from "@/types/object/room";
import { Slide } from "@/types/object/slide";
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
  setRoomCache: (room: Room) => void;
  setRoomCacheList: (rooms: Room[]) => void;
  
  slideCache: Record<string, Slide>;
  setSlideCache: (slide: Slide) => void;
  setSlideCacheList: (slides: Slide[]) => void;

  pageCache: Record<string, Page>;
  setPageCache: (page: Page) => void;
  setPageCacheList: (pages: Page[]) => void;
};
