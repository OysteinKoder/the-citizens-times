import "./app.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import MainNewsCard from "./components/MainNewsCard";
import SubNewsCard from "./components/SubNewsCard";

export function App() {
  return (
    <>
      <Header />
      <NavBar />
      <MainNewsCard />
      <SubNewsCard />
    </>
  );
}
