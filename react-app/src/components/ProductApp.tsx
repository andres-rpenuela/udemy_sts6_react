import { useEffect, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import type { Product } from "../interface/Product.interface";
import { create, findAll, listProduct, udapted, remove } from '../services/ProductService';
import { ProductForm } from "./ProductForm";
import { TableProduct } from "./TableProduct";

export const ProductApp = () => {
  //const { products, plus, subtract, reset, addProduct, deleteProduct } = useProduct(listProduct());
  const { products, plus, subtract, reset, addProduct, deleteProduct, setProducts} = useProduct([]);

  const getProducts = async () => {
    const result = await findAll();
    // console.log(result); // debug
    const loadedProducts = result?.data._embedded?.products ?? [];

    console.log(loadedProducts)
    setProducts( loadedProducts );
  }

  useEffect( () =>{
    getProducts()
  },[]); // useEffect no puede ser una funciona asynconra

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
      //console.log("Editar producto", product);
      udapted(product);
      if(!udapted){
        alert("error al editar producto.")
        return;
      }
      setProductSelected(null);
      // aquí podrías actualizarlo en `products`
    } else {
      // ➕ Nuevo producto
      if(!create(product)){
        alert("error al crear el producto")
        return;
      }
      addProduct(product);
    }
  };

  const handlerRemoveProduct = (id: number) => {
    if(!remove(id)){
      alert("error al borrar el producto!")
      return;
    }
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
    <div className="container m-4">
      <h1>Products!</h1>
      <div className="row">
        <div className="col-4">
          <h2>{productSelected ? "Editar producto" : "Agregar producto"}</h2>
          <ProductForm
            handlerAdd={handlerAddProduct}
            productSelected={productSelected}
          />
        </div>
        
        <div className="col-8">
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
            </>
          )}
          <hr/>
          <button onClick={onReset}>🔄 Reset</button>
        </div>
      </div>
    </div>
  );
};
