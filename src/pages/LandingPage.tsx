import "../app.css";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import HumorPage from "../pages/HumorPage";
import PostNewsPage from "./PostNewsPage";
import { LocationProvider, ErrorBoundary, Router, Route } from "preact-iso";
import UserSettings from "./UserSettings";

export function LandingPage() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Header />
        <NavBar />
        <Router>
          <Route default component={HumorPage} />
          <Route path="/humor-news" component={HumorPage} />
          <Route path="/post-news" component={PostNewsPage} />
          <Route path="/user-settings" component={UserSettings} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}
