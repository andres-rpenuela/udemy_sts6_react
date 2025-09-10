import type { Product } from "../interface/Product.interface";

interface TableProps {
  head?: string[];
  data?: Product[];
  plus: (id: number) => void;
  subtract: (id: number) => void;
}

export function TableProduct({ head = [], data = [], plus, subtract }: TableProps) {
  return (
    <table border={1} style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {head.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((p: Product) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.description}</td>
            <td>{p.quantity}</td>
            <td>{p.price}</td>
            <td>
              <button onClick={() => plus(p.id)} disabled={p.quantity >= p.stock }>➕</button>
              <button onClick={() => subtract(p.id)} disabled={p.quantity === 0}>➖</button>
            </td>
            <td>{p.quantity * p.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
