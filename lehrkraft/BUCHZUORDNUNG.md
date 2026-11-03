# Zuordnung zum Schulbuch „Fachwerk Chemie Baden-Württemberg, Gesamtband“

**Cornelsen, 1. Auflage, 3. Druck 2018**

Lernseite und Arbeitsheft verweisen in jedem Kapitel auf das passende Thema im Schulbuch. Die **genauen Seitenzahlen** sind noch leer, weil sie nur mit dem Buch in der Hand sicher eingetragen werden können. Es gibt zwei Wege:

## Weg 1: Sie schicken mir das Inhaltsverzeichnis

Fotografieren Sie das **Inhaltsverzeichnis** des Buches (meist 2–4 Seiten) und laden Sie die Fotos im Chat hoch. Ich trage dann alle Seitenzahlen ein und gebe Ihnen die geänderten Dateien zurück.

Hilfreich, aber nicht nötig:
- Fotos der **Kapitel-Auftaktseiten** zu den Themen unten (damit Einstiege und Begriffe zum Buch passen)
- Fotos von **Versuchen im Buch**, die Ihre Fachschaft schon nutzt

## Weg 2: Sie tragen die Seiten selbst ein

1. Öffnen Sie `js/inhalte-1.js` (Kapitel 1–5) bzw. `js/inhalte-2.js` (Kapitel 6–9).
2. Suchen Sie im Kapitel die Zeile `buch: { thema: "…", seiten: "" },`
3. Tragen Sie die Seiten ein, z. B. `seiten: "14–21"`.
4. Arbeitsheft neu erzeugen: im Projektordner `node tools/build-arbeitsheft.js` ausführen (oder Copilot bitten: „Führe das Build-Skript aus“).

## Checkliste: Welches Thema sucht man im Buch?

| Kapitel Lernseite | Thema im Buch suchen nach … | Seiten (eintragen) |
|---|---|---|
| 1 Sicher experimentieren | Arbeiten im Chemieraum, Sicherheit, Gefahrenpiktogramme, Gasbrenner, Versuchsprotokoll | |
| 2 Stoffe und ihre Eigenschaften | Stoffe und Eigenschaften, Stoffe untersuchen, Dichte, Metalle, Salze | |
| 3 Teilchenmodell | Teilchenmodell, Aggregatzustände, Diffusion | |
| 4 Stoffgemische und Trennverfahren | Reinstoffe und Gemische, Trennverfahren, Destillation, Chromatografie | |
| 5 Chemische Reaktion | Chemische Reaktion, Kennzeichen, Energie, Gesetz von der Erhaltung der Masse | |
| 6 Verbrennung, Luft und Feuer | Luft, Verbrennung, Oxidation, Brandbekämpfung | |
| 7 Atombau und Periodensystem | Elemente, Atommodelle, Kern-Hülle-Modell, Schalenmodell, Periodensystem | |
| 8 Chemische Bindung | Ionen, Salze, Ionenbindung, Elektronenpaarbindung, Moleküle, Metalle | |
| 9 Säuren, Laugen, Neutralisation | Säuren, Laugen, pH-Wert, Indikatoren, Neutralisation | |

> Hinweis: Die Reihenfolge im Buch kann von der Reihenfolge der Lernseite abweichen. Die Lernseite folgt einem für die Werkrealschule erprobten Aufbau (vom Beobachtbaren zum Modell: Stoffe → Teilchen → Reaktion → Atome → Bindung → Säuren). Sie können Kapitel auch in der Buch-Reihenfolge unterrichten – die Kapitel bauen nur bei 7 → 8 → 9 zwingend aufeinander auf.
