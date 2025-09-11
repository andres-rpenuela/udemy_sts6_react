import { useProduct } from "../hooks/useProduct";
import type { Product } from "../interface/Product.interface";
import { listProduct } from "../services/ProductService";
import { ProductForm } from "./ProductForm";
import { TableProduct } from "./TableProduct";

export const ProductApp = () => {
  const { products, plus, subtract, reset, addProduct, deleteProduct } = useProduct( listProduct() );

  const head: string[] = ["Nombre", "Descripcion", "Cantidad", "Precio", "+/-", "Total", "Eliminar"];
  const title = "Products!";

  const handlerAddProduct = (product:Product) =>{
    console.log(product);
    addProduct(product);
  }

  const handlerRemoveProduct = (id:number) =>{
    if(!id )
      return;

    deleteProduct(id)
  }
  // if (products.length === 0) {
  //   return <h2>No hay productos disponibles</h2>;
  // }

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <div>
          <h2>{'Agregar producto'}</h2>
          <ProductForm handlerAdd= {handlerAddProduct} />
        </div>
        <hr/>
        <div>
          {products.length == 0 ? (
            <h2>No hay productos disponibles</h2>
          ):(
            <>
            <h2>{'Listado de productos'}</h2>
            <TableProduct head={head} data={products} plus={plus} subtract={subtract} handlerRemoveProduct= { handlerRemoveProduct} />
            <button onClick={reset}>🔄 Reset</button>
            </>
          )}
        </div>
      </div>
      
    </div>
  );
};
