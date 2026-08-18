import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const configured = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(SUPABASE_URL) && !SUPABASE_ANON_KEY.includes('YOUR-');
export const supabase = configured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}}) : null;
export function requireClient(){ if(!supabase) throw new Error('Configure js/config.js with your Supabase URL and publishable anon key.'); return supabase; }
export async function currentUser(){ const { data:{user},error }=await requireClient().auth.getUser(); if(error) throw error; return user; }
export async function protect({admin=false}={}){ const user=await currentUser(); if(!user){ location.replace('login.html'); throw new Error('Login required'); } const {data:profile,error}=await requireClient().from('profiles').select('*').eq('id',user.id).maybeSingle(); if(error) throw error; if(!profile){ location.replace('profile-setup.html'); throw new Error('Profile setup required'); } if(admin && profile.role!=='admin'){ location.replace('dashboard.html'); throw new Error('Admin required'); } return {user,profile}; }
