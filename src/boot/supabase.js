import { createClient } from "@supabase/supabase-js";
import userAuthUser from "src/composables/UseAuthUser";

const supabase = createClient(
  "https://avauwgwmmalpfhnbpjbo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2YXV3Z3dtbWFscGZobmJwamJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU2NjY5MzYsImV4cCI6MTk5MTI0MjkzNn0.Ta2sBSzt71dL6UoyZeVxHN_GMo6zzVRhT9jfwF8MIz4"
);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = userAuthUser();

  user.value = session?.user || null;
});

export default function useSupabase() {
  return { supabase };
}
