# Next.js Template

## Innhold
- Tailwind CSS
- PostCSS
- Shadcn UI-komponenter
- Struktur basert på best practice

## Komme i gang

Følg disse trinnene for å sette opp prosjektet ditt:

1. **Klon dette repoet:**
    ```sh
    git clone https://github.com/sultanavtajev/nexttemplate.git nyttprosjekt
    cd nyttprosjekt
    ```

2. **Fjern den gamle remote-referansen:**
    ```sh
    git remote remove origin
    ```

3. **Fjern eksisterende git-historie:**
    ```sh
    Remove-Item -Recurse -Force .git
    ```

4. **Åpne `package.json` og endre feltet "name" til det appen din skal hete.**

5. **Åpne `src/app/layout.js` og endre feltene "title" og "description" under metadata til det som er riktig for appen din**

6. **Slett `package-lock.json`:**
    ```sh
    Remove-Item -Force package-lock.json
    ```

7. **Avslutt VSCode.**

8. **Endre navnet på prosjektmappen til det du ønsker.**

9. **Start VSCode på nytt og åpne prosjektmappen.**

10. **Installer avhengigheter:**
    ```sh
    npm install
    ```

11. **(Valgfritt) Rens hele prosjektet:**
    Kjør følgende kommandoer i terminalen
    ```sh
    Remove-Item -Recurse -Force node_modules
    Remove-Item -Force package-lock.json
    npm install -g npm-check-updates
    ncu -u
    npm install
    npm cache clean --force
    npm run build
    ```

12. **Initialiser et nytt lokalt git-repository:**
    ```sh
    git init --initial-branch=main
    git add .
    git commit -m "Første commit"
    ```

13. **Opprett et nytt fjern repo på GitHub:**

    - **Manuelt via GitHub nettsiden:**
      - Gå til GitHub.
      - Klikk på "New repository".
      - Fyll inn nødvendige detaljer og opprett repoet.

    - **Ved bruk av GitHub CLI:**
      - Åpne PowerShell som administrator og kjør følgende kommando for å installere GitHub CLI via winget:
        ```sh
        winget install --id GitHub.cli
        ```
      - Verifiser installasjonen:
        ```sh
        gh --version
        ```
      - Logg inn på GitHub CLI:
        ```sh
        gh auth login
        ```
      - Opprett et nytt repo:
        ```sh
        gh repo create nytt-repo-navn --public --source . --remote
        ```

14. **Legg til fjernrepo (remote repository):**
    Hvis du opprettet repoet via GitHub nettsiden, må du legge til fjernrepoet manuelt. Kopier URL-en til det nyopprettede repoet fra GitHub og kjør følgende kommando:
    ```sh
    git remote add origin https://github.com/brukernavn/nytt-repo-navn.git
    ```

15. **Push til remote-repo:**
    ```sh
    git push -u origin main
    ```

16. **Start utviklingsserveren:**
    Etter å ha installert avhengigheter og initialisert ditt git-repository, kan du starte utviklingsserveren.
    ```sh
    npm run dev
    ```

17. **Åpne localhost:**
    Åpne nettleseren din og naviger til [http://localhost:3000](http://localhost:3000) for å se appen din.

Nå kan du begynne å utvikle din Next.js-applikasjon!

18. **Initialisering av Supabase i Next.js**
Trinn 1: Sett opp Supabase-konto og prosjekt
- Gå til [Supabase.io](https://supabase.io/) og opprett en konto.
- Opprett et nytt prosjekt i Supabase.
- Kopier `API URL` og `anon public key` fra Supabase-dashbordet ditt.

Trinn 2: Installer Supabase-klienten
For å bruke Supabase med Next.js, installer Supabase-klienten:

```bash
npm install @supabase/supabase-js
```

Trinn 3: Konfigurer miljøvariabler
Opprett en `.env.local`-fil i rotkatalogen på prosjektet ditt og legg til følgende:

```bash
NEXT_PUBLIC_SUPABASE_URL=<din-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<din-supabase-anon-key>
```

> Bytt ut `<din-supabase-url>` og `<din-supabase-anon-key>` med dine faktiske Supabase-prosjektopplysninger.

Trinn 4: Initialiser Supabase-klienten
Opprett en ny fil, for eksempel `lib/supabaseClient.js`, og initialiser Supabase:

```javascript
// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Trinn 5: Bruke Supabase i Next.js-komponenter
Nå kan du bruke Supabase til å samhandle med databasen din eller autentiseringssystemet. Eksempel for å logge inn en bruker:

```javascript
import { supabase } from '../lib/supabaseClient';

const Login = () => {
  const handleLogin = async (email, password) => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) console.error('Login error:', error.message);
    else console.log('Logged in user:', user);
  };

  return (
    <div>
      <input type="email" placeholder="Email" id="email" />
      <input type="password" placeholder="Password" id="password" />
      <button
        onClick={() =>
          handleLogin(
            document.getElementById('email').value,
            document.getElementById('password').value
          )
        }
      >
        Logg inn
      </button>
    </div>
  );
};

export default Login;
```

Trinn 6: Distribusjon
Når prosjektet er klart, kan du distribuere det til Vercel:
1. Gå til Vercel-dashbordet ditt.
2. Opprett et nytt prosjekt og koble til Git-repositoriet ditt.
3. Legg til miljøvariablene (`NEXT_PUBLIC_SUPABASE_URL` og `NEXT_PUBLIC_SUPABASE_ANON_KEY`) til Vercel under "Settings" -> "Environment Variables"-seksjonen.
4. Distribuer prosjektet ditt.

