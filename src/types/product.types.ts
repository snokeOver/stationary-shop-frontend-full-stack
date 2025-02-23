export type TCategory =
  | "Writing"
  | "Office Supplies"
  | "Art Supplies"
  | "Educational"
  | "Technology";

export interface IProduct {
  _id: string;
  name: string;
  brand: string;
  imageUrl: string;
  price: number;
  category: TCategory;
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

export interface ICartProduct {
  _id: string;
  name: string;
  price: number;
  purchaseQuantity: number;
  availableQuantity: number;
  imageUrl: string;
}
