import { Address } from "@/types";
import { create } from "zustand";

export interface OpenStore {
  //OPEN COMPONENTS
  openPayment: boolean;
  setOpenPayment: (value: boolean) => void;
  openAddress: boolean;
  setOpenAddress: (value: boolean) => void;
  idSectionProfile: string;
  setIdSectionProfile: (value: string) => void;
  openChangePassword: boolean;
  setOpenChangePassword: (value: boolean) => void;
  openEditAddress: boolean;
  setOpenEditAddress: (value: boolean) => void;
  openAddAddress: boolean;
  setOpenAddAddress: (value: boolean) => void;

  //DATA
  dataEditAddress: Address;
  setDataEditAddress: (address: Address) => void;

  address: any[];
  setAddress: (value: any) => void;
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
  idSectionProfile: "1",
  setIdSectionProfile: (id: string) => {
    set(() => ({ idSectionProfile: id }));
  },
  openChangePassword: false,
  setOpenChangePassword: (value: boolean) => {
    set(() => ({ openChangePassword: value }));
  },
  openEditAddress: false,
  setOpenEditAddress: (value: boolean) => {
    set(() => ({ openEditAddress: value }));
  },
  openAddAddress: false,
  setOpenAddAddress: (value: boolean) => {
    set(() => ({ openAddAddress: value }));
  },
  dataEditAddress: {
    id: 0,
    country: "",
    names: "",
    surnames: "",
    address: "",
    neighborhood: "",
    specifications: "",
    stateNumber: 0,
    state: "",
    city: "",
    phone: "",
    userId: 0,
  },
  setDataEditAddress: (address: Address) => {
    set(() => ({ dataEditAddress: address }));
  },
  address: [],
  setAddress: (value: any) => {
    set(() => ({ address: value }));
  },
}));
