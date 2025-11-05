import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ehrkrcplvottfoqaxduv.supabase.co";
const supabasePublishableKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVocmtyY3Bsdm90dGZvcWF4ZHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwOTc2MjUsImV4cCI6MjA3NzY3MzYyNX0.hZUOJcLK2xPRXcKogqlvQ3WBt7L3HEgIP2qzppaV_fQ";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
