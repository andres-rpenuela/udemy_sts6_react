import { useEffect, useRef, useState } from "react";
import type { Product } from "../interface/Product.interface";
import "../css/ProductForm.css"; // 👈 Importamos el CSS

interface ProductFormProps {
  handlerAdd: (p: Product) => void;
}

const productEmpty = {
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    quantity: 0,
    description: "",
  };

export const ProductForm = ({ handlerAdd }: ProductFormProps) => {
  const [product, setProduct] = useState<Product>(productEmpty);
  const inputRef = useRef<HTMLInputElement>(null);

  // Inicializar con valores por defecto (solo ejemplo)
  useEffect(() => {
    setProduct({
        id: 0,
        name: "",
        price: 0,
        stock: 0,
        quantity: 0,
        description: "",
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setProduct((prev) => ({
      ...prev,
      //[e.target.name]: e.target.value,
      [name]: type === "number" ? Number(value) : value, // 🔑 convierte números
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //alert(`Nombre: ${inputRef.current?.value}`);
    //alert(`Producto creado: ${JSON.stringify(product)}`);
    
    if(!product.name || !product.price || !product.stock ){
        alert('Datos incompletos');
        return;
    }

    handlerAdd( product ); // funcion recibida del padre

    // Resetear el formulario a valores iniciales
    setProduct(productEmpty);
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Agregar Producto</h2>

        <input
          placeholder="Nombre"
          name="name"
          value={product.name}
          onChange={handleChange}
          ref={inputRef}
          className="form-input"
        />
        <input
          placeholder="Descripción"
          name="description"
          value={product.description}
          onChange={handleChange}
          className="form-input"
        />
        <input
          placeholder="Precio"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          className="form-input"
        />
        <input
          placeholder="Stock"
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          className="form-input"
        />

        <button type="submit" className="form-button">Enviar</button>
      </form>

      <pre className="debug-box">{JSON.stringify(product, null, 2)}</pre>
    </>
  );
};
