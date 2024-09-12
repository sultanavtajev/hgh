"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For å bruke navigering
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Bruk Next.js router for omdirigering

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Kall til API-endepunktet for å logge ut
      const res = await fetch("/api/loggut", {
        method: "POST",
      });

      const result = await res.json();

      if (res.ok) {
        // Vellykket utlogging
        setIsLoggedIn(false); // Oppdater UI
        console.log(result.message); // Logg suksessmelding
        router.push("/"); // Omdiriger til hovedsiden
      } else {
        console.error(result.error); // Logg feilmelding
      }
    } catch (error) {
      console.error("Feil ved utlogging:", error);
    }
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      {/* <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <CameraIcon className="h-6 w-6" />
        <span className="sr-only">Herregårdshuset</span>
      </Link> */}
      <div className="ml-auto flex items-center gap-4 sm:gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full sm:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Link
                href="/omherregardshuset"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                Om Herregårdshuset
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/interessent"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                Interessent
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/kontaktoss"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                Kontakt oss
              </Link>
            </DropdownMenuItem>
            {!isLoggedIn ? (
              <DropdownMenuItem>
                <Link
                  href="/logginn"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                >
                  Logg inn
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleLogout}>
                <span className="text-sm font-medium">Logg ut</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Større skjermnavigasjon */}
        <nav className="hidden sm:flex gap-4 sm:gap-6">
          <Link
            href="/omherregardshuset"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Om Herregårdshuset
          </Link>
          <Link
            href="/interessent"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Interessent
          </Link>
          <Link
            href="/kontaktoss"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Kontakt oss
          </Link>
          {!isLoggedIn ? (
            <Link
              href="/logginn"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Logg inn
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Logg ut
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
