import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="underline">Vite + Preact</h1>
      <button className="btn btn-secondary">primary</button>
    </>
  );
}
