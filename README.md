# Eskander — strona przychodni weterynaryjnej

Statyczna strona wielostronicowa. Edytuj `src/pages/*.html`, potem `python3 src/build.py` (generuje *.html w katalogu głównym). Podgląd: otwórz `index.html` przez dowolny serwer HTTP (np. `npx serve .`), fonty nie ładują się z `file://`.

- `*.html` — wygenerowane strony; ceny, godziny i e-mail w `CONFIG` / `PRICES` w `assets/js/site.js`
- `assets/` — CSS i JS, `src/` — źródła stron i build
- `img/`, `fonts/` — zasoby (WebP, Figtree OFL)
- `brand/` — brand book, moodboard, `brandbook.config.json`
- `DESIGN.md`, `RESEARCH.md`, `KOMBINACJE.md` — decyzje projektowe

Wdrożenie: GitHub Pages / Netlify — katalog główny repo.
