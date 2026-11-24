# Eskander — DESIGN.md (strona v2)

Podmiot: Przychodnia Weterynaryjna Eskander, ul. Azaliowa 1a, 55-220 Miłoszyce. Cel: wizytówka + pozyskanie wizyt (telefon, prośba o termin).
Źródło prawdy marki: `brand/Eskander_Brand_Book_v1.pdf`, `brand/brandbook.config.json`.

## Wywołane skille
brand-book (brand book LITE), generator-wizytowek, ui-ux-pro-max (`--design-system --variance 8 --motion 5 --density 4`; przyjęto: przejrzyste ceny, formularz o niskim progu, wzorzec zaufania; odrzucono: brutalizm, paletę teal/pomarańcz i Varela Round, bo kolidują z logo i brand bookiem).

## Kombinacja (A: „Od dnia do nocy”)
| Oś | Wybór |
|---|---|
| Układ | jedna historia: dzień → zmierzch → noc |
| Typografia | grotesk Figtree (zaokrąglony jak logo) |
| Kolor | logo (błękit #0080B8) + baner (zieleń) + granat nocy |
| Hero | typografia 6 vw + zdjęcie domu nocą wychodzące poza ekran |
| Sygnatura | okno w hero zapala się przy starcie; status „Otwarte / Dyżur nocny” na żywo; po zamknięciu strona sama przechodzi w noc |

Złamana konwencja: weterynarze nie podają cen. Tu cennik orientacyjny z dopłatą nocną (najczęstsza skarga w opiniach).

## Tokeny (zgodne z `:root`)
| Token | Dzień | Noc | Rola |
|---|---|---|---|
| --accent | #0080B8 | #5CB8E4 | grafika, duże napisy |
| --action | #00669A | #7CC6E8 | tylko CTA |
| --ink | #0E2A3B | #F1F4F5 | tekst |
| --paper | #F6F4EF | #0B2231 | tło |
| --surface | #FFFFFF | #12344A | sekcje |
| --green | #00773A | #4CC17E | status otwarte |
| --red | #D7262E | — | telefon dyżurny |
| --warm | #F2B35E | — | światło w oknie |
Noc: `html[data-theme=night]` (JS po godzinach) lub `prefers-color-scheme: dark`.

## Kompozycja
- Każda sekcja ma własne wcięcia (clamp z vw). Nakładanie: taśma dyżuru na granicy hero/usług, kwit cennika wchodzi na „O nas”, notka na zdjęciu wizyty, drugie zdjęcie w „O nas”.
- Przejścia z kształtem: dach (usługi → wizyta), zygzak kwitu, fala kocyka (zmierzch → noc), dach górny.
- Grafiki tła (CSS, bez obrazów): wzór daszków w usługach, faktura kocyka w wizycie, gwiazdy i ciepła poświata w nocy, poświaty w hero.
- Oferta: obiekty pod daszkiem, różne szerokości, obroty ±0,9–2°.

## Ruch
Start: napis hero wjeżdża, okno się zapala. Scroll: pasek postępu dzień→noc pod navbarem (`animation-timeline`, w `@supports`). Hover kafelka: prostowanie, uniesienie, daszek opada i się poszerza, zdjęcie 1,05. Navbar: daszek przesuwa się pod aktywnym linkiem. `prefers-reduced-motion` wyłącza wszystko.

## CTA
Navbar: telefon. Hero: Zadzwoń + Umów wizytę. Usługi: Umów wizytę (+ telefon w karcie dyżuru). Cennik: telefon w stopce kwitu. Noc: formularz (4 pola, 1 wymagane, mailto) + wielki numer. Telefon: dolny pasek po 520 px.

## Zdjęcia
Wszystkie wygenerowane w Google Flow (Nano Banana Pro) na prośbę Fabiana, prompty: `claude/image_prompts.md` w projekcie. Na stronie adnotacja „sceny ilustracyjne”. Odstępstwo od reguły skilla (brak AI dla ludzi i wnętrz) zatwierdzone przez Fabiana; do zastąpienia sesją w przychodni.

## Do uzupełnienia przez firmę
Ceny (`PRICES` w skrypcie), zgoda na imię i nazwisko lekarza, domena (canonical), skrzynka na zgłoszenia, termin Akcji Sterylizacji 2027, status prawny (przychodnia), system rezerwacji z FB, podpis autora w stopce, logo w SVG.

## v2 (2026-11-24) — wizytówka zamiast lead page
- Struktura: index, uslugi, zespol, pierwsza-wizyta (+FAQ), nagly-przypadek, cennik, kontakt, polityka-prywatnosci. Strony budowane z `src/pages/*.html` przez `python3 src/build.py` (wspólny nagłówek, menu, stopka). Style: `assets/css/site.css`, skrypt: `assets/js/site.js`.
- Kierunek „profesjonalnie i rodzinnie”: bez obrotów i karteczek; równe karty (radius 14 px), dużo bieli, daszek z logo jako detal (etykiety, linia u góry karty przy hoverze).
- Menu: Usługi (rozwijane, 10 pozycji z ikonami) / Nasz zespół / Dla właściciela (Pierwsza wizyta, Nagły przypadek, Cennik) / Kontakt.
- Tryb nocny = tryb alarmowy. Włącza się sam poza godzinami (pn–pt 10–18, sob 10–15) lub przełącznikiem w navbarze. Na stronie głównej zamiast hero: numer dyżurny jako duży przycisk, 3 kroki (zadzwoń, przygotuj, przyjedź), lista objawów „dzwoń od razu”, link do pełnej instrukcji. Na podstronach czerwony pasek pod navbarem z numerem. Przycisk telefonu w navbarze i dolnym pasku zmienia się na czerwony.
- Formularz: zapytanie (3 pola, 2 wymagane, mailto), bez umawiania terminu.
- Zespół: miejsca na prawdziwe zdjęcia; wizerunków personelu nie generujemy.
- Treści alarmowe to ogólne wskazówki z dopiskiem, że nie zastępują rozmowy z lekarzem; do przejrzenia przez lekarza przychodni.
- Zdjęcia z promptów 16–21 wstawione (v2.1): szczepienie, skóra, mocz, paszport (usługi), kot w transporterze (pierwsza wizyta), dom nocą (nagły przypadek).
- v2.2: „Nagły przypadek” uproszczony: krótki hero (1 zdanie + 2 przyciski), 6 grup objawów w kafelkach zamiast długiej listy, 3 kroki osobno.
- v2.3: mapa Google (osadzona, bez klucza API) z kartą dojazdu na stronie głównej i w Kontakcie, w trybie nocnym przyciemniona filtrem; usługi na telefonie jako przewijana w bok karuzela ze wskazówką i kropkami; indeks usług na telefonie przewijany w bok i przyklejony; naprawiona oś wizyty na telefonie.
- v2.4: tryb nocny bez zaskoczenia (godzina i powód nad nagłówkiem, powitanie zależne od pory, przycisk „Przejdź do strony dziennej”, jednorazowe podświetlenie przełącznika z dymkiem); oś wizyty na telefonie jako przesuwane karty; wersjonowanie CSS/JS (?v=hash) przeciw starym plikom w pamięci przeglądarki.
