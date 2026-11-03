# Gesamt-Anweisung für GitHub Copilot (Agent-Modus) – Chemie-Labor 8

Kopiere diesen Text als **erste Nachricht** in GitHub Copilot (Agent-Modus, im Repository). Danach füge nacheinander die Dateien `TEIL-1-von-6.md` bis `TEIL-6-von-6.md` ein.

---

Du arbeitest im Repository **chemie-labor-8** (GitHub-Nutzer: jubitwo). Es soll eine Lernseite für Chemie Klasse 8 (Werkrealschule Baden-Württemberg) entstehen: reines HTML/CSS/JavaScript, ohne Frameworks, lauffähig über GitHub Pages.

**Schritt 1 – Dateien anlegen:** Ich schicke dir 6 Teile. Jeder Teil enthält mehrere Dateien, jeweils mit Überschrift `## Datei: `pfad`` und dem vollständigen Inhalt in einem Codeblock. Lege jede Datei **genau unter diesem Pfad** und **exakt mit diesem Inhalt** an. Kürze nichts, fasse nichts zusammen, „verbessere“ nichts. Bestätige nach jedem Teil kurz, welche Dateien du angelegt hast.

Übersicht:
- Teil 1: `index.html`, `css/style.css`, `js/werkzeuge.js`, `js/glossar.js`
- Teil 2: `js/inhalte-1.js`
- Teil 3: `js/inhalte-2.js`, `js/lehrerversuche.js`
- Teil 4: `js/app.js`
- Teil 5: `js/labore.js`
- Teil 6: `tools/build-arbeitsheft.js`, `README.md`, `.github/copilot-instructions.md`, `lehrkraft/JAHRESPLAN.md`, `lehrkraft/LEHRERVERSUCHE.md`, `lehrkraft/BUCHZUORDNUNG.md`

**Schritt 2 – Projektregeln:** Die Datei `.github/copilot-instructions.md` enthält die Regeln für dieses Projekt. Halte dich bei allen späteren Änderungen daran.

**Schritt 3 – Nach dem letzten Teil:**
1. Führe im Projektordner `node tools/build-arbeitsheft.js` aus. Es erzeugt `arbeitsheft/arbeitsheft.html`, `arbeitsheft/ARBEITSHEFT.md`, `arbeitsheft/kapitel-01.md` bis `kapitel-09.md` und `lehrkraft/LOESUNGEN.md`. (Falls du kein Node ausführen kannst: Sag mir Bescheid – die fertigen Dateien liegen auch in der ZIP-Datei.)
2. Lege eine leere Datei `.nojekyll` im Hauptordner an.
3. Commit mit der Nachricht „Chemie-Labor 8: Lernseite, Labore, Arbeitsheft“ und push auf `main`.
4. Erkläre mir, wie ich unter *Settings → Pages* (Branch `main`, Ordner `/ (root)`) GitHub Pages einschalte. Die Seite ist dann unter https://jubitwo.github.io/chemie-labor-8/ erreichbar.

Prüfe am Ende: `index.html` lädt die Skripte in dieser Reihenfolge: werkzeuge.js, glossar.js, inhalte-1.js, inhalte-2.js, lehrerversuche.js, labore.js, app.js.
