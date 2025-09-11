import { useEffect, useState } from "react";
import type { Product } from "../interface/Product.interface";
import { listProduct } from "../services/ProductService";

export function useProduct(init: Product[] = []){
    //const [products,setProducts] = useState(init); // sin useEffect(...)
    const [products,setProducts] = useState<Product[]>([]); // con useEffect(...)

    // Se ejecuta después del primer render
    //1. useState([]) → empieza vacío.
    //2. useEffect(() => setProducts(init), [init]) → después del primer render se inicializa con init.
    //3. Si en un futuro init cambia (por ejemplo, porque viene de una API), el hook actualizará el estado.
    useEffect(() => {
        // let dataLoad = listProduct();
        // setProducts(dataLoad);
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
    const addProduct = (product: Omit<Product, "id">) => {
        setProducts(prev => {
        const nextId = prev.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;
        return [...prev, { ...product, id: nextId }];
        });
    };
    
     return { products, plus, subtract, reset, addProduct };

}