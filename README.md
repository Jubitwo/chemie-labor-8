# ⚗️ Chemie-Labor 8

Lernseite für **Chemie Klasse 8, Werkrealschule Baden-Württemberg** – mit passendem **Arbeitsheft**, **9 virtuellen Laboren**, Wörterbuch für Fremdwörter, Vorlesefunktion und **3 Versuchen vor Ort**. Passend zum Schulbuch *Fachwerk Chemie Baden-Württemberg, Gesamtband* (Cornelsen, 2018).

Reines HTML/CSS/JavaScript – keine Installation, keine Bibliotheken, keine Anmeldung. Läuft auf GitHub Pages, auf iPads, PCs und offline (Datei `index.html` öffnen).

## Inhalt (ein Schuljahr, ca. 35 Wochen)

| Nr. | Kapitel | Virtuelles Labor | Versuch vor Ort |
|---|---|---|---|
| 1 | Sicher experimentieren | Sicherheits-Check (Gefahrensymbole, Gasbrenner) | – |
| 2 | Stoffe und ihre Eigenschaften | Stoff-Detektiv (unbekannte Proben testen) | – |
| 3 | Das Teilchenmodell | Teilchen-Simulator (Temperatur-Regler) | – |
| 4 | Stoffgemische und Trennverfahren | Trenn-Werkstatt (7 Gemische, 9 Verfahren) | 🔬 Chromatografie |
| 5 | Die chemische Reaktion | Karamell-Küche | 🔬 Karamell herstellen |
| 6 | Verbrennung, Luft und Feuer | Feuer-Labor (Kerze unter Glas, Verbrennungsdreieck) | – |
| 7 | Atombau und Periodensystem | Atom-Baukasten (p⁺, n, e⁻, Schalen) | – |
| 8 | Chemische Bindung | Bindungs-Werkstatt (Ionen-, Elektronenpaar-, Metallbindung) | – |
| 9 | Säuren, Laugen, Neutralisation | pH-Labor (Rotkohl, Neutralisation mit Kurve) | 🔬 Rotkohlsaft-Indikator |

Jedes Kapitel: Lernziele → Einstieg → Lerntext → Merke → Beispielaufgabe (Schritt für Schritt) → Labor + Labor-Aufgaben → Übungsaufgaben (sofort prüfbar) → Selbsttest → „Das kann ich“.

**Insgesamt:** 73 Aufgaben (gleiche Nummern auf Lernseite und im Arbeitsheft), 45 Selbsttest-Fragen, 104 Wörterbuch-Einträge.

## Ordnerstruktur

```
index.html                  Lernseite (Startpunkt)
css/style.css               Gestaltung
js/werkzeuge.js             gemeinsame Funktionen (Mischen, Periodensystem-Daten)
js/glossar.js               Wörterbuch (Fremdwörter per Klick)
js/inhalte-1.js             Kapitel 1–5  ← HIER Inhalte & Aufgaben ändern
js/inhalte-2.js             Kapitel 6–9  ← HIER Inhalte & Aufgaben ändern
js/lehrerversuche.js        Versuche vor Ort (Schülerfassung)
js/labore.js                die 9 virtuellen Labore
js/app.js                   Seitenaufbau, Aufgaben-Prüfung, Fortschritt
arbeitsheft/arbeitsheft.html   Arbeitsheft zum Drucken (Browser → Drucken → PDF)
arbeitsheft/ARBEITSHEFT.md     Arbeitsheft komplett als Markdown
arbeitsheft/kapitel-01.md …    einzelne Kapitel
lehrkraft/LOESUNGEN.md      alle Lösungen
lehrkraft/JAHRESPLAN.md     Wochenplan für das Schuljahr
lehrkraft/LEHRERVERSUCHE.md ausführliche Anleitung + Sicherheit für die 3 Versuche
lehrkraft/BUCHZUORDNUNG.md  Seitenzahlen im Schulbuch eintragen
tools/build-arbeitsheft.js  erzeugt Arbeitsheft + Lösungen aus js/inhalte-*.js
```

## Wichtig: Eine Quelle für alles

Alle Texte und Aufgaben stehen **nur** in `js/inhalte-1.js` und `js/inhalte-2.js`. Die Webseite liest sie direkt. Das Arbeitsheft und die Lösungen werden daraus erzeugt:

```
node tools/build-arbeitsheft.js
```

Dadurch sind Aufgaben auf der Seite und im Heft **immer identisch** (auch die Reihenfolge bei Zuordnungen und Selbsttests).

## Veröffentlichen mit GitHub Pages

1. Repository anlegen (z. B. `chemie-labor-8`), alle Dateien hochladen.
2. *Settings → Pages → Branch: main, Ordner: / (root) → Save.*
3. Nach 1–2 Minuten erreichbar unter `https://<benutzername>.github.io/chemie-labor-8/`.

## Datenschutz

Es werden keine Daten übertragen. Der Lernfortschritt wird nur im Browser des jeweiligen Geräts gespeichert (localStorage). Die Schriftart wird von Google Fonts geladen; ohne Internet wird automatisch eine Systemschrift verwendet. Wer das vermeiden möchte, löscht die zwei `fonts.googleapis`-Zeilen in `index.html`.
