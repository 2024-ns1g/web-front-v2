import { Page } from "@/types/object/page";
import { Room } from "@/types/object/room";
import { Slide } from "@/types/object/slide";
import { createContext, useState } from "react";

type CacheContextType = {
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
}

const CacheContext = createContext<CacheContextType>({
  roomCache: {},
  setRoomCache: () => { },
  setRoomCacheList: () => { },
  slideCache: {},
  setSlideCache: () => { },
  setSlideCacheList: () => { },
  pageCache: {},
  setPageCache: () => { },
  setPageCacheList: () => { },
});

interface CacheProviderProps {
  children: React.ReactNode;
}

export const CacheProvider: React.FC<CacheProviderProps> = ({ children }) => {
  const [roomCache, setRoomCache] = useState<Record<string, Room>>({});
  const [slideCache, setSlideCache] = useState<Record<string, Slide>>({});
  const [pageCache, setPageCache] = useState<Record<string, Page>>({});

  const setRoomCacheList = (rooms: Room[]) => {
    const newRoomCache: Record<string, Room> = {};
    rooms.forEach(room => {
      newRoomCache[room.roomId] = room;
    });
    setRoomCache(newRoomCache);
  }

  const setSlideCacheList = (slides: Slide[]) => {
    const newSlideCache: Record<string, Slide> = {};
    slides.forEach(slide => {
      newSlideCache[slide.slideId] = slide;
    });
    setSlideCache(newSlideCache);
  }

  const setPageCacheList = (pages: Page[]) => {
    const newPageCache: Record<string, Page> = {};
    pages.forEach(page => {
      newPageCache[page.pageId] = page;
    });
    setPageCache(newPageCache);
  }

  const setPageCacheImpl = (page: Page) => {
    setPageCache(prev => {
      const newPageCache = { ...prev };
      newPageCache[page.pageId] = page;
      return newPageCache;
    });
  }

  const setSlideCacheImpl = (slide: Slide) => {
    setSlideCache(prev => {
      const newSlideCache = { ...prev };
      newSlideCache[slide.slideId] = slide;
      return newSlideCache;
    });
  }

  const setRoomCacheImpl = (room: Room) => {
    setRoomCache(prev => {
      const newRoomCache = { ...prev };
      newRoomCache[room.roomId] = room;
      return newRoomCache;
    });
  }

  return (
    <CacheContext.Provider value={
      {
        roomCache, 
        setRoomCache: setRoomCacheImpl, 
        setRoomCacheList, 
        slideCache, 
        setSlideCache: setSlideCacheImpl, 
        setSlideCacheList, 
        pageCache, 
        setPageCache: setPageCacheImpl, 
        setPageCacheList
      }}>
      {children}
    </CacheContext.Provider>
  );
}

