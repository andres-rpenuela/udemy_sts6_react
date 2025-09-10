import { useProduct } from "../hooks/useProduct";
import { listProduct } from "../services/ProductService";
import { TableProduct } from "./TableProduct";

export const ProductApp = () => {
  const { products, plus, subtract, reset } = useProduct( listProduct() );

  const head: string[] = ["Nombre", "Descripcion", "Cantidad", "Precio", "+/-", "Total"];
  const title = "Products!";

  if (products.length === 0) {
    return <h2>No hay productos disponibles</h2>;
  }

  return (
    <>
      <h1>{title}</h1>
      <TableProduct head={head} data={products} plus={plus} subtract={subtract} />
      <button onClick={reset}>🔄 Reset</button>
    </>
  );
};
