import { useProduct } from "../hooks/useProduct";
import { prodducts } from "../mocks/Product.mock";

export const ProductApp = () =>{

    const { products, plus, subtract, reset } = useProduct(prodducts);

    return (
        <>
        {products.map((p) => (
            <div key={p.id}>
            <h3>{p.name}</h3>
            <p>Cantidad: {p.quantity}</p>
            <button onClick={() => plus(p.id)}>➕</button>
            <button onClick={() => subtract(p.id)}>➖</button>
            </div>
        ))}
        <button onClick={reset}>🔄 Reset</button>
        </>
    );
}