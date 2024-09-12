import { supabase } from "@/lib/supabaseClient";

export async function POST(req) {
  try {
    const { fornavn, etternavn, epost, passord } = await req.json();

    // Utfør registrering med Supabase
    const { data, error } = await supabase.auth.signUp({
      email: epost,
      password: passord,
      options: {
        data: {
          fornavn,
          etternavn,
        },
      },
    });

    if (error) {
      return new Response(
        JSON.stringify({ error: "Feil ved registrering: " + error.message }),
        { status: 400 }
      );
    }

    const { user, session } = data; // Hent bruker og sesjon fra data

    // Returner brukerdata og en melding hvis session ikke finnes (e-postbekreftelse kreves)
    return new Response(
      JSON.stringify({
        message: session
          ? "Bruker vellykket registrert"
          : "Bruker registrert. Sjekk e-posten din for å bekrefte kontoen din.",
        user, // Brukerdata
        session, // Sesjonsdata (kan være null hvis e-postbekreftelse er aktivert)
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Noe gikk galt under registrering" }),
      { status: 500 }
    );
  }
}
