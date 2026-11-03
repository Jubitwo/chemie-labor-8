# Chemie-Labor 8 – Teil 1 von 6

Lege die folgenden Dateien **exakt mit diesem Inhalt** im Repository an (Pfad beachten). Nichts kürzen, nichts verändern.

## Datei: `index.html`

````html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Chemie-Labor 8 – Lernen, Testen, Experimentieren</title>
  <meta name="description" content="Lernseite Chemie Klasse 8 Werkrealschule Baden-Württemberg – passend zum Arbeitsheft">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Fredoka:wght@500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚗️</text></svg>">
</head>
<body>
  <header class="kopf">
    <a class="logo" href="#/">⚗️ <span>Chemie-Labor <b>8</b></span></a>
    <nav class="hauptnav">
      <a href="#/">Start</a>
      <a href="#/kapitel">Kapitel</a>
      <a href="#/labore">Labore</a>
      <a href="#/woerterbuch">Wörterbuch</a>
      <a href="#/versuche">Versuche vor Ort</a>
    </nav>
    <button class="knopf klein" id="schriftKnopf" title="Schrift größer/kleiner">A+</button>
  </header>

  <main id="app" tabindex="-1"></main>

  <footer class="fuss">
    <p>Chemie-Labor 8 · Begleitseite zum Arbeitsheft · Werkrealschule Klasse 8 · Baden-Württemberg<br>
    Passend zum Schulbuch „Fachwerk Chemie Baden-Württemberg, Gesamtband“ (Cornelsen). Die Seite ersetzt das Buch nicht, sie ergänzt es.</p>
  </footer>

  <!-- Wörterbuch-Fenster -->
  <div id="popup" class="popup" hidden role="dialog" aria-modal="true" aria-labelledby="popupTitel">
    <div class="popup-karte">
      <button class="popup-zu" aria-label="Schließen">✕</button>
      <h3 id="popupTitel"></h3>
      <p id="popupText"></p>
      <div class="popup-knoepfe">
        <button class="knopf klein" id="popupVorlesen">🔊 Vorlesen</button>
        <a class="knopf klein hell" id="popupLink" href="#/woerterbuch">Ganzes Wörterbuch</a>
      </div>
    </div>
  </div>

  <script src="js/werkzeuge.js"></script>
  <script src="js/glossar.js"></script>
  <script src="js/inhalte-1.js"></script>
  <script src="js/inhalte-2.js"></script>
  <script src="js/lehrerversuche.js"></script>
  <script src="js/labore.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
````

## Datei: `css/style.css`

````css
/* Chemie-Labor 8 – Gestaltung
   Farben: Laborpapier hell, Tintenblau, Akzentfarbe je Kapitel (--k) */
:root{
  --papier:#f7f4ec; --karte:#ffffff; --tinte:#1d2a3a; --grau:#5b6573; --linie:#dcd6c8;
  --blau:#2e86ab; --gruen:#2a9d55; --rot:#d62828; --gelb:#f4b400;
  --k:#2e86ab; --radius:14px; --schatten:0 2px 0 rgba(29,42,58,.08),0 6px 18px rgba(29,42,58,.06);
  --schrift:"Atkinson Hyperlegible",system-ui,-apple-system,"Segoe UI",Arial,sans-serif;
  --titel:"Fredoka","Atkinson Hyperlegible",system-ui,sans-serif;
  font-size:17px;
}
html.gross{font-size:20px}
*{box-sizing:border-box}
body{margin:0;background:var(--papier);color:var(--tinte);font-family:var(--schrift);line-height:1.55;
  background-image:radial-gradient(rgba(29,42,58,.05) 1px,transparent 1px);background-size:22px 22px}
a{color:var(--blau)}
h1,h2,h3,h4{font-family:var(--titel);font-weight:600;line-height:1.2;margin:.2em 0 .5em}
h1{font-size:2rem} h2{font-size:1.5rem} h3{font-size:1.2rem}

/* Kopf */
.kopf{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;
  padding:.6rem 1.2rem;background:var(--tinte);color:#fff}
.logo{color:#fff;text-decoration:none;font-family:var(--titel);font-size:1.3rem}
.logo b{background:var(--gelb);color:var(--tinte);border-radius:6px;padding:0 .35em}
.hauptnav{display:flex;gap:.25rem;flex-wrap:wrap;flex:1}
.hauptnav a{color:#dfe7ef;text-decoration:none;padding:.35rem .7rem;border-radius:8px}
.hauptnav a:hover,.hauptnav a.aktiv{background:rgba(255,255,255,.14);color:#fff}

main{max-width:1060px;margin:0 auto;padding:1.4rem 1rem 3rem;outline:none}
.fuss{text-align:center;color:var(--grau);font-size:.85rem;padding:2rem 1rem;border-top:1px solid var(--linie)}

/* Knöpfe */
.knopf{font:inherit;font-weight:700;border:0;border-radius:10px;padding:.6rem 1rem;cursor:pointer;
  background:var(--k);color:#fff;box-shadow:0 3px 0 rgba(0,0,0,.2);text-decoration:none;display:inline-block}
.knopf:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(0,0,0,.2)}
.knopf.klein{padding:.35rem .7rem;font-size:.9rem}
.knopf.hell{background:#eef2f6;color:var(--tinte)}
.knopf.gruen{background:var(--gruen)} .knopf.rot{background:var(--rot)}
.knopf:disabled{opacity:.45;cursor:not-allowed}
.kopf .knopf{background:#ffffff22}

/* Karten */
.karte{background:var(--karte);border-radius:var(--radius);box-shadow:var(--schatten);padding:1.2rem 1.4rem;margin:0 0 1.2rem;
  border-top:5px solid var(--k)}
.karte.ohne{border-top:0}
.marke{display:inline-block;font-size:.78rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;
  background:var(--k);color:#fff;border-radius:6px;padding:.1rem .5rem;margin-bottom:.4rem}

/* Startseite */
.held{display:grid;grid-template-columns:1.4fr 1fr;gap:1.2rem;align-items:center;margin-bottom:1.4rem}
.held h1{font-size:2.4rem;margin-bottom:.3rem}
.held .flasche{font-size:7rem;text-align:center;filter:drop-shadow(0 8px 10px rgba(0,0,0,.15))}
.kapitelgitter{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:1rem}
.kachel{background:#fff;border-radius:var(--radius);box-shadow:var(--schatten);padding:1rem;text-decoration:none;color:inherit;
  border-left:7px solid var(--k);display:flex;flex-direction:column;gap:.3rem;transition:transform .15s}
.kachel:hover{transform:translateY(-3px)}
.kachel .nr{font-family:var(--titel);color:var(--k);font-size:.95rem}
.kachel .ic{font-size:2rem}
.kachel h3{margin:0}
.kachel small{color:var(--grau)}
.fortschritt{height:8px;background:#eee;border-radius:5px;overflow:hidden;margin-top:auto}
.fortschritt span{display:block;height:100%;background:var(--k)}

/* Kapitelseite */
.kapkopf{display:flex;gap:1rem;align-items:center;margin-bottom:1rem}
.kapkopf .ic{font-size:3rem;background:#fff;border-radius:50%;width:84px;height:84px;display:grid;place-items:center;box-shadow:var(--schatten)}
.kapnav{position:sticky;top:56px;z-index:10;display:flex;gap:.4rem;flex-wrap:wrap;background:var(--papier);padding:.5rem 0;margin-bottom:.8rem}
.kapnav a{font-size:.85rem;text-decoration:none;background:#fff;border:1px solid var(--linie);color:var(--tinte);border-radius:20px;padding:.2rem .7rem}
.kapnav a:hover{border-color:var(--k);color:var(--k)}
.ziele li{list-style:none;margin:.2rem 0}
.ziele li::before{content:"🎯 "}
.einstieg{background:linear-gradient(135deg,#fff 60%,color-mix(in srgb,var(--k) 12%,#fff))}
.denk{background:#fff8e1;border-left:5px solid var(--gelb);padding:.7rem 1rem;border-radius:8px;margin-top:.8rem}
.merke{background:color-mix(in srgb,var(--k) 9%,#fff);border:2px dashed var(--k)}
.merke li{margin:.35rem 0;font-weight:700}
.buch{display:flex;gap:.8rem;align-items:center;background:#fff;border:1px solid var(--linie);border-radius:10px;padding:.6rem .9rem;margin:.6rem 0 1rem;font-size:.92rem}
.buch .ic{font-size:1.6rem}
.formel{font-family:ui-monospace,Consolas,monospace;background:#f1f4f8;border-radius:8px;padding:.45rem .8rem;display:inline-block;font-weight:700}
.warn{background:#fdecea;border-left:5px solid var(--rot);padding:.6rem .9rem;border-radius:8px}
.tab{border-collapse:collapse;width:100%;margin:.5rem 0;font-size:.95rem}
.tab th,.tab td{border:1px solid var(--linie);padding:.4rem .55rem;text-align:left;vertical-align:top}
.tab th{background:#f1f4f8}
.vorlesen{float:right;margin-left:.5rem}
.regeln li{margin:.4rem 0}
.balken{display:flex;height:34px;border-radius:8px;overflow:hidden;font-size:.85rem;color:#fff;font-weight:700}
.balken span{display:flex;align-items:center;justify-content:center;white-space:nowrap;overflow:hidden}

/* Fremdwort-Knopf */
.begriff{font:inherit;background:none;border:0;padding:0;color:var(--blau);border-bottom:2px dotted var(--blau);cursor:help;font-weight:700}
.begriff:hover{background:#e7f2f8}
.popup{position:fixed;inset:0;background:rgba(15,25,35,.45);display:grid;place-items:center;z-index:100;padding:1rem}
.popup[hidden]{display:none}
.popup-karte{background:#fff;border-radius:16px;max-width:460px;width:100%;padding:1.3rem 1.4rem;position:relative;box-shadow:0 20px 50px rgba(0,0,0,.25);border-top:6px solid var(--blau)}
.popup-zu{position:absolute;right:.6rem;top:.5rem;border:0;background:none;font-size:1.3rem;cursor:pointer}
.popup-knoepfe{display:flex;gap:.5rem;flex-wrap:wrap}

/* Beispiel */
.schritt{background:#f6f8fb;border-radius:10px;padding:.55rem .8rem;margin:.4rem 0;border-left:4px solid var(--k)}
.schritt[hidden]{display:none}

/* Aufgaben */
.aufgabe{background:#fff;border:1px solid var(--linie);border-radius:12px;padding:1rem 1.1rem;margin:.9rem 0;position:relative}
.aufgabe.geloest{border-color:var(--gruen);box-shadow:inset 5px 0 0 var(--gruen)}
.aufgabe .anr{font-family:var(--titel);background:var(--k);color:#fff;border-radius:8px;padding:.05rem .5rem;margin-right:.4rem}
.aufgabe .ah{font-size:.78rem;color:var(--grau);float:right}
.aufgabe .frage{font-weight:700;margin:.2rem 0 .6rem}
.aufgabe .knoepfe{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.7rem}
.rueck{margin-top:.6rem;padding:.5rem .8rem;border-radius:8px;font-weight:700}
.rueck.gut{background:#e6f6ec;color:#17643a}
.rueck.halb{background:#fff4d6;color:#7a5800}
.rueck.schlecht{background:#fdecea;color:#8f1d1d}
.muster{background:#f1f4f8;border-radius:8px;padding:.6rem .8rem;margin-top:.6rem}
.option{display:flex;gap:.5rem;align-items:flex-start;padding:.35rem .5rem;border-radius:8px;cursor:pointer}
.option:hover{background:#f4f6f9}
.option.richtig{background:#e6f6ec}.option.falsch{background:#fdecea}
.wf-zeile{display:grid;grid-template-columns:1fr auto auto;gap:.6rem;align-items:center;padding:.3rem 0;border-bottom:1px dashed var(--linie)}
.wf-zeile label{display:flex;gap:.2rem;align-items:center;font-size:.9rem}
.zu-zeile,.reihe-zeile{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;align-items:center;margin:.35rem 0}
.reihe-zeile{grid-template-columns:5.2rem 1fr}
select,input[type=text],textarea{font:inherit;padding:.4rem .5rem;border:2px solid var(--linie);border-radius:8px;background:#fff;max-width:100%}
select:focus,input:focus,textarea:focus{border-color:var(--k);outline:none}
input.luecke{width:9.5rem;margin:.1rem .2rem}
input.luecke.ok,select.ok{border-color:var(--gruen);background:#effaf2}
input.luecke.nein,select.nein{border-color:var(--rot);background:#fdf0ef}
textarea{width:100%;min-height:5rem}
.wortliste{display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:.5rem}
.wortliste span{background:#eef2f6;border-radius:6px;padding:.1rem .5rem;font-size:.9rem}

/* Labor */
.labor{background:#13202e;color:#e8eef4;border-radius:var(--radius);padding:1.2rem;border-top:5px solid var(--k)}
.labor h3,.labor h4{color:#fff}
.labor .knopf.hell{background:#2a3b4e;color:#fff}
.labor select,.labor input{background:#1f3044;color:#fff;border-color:#36506b}
.labortisch{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:.8rem}
.labortisch .feld{background:#1b2b3d;border-radius:12px;padding:1rem}
.anzeige{font-family:ui-monospace,Consolas,monospace;background:#0b141e;border-radius:8px;padding:.6rem .8rem;color:#9ff0b6;min-height:2.4rem}
.labor canvas,.labor svg{max-width:100%;display:block;margin:0 auto;background:#0b141e;border-radius:10px}
.protokoll{background:#0b141e;border-radius:8px;padding:.5rem .8rem;max-height:180px;overflow:auto;font-size:.88rem}
.protokoll{padding-left:1.6rem}
.protokoll li{margin:.15rem 0}
.chips{display:flex;gap:.4rem;flex-wrap:wrap}
.chip{background:#2a3b4e;color:#fff;border:2px solid transparent;border-radius:20px;padding:.3rem .75rem;cursor:pointer;font:inherit;font-size:.9rem}
.chip.an{border-color:#9ff0b6;background:#1f4d36}
.chip:disabled{opacity:.4}
.slider{width:100%}
.laborfrei{background:#fff;color:var(--tinte);border-radius:12px;padding:.2rem .9rem .8rem;margin-top:1rem}
.labor .laborfrei select,.labor .laborfrei input,.labor .laborfrei textarea{background:#fff;color:var(--tinte);border-color:var(--linie)}
.labor .laborfrei .knopf.hell{background:#eef2f6;color:var(--tinte)}

/* Gefahrensymbole */
.piktos{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:.7rem;margin:.6rem 0}
.pikto{display:flex;flex-direction:column;align-items:center;text-align:center;font-size:.85rem;gap:.3rem}
.raute{width:64px;height:64px;transform:rotate(45deg);border:5px solid #d00;background:#fff;display:grid;place-items:center;margin:10px}
.raute span{transform:rotate(-45deg);font-size:1.7rem}
.labor .pikto{color:#e8eef4}

/* Teilchenbilder */
.zustaende{display:grid;grid-template-columns:repeat(3,1fr);gap:.8rem;font-size:.9rem}
.zustaende>div{background:#f6f8fb;border-radius:10px;padding:.6rem;text-align:center}
.tm{height:90px;margin:.4rem auto;width:110px;border:2px solid #9aa7b6;border-top:0;border-radius:0 0 8px 8px;position:relative;
  background-repeat:no-repeat}
.tm.fest{background-image:radial-gradient(circle,var(--k) 6px,transparent 7px);background-size:16px 16px;background-repeat:repeat;background-position:3px 3px}
.tm.fluessig{background:radial-gradient(circle at 15% 80%,var(--k) 6px,transparent 7px),radial-gradient(circle at 35% 70%,var(--k) 6px,transparent 7px),radial-gradient(circle at 55% 85%,var(--k) 6px,transparent 7px),radial-gradient(circle at 75% 72%,var(--k) 6px,transparent 7px),radial-gradient(circle at 88% 88%,var(--k) 6px,transparent 7px),radial-gradient(circle at 25% 52%,var(--k) 6px,transparent 7px),radial-gradient(circle at 65% 55%,var(--k) 6px,transparent 7px),radial-gradient(circle at 45% 60%,var(--k) 6px,transparent 7px)}
.tm.gas{background:radial-gradient(circle at 20% 20%,var(--k) 6px,transparent 7px),radial-gradient(circle at 75% 35%,var(--k) 6px,transparent 7px),radial-gradient(circle at 40% 75%,var(--k) 6px,transparent 7px),radial-gradient(circle at 85% 85%,var(--k) 6px,transparent 7px)}
.atomkasten{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
.atomkasten>div{background:#f6f8fb;border-radius:10px;padding:.7rem}

/* pH-Skala */
.phskala{display:grid;grid-template-columns:repeat(15,1fr);border-radius:8px;overflow:hidden;text-align:center;font-weight:700;font-size:.85rem}
.phskala span{padding:.45rem 0;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.4)}

/* Mini-Periodensystem */
.pse{display:grid;grid-template-columns:2.2rem repeat(8,1fr);gap:3px;font-size:.78rem;margin:.6rem 0}
.pse div{background:#eef2f6;border-radius:5px;padding:.2rem;text-align:center;min-height:2.6rem}
.pse .kopfz{background:none;font-weight:700;min-height:auto}
.pse .el b{display:block;font-size:1rem}
.pse .met{background:#dbeafe}.pse .nmet{background:#fde68a}.pse .edel{background:#e9d5ff}
.labor .pse div{background:#1f3044;color:#fff}.labor .pse .kopfz{background:none}
.labor .pse .met{background:#24476e}.labor .pse .nmet{background:#6b5313}.labor .pse .edel{background:#4c2a6e}
.labor .pse .el.wahl{outline:3px solid #9ff0b6;cursor:pointer}
.pse .el.klickbar{cursor:pointer}

/* Selbsttest / Checkliste */
.check li{list-style:none;display:flex;gap:.6rem;align-items:center;margin:.3rem 0}
.smileys button{font-size:1.3rem;background:none;border:2px solid transparent;border-radius:50%;cursor:pointer;width:2.3rem;height:2.3rem}
.smileys button.an{border-color:var(--k);background:#f1f4f8}

.woerter{columns:2;column-gap:2rem}
.woerter div{break-inside:avoid;margin-bottom:.8rem}
.suche{width:100%;padding:.7rem;font-size:1.05rem;margin-bottom:1rem}
.versuchkarte ol li{margin:.3rem 0}

@media (max-width:760px){
  .held,.labortisch,.atomkasten{grid-template-columns:1fr}
  .held .flasche{display:none}
  .zustaende{grid-template-columns:1fr}
  .woerter{columns:1}
  .zu-zeile{grid-template-columns:1fr}
  .wf-zeile{grid-template-columns:1fr auto auto}
  .kapnav{top:96px}
}
@media print{.kopf,.kapnav,.knopf,.fuss{display:none}body{background:#fff}}
````

## Datei: `js/werkzeuge.js`

````javascript
/* Chemie-Labor 8 – gemeinsame Werkzeuge (Webseite UND Arbeitsheft-Generator)
   WICHTIG: Das Mischen ist "gesät" (immer gleiche Reihenfolge pro Aufgabe),
   damit Webseite und gedrucktes Arbeitsheft dieselbe Reihenfolge zeigen. */
(function (g) {
  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function zufall(seed) { let a = seed; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function mischen(arr, schluessel) {
    const r = zufall(hash(String(schluessel))); const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    // nie die richtige Reihenfolge zeigen
    if (a.length > 1 && a.every((x, i) => x === arr[i])) a.push(a.shift());
    return a;
  }
  function normal(s) {
    return String(s || "").toLowerCase().trim()
      .replace(/[₀-₉]/g, c => "0123456789"["₀₁₂₃₄₅₆₇₈₉".indexOf(c)])
      .replace(/⁺/g, "+").replace(/⁻/g, "-").replace(/[²]/g, "2").replace(/[³]/g, "3")
      .replace(/\s+/g, " ").replace(/\.$/, "").replace(/\s*°c$/, "").replace(/\s*g\/cm3$/, "").replace(/\s*g$/, "");
  }
  // Elemente 1–20 (+ einige Metalle für das Bindungslabor)
  // [OZ, Symbol, Name, Hauptgruppe, Periode, Massenzahl, Art] Art: m=Metall, n=Nichtmetall, h=Halbmetall, e=Edelgas
  const E = [
    [1, "H", "Wasserstoff", 1, 1, 1, "n"], [2, "He", "Helium", 8, 1, 4, "e"],
    [3, "Li", "Lithium", 1, 2, 7, "m"], [4, "Be", "Beryllium", 2, 2, 9, "m"], [5, "B", "Bor", 3, 2, 11, "h"],
    [6, "C", "Kohlenstoff", 4, 2, 12, "n"], [7, "N", "Stickstoff", 5, 2, 14, "n"], [8, "O", "Sauerstoff", 6, 2, 16, "n"],
    [9, "F", "Fluor", 7, 2, 19, "n"], [10, "Ne", "Neon", 8, 2, 20, "e"],
    [11, "Na", "Natrium", 1, 3, 23, "m"], [12, "Mg", "Magnesium", 2, 3, 24, "m"], [13, "Al", "Aluminium", 3, 3, 27, "m"],
    [14, "Si", "Silicium", 4, 3, 28, "h"], [15, "P", "Phosphor", 5, 3, 31, "n"], [16, "S", "Schwefel", 6, 3, 32, "n"],
    [17, "Cl", "Chlor", 7, 3, 35, "n"], [18, "Ar", "Argon", 8, 3, 40, "e"],
    [19, "K", "Kalium", 1, 4, 39, "m"], [20, "Ca", "Calcium", 2, 4, 40, "m"]
  ].map(e => ({ oz: e[0], sym: e[1], name: e[2], gruppe: e[3], periode: e[4], masse: e[5], art: e[6] }));
  function schalen(n) { const max = [2, 8, 8, 2]; const s = []; let rest = n; for (const m of max) { if (rest <= 0) break; const x = Math.min(m, rest); s.push(x); rest -= x; } return s; }
  const ROEM = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  // Selbsttest-Fragen: Antworten gesät mischen, damit nicht immer b) richtig ist
  function testFrage(q) { const idx = mischen(q.optionen.map((_, i) => i), q.id); return { optionen: idx.map(i => q.optionen[i]), richtig: idx.indexOf(q.richtig) }; }
  g.C8 = { mischen, normal, ELEMENTE: E, schalen, ROEM, testFrage };
})(typeof window !== "undefined" ? window : globalThis);
````

## Datei: `js/glossar.js`

````javascript
/* Chemie-Labor 8 – Wörterbuch (Fremdwörter & Fachbegriffe)
   Schlüssel = Begriff, wie er im Text in {geschweiften Klammern} steht.
   Im Text: {Begriff} oder {angezeigtes Wort|Begriff}. */
window.GLOSSAR = {
  "Aggregatzustand": "Die Form, in der ein Stoff vorliegt: fest, flüssig oder gasförmig. Wasser kann z. B. Eis (fest), Wasser (flüssig) oder Wasserdampf (gasförmig) sein.",
  "Aktivierungsenergie": "Der „Anstoß“, den viele Reaktionen brauchen, damit sie starten. Beispiel: Ein Streichholz muss man erst reiben, damit es brennt.",
  "Alkalimetalle": "Die Metalle der 1. Hauptgruppe (z. B. Lithium, Natrium, Kalium). Sie sind weich und reagieren sehr heftig mit Wasser.",
  "alkalisch": "Anderes Wort für basisch. Eine Lösung ist alkalisch, wenn ihr pH-Wert größer als 7 ist. Beispiel: Seifenlauge.",
  "Analyse": "Das Zerlegen eines Stoffes in seine Bestandteile. Gegenteil: Synthese.",
  "Anion": "Ein negativ geladenes Ion. Es entsteht, wenn ein Atom Elektronen aufnimmt. Beispiel: Chlorid-Ion Cl⁻.",
  "Atom": "Kleinstes Teilchen eines Elements. Atome sind so winzig, dass man sie selbst mit einem normalen Mikroskop nicht sehen kann.",
  "Atomhülle": "Der äußere Bereich eines Atoms. Hier bewegen sich die Elektronen.",
  "Atomkern": "Der winzige Mittelpunkt eines Atoms. Er enthält Protonen und Neutronen und fast die gesamte Masse des Atoms.",
  "Außenelektronen": "Die Elektronen auf der äußersten Schale eines Atoms. Sie bestimmen, wie ein Atom reagiert. Auch: Valenzelektronen.",
  "Base": "Ein Stoff, der in Wasser eine Lauge bildet (Hydroxid-Ionen OH⁻). Beispiel: Natriumhydroxid.",
  "Brandfördernd": "Ein Stoff, der ein Feuer stärker macht, weil er Sauerstoff abgibt. Gefahrensymbol: Flamme über einem Kreis.",
  "Chromatografie": "Ein Trennverfahren: Ein Lösungsmittel wandert durch Papier und nimmt Farbstoffe unterschiedlich weit mit. So sieht man, aus welchen Farben z. B. ein Filzstift besteht.",
  "Dekantieren": "Vorsichtiges Abgießen einer Flüssigkeit, nachdem sich ein fester Stoff am Boden abgesetzt hat.",
  "Destillieren": "Trennverfahren: Ein Flüssigkeitsgemisch wird erhitzt. Der Stoff mit der niedrigeren Siedetemperatur verdampft zuerst, wird gekühlt und wieder flüssig aufgefangen.",
  "Dichte": "Gibt an, wie schwer ein bestimmtes Volumen eines Stoffes ist. Formel: Dichte = Masse : Volumen (Einheit g/cm³). Wasser hat die Dichte 1 g/cm³.",
  "Diffusion": "Das selbstständige Vermischen von Stoffen, weil sich ihre Teilchen ständig bewegen. Beispiel: Parfümduft verteilt sich im Raum.",
  "Edelgase": "Die Elemente der 8. Hauptgruppe (z. B. Helium, Neon, Argon). Ihre Außenschale ist voll. Darum reagieren sie fast gar nicht.",
  "Edelgasregel": "Atome versuchen, eine voll besetzte Außenschale zu bekommen wie die Edelgase (meist 8 Außenelektronen). Auch: Oktettregel.",
  "Edukte": "Die Ausgangsstoffe einer chemischen Reaktion. Sie stehen in der Wortgleichung links vom Pfeil.",
  "Eindampfen": "Trennverfahren: Eine Lösung wird erhitzt, bis das Wasser verdampft ist. Der gelöste Stoff (z. B. Salz) bleibt zurück.",
  "Elektron": "Winziges, negativ geladenes Teilchen in der Atomhülle. Zeichen: e⁻.",
  "Elektronengas": "Bei Metallen: Die Außenelektronen bewegen sich frei zwischen den Metall-Ionen wie ein Gas. Deshalb leiten Metalle den Strom.",
  "Elektronenpaarbindung": "Bindung zwischen Nichtmetall-Atomen: Sie teilen sich Elektronen paarweise. So entstehen Moleküle, z. B. Wasser H₂O. Auch: Atombindung.",
  "Element": "Ein Reinstoff, der nur aus einer einzigen Atomsorte besteht. Beispiele: Sauerstoff, Eisen, Gold. Alle Elemente stehen im Periodensystem.",
  "Emulsion": "Ein Gemisch aus zwei Flüssigkeiten, die sich nicht lösen, z. B. Öl in Wasser (Milch, Mayonnaise).",
  "endotherm": "Eine Reaktion ist endotherm, wenn sie ständig Wärme braucht. Hört man auf zu erhitzen, stoppt sie.",
  "Erdalkalimetalle": "Die Metalle der 2. Hauptgruppe (z. B. Magnesium, Calcium). Sie haben 2 Außenelektronen.",
  "Erstarren": "Übergang von flüssig zu fest. Beispiel: Wasser wird bei 0 °C zu Eis.",
  "exotherm": "Eine Reaktion ist exotherm, wenn sie Wärme (oder Licht) abgibt. Beispiel: Verbrennung einer Kerze.",
  "Extrahieren": "Herauslösen eines Stoffes mit einem Lösungsmittel. Beispiel: Beim Teekochen löst heißes Wasser Farb- und Geschmacksstoffe aus den Blättern.",
  "Filtrieren": "Trennverfahren mit einem Filter (z. B. Filterpapier): Feste Teilchen bleiben hängen, die Flüssigkeit läuft durch.",
  "Filtrat": "Die klare Flüssigkeit, die beim Filtrieren durch den Filter läuft.",
  "Gefahrenpiktogramm": "Ein Warnzeichen (rote Raute mit schwarzem Bild) auf Chemikalien. Es zeigt, welche Gefahr von einem Stoff ausgeht.",
  "Gemenge": "Ein Gemisch aus festen Stoffen, z. B. Sand und Kies oder Müsli.",
  "Gemisch": "Ein Stoff, der aus mehreren Reinstoffen besteht. Gemische kann man mit Trennverfahren trennen. Auch: Stoffgemisch.",
  "Glimmspanprobe": "Nachweis für Sauerstoff: Ein glühender Holzspan flammt in Sauerstoff hell auf.",
  "Halogene": "Die Elemente der 7. Hauptgruppe (z. B. Fluor, Chlor). Sie haben 7 Außenelektronen und reagieren sehr gern mit Metallen zu Salzen.",
  "heterogen": "Uneinheitlich. Bei einem heterogenen Gemisch kann man die Bestandteile (mit Lupe) erkennen. Beispiel: Sand in Wasser.",
  "homogen": "Einheitlich. Bei einem homogenen Gemisch kann man die Bestandteile nicht mehr erkennen, selbst mit Mikroskop nicht. Beispiel: Salzwasser.",
  "Hauptgruppe": "Eine Spalte im Periodensystem. Alle Elemente einer Hauptgruppe haben gleich viele Außenelektronen.",
  "Hydroxid-Ion": "Das Ion OH⁻. Es ist in jeder Lauge enthalten und macht sie alkalisch.",
  "Indikator": "Ein Anzeigestoff, der durch seine Farbe zeigt, ob eine Lösung sauer, neutral oder alkalisch ist. Beispiel: Rotkohlsaft.",
  "Ion": "Ein elektrisch geladenes Teilchen. Es entsteht, wenn ein Atom Elektronen abgibt (positives Ion) oder aufnimmt (negatives Ion).",
  "Ionenbindung": "Bindung zwischen positiven und negativen Ionen, die sich anziehen. Sie entsteht, wenn Metalle mit Nichtmetallen reagieren. So entstehen Salze.",
  "Ionengitter": "Regelmäßige Anordnung von positiven und negativen Ionen in einem Salzkristall.",
  "Kalkwasserprobe": "Nachweis für Kohlenstoffdioxid: Klares Kalkwasser wird trüb (milchig), wenn man Kohlenstoffdioxid einleitet.",
  "Kation": "Ein positiv geladenes Ion. Es entsteht, wenn ein Atom Elektronen abgibt. Beispiel: Natrium-Ion Na⁺.",
  "Karamell": "Brauner Stoff, der entsteht, wenn man Zucker stark erhitzt. Er hat ganz neue Eigenschaften: andere Farbe, anderer Geruch, anderer Geschmack.",
  "Knallgasprobe": "Nachweis für Wasserstoff: Hält man ein Reagenzglas mit Wasserstoff an eine Flamme, gibt es einen pfeifenden Knall.",
  "Kondensieren": "Übergang von gasförmig zu flüssig. Beispiel: Wasserdampf beschlägt den kalten Badezimmerspiegel.",
  "Lauge": "Eine wässrige Lösung, die alkalisch ist (pH-Wert über 7). Sie enthält Hydroxid-Ionen OH⁻. Beispiel: Natronlauge.",
  "Legierung": "Ein Gemisch aus Metallen. Beispiele: Messing (Kupfer + Zink), Bronze (Kupfer + Zinn).",
  "Löslichkeit": "Gibt an, wie gut sich ein Stoff in einem Lösungsmittel (z. B. Wasser) löst.",
  "Lösung": "Ein homogenes Gemisch: Ein Stoff hat sich so in einer Flüssigkeit verteilt, dass man ihn nicht mehr sieht. Beispiel: Zuckerwasser.",
  "Massenzahl": "Summe aus Protonen und Neutronen im Atomkern.",
  "Metallbindung": "Bindung in Metallen: Positive Metall-Ionen werden vom Elektronengas zusammengehalten.",
  "Modell": "Eine vereinfachte Darstellung der Wirklichkeit. Es hilft, etwas zu erklären, das man nicht direkt sehen kann.",
  "Molekül": "Ein Teilchen aus zwei oder mehr Atomen, die durch Elektronenpaarbindungen fest verbunden sind. Beispiel: Wassermolekül H₂O.",
  "Neutralisation": "Reaktion einer Säure mit einer Lauge. Dabei entstehen Wasser und ein Salz. Die Lösung wird neutral (pH 7).",
  "neutral": "Weder sauer noch alkalisch. pH-Wert genau 7. Beispiel: reines Wasser.",
  "Neutron": "Teilchen im Atomkern ohne elektrische Ladung (neutral).",
  "Niederschlag": "Ein fester Stoff, der sich bei einer Reaktion in einer Flüssigkeit bildet und oft zu Boden sinkt (Trübung).",
  "Ordnungszahl": "Die Nummer eines Elements im Periodensystem. Sie ist gleich der Anzahl der Protonen im Kern.",
  "Oxid": "Ein Stoff, der bei der Reaktion eines Elements mit Sauerstoff entsteht. Beispiel: Magnesiumoxid, Kohlenstoffdioxid.",
  "Oxidation": "Eine chemische Reaktion mit Sauerstoff. Verbrennen und Rosten sind Oxidationen.",
  "Periode": "Eine Zeile im Periodensystem. Die Periodennummer zeigt, wie viele Elektronenschalen ein Atom hat.",
  "Periodensystem": "Tabelle, in der alle chemischen Elemente nach ihrer Ordnungszahl sortiert sind.",
  "pH-Wert": "Zahl von 0 bis 14, die zeigt, wie sauer oder alkalisch eine Lösung ist: unter 7 sauer, 7 neutral, über 7 alkalisch.",
  "physikalischer Vorgang": "Ein Vorgang, bei dem sich nur die Form oder der Zustand ändert, aber kein neuer Stoff entsteht. Beispiel: Eis schmilzt.",
  "Produkte": "Die Stoffe, die bei einer chemischen Reaktion neu entstehen. Sie stehen in der Wortgleichung rechts vom Pfeil.",
  "Proton": "Positiv geladenes Teilchen im Atomkern. Zeichen: p⁺.",
  "Reaktion": "Kurz für chemische Reaktion: Aus Ausgangsstoffen entstehen neue Stoffe mit neuen Eigenschaften. Dabei wird immer Energie umgesetzt.",
  "Reinstoff": "Ein Stoff, der nur aus einer einzigen Stoffart besteht und immer gleiche Eigenschaften hat. Beispiele: destilliertes Wasser, Kupfer, Zucker.",
  "Resublimieren": "Übergang direkt von gasförmig zu fest. Beispiel: Raureif an kalten Wintertagen.",
  "Salz": "Ein Stoff aus positiven und negativen Ionen (Ionenbindung). Salze sind hart, spröde und schmelzen erst bei hohen Temperaturen. Beispiel: Kochsalz (Natriumchlorid).",
  "Säure": "Ein Stoff, der in Wasser saure Lösungen bildet (pH-Wert unter 7). Säuren geben in Wasser Wasserstoff-Ionen H⁺ ab. Beispiel: Zitronensäure.",
  "Schalenmodell": "Atommodell: Die Elektronen befinden sich auf verschiedenen Schalen um den Kern. Die 1. Schale fasst 2, die 2. und 3. Schale (vereinfacht) 8 Elektronen.",
  "Schmelzen": "Übergang von fest zu flüssig. Beispiel: Eis schmilzt bei 0 °C.",
  "Schmelztemperatur": "Die Temperatur, bei der ein fester Stoff flüssig wird. Sie ist für jeden Reinstoff typisch. Eis: 0 °C.",
  "Sedimentieren": "Absetzen lassen: Schwere feste Teilchen sinken in einer Flüssigkeit langsam nach unten.",
  "Sieden": "Verdampfen einer Flüssigkeit bei ihrer Siedetemperatur. Es bilden sich Blasen in der ganzen Flüssigkeit.",
  "Siedetemperatur": "Die Temperatur, bei der eine Flüssigkeit siedet. Wasser: 100 °C.",
  "spröde": "Ein Stoff ist spröde, wenn er bei Schlag nicht verbiegt, sondern zerbricht oder zerspringt (z. B. ein Salzkristall).",
  "Steckbrief": "Übersicht über die wichtigsten Eigenschaften eines Stoffes, so wie ein Personalausweis für Stoffe.",
  "Stoffeigenschaft": "Ein Merkmal, an dem man einen Stoff erkennt, z. B. Farbe, Geruch, Dichte, Schmelztemperatur oder Leitfähigkeit.",
  "Sublimieren": "Übergang direkt von fest zu gasförmig, ohne flüssig zu werden. Beispiel: Trockeneis.",
  "Suspension": "Ein Gemisch aus einem festen Stoff und einer Flüssigkeit, bei dem man die festen Teilchen sieht. Beispiel: Schlammwasser.",
  "Synthese": "Der Aufbau eines neuen Stoffes aus anderen Stoffen. Gegenteil: Analyse.",
  "Teilchenmodell": "Modell: Alle Stoffe bestehen aus winzigen Teilchen, die sich ständig bewegen. Zwischen den Teilchen ist leerer Raum.",
  "Trennverfahren": "Eine Methode, mit der man ein Gemisch in seine Bestandteile zerlegt. Man nutzt dabei unterschiedliche Stoffeigenschaften.",
  "Universalindikator": "Ein Indikator, der für jeden pH-Wert eine andere Farbe zeigt (von rot über grün bis violett).",
  "Valenzelektronen": "Anderes Wort für Außenelektronen.",
  "Verbrennung": "Eine schnelle Reaktion eines Stoffes mit Sauerstoff, bei der Wärme und Licht (Flamme) frei werden.",
  "Verbrennungsdreieck": "Für ein Feuer braucht man drei Dinge: einen brennbaren Stoff, Sauerstoff und die Zündtemperatur. Fehlt eins, geht das Feuer aus.",
  "Verdampfen": "Übergang von flüssig zu gasförmig.",
  "Verdunsten": "Verdampfen unterhalb der Siedetemperatur. Beispiel: Eine Pfütze trocknet in der Sonne.",
  "Versuchsprotokoll": "Schriftlicher Bericht über einen Versuch: Frage, Vermutung, Material, Durchführung, Beobachtung und Auswertung.",
  "Volumen": "Der Raum, den ein Körper einnimmt. Einheiten: cm³, ml, l (1 cm³ = 1 ml).",
  "Wortgleichung": "Kurze Schreibweise einer Reaktion mit Wörtern: Ausgangsstoffe → Produkte. Beispiel: Eisen + Schwefel → Eisensulfid.",
  "Zerteilungsgrad": "Wie fein ein Stoff zerkleinert ist. Je feiner (z. B. Eisenwolle statt Eisennagel), desto leichter brennt er.",
  "Zündtemperatur": "Die niedrigste Temperatur, bei der ein Stoff anfängt zu brennen.",
  "Gasbrenner": "Ein Brenner für den Chemieraum, der mit Gas betrieben wird. Er wird auch Bunsenbrenner oder Teclubrenner genannt.",
  "Rückstand": "Der feste Stoff, der beim Filtrieren im Filter hängen bleibt."
};
````

---
Ende von Teil 1 von 6. Warte auf den nächsten Teil.
