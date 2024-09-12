import { supabase } from "@/lib/supabaseClient";

// Variabel for å aktivere/deaktivere feilsøkingsutskrifter
const ENABLE_DEBUG = true; // Sett til 'false' for å deaktivere logging

export async function POST(req) {
  try {
    if (ENABLE_DEBUG) {
      console.log("Starter innlogging...");
    }

    const { email, password } = await req.json(); // Hent e-post og passord fra forespørselen

    // Sjekk at e-post og passord er gyldige
    if (!email || !password) {
      if (ENABLE_DEBUG) {
        console.log("Mangler e-post eller passord.");
      }
      return new Response(
        JSON.stringify({ error: "E-post og passord er påkrevd." }),
        { status: 400 }
      );
    }

    // Prøv å logge inn brukeren med Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (ENABLE_DEBUG) {
      console.log("Innloggingsforsøk respons:", data, error);
    }

    if (error) {
      if (ENABLE_DEBUG) {
        console.log("Feil ved innlogging:", error.message);
      }
      return new Response(
        JSON.stringify({ error: "Feil ved innlogging: " + error.message }),
        { status: 400 }
      );
    }

    const { user, session } = data;

    // Sjekk om e-posten er bekreftet
    if (!user.email_confirmed_at) {
      if (ENABLE_DEBUG) {
        console.log("E-posten er ikke bekreftet for bruker:", user.email);
      }
      return new Response(
        JSON.stringify({
          error: "E-post må bekreftes før du kan logge inn.",
        }),
        { status: 400 }
      );
    }

    // Hvis ingen sesjon returneres
    if (!session) {
      if (ENABLE_DEBUG) {
        console.log("Ingen sesjon funnet for brukeren.");
      }
      return new Response(
        JSON.stringify({
          error: "Innlogging mislyktes. Ingen sesjon funnet.",
        }),
        { status: 400 }
      );
    }

    // Returner vellykket melding med bruker og sesjon
    if (ENABLE_DEBUG) {
      console.log("Innlogging vellykket for bruker:", user.email);
      console.log("Sesjon opprettet med access_token:", session.access_token);
    }

    return new Response(
      JSON.stringify({
        message: "Bruker vellykket logget inn",
        user,
        session,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (ENABLE_DEBUG) {
      console.log("Feil i catch-blokken:", error);
    }
    return new Response(
      JSON.stringify({ error: "En feil oppsto ved innlogging." }),
      { status: 500 }
    );
  }
}
