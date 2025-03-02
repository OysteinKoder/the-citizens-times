import "./app.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import HeadlineNewsCard from "./components/HeadlineNewsCard";
import SubNewsCard from "./components/SubNewsCard";
import PostForm from "./components/PostForm";

// As of now all components are rendered in app.js,
// will be moved to appropriate pages later

// Todo shortlist:
// Add routing
// Add category pages

// Todo Longlist:
// Add backend
// Make sorting algorytm, similar to reddit
// - Hot, new, top (by date perhaps, 1 day, 1 week, 1 month, 1 year, all time.)
export function App() {
  return (
    <>
      <Header />
      <NavBar />
      <HeadlineNewsCard />
      <SubNewsCard />
      <PostForm />
    </>
  );
}
