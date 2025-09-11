import { useEffect, useState } from "react";
import type { Product } from "../interface/Product.interface";
import  "../css/ProductForm.css"

interface ProductFormProps {
  handlerAdd: (product: Product) => void;
  productSelected?: Product | null; // propiedad opcional, que puede pasarse o no pasare y esta puede ser null o con valor
}

export const ProductForm = ({ handlerAdd, productSelected }: ProductFormProps) => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    quantity: 0,
    description: "",
  });

  // cuando cambie el producto seleccionado, actualizamos el estado
  useEffect(() => {
    if (productSelected) {
      setProduct(productSelected);
    }else{
        setProduct({
            id: 0,
            name: "",
            price: 0,
            stock: 0,
            quantity: 0,
            description: "",
        });
    }
  }, [productSelected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!product.name || !product.description || !product.price || !product.stock){
        alert("Datos incompletos!!");
        return
    }

    handlerAdd(product);
    setProduct({
      id: 0,
      name: "",
      price: 0,
      stock: 0,
      quantity: 0,
      description: "",
    }); // limpiar
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
        <h2>{product.id ? "Editar Producto" : "Agregar Producto"}</h2>

        <input
            className="form-input"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Nombre"
        />

        <input
            className="form-input"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Descripción"
        />

        <input
            className="form-input"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            placeholder="Precio"
        />

        <input
            className="form-input"
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
        />

        <button className="form-button" type="submit">
            {product.id ? "Actualizar" : "Agregar"}  {/* el cero se consiera false */}
        </button>

        <pre className="debug-box">{JSON.stringify(product, null, 2)}</pre>
    </form>
  );
};
