import { createClient } from "@supabase/supabase-js";

const supaBaseURL = process.env.Preact_PUBLIC_SUPABASE_URL as string;
const supaBaseAnonKEY = process.env
  .Preact_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

export const supabase = createClient(supaBaseURL, supaBaseAnonKEY);
