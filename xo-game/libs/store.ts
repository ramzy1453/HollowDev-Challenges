import { create } from "zustand";
import { Socket } from "socket.io-client";

type Store = {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
};

export const useStore = create<Store>()((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
}));
