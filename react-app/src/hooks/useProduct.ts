import { useEffect, useState } from "react";
import type { Product } from "../interface/Product.interface";

export function useProduct(init: Product[] = []){
    //const [products,setProducts] = useState(init); // sin useEffect(...)
    const [products,setProducts] = useState<Product[]>([]); // con useEffect(...)

    // Se ejecuta después del primer render
    //1. useState([]) → empieza vacío.
    //2. useEffect(() => setProducts(init), [init]) → después del primer render se inicializa con init.
    //3. Si en un futuro init cambia (por ejemplo, porque viene de una API), el hook actualizará el estado.
    useEffect(() => {
        setProducts(init);
    }, [init]); // simula un Postcreated

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