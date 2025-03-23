import { Product } from "../api/types";

export interface CartItem {
  product: Product;
  quantity: number;
}
