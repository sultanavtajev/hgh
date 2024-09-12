"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // For omdirigering etter vellykket innlogging

  // Funksjon som håndterer innsending av skjemaet
  const handleSubmit = async (e) => {
    e.preventDefault(); // Forhindrer standard innsending

    try {
      // Kaller API-ruten for innlogging
      const res = await fetch("/api/logginn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Sender e-post og passord som JSON
      });

      const result = await res.json(); // Henter responsen som JSON

      if (res.ok) {
        // Lagre tokens i localStorage for vedvarende innlogging
        localStorage.setItem("access_token", result.session.access_token);
        localStorage.setItem("refresh_token", result.session.refresh_token);

        // Vellykket innlogging, sett melding og omdiriger til en annen side (f.eks. dashbord)
        setMessage("Innlogging vellykket!");
        router.push("/"); // Omdirigerer til en dashbord-side
      } else {
        // Viser feilmelding hvis innloggingen mislykkes
        setMessage(result.error);
      }
    } catch (error) {
      console.error("Feil ved innlogging:", error);
      setMessage("Noe gikk galt ved innlogging");
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Logg inn</CardTitle>
        <CardDescription>
          Skriv inn e-posten din nedenfor for å logge inn på kontoen din
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">E-post</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Oppdaterer e-post tilstanden
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Passord</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Glemt passordet ditt?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Oppdaterer passord tilstanden
            />
          </div>
          <Button type="submit" className="w-full">
            Logg inn
          </Button>
          <Button variant="outline" className="w-full">
            Logg inn med Google
          </Button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}{" "}
        {/* Viser tilbakemelding */}
        <div className="mt-4 text-center text-sm">
          Har du ikke en konto?{" "}
          <Link href="/registrer" className="underline">
            Registrer deg
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
