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
