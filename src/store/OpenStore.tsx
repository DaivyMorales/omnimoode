import { create } from "zustand";

export interface OpenStore {
  openPayment: boolean;
  setOpenPayment: (value: boolean) => void;
  openAddress: boolean;
  setOpenAddress: (value: boolean) => void;
}

export const useOpen = create<OpenStore>((set) => ({
  openPayment: false,
  setOpenPayment: (value: boolean) => {
    set(() => ({ openPayment: value }));
  },
  openAddress: false,
  setOpenAddress: (value: boolean) => {
    set(() => ({ openAddress: value }));
  },
}));
