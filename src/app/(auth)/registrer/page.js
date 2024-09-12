"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For omdirigering etter registrering
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Funksjonen som håndterer registreringen gjennom API-ruten
const handleSignUp = async (fornavn, etternavn, epost, passord) => {
  try {
    const res = await fetch("/api/registrer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fornavn,
        etternavn,
        epost,
        passord,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      // Returnerer bruker- og sesjonsdata hvis alt går bra
      return result;
    } else {
      // Returnerer feilmeldinger hvis noe gikk galt
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("Noe gikk galt:", error.message);
    return { error: error.message };
  }
};

export default function SignUpForm() {
  const [fornavn, setFornavn] = useState("");
  const [etternavn, setEtternavn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // For omdirigering etter vellykket registrering

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleSignUp(fornavn, etternavn, email, password);
    if (result.error) {
      // Viser feilmelding hvis noe gikk galt
      setMessage(result.error);
    } else {
      // Hvis session ikke finnes, informer om at e-posten må bekreftes
      if (!result.session) {
        setMessage(
          "Registrering vellykket. Sjekk e-posten din for å bekrefte kontoen din."
        );
      } else {
        // Vellykket registrering - lagrer tokens og omdirigerer til dashbord
        localStorage.setItem("access_token", result.session.access_token);
        localStorage.setItem("refresh_token", result.session.refresh_token);
        setMessage(result.message);
        router.push("/logginn"); // Omdiriger til dashbord etter vellykket registrering
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Registrer deg</CardTitle>
        <CardDescription>
          Skriv inn opplysningene dine for å opprette en konto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Fornavn</Label>
              <Input
                id="first-name"
                placeholder="Max"
                required
                value={fornavn}
                onChange={(e) => setFornavn(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Etternavn</Label>
              <Input
                id="last-name"
                placeholder="Robinson"
                required
                value={etternavn}
                onChange={(e) => setEtternavn(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">E-post</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Passord</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Opprett en konto
          </Button>
          <Button variant="outline" className="w-full">
            Registrer deg med GitHub
          </Button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}{" "}
        {/* Viser feilmelding eller suksessmelding */}
        <div className="mt-4 text-center text-sm">
          Har du allerede en konto?{" "}
          <Link href="/logginn" className="underline">
            Logg inn
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
