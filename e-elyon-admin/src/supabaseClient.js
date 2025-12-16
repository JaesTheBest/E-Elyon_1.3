import { createClient } from '@supabase/supabase-js';

// 👇 REPLACE THESE WITH YOUR ACTUAL SUPABASE KEYS
export const supabaseUrl = 'https://wbvmnybkjtzvtotxqzza.supabase.co';
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indidm1ueWJranR6dnRvdHhxenphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MTE2OTUsImV4cCI6MjA4MTM4NzY5NX0.ROOjy3uakcgS-39FwLZ-5Xpdy_20uigPWPCiFi150rg';

export const supabase = createClient(supabaseUrl, supabaseKey);