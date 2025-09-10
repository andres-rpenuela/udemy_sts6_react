import type { Product } from "../interface/Product.interface";
import { mockProducts } from "../mocks/Product.mock"

export function listProduct():Product[] {
    return mockProducts;
}