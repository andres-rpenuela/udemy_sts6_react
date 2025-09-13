import type { Product } from "../interface/Product.interface";
import { mockProducts } from "../mocks/Product.mock"
import http from "./AxiosService";

export function listProduct():Product[] {
    return mockProducts;
}

export const findAll = async () => {
    try{
        const response = await http.get("/products");
        return response; // devolvemos solo los datos      
    }catch(error){
        console.log(error);
    }

    return null;
  
};