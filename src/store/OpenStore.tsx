import { Address, Card, Product } from "@/types";
import { create } from "zustand";
import axios from "axios";

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
  inventoryDropdownId: any;
  setInventoryDropdownId: (value: any) => void;
  openEditProduct: boolean;
  openAddProduct: boolean;
  setOpenAddProduct: (value: boolean) => void;

  //DATA
  dataEditAddress: Address;
  setDataEditAddress: (address: Address) => void;

  dataEditProduct: Product;
  setDataEditProduct: (product: Product) => void;

  address: any[];
  setAddress: (value: any) => void;

  dataEditCard: Card;
  setDataEditCard: (card: Card) => void;

  card: any[];
  setCard: (value: any) => void;

  products: any[];
  setProducts: (product: any) => void;

  //PRODUCTS
  getProducts: () => Promise<any>;
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
  inventoryDropdownId: 0,
  setInventoryDropdownId: (value: number) => {
    set(() => ({ inventoryDropdownId: value }));
  },
  openEditProduct: false,
  setOpenEditProduct: (value: boolean) => {
    set(() => ({ openEditProduct: value }));
  },
  openAddProduct: false,
  setOpenAddProduct: (value: boolean) => {
    set(() => ({ openAddProduct: value }));
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
  dataEditProduct: {
    id: "",
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
    sizes: [],
    imageUrl: "",
    createdAt: "",
    updatedAt: "",
  },
  setDataEditProduct: (product: Product) => {
    set(() => ({ dataEditProduct: product }));
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
  products: [],
  setProducts: (product: any) => {
    set(() => ({ products: product }));
  },

  getProducts: async () => {
    try {
      const response = await axios.get("/api/product");
      set(() => ({ products: response.data }));
      console.log(response);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
}));
