import { useState } from "preact/hooks";
import "./app.css";
import Header from "./components/header";
import NavBar from "./components/NavBar";
import MainNewsCard from "./components/MainNewsCard";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <NavBar />
      <MainNewsCard />
    </>
  );
}
