export interface IProduct {
  _id: string;
  name: string;
  brand: string;
  imageUrl: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IProductResponse {
  message: string;
  status: boolean;
  data: IProduct[];
}
