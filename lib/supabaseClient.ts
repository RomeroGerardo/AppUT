import { createClient } from '@supabase/supabase-js';

// Reemplaza esto con tu URL de Supabase
const supabaseUrl = 'https://mcjmauhmgbcdwzuzeyro.supabase.co';

// Reemplaza esto con tu anon key completa de Supabase
// Puedes encontrarla en: Project Settings > API > anon public
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jam1hdWhtZ2JjZHd6dXpleXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNjYyNDksImV4cCI6MjA2Mjk0MjI0OX0.uOBIppKu777sr37iLofEVM7n87MjksRCUO8ZvhfG6Wk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 