# Hinweise für GitHub Copilot – Projekt „Chemie-Labor 8“

Lernseite Chemie Klasse 8, Werkrealschule Baden-Württemberg. Zielgruppe: Schülerinnen und Schüler mit teils schwacher Lesekompetenz.

## Regeln
- Reines HTML/CSS/Vanilla-JavaScript. **Keine** Frameworks, kein Build-Tool, keine npm-Pakete. Die Seite muss per Doppelklick auf `index.html` und auf GitHub Pages laufen.
- Sprache: Deutsch, **einfache Sätze**, Du-Form. Fremdwörter im Text immer als `{Begriff}` oder `{Anzeige|Begriff}` schreiben und in `js/glossar.js` erklären.
- Inhalte und Aufgaben stehen **nur** in `js/inhalte-1.js` (Kap. 1–5) und `js/inhalte-2.js` (Kap. 6–9). Nach jeder Änderung dort: `node tools/build-arbeitsheft.js` ausführen und die erzeugten Dateien in `arbeitsheft/` und `lehrkraft/LOESUNGEN.md` mit committen.
- Aufgabentypen: `mc` (richtig = Index oder Array), `wf` (aussagen: [[Text, true/false]]), `luecke` (text mit `___`, loesungen: [[erlaubte Antworten]] je Lücke, optional wortliste), `zuordnen` (paare: [[links, rechts]]), `reihe` (schritte in richtiger Reihenfolge), `frei` (zeilen, muster, optional zeichnen: true).
- Aufgaben-IDs: `<Kapitel>.<Nr>` für Übungen, `<Kapitel>.L<Nr>` für Labor-Aufgaben, `<Kapitel>.T<Nr>` für den Selbsttest. IDs nie umnummerieren, sonst passt das gedruckte Arbeitsheft nicht mehr.
- Mischen nur über `C8.mischen(array, id)` (gesät) – nie `Math.random()` für Aufgaben, sonst unterscheiden sich Heft und Seite.
- Neue Labore: Funktion in `js/labore.js` als `LABORE.<id> = function (container) {…}`; Animationen über `takt(container, fn, ms)`, damit sie beim Seitenwechsel stoppen.
- Chemische Fachinhalte nicht vereinfachen, bis sie falsch werden. Schalenmodell vereinfacht 2–8–8 für Elemente 1–20.
- Barrierearm: Knöpfe mit Text, ausreichender Kontrast, `aria-label` für Eingabefelder.
