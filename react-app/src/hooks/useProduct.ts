import { useState } from "react";
import type { Product } from "../interface/Product.interface";

export function useProduct(init: Product[] = []){
    const [products,setProducts] = useState(init);

    // Incremta la cantidad por id
    // Incrementar cantidad solo si es menor que el stock disponible
    const plus = (id: number) => {
    setProducts((prev) =>
        prev.map((p) =>
        p.id === id && (p.quantity || 0) < (p.stock || 0)
            ? { ...p, quantity: (p.quantity || 0) + 1 }
            : p
        )
    );
    };


    // Decre,emta la cantidad por id
    const subtract = (id: number) => {
        setProducts((prev) =>
        prev.map((p) =>
            p.id === id && (p.quantity || 0) > 0
            ? { ...p, quantity: (p.quantity || 0) - 1 }
            : p
        ));
    };

    // Resetea al estado inicial
    const reset = () => setProducts(init);

    // Aagregar un producto
    const addProduct = (product: Product) => {
        setProducts((prev) => [...prev, { ...product, quantity: product.quantity || 0 }]);
    };
    
     return { products, plus, subtract, reset };

}