import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase-types-gen";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);

export default supabaseClient;
