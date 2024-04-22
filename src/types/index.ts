export type User = {
  id: number;
  name: string;
  email: string;
  email_verification: boolean;
  password: string;
};

export type Size = {
  id: string;
  name: string;
  quantity: number;
  productId: number;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  sizes: Size[];
  imageUrl: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type Category = {
  id: number;
  name: string;
  product: Product[];
};

export type Cart = {
  id: number;
  userId: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  products: CartProduct[];
};

export type CartProduct = {
  id: number;
  sizeId: number;
  productId: number;
  cartId: number;
  quantity: number;
  isLoaded: boolean;
  product: Product;
  size: Size;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type ProductCalculated = {
  id: number;
  value: number;
};

export type Address = {
  id: number;
  country: string;
  names: string;
  surnames: string;
  address: string;
  neighborhood: string;
  specifications: string;
  state: string;
  stateNumber: number;
  city: string;
  phone: string;
  userId: number;
};

export type Card = {
  id: number;
  card_number: string;
  names: string;
  surnames: string;
  due_date: string;
  security_code: number;
  number_identification: number;
  userId: number;
};
