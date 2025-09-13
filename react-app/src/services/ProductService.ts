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

export const create = async ({name, description, price, stock, quantity}:Product) =>{
    try{
        const response = await http.post("/products",{
            name: name,
            description: description,
            price: price,
            stock: stock,
            quantity: quantity
        });

        return response; // con el await, deuvele un AxiosResponse y no una promesa AxiosResponse
    }catch(error){
        console.log(error)
    }

    return undefined;
}

export const udapted = async ({id, name, description, price, stock, quantity}:Product) =>{
    try{
        const response = await http.put("/products/"+id,{
            name: name,
            description: description,
            price: price,
            stock: stock,
            quantity: quantity
        });

        return response; // con el await, deuvele un AxiosResponse y no una promesa AxiosResponse
    }catch(error){
        console.log(error)
    }

    return undefined;
}

export const remove = async (id:Number) =>{
    try{
        const response = await http.delete("/products/"+id);

        return response; // con el await, deuvele un AxiosResponse y no una promesa AxiosResponse
    }catch(error){
        console.log(error)
    }

    return undefined;
}