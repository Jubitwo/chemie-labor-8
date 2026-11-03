# Chemie-Labor 8 – Teil 6 von 6

Lege die folgenden Dateien **exakt mit diesem Inhalt** im Repository an (Pfad beachten). Nichts kürzen, nichts verändern.

## Datei: `tools/build-arbeitsheft.js`

````javascript
/* Erzeugt aus js/inhalte-*.js das Arbeitsheft (HTML zum Drucken + Markdown) und die Lösungen.
   Aufruf im Projektordner:  node tools/build-arbeitsheft.js
   Ergebnis:
     arbeitsheft/arbeitsheft.html      -> im Browser öffnen, Strg+P, "Als PDF speichern"
     arbeitsheft/ARBEITSHEFT.md        -> komplettes Heft als Markdown
     arbeitsheft/kapitel-01.md …       -> einzelne Kapitel
     lehrkraft/LOESUNGEN.md            -> alle Lösungen */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..");
const ctx = { window: {}, console };
ctx.globalThis = ctx.window; vm.createContext(ctx);
["werkzeuge.js", "glossar.js", "inhalte-1.js", "inhalte-2.js", "lehrerversuche.js"].forEach(f => vm.runInContext(fs.readFileSync(path.join(ROOT, "js", f), "utf8"), ctx));
const W = ctx.window, C8 = W.C8, KAP = W.KAPITEL.slice().sort((a, b) => a.nr - b.nr), GL = W.GLOSSAR, LV = W.LEHRERVERSUCHE;
const BU = "abcdefghij", GR = "ABCDEFGHIJ";

const plain = s => String(s).replace(/\{([^{}|]+)(?:\|([^{}]+))?\}/g, "$1");
const fett = s => String(s).replace(/\{([^{}|]+)(?:\|([^{}]+))?\}/g, "<b>$1</b>");
function md(html) {
  let t = plain(html).replace(/\n\s+/g, "\n");
  t = t.replace(/<table[^>]*>(.*?)<\/table>/gs, (m, inner) => {
    const rows = [...inner.matchAll(/<tr>(.*?)<\/tr>/gs)].map(r => [...r[1].matchAll(/<t[hd][^>]*>(.*?)<\/t[hd]>/gs)].map(c => c[1].replace(/<[^>]+>/g, "").trim()));
    if (!rows.length) return "";
    const n = Math.max(...rows.map(r => r.length));
    const z = r => "| " + [...r, ...Array(n - r.length).fill("")].join(" | ") + " |";
    return "\n\n" + z(rows[0]) + "\n|" + " --- |".repeat(n) + "\n" + rows.slice(1).map(z).join("\n") + "\n\n";
  });
  t = t.replace(/<ol[^>]*>(.*?)<\/ol>/gs, (m, inner) => "\n" + [...inner.matchAll(/<li>(.*?)<\/li>/gs)].map((l, i) => `${i + 1}. ${l[1]}`).join("\n") + "\n");
  t = t.replace(/<li>/g, "\n- ").replace(/<\/(p|ul|li|div)>/g, "\n").replace(/<br\s*\/?>/g, "  \n").replace(/<b>|<\/b>/g, "**").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");
  return t.split("\n").map(x => x.trim()).join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

const ANHANG = t => t.replace(/<div class="piktos"[^>]*><\/div>/, "<p><i>→ Übersicht aller Gefahrensymbole: siehe Anhang am Ende des Heftes.</i></p>")
  .replace(/<div class="pse-mini"[^>]*><\/div>/, "<p><i>→ Periodensystem: siehe Anhang am Ende des Heftes.</i></p>")
  .replace(/<div class="phskala"[^>]*><\/div>/, "<p><b>0 – 1 – 2 – 3 – 4 – 5 – 6 (sauer) | 7 (neutral) | 8 – 9 – 10 – 11 – 12 – 13 – 14 (alkalisch)</b></p>")
  .replace(/<div class="balken">.*?<\/div>/s, "<p><b>Stickstoff 78 % · Sauerstoff 21 % · Rest 1 %</b></p>")
  .replace(/<div class="zustaende">.*?<\/div><\/div>/s, m => m.replace(/<div class="tm [a-z]+"><\/div>/g, " – "));
/* ---------- Aufgabe -> HTML (Druck) ---------- */
function linien(n) { return `<div class="linien">${'<div></div>'.repeat(n)}</div>`; }
function aufgabeHTML(a) {
  let h = `<div class="aufg"><div class="afr"><span class="nr">${a.id}</span> ${fett(a.frage)}</div>`;
  if (a.typ === "mc") { if (Array.isArray(a.richtig)) h += `<p class="hinw">Mehrere Antworten können richtig sein.</p>`; h += a.optionen.map((o, i) => `<div class="ank">☐ ${BU[i]}) ${fett(o)}</div>`).join(""); }
  if (a.typ === "wf") h += `<table class="wf"><tr><th>Aussage</th><th>richtig</th><th>falsch</th></tr>${a.aussagen.map(z => `<tr><td>${fett(z[0])}</td><td>☐</td><td>☐</td></tr>`).join("")}</table>`;
  if (a.typ === "luecke") { if (a.wortliste) h += `<div class="wbox">Wörter: ${a.wortliste.join(" · ")}</div>`; h += `<p class="lt">${fett(a.text).split("___").join('<span class="gap"></span>')}</p>`; }
  if (a.typ === "zuordnen") {
    const rechts = C8.mischen([...new Set(a.paare.map(p => p[1]))], a.id);
    if (rechts.length === a.paare.length) {
      h += `<table class="zu"><tr><td>${a.paare.map((p, i) => `<div>${i + 1}. ${fett(p[0])}</div>`).join("")}</td><td>${rechts.map((r, i) => `<div>${GR[i]} ${fett(r)}</div>`).join("")}</td></tr></table>`;
      h += `<p>Lösung: ${a.paare.map((_, i) => `${i + 1} → <span class="kasten"></span>`).join(" &nbsp; ")}</p>`;
    } else {
      h += `<div class="wbox">Wähle aus: ${rechts.join(" · ")}</div>` + a.paare.map((p, i) => `<div class="ank">${i + 1}. ${fett(p[0])} → <span class="gap lang"></span></div>`).join("");
    }
  }
  if (a.typ === "reihe") h += `<p class="hinw">Schreibe die richtige Nummer in das Kästchen.</p>` + C8.mischen(a.schritte, a.id).map(s => `<div class="ank"><span class="kasten"></span> ${fett(s)}</div>`).join("");
  if (a.typ === "frei") h += a.zeichnen ? `<div class="zeichen"></div>` : linien(a.zeilen || 3);
  return h + `</div>`;
}
/* ---------- Aufgabe -> Markdown ---------- */
function aufgabeMD(a) {
  let m = `**Aufgabe ${a.id}:** ${plain(a.frage)}\n\n`;
  if (a.typ === "mc") { if (Array.isArray(a.richtig)) m += `*(Mehrere Antworten können richtig sein.)*\n\n`; m += a.optionen.map((o, i) => `- [ ] ${BU[i]}) ${plain(o)}`).join("\n") + "\n"; }
  if (a.typ === "wf") m += `| Aussage | richtig | falsch |\n|---|:-:|:-:|\n` + a.aussagen.map(z => `| ${plain(z[0])} | ☐ | ☐ |`).join("\n") + "\n";
  if (a.typ === "luecke") { if (a.wortliste) m += `> Wörter: ${a.wortliste.join(" · ")}\n\n`; m += plain(a.text).split("___").join("__________") + "\n"; }
  if (a.typ === "zuordnen") {
    const rechts = C8.mischen([...new Set(a.paare.map(p => p[1]))], a.id);
    if (rechts.length === a.paare.length) m += `| Nr. | Begriff | | Buchst. | Zuordnung |\n|---|---|---|---|---|\n` + a.paare.map((p, i) => `| ${i + 1} | ${plain(p[0])} | → ___ | ${GR[i]} | ${plain(rechts[i])} |`).join("\n") + "\n";
    else m += `> Wähle aus: ${rechts.join(" · ")}\n\n` + a.paare.map((p, i) => `${i + 1}. ${plain(p[0])} → __________`).join("\n") + "\n";
  }
  if (a.typ === "reihe") m += `*Schreibe die richtige Nummer in das Kästchen.*\n\n` + C8.mischen(a.schritte, a.id).map(s => `- [ __ ] ${plain(s)}`).join("\n") + "\n";
  if (a.typ === "frei") m += a.zeichnen ? "\n```\n[ Zeichenfeld ]\n\n\n\n\n```\n" : "\n" + "_______________________________________________________________\n\n".repeat(a.zeilen || 3);
  return m + "\n";
}
/* ---------- Lösung ---------- */
function loesung(a) {
  if (a.typ === "mc") { const r = Array.isArray(a.richtig) ? a.richtig : [a.richtig]; return r.map(i => `${BU[i]}) ${plain(a.optionen[i])}`).join("; "); }
  if (a.typ === "wf") return a.aussagen.map((z, i) => `${i + 1}. ${z[1] ? "richtig" : "falsch"}`).join(" · ");
  if (a.typ === "luecke") return a.loesungen.map((l, i) => `(${i + 1}) ${l[0]}`).join(" · ");
  if (a.typ === "zuordnen") { const rechts = C8.mischen([...new Set(a.paare.map(p => p[1]))], a.id); const eind = rechts.length === a.paare.length; return a.paare.map((p, i) => `${i + 1} → ${eind ? GR[rechts.indexOf(p[1])] + " (" + plain(p[1]) + ")" : plain(p[1])}`).join(" · "); }
  if (a.typ === "reihe") { const g = C8.mischen(a.schritte, a.id); return g.map(s => `[${a.schritte.indexOf(s) + 1}] ${plain(s)}`).join(" · "); }
  if (a.typ === "frei") return "Musterlösung: " + plain(a.muster);
}

/* ---------- Versuch vor Ort: Protokollseite ---------- */
function versuchHTML(id) {
  const v = LV[id];
  return `<section class="seite"><h2>🔬 Versuch vor Ort: ${v.titel.replace(/^Versuch vor Ort: /, "")}</h2><p class="hinw">Versuchsprotokoll – gemeinsam mit der Lehrkraft</p>
  <div class="warn"><b>Sicherheit:</b> ${v.sicherheit}</div>
  <h4>1. Frage</h4><p>${v.frage}</p><h4>2. Meine Vermutung</h4>${linien(2)}
  <h4>3. Material</h4><p>${v.material.join(" · ")}</p>
  <h4>4. Durchführung</h4><ol>${v.schritte.map(s => `<li>${s}</li>`).join("")}</ol><p>Skizze:</p><div class="zeichen klein"></div>
  <h4>5. Beobachtung</h4><p class="hinw">Achte auf: ${v.beobachtung.join(" · ")}</p>${linien(4)}
  <h4>6. Auswertung</h4>${v.auswertung.map((q, i) => `<p><b>${i + 1}.</b> ${q}</p>${linien(2)}`).join("")}</section>`;
}
function versuchMD(id) {
  const v = LV[id];
  return `### 🔬 Versuch vor Ort: ${v.titel.replace(/^Versuch vor Ort: /, "")}\n\n> ⚠️ **Sicherheit:** ${v.sicherheit}\n\n**1. Frage:** ${v.frage}\n\n**2. Meine Vermutung:**\n\n_______________________________________________________________\n\n**3. Material:** ${v.material.join(" · ")}\n\n**4. Durchführung:**\n\n${v.schritte.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\n**5. Beobachtung** (achte auf: ${v.beobachtung.join(" · ")}):\n\n_______________________________________________________________\n\n_______________________________________________________________\n\n**6. Auswertung:**\n\n${v.auswertung.map((q, i) => `${i + 1}. ${q}\n\n   _______________________________________________________________\n`).join("\n")}\n`;
}

/* ---------- HTML zusammenbauen ---------- */
const CSS = `@page{size:A4;margin:16mm 15mm 18mm}
body{font-family:"Atkinson Hyperlegible",Arial,sans-serif;font-size:11.5pt;line-height:1.45;color:#1d2a3a;margin:0}
h1{font-size:26pt;margin:0 0 6mm} h2{font-size:16pt;margin:0 0 3mm;border-bottom:3px solid var(--k,#2e86ab);padding-bottom:1mm} h3{font-size:13pt;margin:5mm 0 2mm;color:var(--k,#2e86ab)} h4{margin:4mm 0 1mm}
.seite{page-break-before:always} .deck{text-align:center;padding-top:40mm}
.deck .gross{font-size:80pt}.namenfeld{margin:20mm auto 0;width:120mm;text-align:left;font-size:13pt}.namenfeld div{border-bottom:1px solid #333;height:11mm;margin-bottom:3mm}
.kapkopf{background:var(--k);color:#fff;padding:4mm 6mm;border-radius:4mm;margin-bottom:4mm}.kapkopf h2{border:0;color:#fff;margin:0;font-size:20pt}
.box{border:1.5px solid #c9d1da;border-radius:3mm;padding:3mm 4mm;margin:3mm 0;page-break-inside:avoid}
.lern{page-break-inside:auto}.lern ul,.lern ol{margin:1mm 0}.merke{border:2px dashed var(--k);background:#f7f9fb}.einst{background:#fff8e1;border-color:#f4b400}
.aufg{margin:4mm 0 5mm;page-break-inside:avoid}.afr{font-weight:700;margin-bottom:2mm}.nr{background:var(--k);color:#fff;border-radius:2mm;padding:0 2mm;margin-right:1mm}
.linien div{border-bottom:1px solid #8a96a3;height:8.5mm}.zeichen{border:1.5px solid #8a96a3;height:55mm;border-radius:2mm}.zeichen.klein{height:35mm}
.gap{display:inline-block;border-bottom:1px solid #333;width:32mm;height:5mm;margin:0 1mm}.gap.lang{width:60mm}
.kasten{display:inline-block;width:8mm;height:7mm;border:1.5px solid #333;vertical-align:middle;margin-right:1mm}
.ank{margin:1.5mm 0}.lt{line-height:2.3}.hinw{font-size:9.5pt;color:#5b6573;font-style:italic;margin:1mm 0}
.wbox{border:1px solid #999;background:#f1f4f8;padding:1.5mm 3mm;border-radius:2mm;margin:2mm 0;font-size:10.5pt}
table{border-collapse:collapse;width:100%;margin:2mm 0;font-size:10.5pt}td,th{border:1px solid #b8c1cc;padding:1.5mm 2mm;vertical-align:top;text-align:left}th{background:#eef2f6}
.wf td:nth-child(2),.wf td:nth-child(3){width:16mm;text-align:center}.zu td div{margin:1.5mm 0}
.warn{background:#fdecea;border-left:4px solid #d62828;padding:2mm 3mm;margin:2mm 0}
.formel{font-family:Consolas,monospace;font-weight:700;background:#f1f4f8;padding:1mm 2mm;display:inline-block}
.smiley td{font-size:14pt;text-align:center;width:14mm}.smiley td:first-child{font-size:11pt;text-align:left;width:auto}
.web{font-size:9.5pt;color:#5b6573} .glo p{margin:1mm 0;font-size:10pt} .glo{columns:2;column-gap:8mm}
.balken,.zustaende,.piktos,.pse-mini,.phskala{display:none}
@media screen{body{background:#ccc}.blatt{background:#fff;max-width:210mm;margin:8mm auto;padding:16mm 15mm;box-shadow:0 2px 10px #0003}.seite{border-top:2px dashed #aaa;margin-top:12mm;padding-top:8mm}}`;

let html = `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><title>Arbeitsheft Chemie Klasse 8</title><style>${CSS}</style></head><body><div class="blatt">
<section class="deck"><div class="gross">⚗️</div><h1>Arbeitsheft Chemie<br>Klasse 8</h1><p style="font-size:14pt">Werkrealschule · Baden-Württemberg</p>
<p>Passend zur Lernseite <b>Chemie-Labor 8</b> und zum Schulbuch<br>„Fachwerk Chemie Baden-Württemberg, Gesamtband“ (Cornelsen)</p>
<div class="namenfeld">Name:<div></div>Klasse:<div></div>Schuljahr:<div></div></div></section>
<section class="seite"><h2>Inhalt</h2><table><tr><th>Kapitel</th><th>Thema</th><th>Zeit</th><th>Erledigt</th></tr>${KAP.map(k => `<tr><td>${k.nr}</td><td>${k.icon} ${k.titel}</td><td>ca. ${k.wochen} Wochen</td><td>☐</td></tr>`).join("")}<tr><td>–</td><td>📖 Wörterbuch · Periodensystem</td><td></td><td></td></tr></table>
<h3>So arbeitest du mit diesem Heft</h3><ol><li>Jedes Kapitel beginnt mit einem <b>Einstieg</b>. Schreibe deine Vermutung auf.</li><li>Lies die Erklärung auf der Lernseite (Kapitel ${KAP.map(k => k.nr).join(", ")}) oder im Schulbuch.</li><li>Im Kasten <b>Merke</b> steht das Wichtigste. Lerne es!</li><li>Die <b>Aufgaben</b> haben dieselben Nummern wie auf der Lernseite (z. B. 2.3). Dort kannst du deine Lösung prüfen.</li><li><b>Labor-Aufgaben</b> (z. B. 3.L1) löst du mit dem virtuellen Labor auf der Lernseite.</li><li>Am Ende jedes Kapitels: <b>Selbsttest</b> und <b>Das kann ich</b>.</li></ol>
<h3>Symbole</h3><p>🔬 Versuch vor Ort · 💻 Lernseite / virtuelles Labor · 💡 Merke · ✏️ Beispiel · ✅ Selbsttest</p></section>`;
let mdAll = `# Arbeitsheft Chemie – Klasse 8 (Werkrealschule, Baden-Württemberg)\n\nPassend zur Lernseite **Chemie-Labor 8** und zum Schulbuch „Fachwerk Chemie Baden-Württemberg, Gesamtband“ (Cornelsen).\n\nName: ____________________  Klasse: ______  Schuljahr: ________\n\n## Inhalt\n\n| Kapitel | Thema | Zeit |\n|---|---|---|\n${KAP.map(k => `| ${k.nr} | ${k.icon} ${k.titel} | ca. ${k.wochen} Wochen |`).join("\n")}\n\n---\n\n`;
let loes = `# Lösungen zum Arbeitsheft Chemie Klasse 8\n\n*Nur für die Lehrkraft. Automatisch erzeugt aus \`js/inhalte-*.js\` – identisch mit den Lösungen der Lernseite.*\n\n`;

KAP.forEach(k => {
  const kopf = `--k:${k.farbe}`;
  let h = `<section class="seite" style="${kopf}"><div class="kapkopf" style="background:${k.farbe}"><small>Kapitel ${k.nr} · ca. ${k.wochen} Wochen</small><h2>${k.icon} ${k.titel}</h2>${k.untertitel}</div>
  <p class="web">💻 Lernseite: Kapitel ${k.nr} · 📘 Schulbuch: Thema „${k.buch.thema}“${k.buch.seiten ? `, S. ${k.buch.seiten}` : ", Seite: ________"}</p>
  <div class="box"><b>🎯 Das lernst du:</b><ul>${k.ziele.map(z => `<li>${z}</li>`).join("")}</ul></div>
  <div class="box einst"><h3 style="margin-top:0">🚪 Einstieg: ${k.einstieg.titel}</h3><p>${plain(k.einstieg.text)}</p><p><b>🤔 ${plain(k.einstieg.frage)}</b></p>${linien(3)}</div>
  <h3>📖 Lerntext</h3>${k.abschnitte.map((a, i) => `<div class="box lern"><h4 style="margin-top:0">${i + 1}. ${a.titel}</h4>${fett(ANHANG(a.text))}</div>`).join("")}
  <div class="box merke"><h3 style="margin-top:0">💡 Merke</h3><ul>${k.merke.map(m => `<li>${plain(m)}</li>`).join("")}</ul></div>
  <div class="box"><h3 style="margin-top:0">✏️ Beispiel: ${k.beispiel.titel}</h3><p><b>Aufgabe:</b> ${plain(k.beispiel.aufgabe)}</p><ol>${k.beispiel.schritte.map(s => `<li>${plain(s).replace(/^\d\.\s*/, "")}</li>`).join("")}</ol><p><b>Ergebnis:</b> ${plain(k.beispiel.ergebnis)}</p></div>
  <h3>✍️ Aufgaben</h3>${k.aufgaben.map(aufgabeHTML).join("")}
  <h3>💻 Labor-Aufgaben: ${k.labor.titel.replace("Labor: ", "")}</h3><p class="hinw">Öffne auf der Lernseite Kapitel ${k.nr} → Labor. ${plain(k.labor.auftrag)}</p>${k.labor.aufgaben.map(aufgabeHTML).join("")}
  </section>`;
  if (k.lehrerversuch) h += `<div style="${kopf}">${versuchHTML(k.lehrerversuch)}</div>`;
  h += `<section class="seite" style="${kopf}"><h3>✅ Selbsttest Kapitel ${k.nr}</h3><p class="hinw">Kreuze die richtige Antwort an. Prüfe danach auf der Lernseite.</p>${k.test.map(C8.testFrage).map((q, i) => `<div class="aufg"><div class="afr">${i + 1}. ${plain(k.test[i].frage)}</div>${q.optionen.map((o, j) => `<span class="ank" style="margin-right:6mm">☐ ${BU[j]}) ${o}</span>`).join("")}</div>`).join("")}
  <p>Meine Punkte: ____ von 5</p>
  <h3>Das kann ich jetzt</h3><table class="smiley"><tr><th>Ich kann …</th><th>😃</th><th>😐</th><th>😟</th></tr>${k.ziele.map(z => `<tr><td>${z}</td><td>☐</td><td>☐</td><td>☐</td></tr>`).join("")}</table>
  <h3>Platz für Notizen</h3>${linien(5)}</section>`;
  html += h;

  let m = `## Kapitel ${k.nr}: ${k.icon} ${k.titel}\n\n*${k.untertitel} · ca. ${k.wochen} Wochen*\n\n💻 Lernseite: Kapitel ${k.nr} · 📘 Schulbuch: Thema „${k.buch.thema}“, Seite: ${k.buch.seiten || "________"}\n\n**🎯 Das lernst du:**\n\n${k.ziele.map(z => "- " + z).join("\n")}\n\n### 🚪 Einstieg: ${k.einstieg.titel}\n\n${plain(k.einstieg.text)}\n\n**🤔 ${plain(k.einstieg.frage)}**\n\n_______________________________________________________________\n\n_______________________________________________________________\n\n### 📖 Lerntext\n\n${k.abschnitte.map((a, i) => `#### ${i + 1}. ${a.titel}\n\n${md(ANHANG(a.text))}\n`).join("\n")}\n### 💡 Merke\n\n${k.merke.map(x => "- " + plain(x)).join("\n")}\n\n### ✏️ Beispiel: ${k.beispiel.titel}\n\n**Aufgabe:** ${plain(k.beispiel.aufgabe)}\n\n${k.beispiel.schritte.map((s, i) => `${i + 1}. ${plain(s).replace(/^\d\.\s*/, "")}`).join("\n")}\n\n**Ergebnis:** ${plain(k.beispiel.ergebnis)}\n\n### ✍️ Aufgaben\n\n${k.aufgaben.map(aufgabeMD).join("")}### 💻 Labor-Aufgaben: ${k.labor.titel.replace("Labor: ", "")}\n\n*Öffne auf der Lernseite Kapitel ${k.nr} → Labor. ${plain(k.labor.auftrag)}*\n\n${k.labor.aufgaben.map(aufgabeMD).join("")}`;
  if (k.lehrerversuch) m += versuchMD(k.lehrerversuch);
  m += `### ✅ Selbsttest Kapitel ${k.nr}\n\n${k.test.map(C8.testFrage).map((q, i) => `${i + 1}. ${plain(k.test[i].frage)}  \n   ${q.optionen.map((o, j) => `☐ ${BU[j]}) ${o}`).join("   ")}`).join("\n")}\n\nMeine Punkte: ____ von 5\n\n### Das kann ich jetzt\n\n| Ich kann … | 😃 | 😐 | 😟 |\n|---|:-:|:-:|:-:|\n${k.ziele.map(z => `| ${z} | ☐ | ☐ | ☐ |`).join("\n")}\n\n---\n\n`;
  fs.writeFileSync(path.join(ROOT, "arbeitsheft", `kapitel-${String(k.nr).padStart(2, "0")}.md`), `# Arbeitsheft Chemie 8\n\n` + m);
  mdAll += m;

  loes += `## Kapitel ${k.nr}: ${k.titel}\n\n**Einstieg – Erwartungshorizont:** siehe Abschnitt „${k.abschnitte[0].titel}“ der Lernseite.\n\n`;
  [...k.aufgaben, ...k.labor.aufgaben].forEach(a => { loes += `- **${a.id}:** ${loesung(a)}\n`; });
  loes += `- **Selbsttest:** ${k.test.map(C8.testFrage).map((q, i) => `${i + 1}${BU[q.richtig]}`).join(", ")}\n\n`;
});

// Anhang: Wörterbuch + Periodensystem + pH
const keys = Object.keys(GL).sort((a, b) => a.localeCompare(b, "de"));
let pse = `<table><tr><th></th>${[1, 2, 3, 4, 5, 6, 7, 8].map(g => `<th>${C8.ROEM[g]}</th>`).join("")}</tr>`;
for (let p = 1; p <= 4; p++) { pse += `<tr><th>${p}</th>`; for (let g = 1; g <= 8; g++) { const e = C8.ELEMENTE.find(x => x.periode === p && x.gruppe === g); pse += e ? `<td style="text-align:center;background:${e.art === "m" ? "#dbeafe" : e.art === "e" ? "#ede4ff" : "#fdf1c7"}"><small>${e.oz}</small><br><b>${e.sym}</b><br><small>${e.name}</small></td>` : "<td></td>"; } pse += "</tr>"; }
pse += `</table><p class="hinw">Blau = Metalle · Gelb = Nichtmetalle · Lila = Edelgase · Zeile = Periode (Anzahl Schalen) · Spalte = Hauptgruppe (Anzahl Außenelektronen)</p>`;
html += `<section class="seite"><h2>📖 Wörterbuch</h2><div class="glo">${keys.map(k => `<p><b>${k}:</b> ${GL[k]}</p>`).join("")}</div></section>
<section class="seite"><h2>Periodensystem (Elemente 1–20)</h2>${pse}<h3>pH-Skala</h3><table><tr>${[...Array(15)].map((_, i) => `<td style="text-align:center">${i}</td>`).join("")}</tr><tr><td colspan="7" style="text-align:center">sauer</td><td style="text-align:center">neutral</td><td colspan="7" style="text-align:center">alkalisch</td></tr></table>
<h3>Gefahrenpiktogramme</h3><table>${W.LABOR_HELFER ? "" : ""}<tr><th>Bild</th><th>Bedeutung</th></tr><tr><td>Explodierende Bombe</td><td>explosiv</td></tr><tr><td>Flamme</td><td>entzündbar</td></tr><tr><td>Flamme über Kreis</td><td>brandfördernd</td></tr><tr><td>Gasflasche</td><td>Gas unter Druck</td></tr><tr><td>Ätzwirkung</td><td>ätzend</td></tr><tr><td>Totenkopf</td><td>giftig</td></tr><tr><td>Ausrufezeichen</td><td>reizend / gesundheitsschädlich</td></tr><tr><td>Gesundheitsgefahr (Mensch mit Stern)</td><td>gesundheitsgefährdend</td></tr><tr><td>toter Baum und Fisch</td><td>umweltgefährlich</td></tr></table></section></div></body></html>`;
mdAll += `## 📖 Wörterbuch\n\n${keys.map(k => `- **${k}:** ${GL[k]}`).join("\n")}\n\n## Periodensystem (Elemente 1–20)\n\n| | I | II | III | IV | V | VI | VII | VIII |\n|---|---|---|---|---|---|---|---|---|\n${[1, 2, 3, 4].map(p => `| **${p}** | ${[1, 2, 3, 4, 5, 6, 7, 8].map(g => { const e = C8.ELEMENTE.find(x => x.periode === p && x.gruppe === g); return e ? `${e.oz} **${e.sym}** ${e.name}` : ""; }).join(" | ")} |`).join("\n")}\n`;

fs.writeFileSync(path.join(ROOT, "arbeitsheft", "arbeitsheft.html"), html);
fs.writeFileSync(path.join(ROOT, "arbeitsheft", "ARBEITSHEFT.md"), mdAll);
fs.writeFileSync(path.join(ROOT, "lehrkraft", "LOESUNGEN.md"), loes);
const n = KAP.reduce((s, k) => s + k.aufgaben.length + k.labor.aufgaben.length, 0);
console.log(`Fertig: ${KAP.length} Kapitel, ${n} Aufgaben, ${KAP.length * 5} Selbsttest-Fragen, ${keys.length} Wörterbuch-Einträge.`);
````

## Datei: `README.md`

````markdown
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
````

## Datei: `.github/copilot-instructions.md`

````markdown
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
````

## Datei: `lehrkraft/JAHRESPLAN.md`

````markdown
# Jahresplan Chemie Klasse 8 – Werkrealschule Baden-Württemberg

**Grundlage:** 2 Wochenstunden, ca. 35 Unterrichtswochen (Puffer für Ausfälle, Projekttage, Praktika ist eingeplant).
**Material:** Lernseite *Chemie-Labor 8* · Arbeitsheft (gleiche Aufgabennummern) · Schulbuch *Fachwerk Chemie Baden-Württemberg, Gesamtband* (Cornelsen, 1. Auflage 2018).

> Wenn Ihre Klasse nur 1 Wochenstunde Chemie hat: Pro Zeile eine Woche mehr einplanen und bei jedem Kapitel die Aufgaben mit der höchsten Nummer als Hausaufgabe/Wahlaufgabe geben.

**Bausteine je Kapitel (immer gleich – gibt Schülern Sicherheit):**
1. Einstieg (Vermutung ins Heft) → 2. Lerntext (Seite oder Heft, Fremdwörter per Klick) → 3. Merke abschreiben/lernen → 4. Beispiel gemeinsam → 5. Virtuelles Labor (Partnerarbeit, Tablet/PC) → 6. Aufgaben → 7. Selbsttest + „Das kann ich“

| Woche | Kapitel | Inhalt der Doppelstunde | Arbeitsheft / Lernseite |
|---|---|---|---|
| 1 | 1 Sicher experimentieren | Kennenlernen, Heft einrichten, Einstieg „Achtung, Labor!“, Regeln im Chemieraum, **Sicherheitsbelehrung (dokumentieren!)** | Einstieg, Lerntext 1, A 1.1, 1.6 |
| 2 | 1 | Gefahrenpiktogramme (Putzmittel von zu Hause mitbringen lassen), Labor „Sicherheits-Check“ Teil A | Lerntext 2, A 1.2, 1.L1 |
| 3 | 1 | Gasbrenner (Demonstration), Versuchsprotokoll, Selbsttest | Lerntext 3–4, A 1.3–1.5, Selbsttest |
| 4 | 2 Stoffe | Einstieg „Zucker oder Salz?“, Stoff/Gegenstand, Eigenschaften mit den Sinnen | Einstieg, Lerntext 1–2, A 2.1, 2.2 |
| 5 | 2 | Stoffe untersuchen: Labor „Stoff-Detektiv“ (Partnerarbeit) | 2.L1, 2.L2, A 2.5 |
| 6 | 2 | Dichte: Beispiel gemeinsam, Rechenübungen, Schwimmt-sinkt-Demo mit Holz/Öl/Eisen | Lerntext 3, Beispiel, A 2.3 |
| 7 | 2 | Metalle und Salze, Steckbrief schreiben, Selbsttest | Lerntext 4, A 2.4, 2.6, Selbsttest |
| 8 | 3 Teilchenmodell | Einstieg „Der Duft wandert“ (Parfüm im Raum), 3 Regeln des Teilchenmodells | Einstieg, Lerntext 1, A 3.1 |
| 9 | 3 | Aggregatzustände, Labor „Teilchen-Simulator“ | Lerntext 2, 3.L1, 3.L2, A 3.3, 3.5 |
| 10 | 3 | Zustandsänderungen, Pfütze/Spiegel erklären, Selbsttest | Lerntext 3, A 3.2, 3.4, 3.6, Selbsttest |
| 11 | – | **Lernkontrolle 1** (Kapitel 1–3) und Wiederholung | Selbsttests 1–3 als Vorbereitung |
| 12 | 4 Gemische | Einstieg „Salz aus dem Meer“, Reinstoff/Gemisch, Gemischarten | Einstieg, Lerntext 1–2, A 4.1, 4.2 |
| 13 | 4 | Trennverfahren, Labor „Trenn-Werkstatt“ | Lerntext 3, A 4.3, 4.4, 4.L1 |
| 14 | 4 | 🔬 **Versuch vor Ort 2: Chromatografie** (Schülerversuch, 20 min) + Protokoll | Protokollseite Kap. 4, 4.L2 |
| 15 | 4 | Sand-Salz-Trennung (Beispiel), Selbsttest | Beispiel, A 4.5, 4.6, Selbsttest |
| 16 | 5 Reaktion | Einstieg „Ist das noch Zucker?“, physikalischer Vorgang ↔ chemische Reaktion | Einstieg, Lerntext 1, A 5.1 |
| 17 | 5 | 🔬 **Versuch vor Ort 1: Karamell** + Protokoll, danach Labor „Karamell-Küche“ | Protokollseite Kap. 5, 5.L1, 5.L2 |
| 18 | 5 | Kennzeichen, Wortgleichung, Edukte/Produkte, exotherm/endotherm | Lerntext 2–4, A 5.2–5.4 |
| 19 | 5 | Erhaltung der Masse, Beispiel Eisen + Schwefel, Selbsttest | Lerntext 5, Beispiel, A 5.5, 5.6, Selbsttest |
| 20 | 6 Verbrennung | Einstieg „Kerze unter dem Glas“ (Demo mit echtem Teelicht und 2 Gläsern), Luft, Labor Teil A | Einstieg, Lerntext 1, 6.L1, A 6.1, 6.6 |
| 21 | 6 | Oxidation, Nachweise, Verbrennungsdreieck, Labor Teil B | Lerntext 2–4, A 6.2, 6.3, 6.L2 |
| 22 | 6 | Brandschutz, Fettbrand (Beispiel), Selbsttest | Lerntext 5, A 6.4, 6.5, Selbsttest |
| 23 | – | **Lernkontrolle 2** (Kapitel 4–6) und Wiederholung | Selbsttests 4–6 |
| 24 | 7 Atombau | Einstieg „Wie klein ist ein Atom?“, Elemente und Symbole | Einstieg, Lerntext 1, A 7.1 |
| 25 | 7 | Rutherford, Kern-Hülle-Modell, Ordnungszahl/Massenzahl | Lerntext 2, A 7.2, 7.3, 7.7 |
| 26 | 7 | Schalenmodell, Labor „Atom-Baukasten“ | Lerntext 3, 7.L1, 7.L2, A 7.4, 7.6 |
| 27 | 7 | Periodensystem lesen, Beispiel Natrium | Lerntext 4, Beispiel, A 7.5 |
| 28 | 7 | Übung + Selbsttest | Selbsttest, Wiederholung |
| 29 | 8 Bindung | Einstieg „Was hält Atome zusammen?“, Edelgasregel, Ionen | Einstieg, Lerntext 1–2, A 8.1, 8.2 |
| 30 | 8 | Ionenbindung und Salze, Labor „Bindungs-Werkstatt“ | Lerntext 2, Beispiel, A 8.4, 8.6, 8.L1 |
| 31 | 8 | Elektronenpaarbindung, Moleküle, Metallbindung | Lerntext 3–4, A 8.3, 8.5, 8.L2 |
| 32 | 8 + 9 | Selbsttest Kap. 8 · Start Kap. 9: Einstieg „Zauberei mit Rotkohl“ | Selbsttest 8, Einstieg 9 |
| 33 | 9 Säuren/Laugen | 🔬 **Versuch vor Ort 3: Rotkohlsaft-Indikator** + Protokoll, pH-Skala | Protokollseite Kap. 9, Lerntext 1–2, A 9.1–9.3 |
| 34 | 9 | Säuren und Laugen im Alltag, Gefahren, Labor „pH-Labor“ Teil A | Lerntext 3–4, 9.L1, A 9.6 |
| 35 | 9 | Neutralisation, Labor Teil B, Sodbrennen, Selbsttest · **Lernkontrolle 3** (Kap. 7–9) in der Folgewoche oder als Abschluss | Lerntext 5, 9.L2, A 9.4, 9.5, 9.7, Selbsttest |

## Hinweise zur Differenzierung

- **Basis (G-Niveau):** Lückentexte, Zuordnungen, Richtig/Falsch, Reihenfolgen. Diese können alle Schüler selbstständig mit der Lernseite prüfen.
- **Erweitert (M-Niveau):** Aufgaben mit freiem Antworttext (jeweils die letzten Aufgaben eines Kapitels) und Beispielaufgaben selbst lösen, bevor die Schritte aufgedeckt werden.
- **Unterstützung:** Vorlesefunktion 🔊, Schriftvergrößerung (A+), Wörterbuch mit Klick. Leseschwache Schüler arbeiten in Tandems.
- **Schnelle Schüler:** Labor-Aufträge erweitern (alle Gemische trennen, 5 Bau-Aufträge im Atom-Baukasten, alle Element-Paare in der Bindungs-Werkstatt).

## Lernkontrollen

Die Selbsttests (je 5 Fragen) und die Aufgaben des Arbeitsheftes eignen sich als Vorlage für die drei Lernkontrollen. Die Lösungen stehen in `LOESUNGEN.md`.
````

## Datei: `lehrkraft/LEHRERVERSUCHE.md`

````markdown
# Versuche vor Ort – Anleitung für die Lehrkraft

Drei Versuche, die auch **fachfremd gut durchführbar** sind: keine Gefahrstoffe im engeren Sinn, Haushaltsmaterial, kurze Vorbereitung.

| Nr. | Versuch | Kapitel | Sozialform | Zeit | Schwierigkeit |
|---|---|---|---|---|---|
| 1 | Karamell herstellen | 5 Chemische Reaktion | Lehrerdemonstration (Variante A) oder Gruppen (Variante B) | 30–45 min | mittel (Hitze) |
| 2 | Chromatografie mit Filzstiften | 4 Stoffgemische | Schülerversuch (Einzel/Partner) | 25 min | sehr leicht |
| 3 | Rotkohlsaft als Indikator | 9 Säuren und Laugen | Schülerversuch (Gruppen à 3–4) | 35 min | leicht |

---

## ⚠️ Vorab: Sicherheit bei fachfremdem Unterricht

- Maßgeblich ist die **RiSU** (Richtlinie zur Sicherheit im Unterricht, KMK) in der an Ihrer Schule gültigen Fassung. Lassen Sie sich von der Fachschaft Chemie bzw. der/dem Sicherheitsbeauftragten der Schule in den Chemieraum und die Brandschutzeinrichtungen (Not-Aus, Löschdecke, Feuerlöscher, Augendusche) **einweisen**.
- Für jeden Versuch ist eine **Gefährdungsbeurteilung** zu dokumentieren. Viele Schulen nutzen dafür D-GISS bzw. die Vorlagen der Fachschaft. Die Angaben unten helfen beim Ausfüllen, ersetzen die Gefährdungsbeurteilung aber nicht.
- Die **Sicherheitsbelehrung** der Klasse zu Beginn des Schuljahres und vor Schülerversuchen dokumentieren (Klassenbuch).
- **Im Chemieraum wird nichts gegessen oder getrunken** – auch nicht der Karamell! Wenn die Klasse probieren soll, den Versuch in der **Schulküche** mit Küchengeräten durchführen (dann ist es ein Lebensmittel-Versuch).

---

## 🔬 Versuch 1: Wir stellen Karamell her (Kapitel 5)

**Ziel:** Schüler erkennen an einem Alltagsbeispiel die zwei Kennzeichen einer chemischen Reaktion (Stoffumwandlung, Energieumwandlung) und dass die Reaktion nicht umkehrbar ist.

### Material (Variante A – Lehrerdemonstration, empfohlen)
- 2–3 Esslöffel Haushaltszucker
- kleine Edelstahlpfanne oder kleiner Topf (keine Beschichtung nötig)
- Heizplatte / Kochplatte (oder Schulküchenherd)
- Holzspatel, Backpapier auf Holzbrett (hitzefeste Unterlage)
- Schutzbrille für Lehrkraft und erste Reihe, feuchtes Tuch, Schale mit kaltem Wasser (zum Kühlen bei Kontakt)
- Vergleichsprobe: ein Schälchen weißer Zucker

### Material (Variante B – Gruppen, nur mit eingewiesener Klasse)
- je Gruppe: Teelicht, alter Metall-Esslöffel (wird schwarz!), Wäscheklammer als Griff, ½ Teelöffel Zucker, feuerfeste Unterlage, Schutzbrille

### Durchführung
1. Schutzbrillen auf. Schüler stehen im Halbkreis mit 1,5 m Abstand.
2. Zucker in die kalte Pfanne geben, Platte auf mittlere Stufe.
3. Nicht umrühren, nur leicht schwenken. Schüler beschreiben laut: Zucker schmilzt (ca. 185 °C), wird klar, goldgelb, dann bernsteinfarben/braun. Geruch nach Karamell.
4. Bei Bernsteinfarbe: Platte aus, einen Teil auf das Backpapier gießen (dünner Fladen).
5. Den Rest in der Pfanne weiter erhitzen, bis er schwarz wird und raucht (Fenster auf!) → Zuckerkohle.
6. Mindestens 10 Minuten abkühlen lassen. Dann darf der kalte Karamell **angefasst** (nicht gegessen) werden: hart, glasig, braun, klebrig an warmen Fingern.
7. Zum Vergleich: Ein Stück Karamell und etwas Zucker jeweils in Wasser geben → beide lösen sich, aber Karamell färbt das Wasser braun.

### Erwartete Beobachtungen
| | Zucker | Karamell |
|---|---|---|
| Farbe | weiß | goldgelb bis braun |
| Geruch | geruchlos | typischer Karamellgeruch |
| Form | körnige Kristalle | glasige, harte Masse |
| beim Abkühlen | – | wird **nicht** wieder weiß |

### Deutung (Tafelbild)
- Es ist ein **neuer Stoff mit neuen Eigenschaften** entstanden → **Stoffumwandlung**.
- Es musste **ständig Wärme zugeführt** werden; ohne Wärme hört es auf → **Energieumwandlung, endotherm**.
- Wortgleichung (vereinfacht): **Zucker → Karamell + Wasser(dampf)**; bei starkem Erhitzen: Zucker → Kohlenstoff + Wasser.
- Beim Abkühlen entsteht kein Zucker → die Reaktion ist nicht einfach umkehrbar (im Gegensatz zum Schmelzen von Eis).

### Sicherheit / Gefährdungsbeurteilung (Hinweise)
- Gefahr: **Verbrennungen** durch flüssigen Zucker (> 180 °C, haftet auf der Haut). Daher Variante A empfohlen. Bei Hautkontakt sofort 10 min unter fließendes kaltes Wasser.
- Rauchentwicklung bei Schritt 5 → lüften. Rauchmelder im Raum beachten!
- Keine Gefahrstoffe nach GHS. Entsorgung: abgekühlte Reste in den Hausmüll, Pfanne in heißem Wasser einweichen (Karamell löst sich).

---

## 🔬 Versuch 2: Geheimnis der Filzstiftfarben – Chromatografie (Kapitel 4)

**Ziel:** Schüler erkennen, dass eine scheinbar einheitliche Farbe ein Gemisch ist, und lernen ein Trennverfahren kennen.

### Material (pro Schüler/Paar)
- Streifen aus Filterpapier oder Kaffeefilter (ca. 2 × 12 cm) oder Rundfilter
- **wasserlösliche** Filzstifte: schwarz, braun, dunkelgrün (verschiedene Marken – Ergebnisse unterscheiden sich, das ist gewollt!)
- Glas/Becherglas, ca. 1 cm hoch Leitungswasser
- Bleistift, Klebestreifen oder Wäscheklammer

### Durchführung
1. 2 cm über dem unteren Rand eine Bleistiftlinie ziehen (Bleistift löst sich nicht).
2. Auf die Linie einen kräftigen Farbpunkt setzen.
3. Streifen so ins Glas hängen, dass das Papier ins Wasser taucht, der **Punkt aber über dem Wasser** bleibt.
4. 10–15 Minuten warten (in der Zeit: Lerntext 3 Trennverfahren, Aufgabe 4.3).
5. Streifen trocknen und ins Arbeitsheft kleben.

### Erwartete Beobachtungen / Deutung
- Das Wasser steigt im Papier nach oben und nimmt die Farbstoffe mit.
- Schwarz trennt sich meist in Blau, Gelb, Rot/Violett auf → **schwarze Tinte ist ein Gemisch**.
- Farbstoffe wandern unterschiedlich weit, weil sie unterschiedlich gut im Wasser gelöst sind bzw. unterschiedlich stark am Papier haften.

### Sicherheit
- Keine Gefahren. Keine permanenten Marker verwenden (lösen sich nicht in Wasser).

---

## 🔬 Versuch 3: Rotkohlsaft als Indikator (Kapitel 9)

**Ziel:** Schüler ordnen Haushaltsstoffe in sauer, neutral und alkalisch ein und erleben eine Neutralisation.

### Vorbereitung (Lehrkraft, am Vortag oder in der Stunde)
- ¼ Rotkohl klein schneiden, mit ca. 1 l heißem Wasser übergießen (nicht kochen nötig), 15 min ziehen lassen, abseihen. Saft ist violett. Im Kühlschrank 2–3 Tage haltbar.
- Alternative: Rotkohl aus dem Glas – den Saft verwenden (ist durch Essig schon leicht sauer → lila-rot; daher frischer Kohl besser).

### Material (pro Gruppe)
- 6 kleine Gläser oder Bechergläser, beschriftet
- Rotkohlsaft (je Glas ca. 2 cm hoch)
- Teelöffel oder Pipetten
- Zitronensaft, Haushaltsessig (5 %), Leitungswasser, Mineralwasser mit Kohlensäure, Natron (Backsoda, ½ TL in 100 ml Wasser), Seifenlauge (Flüssigseife in Wasser)
- Schutzbrillen

### Durchführung
1. Schutzbrille auf. Gläser beschriften, Rotkohlsaft einfüllen.
2. Je 2 TL / 5 Pipetten eines Haushaltsstoffes zugeben, umrühren, Farbe notieren.
3. Gläser nach Farbe sortieren (rot → violett → blau → grün).
4. Bonus (Neutralisation): In das Natron-Glas tropfenweise Essig geben → es schäumt (CO₂) und die Farbe wechselt über Violett nach Rot.

### Erwartete Beobachtungen
| Stoff | Farbe | Einordnung |
|---|---|---|
| Zitronensaft | rot | sauer |
| Essig | rot | sauer |
| Mineralwasser | rotviolett | schwach sauer |
| Leitungswasser | violett | neutral |
| Natron-Lösung | blau / blaugrün | schwach alkalisch |
| Seifenlauge | blaugrün / grün | alkalisch |

### Sicherheit / Gefährdungsbeurteilung (Hinweise)
- Nur Haushaltsstoffe; **keine** Abfluss-, Backofen- oder WC-Reiniger (stark ätzend).
- Essig und Seife reizen die Augen → Schutzbrille.
- Entsorgung: alles mit viel Wasser in den Ausguss.

---

## Weitere einfache Demonstrationen (optional)

- **Kerze unter dem Glas** (Kapitel 6, Einstieg): Teelicht, zwei unterschiedlich große Gläser, Stoppuhr. Ergebnis mit dem virtuellen Labor vergleichen.
- **Parfüm im Raum** (Kapitel 3, Einstieg): Parfümflasche vorne öffnen, Schüler heben die Hand, sobald sie es riechen.
- **Schwimmt oder sinkt** (Kapitel 2): Holz, Kerzenstück, Eisennagel und ein Aluminiumlöffel in eine Wanne mit Wasser. Vorher vermuten lassen, Ergebnis mit der Dichte-Tabelle vergleichen.
````

## Datei: `lehrkraft/BUCHZUORDNUNG.md`

````markdown
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
````

---
Ende von Teil 6 von 6. Alle Dateien sind vollständig. Führe jetzt Schritt 3 aus der Gesamt-Anweisung aus.
