export type User = {
    id: number;
    name: string;
    email: string;
    email_verification: boolean;
    password: string;
}

export type Size = {
    id: number,
    name: string,
    quantity: number,
    productId: number
}

export type Product = {
    id: number,
    name: string,
    price: number,
    categoryId: number,
    sizes: Size[],
    createdAt?: Date | string,
    updatedAt?: Date | string
}

export type Category = {
    id: number,
    name: string,
    product: Product[]
}