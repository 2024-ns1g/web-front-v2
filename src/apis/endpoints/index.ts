import { login } from "./auth/login";
import { register } from "./auth/register";
import { createRoom } from "./room/createRoom";
import { getJoinedRoomList } from "./room/getJoinedRoomList";
import { verifyAudienceOtp } from "./session/audience/verifyOtp";
import { verifyPresenterOtp } from "./session/presenter/verifyOtp";
import { createSlide } from "./slide/createSlide";
import { getLinkedSlideList } from "./slide/getLinkedSlideList";

export const apiEndpoints = {
  auth: {
    login,
    register
  },
  room: {
    getJoinedRoomList,
    createRoom,
  },
  slide: {
    getLinkedSlideList,
    createSlide,
  },
  session: {
    audience: {
      verifyAudienceOtp,
    },
    presenter: {
      verifyPresenterOtp,
    },
  }
}
