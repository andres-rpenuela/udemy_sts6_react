import { Product } from "./product.interface";

export interface ProductResponse{
  _embedded: {
    products: Product[];
  };
}
