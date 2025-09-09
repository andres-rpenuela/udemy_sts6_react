// src/components/Contador.tsx
import { useCount } from '../hooks/useContador';

export const Count = () => {
  const { count, plus, subtract, reset } = useCount(0);

  return (
    <>
    <h1 style={{ textAlign: "center" }}>Mi App con Hook Personalizado</h1>
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Contador: {count}</h2>
      <button onClick={plus}>➕</button>
      <button onClick={subtract}>➖</button>
      <button onClick={reset}>🔄</button>
    </div>
    </>
  );
}
