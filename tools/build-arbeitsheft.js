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
