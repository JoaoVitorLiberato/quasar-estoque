import { createClient } from "@supabase/supabase-js";
import userAuthUser from "src/composables/UseAuthUser";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = userAuthUser();

  user.value = session?.user || null;
});

export default function useSupabase() {
  return { supabase };
}
