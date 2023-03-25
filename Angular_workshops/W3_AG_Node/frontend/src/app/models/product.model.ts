export interface Product {
  name: string;
  stock: number;
  price: number;
  image?: File;
}

export interface ProductResponse {
  id: number;
  name: string;
  image: string;
  stock: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
