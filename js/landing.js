import { supabase } from './supabase.js'; if(supabase){const {data:{session}}=await supabase.auth.getSession(); if(session) location.replace('dashboard.html');}
