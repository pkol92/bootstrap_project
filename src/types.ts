export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export type UserState = {
  token: string;
  email: string;
  id: number;
  name: string;
  products: Array<Product | null>;
};
