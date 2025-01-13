import { login } from "./auth/login";
import { register } from "./auth/register";
import { createRoom } from "./room/createRoom";
import { getJoinedRoomList } from "./room/getJoinedRoomList";

export const apiEndpoints = {
  auth: {
    login,
    register
  },
  room: {
    getJoinedRoomList,
    createRoom,
  }
}
