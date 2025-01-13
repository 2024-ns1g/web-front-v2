import { Page } from "@/types/object/page";
import { Room } from "@/types/object/room";
import { Slide } from "@/types/object/slide";

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
