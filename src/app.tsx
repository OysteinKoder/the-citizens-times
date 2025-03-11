import "./app.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import HumorPage from "./pages/HumorPage";
import PostForm from "./components/PostForm";
import { LocationProvider, ErrorBoundary, Router, Route } from "preact-iso";

export function App() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Header />
        <NavBar />
        <Router>
          <Route path="/humor-news" component={HumorPage} />
          <Route path="/humor-news" component={HumorPage} />
          <Route path="/post-news" component={PostForm} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}
