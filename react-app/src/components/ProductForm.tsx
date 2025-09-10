import { useEffect, useRef, useState } from "react";
import type { Product } from "../interface/Product.interface";
import "../css/ProductForm.css"; // 👈 Importamos el CSS

export const ProductForm = () => {
  const [product, setProduct] = useState<Product>({});
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
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //alert(`Nombre: ${inputRef.current?.value}`);
    alert(`Producto creado: ${JSON.stringify(product)}`);
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
