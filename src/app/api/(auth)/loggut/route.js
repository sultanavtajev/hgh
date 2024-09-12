// src/app/api/auth/loggut/route.js

import { supabase } from "@/lib/supabaseClient";

export async function POST(req) {
  try {
    // Kall Supabase sin signOut-funksjon
    const { error } = await supabase.auth.signOut();

    if (error) {
      return new Response(
        JSON.stringify({ error: "Feil ved utlogging: " + error.message }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Bruker vellykket logget ut" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Noe gikk galt under utlogging" }),
      { status: 500 }
    );
  }
}
