import { useState } from "react";
import { useProduct } from "../hooks/useProduct";
import type { Product } from "../interface/Product.interface";
import { listProduct } from "../services/ProductService";
import { ProductForm } from "./ProductForm";
import { TableProduct } from "./TableProduct";

export const ProductApp = () => {
  const { products, plus, subtract, reset, addProduct, deleteProduct } = useProduct(listProduct());

  // Estado para producto seleccionado en edición
  const [productSelected, setProductSelected] = useState<Product | null>(null);

  const head: string[] = [
    "Nombre",
    "Descripcion",
    "Cantidad",
    "Precio",
    "+/-",
    "Total",
    "Eliminar",
    "Editar",
  ];

  const handlerAddProduct = (product: Product) => {
    if (product.id && product.id !== 0) {
      // 📝 Editar producto existente
      console.log("Editar producto", product);
      setProductSelected(null);
      // aquí podrías actualizarlo en `products`
    } else {
      // ➕ Nuevo producto
      addProduct(product);
    }
  };

  const handlerRemoveProduct = (id: number) => {
    deleteProduct(id);
  };

  const handlerLoadProductSelected = (product: Product) => {
    setProductSelected(product);
  };

  const onReset = () =>{
    console.log('reset')
    setProductSelected(null)

    reset()
  }

  return (
    <div>
      <h1>Products!</h1>
      <div>
        <div>
          <h2>{productSelected ? "Editar producto" : "Agregar producto"}</h2>
          <ProductForm
            handlerAdd={handlerAddProduct}
            productSelected={productSelected}
          />
        </div>
        <hr />
        <div>
          {products.length === 0 ? (
            <h2>No hay productos disponibles</h2>
          ) : (
            <>
              <h2>Listado de productos</h2>
              <TableProduct
                head={head}
                data={products}
                plus={plus}
                subtract={subtract}
                handlerRemoveProduct={handlerRemoveProduct}
                handlerLoadProductSelected={handlerLoadProductSelected}
              />
              <button onClick={onReset}>🔄 Reset</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
