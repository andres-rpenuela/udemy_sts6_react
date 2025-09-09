import { useState } from "react";

export function useCount(init: number = 0){
    const [count,setCount] = useState(init);

    const plus = () => setCount( (count) => count + 1 );
    const subtract = () => setCount( (c) => c - 1 );
    const reset = () => setCount(init);
 
      return { count, plus, subtract, reset };

}