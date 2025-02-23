export interface IOrderItem {
  availableQuantity: number;
  imageUrl: string;
  name: string;
  price: number;
  purchaseQuantity: number;
  _id: string;
}

export interface IUserInfo {
  address: string;
  email: string;
  name: string;
  phone: string;
}

export interface IOrder {
  createdAt: string;
  orderItems: IOrderItem[];
  paidAmount: number;
  status: string;
  txId: string;
  updatedAt: string;
  userInfo: IUserInfo;
  __v: number;
  _id: string;
}

export interface ApiResponse {
  data: IOrder[];
  message: string;
  status: boolean;
}
