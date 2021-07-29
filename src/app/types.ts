export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
}

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}