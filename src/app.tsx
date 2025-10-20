import "./app.css";
import "./index.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { LandingPage } from "./pages/LandingPage";

const supabase = createClient(
  "https://ighbepjymvvjtjqhyzjq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnaGJlcGp5bXZ2anRqcWh5empxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NzQ5MjYsImV4cCI6MjA3NjE1MDkyNn0.f7eSLGE-f2ZwiCFKQXO1wDFavXOZqXslO_JKrQSJh7M"
);
export default function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return <LandingPage />;
  }
}
