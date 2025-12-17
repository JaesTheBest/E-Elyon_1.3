import { createClient } from '@supabase/supabase-js';

// 👇 REPLACE THESE WITH YOUR ACTUAL SUPABASE KEYS
export const supabaseUrl = 'https://ltgbxdwoadkrprqbvzzx.supabase.co';
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0Z2J4ZHdvYWRrcnBycWJ2enp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4OTI3NDQsImV4cCI6MjA4MTQ2ODc0NH0._DQIxq8N_McZuhuCZUgHvIA27drx93zwi5HKXIq2PHs';

export const supabase = createClient(supabaseUrl, supabaseKey);