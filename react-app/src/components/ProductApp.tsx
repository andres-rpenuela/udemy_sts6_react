import { useProduct } from "../hooks/useProduct";
import { listProduct } from "../services/ProductService";
import { ProductForm } from "./ProductForm";
import { TableProduct } from "./TableProduct";

export const ProductApp = () => {
  const { products, plus, subtract, reset } = useProduct( listProduct() );

  const head: string[] = ["Nombre", "Descripcion", "Cantidad", "Precio", "+/-", "Total"];
  const title = "Products!";

  if (products.length === 0) {
    return <h2>No hay productos disponibles</h2>;
  }

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <div>
          <h2>{'Agregar producto'}</h2>
          <ProductForm/>
        </div>
        <hr/>
        <div>
          <h2>{'Listado de productos'}</h2>
          <TableProduct head={head} data={products} plus={plus} subtract={subtract} />
          <button onClick={reset}>🔄 Reset</button>
        </div>
      </div>
      
    </div>
  );
};
