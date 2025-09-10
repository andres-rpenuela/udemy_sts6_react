# udemy_sts6_react
Construye aplicaciones web Spring Framework 6 y Spring Boot 3: AOP, JPA, Security JWT, RESTful, AWS EC2, Angular, React: Bakend Users Spring Security

---

# Crear un proyecto en REACT

Guia paso a paso para **crear un proyecto en React** moderno usando **Vite** (recomendado) o **Create React App**. Aquí te muestro ambas opciones.


> 💡 **Tip**: Si estás empezando, Vite es más rápido y ligero, y tiene soporte moderno para React 18.

---

## **Opción 1: Usando Vite (recomendado por velocidad y modernidad)**

- [Guia Oficial](https://vite.dev/)

1. **Abre tu terminal** y ejecuta:

```bash
npm create vite@latest nombre-del-proyecto
```

2. **Selecciona opciones**:

   * Framework: `React`
   * Variant: `JavaScript` o `TypeScript` según prefieras

3. **Entra al proyecto**:

```bash
cd nombre-del-proyecto
```

4. **Instala dependencias**:

```bash
npm install
```

5. **Inicia el servidor de desarrollo**:

```bash
npm run dev
```

6. **Abre tu navegador** y visita la URL que te indica la terminal (usualmente `http://localhost:5173`) para ver tu app funcionando.

---

## **Opción 2: Usando Create React App (más tradicional)**

1. **Crea el proyecto**:

```bash
npx create-react-app nombre-del-proyecto
```

2. **Entra al proyecto**:

```bash
cd nombre-del-proyecto
```

3. **Inicia la app**:

```bash
npm start
```

4. Abre `http://localhost:3000` en tu navegador.

---


## **1️⃣ Estructura de carpetas recomendada**

La **estructura típica** que se usa con **Vite + React + TypeScript**, es clara y escalable:

```
my-app/
│
├─ public/                  # Archivos estáticos (favicon, imágenes, robots.txt)
│
├─ src/                     # Todo el código fuente
│   ├─ assets/              # Imágenes, fuentes, íconos, etc.
│   ├─ components/          # Componentes reutilizables
│   │   └─ Button.tsx
│   ├─ pages/               # Páginas principales de la app
│   │   └─ Home.tsx
│   ├─ routes/              # Configuración de rutas (si usas React Router)
│   │   └─ AppRoutes.tsx
│   ├─ hooks/               # Custom hooks
│   ├─ context/             # Contextos de React (estado global)
│   ├─ services/            # API calls, fetchers, utilidades de backend
│   ├─ utils/               # Funciones helper generales
│   ├─ App.tsx              # Componente raíz
│   ├─ main.tsx             # Entrada principal de React (ReactDOM.render)
│   └─ index.css            # Estilos globales
│
├─ package.json             # Dependencias y scripts
├─ tsconfig.json            # Configuración de TypeScript
└─ vite.config.ts           # Configuración de Vite
```

---

## **2️⃣ Explicación de carpetas clave**

* **`components/`** → Componentes pequeños y reutilizables (Botones, Inputs, Cards).
* **`pages/`** → Componentes que representan páginas completas de tu app.
* **`routes/`** → Donde defines tus rutas con React Router.
* **`hooks/`** → Funciones reutilizables que encapsulan lógica de estado o efectos.
* **`context/`** → Para estado global usando React Context API.
* **`services/`** → Lógica para conectarte a APIs o gestionar datos externos.
* **`utils/`** → Funciones generales que no dependen de React, como formateadores de fecha.

---

# PropTypes

💡 **Tip:** No pongas todo en `src/` sin estructura, porque al crecer la app será difícil mantenerla. Esta estructura te permite escalar fácilmente y tener código limpio.

---


## 🔎 ¿Qué son los PropTypes?

* **PropTypes** es una librería incluida en React para **validar las props en tiempo de ejecución**.
* Se usa más en **JavaScript puro**.
* En **TypeScript**, normalmente usamos **interfaces** o **types** para validar las props en tiempo de compilación, lo cual es más potente.

```bash
npm install prop-types
```

---

## ✅ Ejemplo con PropTypes (JS)

```jsx
import PropTypes from "prop-types";

function Table({ head, data }) {
  return (
    <table>
      <thead>
        <tr>
          {head.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.description}</td>
            <td>{p.quantity}</td>
            <td>{p.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  head: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
    })
  ).isRequired,
};

export default Table;
```

---

## ✅ El mismo ejemplo en TypeScript (sin PropTypes)

Ya que tú trabajas con **TypeScript**, en lugar de `PropTypes` defines una **interfaz**:

```tsx
import type { Product } from "../interface/Product.interface";

interface TableProps {
  head: string[];
  data: Product[];
}

export function Table({ head, data }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          {head.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.description}</td>
            <td>{p.quantity}</td>
            <td>{p.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

## 🔑 Diferencias

* **PropTypes**: validación **en tiempo de ejecución** → útil en proyectos JS.
* **TypeScript**: validación **en tiempo de compilación** → más seguro, no necesitas PropTypes.

---