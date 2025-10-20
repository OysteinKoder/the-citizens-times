import { createClient } from "@supabase/supabase-js";

const supaBaseURL = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string;
const supaBaseAnonKEY = import.meta.env
  .VITE_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

export const supabase = createClient(supaBaseURL, supaBaseAnonKEY);
