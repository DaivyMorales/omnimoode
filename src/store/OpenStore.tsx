import { Address, Card } from "@/types";
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
  openEditCard: boolean;
  setOpenEditCard: (value: boolean) => void;
  openAddCard: boolean;
  setOpenAddCard: (value: boolean) => void;

  //DATA
  dataEditAddress: Address;
  setDataEditAddress: (address: Address) => void;

  address: any[];
  setAddress: (value: any) => void;

  dataEditCard: Card;
  setDataEditCard: (card: Card) => void;

  card: any[];
  setCard: (value: any) => void;
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
  openEditCard: false,
  setOpenEditCard: (value: boolean) => {
    set(() => ({ openEditCard: value }));
  },
  openAddCard: false,
  setOpenAddCard: (value: boolean) => {
    set(() => ({ openAddCard: value }));
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

  dataEditCard: {
    id: 0,
    card_number: "",
    names: "",
    surnames: "",
    due_date: "",
    security_code: 0,
    number_identification: 0,
    userId: 0,
  },
  setDataEditCard: (card: Card) => {
    set(() => ({ dataEditCard: card }));
  },
  card: [],
  setCard: (value: any) => {
    set(() => ({ card: value }));
  },
}));
