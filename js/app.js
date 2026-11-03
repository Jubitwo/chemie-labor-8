/* Chemie-Labor 8 – Hauptprogramm: Seiten, Aufgaben, Wörterbuch, Fortschritt */
(function () {
  "use strict";
  const KAP = window.KAPITEL.slice().sort((a, b) => a.nr - b.nr);
  const GL = window.GLOSSAR;
  const LV = window.LEHRERVERSUCHE;
  const app = document.getElementById("app");
  const BUCH = "Fachwerk Chemie Baden-Württemberg, Gesamtband (Cornelsen)";

  /* ---------- Speicher (Fortschritt im Browser) ---------- */
  let S = { geloest: {}, notizen: {}, test: {}, smileys: {} };
  try { const roh = localStorage.getItem("chemie8"); if (roh) S = Object.assign(S, JSON.parse(roh)); } catch (e) { }
  function speichern() { try { localStorage.setItem("chemie8", JSON.stringify(S)); } catch (e) { } }

  /* ---------- Helfer ---------- */
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function el(tag, attr, html) { const e = document.createElement(tag); if (attr) for (const k in attr) { if (k === "class") e.className = attr[k]; else e.setAttribute(k, attr[k]); } if (html != null) e.innerHTML = html; return e; }
  function begriffe(text) {
    return String(text).replace(/\{([^{}|]+)(?:\|([^{}]+))?\}/g, (m, wort, key) => {
      const k = key || wort;
      if (!GL[k]) { console.warn("Fehlt im Wörterbuch:", k); return wort; }
      return `<button class="begriff" data-key="${esc(k)}">${wort}</button>`;
    });
  }
  function nurText(html) { const d = document.createElement("div"); d.innerHTML = html; return d.textContent.replace(/\s+/g, " ").trim(); }
  function vorlesen(text) {
    if (!("speechSynthesis" in window)) { alert("Dein Browser kann leider nicht vorlesen."); return; }
    speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = "de-DE"; u.rate = 0.92; speechSynthesis.speak(u);
  }
  function vorleseKnopf(getText) { const b = el("button", { class: "knopf klein hell vorlesen", title: "Vorlesen" }, "🔊"); b.onclick = () => vorlesen(getText()); return b; }
  function setzeFarbe(f) { document.documentElement.style.setProperty("--k", f || "#2e86ab"); }

  /* ---------- Wörterbuch-Fenster ---------- */
  const popup = document.getElementById("popup");
  function zeigeBegriff(k) {
    document.getElementById("popupTitel").textContent = k;
    document.getElementById("popupText").textContent = GL[k];
    document.getElementById("popupVorlesen").onclick = () => vorlesen(k + ". " + GL[k]);
    popup.hidden = false; popup.querySelector(".popup-zu").focus();
  }
  document.addEventListener("click", e => {
    const b = e.target.closest(".begriff"); if (b) { zeigeBegriff(b.dataset.key); return; }
    if (e.target === popup || e.target.closest(".popup-zu") || e.target.id === "popupLink") popup.hidden = true;
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") popup.hidden = true; });
  document.getElementById("schriftKnopf").onclick = () => { document.documentElement.classList.toggle("gross"); };

  /* ---------- Aufgaben ---------- */
  const BUCHST = "abcdefghij";
  function markGeloest(id, kasten) { S.geloest[id] = true; speichern(); kasten.classList.add("geloest"); }
  function rueck(kasten, art, text) { let r = kasten.querySelector(".rueck"); if (!r) { r = el("div"); kasten.querySelector(".knoepfe").after(r); } r.className = "rueck " + art; r.innerHTML = text; }

  function aufgabeBauen(a, opt) {
    opt = opt || {};
    const k = el("div", { class: "aufgabe" + (S.geloest[a.id] ? " geloest" : ""), id: "a-" + a.id.replace(/\./g, "-") });
    k.innerHTML = `<span class="ah">Arbeitsheft: Aufgabe ${a.id}</span><div class="frage"><span class="anr">${a.id}</span>${begriffe(a.frage)}</div>`;
    const inhalt = el("div"); k.appendChild(inhalt);
    const kn = el("div", { class: "knoepfe" }); k.appendChild(kn);
    const pruef = el("button", { class: "knopf klein" }, "✔ Prüfen");
    const loes = el("button", { class: "knopf klein hell" }, "Lösung zeigen"); loes.hidden = true;
    let versuche = 0, pruefe = null, zeigeLoesung = null;

    if (a.typ === "mc") {
      const mehr = Array.isArray(a.richtig); const richtig = mehr ? a.richtig : [a.richtig];
      if (mehr) inhalt.appendChild(el("p", { class: "klein" }, "<i>Mehrere Antworten können richtig sein.</i>"));
      a.optionen.forEach((o, i) => {
        const l = el("label", { class: "option" }, `<input type="${mehr ? "checkbox" : "radio"}" name="o${a.id}" value="${i}"> <b>${BUCHST[i]})</b> ${begriffe(o)}`);
        inhalt.appendChild(l);
      });
      pruefe = () => {
        const gew = [...inhalt.querySelectorAll("input:checked")].map(x => +x.value);
        inhalt.querySelectorAll(".option").forEach((l, i) => { l.classList.remove("richtig", "falsch"); if (gew.includes(i)) l.classList.add(richtig.includes(i) ? "richtig" : "falsch"); });
        const ok = gew.length === richtig.length && gew.every(x => richtig.includes(x));
        return ok ? 1 : (gew.some(x => richtig.includes(x)) ? 0.5 : 0);
      };
      zeigeLoesung = () => inhalt.querySelectorAll(".option").forEach((l, i) => { l.querySelector("input").checked = richtig.includes(i); l.classList.toggle("richtig", richtig.includes(i)); l.classList.remove("falsch"); });
    }

    if (a.typ === "wf") {
      a.aussagen.forEach((z, i) => {
        inhalt.appendChild(el("div", { class: "wf-zeile" }, `<span>${begriffe(z[0])}</span><label><input type="radio" name="wf${a.id}_${i}" value="1"> richtig</label><label><input type="radio" name="wf${a.id}_${i}" value="0"> falsch</label>`));
      });
      pruefe = () => {
        let n = 0; inhalt.querySelectorAll(".wf-zeile").forEach((z, i) => {
          const w = z.querySelector("input:checked"); z.style.background = "";
          if (w) { const ok = (w.value === "1") === a.aussagen[i][1]; z.style.background = ok ? "#e6f6ec" : "#fdecea"; if (ok) n++; }
        }); return n / a.aussagen.length;
      };
      zeigeLoesung = () => inhalt.querySelectorAll(".wf-zeile").forEach((z, i) => { z.querySelector(`input[value="${a.aussagen[i][1] ? 1 : 0}"]`).checked = true; z.style.background = "#e6f6ec"; });
    }

    if (a.typ === "luecke") {
      if (a.wortliste) inhalt.appendChild(el("div", { class: "wortliste" }, "Wörter: " + a.wortliste.map(w => `<span>${w}</span>`).join("")));
      const teile = a.text.split("___"); let h = "";
      teile.forEach((t, i) => { h += begriffe(t); if (i < teile.length - 1) h += `<input type="text" class="luecke" data-i="${i}" autocomplete="off" aria-label="Lücke ${i + 1}">`; });
      inhalt.appendChild(el("p", null, h));
      pruefe = () => {
        let n = 0; const fel = inhalt.querySelectorAll("input.luecke");
        fel.forEach(f => { const ok = a.loesungen[+f.dataset.i].some(l => C8.normal(l) === C8.normal(f.value)); f.classList.toggle("ok", ok); f.classList.toggle("nein", !ok); if (ok) n++; });
        return n / fel.length;
      };
      zeigeLoesung = () => inhalt.querySelectorAll("input.luecke").forEach(f => { f.value = a.loesungen[+f.dataset.i][0]; f.classList.add("ok"); f.classList.remove("nein"); });
    }

    if (a.typ === "zuordnen") {
      const rechts = C8.mischen([...new Set(a.paare.map(p => p[1]))], a.id);
      a.paare.forEach((p, i) => {
        const z = el("div", { class: "zu-zeile" }, `<span><b>${i + 1}.</b> ${begriffe(p[0])}</span>`);
        const s = el("select", { "aria-label": p[0] }); s.innerHTML = `<option value="">– bitte wählen –</option>` + rechts.map(r => `<option>${esc(r)}</option>`).join("");
        z.appendChild(s); inhalt.appendChild(z);
      });
      pruefe = () => { let n = 0; inhalt.querySelectorAll("select").forEach((s, i) => { const ok = s.value === a.paare[i][1]; s.classList.toggle("ok", ok); s.classList.toggle("nein", !ok); if (ok) n++; }); return n / a.paare.length; };
      zeigeLoesung = () => inhalt.querySelectorAll("select").forEach((s, i) => { s.value = a.paare[i][1]; s.classList.add("ok"); s.classList.remove("nein"); });
    }

    if (a.typ === "reihe") {
      const gem = C8.mischen(a.schritte, a.id);
      inhalt.appendChild(el("p", { class: "klein" }, "<i>Wähle für jeden Schritt die richtige Nummer.</i>"));
      gem.forEach(sch => {
        const z = el("div", { class: "reihe-zeile" });
        const s = el("select", { "aria-label": sch }); s.innerHTML = `<option value="">Nr.</option>` + a.schritte.map((_, i) => `<option>${i + 1}</option>`).join("");
        s.dataset.soll = a.schritte.indexOf(sch) + 1; z.appendChild(s); z.appendChild(el("span", null, begriffe(sch))); inhalt.appendChild(z);
      });
      pruefe = () => { let n = 0; const ss = inhalt.querySelectorAll("select"); ss.forEach(s => { const ok = s.value === s.dataset.soll; s.classList.toggle("ok", ok); s.classList.toggle("nein", !ok); if (ok) n++; }); return n / ss.length; };
      zeigeLoesung = () => inhalt.querySelectorAll("select").forEach(s => { s.value = s.dataset.soll; s.classList.add("ok"); s.classList.remove("nein"); });
    }

    if (a.typ === "frei") {
      if (a.zeichnen) inhalt.appendChild(el("p", null, "✏️ <i>Zeichne in deinem Arbeitsheft. Hier kannst du beschreiben, was du gezeichnet hast.</i>"));
      const t = el("textarea", { placeholder: "Schreibe deine Antwort hier …", "aria-label": "Antwort" }); t.value = S.notizen[a.id] || "";
      t.oninput = () => { S.notizen[a.id] = t.value; speichern(); };
      inhalt.appendChild(t);
      pruef.textContent = "Musterlösung vergleichen";
      pruef.onclick = () => {
        if (!k.querySelector(".muster")) {
          const m = el("div", { class: "muster" }, `<b>So könnte deine Antwort aussehen:</b><br>${begriffe(a.muster)}`);
          const ja = el("button", { class: "knopf klein gruen" }, "Meine Antwort passt ✓");
          ja.onclick = () => { markGeloest(a.id, k); ja.textContent = "Gespeichert ✓"; ja.disabled = true; if (opt.fertig) opt.fertig(); };
          m.appendChild(el("br")); m.appendChild(ja); kn.after(m);
        }
      };
      kn.appendChild(pruef); kn.appendChild(vorleseKnopf(() => nurText(a.frage)));
      return k;
    }

    pruef.onclick = () => {
      versuche++; const w = pruefe();
      if (w === 1) { rueck(k, "gut", "Super, alles richtig! ✓"); markGeloest(a.id, k); if (opt.fertig) opt.fertig(); }
      else if (w > 0) rueck(k, "halb", "Teilweise richtig. Die roten Felder stimmen noch nicht. Schau noch einmal oben im Text nach.");
      else rueck(k, "schlecht", "Noch nicht richtig. Lies den Abschnitt oben noch einmal und versuche es erneut.");
      if (versuche >= 2 && w < 1) loes.hidden = false;
    };
    loes.onclick = () => { zeigeLoesung(); rueck(k, "halb", "Hier ist die Lösung. Übertrage sie in dein Arbeitsheft und versuche zu verstehen, warum sie stimmt."); };
    kn.appendChild(pruef); kn.appendChild(loes); kn.appendChild(vorleseKnopf(() => nurText(a.frage)));
    return k;
  }

  /* ---------- Seiten ---------- */
  function fortschritt(kap) {
    const ids = kap.aufgaben.map(a => a.id).concat(kap.labor.aufgaben.map(a => a.id));
    return Math.round(100 * ids.filter(i => S.geloest[i]).length / ids.length);
  }
  function kachel(kap) {
    return `<a class="kachel" href="#/kapitel/${kap.nr}" style="--k:${kap.farbe}"><span class="ic">${kap.icon}</span><span class="nr">Kapitel ${kap.nr}</span><h3>${kap.titel}</h3><small>${kap.untertitel}</small><div class="fortschritt"><span style="width:${fortschritt(kap)}%"></span></div></a>`;
  }

  function seiteStart() {
    setzeFarbe("#2e86ab");
    app.innerHTML = `
    <section class="held"><div>
      <span class="marke">Chemie · Klasse 8 · Werkrealschule</span>
      <h1>Willkommen im Chemie-Labor!</h1>
      <p>Hier lernst du alles, was du in Klasse 8 in Chemie wissen musst – Schritt für Schritt. Zu jedem Kapitel gibt es einen <b>Einstieg</b>, eine <b>Erklärung</b>, ein <b>Beispiel</b>, ein <b>virtuelles Labor</b> zum Ausprobieren und <b>Übungsaufgaben</b>, die genau zu deinem Arbeitsheft passen.</p>
      <p>Unbekannte Wörter sind <button class="begriff" data-key="Modell">so markiert</button>. Klicke darauf und du bekommst eine Erklärung.</p>
      <a class="knopf" href="#/kapitel/1">Los geht's mit Kapitel 1 →</a>
    </div><div class="flasche">⚗️</div></section>
    <section class="karte ohne"><h2>So arbeitest du</h2>
      <ol><li>Lies den <b>Einstieg</b> und schreibe deine Vermutung auf.</li>
      <li>Lies die <b>Erklärung</b>. Klicke auf blaue Wörter, wenn du sie nicht kennst. Mit 🔊 wird dir vorgelesen.</li>
      <li>Schau dir das <b>Beispiel</b> Schritt für Schritt an.</li>
      <li>Probiere das <b>Labor</b> aus und bearbeite die Labor-Aufgaben.</li>
      <li>Löse die <b>Aufgaben</b> hier und im Arbeitsheft. Die Nummern sind gleich (z. B. Aufgabe 2.3).</li>
      <li>Mach den <b>Selbsttest</b>. Bei 4 von 5 Punkten bist du fit für das Kapitel!</li></ol>
    </section>
    <h2>Alle Kapitel</h2><div class="kapitelgitter">${KAP.map(kachel).join("")}</div>`;
  }

  function seiteKapitelListe() {
    setzeFarbe("#2e86ab");
    app.innerHTML = `<h1>Alle Kapitel</h1><p>Der grüne Balken zeigt, wie viele Aufgaben du schon gelöst hast.</p><div class="kapitelgitter">${KAP.map(kachel).join("")}</div>`;
  }

  function seiteKapitel(nr) {
    const kap = KAP.find(k => k.nr === nr); if (!kap) return seiteStart();
    setzeFarbe(kap.farbe);
    app.innerHTML = "";
    const add = (n) => { app.appendChild(n); return n; };

    add(el("div", { class: "kapkopf" }, `<div class="ic">${kap.icon}</div><div><span class="marke">Kapitel ${kap.nr} · ca. ${kap.wochen} Wochen</span><h1>${kap.titel}</h1><p style="margin:0">${kap.untertitel}</p></div>`));
    add(el("nav", { class: "kapnav" }, `<a href="#/kapitel/${nr}" data-sprung="einstieg">🚪 Einstieg</a><a href="#/kapitel/${nr}" data-sprung="lernen">📖 Lernen</a><a href="#/kapitel/${nr}" data-sprung="merke">💡 Merke</a><a href="#/kapitel/${nr}" data-sprung="beispiel">✏️ Beispiel</a><a href="#/kapitel/${nr}" data-sprung="labor">🧪 Labor</a><a href="#/kapitel/${nr}" data-sprung="ueben">🏋️ Üben</a><a href="#/kapitel/${nr}" data-sprung="test">✅ Selbsttest</a>`));
    add(el("div", { class: "buch" }, `<span class="ic">📘</span><div><b>Im Schulbuch:</b> ${BUCH} – Thema „${kap.buch.thema}“${kap.buch.seiten ? `, <b>S. ${kap.buch.seiten}</b>` : ""}.<br><b>Im Arbeitsheft:</b> Kapitel ${kap.nr}, Aufgaben ${kap.nr}.1 bis ${kap.nr}.${kap.aufgaben.length} und Labor-Aufgaben.</div>`));
    add(el("section", { class: "karte" }, `<h3>Das lernst du in diesem Kapitel</h3><ul class="ziele">${kap.ziele.map(z => `<li>${z}</li>`).join("")}</ul>`));

    // Einstieg
    const ein = add(el("section", { class: "karte einstieg", id: "einstieg" }, `<span class="marke">Einstieg</span><h2>${kap.einstieg.titel}</h2><p>${begriffe(kap.einstieg.text)}</p><div class="denk"><b>🤔 Denk nach:</b> ${begriffe(kap.einstieg.frage)}</div>`));
    ein.querySelector("h2").before(vorleseKnopf(() => kap.einstieg.titel + ". " + kap.einstieg.text + " " + kap.einstieg.frage));
    const vt = el("textarea", { placeholder: "Meine Vermutung …", "aria-label": "Meine Vermutung" }); vt.value = S.notizen["v" + nr] || ""; vt.oninput = () => { S.notizen["v" + nr] = vt.value; speichern(); };
    ein.appendChild(el("p", null, "<b>Meine Vermutung</b> (auch ins Arbeitsheft schreiben):")); ein.appendChild(vt);

    // Lernen
    const lern = add(el("section", { id: "lernen" }));
    kap.abschnitte.forEach((ab, i) => {
      const s = el("article", { class: "karte" }, `<span class="marke">Lernen ${i + 1}/${kap.abschnitte.length}</span><h2>${ab.titel}</h2>${begriffe(ab.text)}`);
      s.querySelector("h2").before(vorleseKnopf(() => ab.titel + ". " + nurText(ab.text)));
      lern.appendChild(s);
    });
    LABOR_HELFER.platzhalter(lern);

    // Merke
    add(el("section", { class: "karte merke", id: "merke" }, `<h2>💡 Merke</h2><ul>${kap.merke.map(m => `<li>${begriffe(m)}</li>`).join("")}</ul>`))
      .querySelector("h2").before(vorleseKnopf(() => kap.merke.join(" ")));

    // Beispiel
    const bsp = add(el("section", { class: "karte", id: "beispiel" }, `<span class="marke">Beispielaufgabe</span><h2>${kap.beispiel.titel}</h2><p><b>Aufgabe:</b> ${begriffe(kap.beispiel.aufgabe)}</p>`));
    const schritte = kap.beispiel.schritte.map((t, i) => { const d = el("div", { class: "schritt" }, `<b>Schritt ${i + 1}:</b> ${begriffe(t)}`); d.hidden = true; bsp.appendChild(d); return d; });
    const erg = el("div", { class: "merke", style: "padding:.6rem .9rem;border-radius:10px;margin-top:.6rem" }, `<b>Ergebnis:</b> ${begriffe(kap.beispiel.ergebnis)}`); erg.hidden = true; bsp.appendChild(erg);
    const nb = el("button", { class: "knopf" }, "Nächster Schritt →"); let si = 0;
    nb.onclick = () => { if (si < schritte.length) { schritte[si++].hidden = false; } else { erg.hidden = false; nb.hidden = true; } if (si === schritte.length) nb.textContent = "Ergebnis zeigen"; };
    bsp.appendChild(el("p")).appendChild(nb);

    // Labor
    const lab = add(el("section", { class: "labor", id: "labor" }, `<span class="marke">Virtuelles Labor</span><h2 style="color:#fff">${kap.labor.titel}</h2><p>${begriffe(kap.labor.auftrag)}</p>`));
    const tisch = el("div"); lab.appendChild(tisch);
    if (window.LABORE[kap.labor.id]) window.LABORE[kap.labor.id](tisch); else tisch.textContent = "Labor fehlt.";
    const lf = el("div", { class: "laborfrei" }, "<h3 style='color:var(--tinte)'>Labor-Aufgaben</h3>"); kap.labor.aufgaben.forEach(a => lf.appendChild(aufgabeBauen(a))); lab.appendChild(lf);

    // Lehrerversuch
    if (kap.lehrerversuch) add(versuchKarte(kap.lehrerversuch, true));

    // Üben
    const ue = add(el("section", { id: "ueben", class: "karte" }, `<span class="marke">Üben</span><h2>Aufgaben zum Üben</h2><p>Diese Aufgaben findest du genauso in deinem Arbeitsheft. Löse sie hier, prüfe dein Ergebnis und schreibe die richtige Lösung ins Heft.</p>`));
    kap.aufgaben.forEach(a => ue.appendChild(aufgabeBauen(a)));

    // Selbsttest
    const ts = add(el("section", { id: "test", class: "karte" }, `<span class="marke">Selbsttest</span><h2>Bin ich fit? – 5 Fragen</h2>`));
    const testBox = el("div"); ts.appendChild(testBox);
    const TQ = kap.test.map(C8.testFrage);
    kap.test.forEach((q0, qi) => {
      const q = Object.assign({}, q0, TQ[qi]);
      const d = el("div", { class: "aufgabe" }, `<div class="frage"><span class="anr">${qi + 1}</span>${begriffe(q.frage)}</div>`);
      q.optionen.forEach((o, i) => d.appendChild(el("label", { class: "option" }, `<input type="radio" name="t${q.id}" value="${i}"> <b>${BUCHST[i]})</b> ${o}`)));
      testBox.appendChild(d);
    });
    const tb = el("button", { class: "knopf" }, "Auswerten"); const terg = el("div", { class: "rueck" }); terg.hidden = true;
    tb.onclick = () => {
      let p = 0; TQ.forEach((q, qi) => {
        const box = testBox.children[qi]; const w = box.querySelector("input:checked");
        box.querySelectorAll(".option").forEach((l, i) => { l.classList.remove("richtig", "falsch"); if (i === q.richtig) l.classList.add("richtig"); else if (w && +w.value === i) l.classList.add("falsch"); });
        if (w && +w.value === q.richtig) p++;
      });
      S.test[kap.nr] = Math.max(S.test[kap.nr] || 0, p); speichern();
      terg.hidden = false; terg.className = "rueck " + (p >= 4 ? "gut" : p >= 3 ? "halb" : "schlecht");
      terg.innerHTML = `${p} von 5 Punkten. ` + (p >= 4 ? "Klasse, du bist fit für dieses Kapitel! 🎉" : p >= 3 ? "Gut! Schau dir die rot markierten Fragen noch einmal an." : "Lies das Kapitel noch einmal (vor allem „Merke“) und versuche es erneut.");
    };
    ts.appendChild(tb); ts.appendChild(terg);

    // Das kann ich
    const ck = add(el("section", { class: "karte" }, `<h2>Das kann ich jetzt</h2><p>Schätze dich ehrlich ein. Diese Liste steht auch am Ende des Kapitels im Arbeitsheft.</p>`));
    const ul = el("ul", { class: "check" }); ck.appendChild(ul);
    kap.ziele.forEach((z, i) => {
      const key = kap.nr + "-" + i; const li = el("li"); const sm = el("span", { class: "smileys" });
      ["😃", "😐", "😟"].forEach(s => { const b = el("button", { class: S.smileys[key] === s ? "an" : "", title: s }, s); b.onclick = () => { S.smileys[key] = s; speichern(); sm.querySelectorAll("button").forEach(x => x.classList.toggle("an", x === b)); }; sm.appendChild(b); });
      li.appendChild(sm); li.appendChild(el("span", null, z)); ul.appendChild(li);
    });

    // Weiter
    const nav = el("p", { style: "display:flex;justify-content:space-between;gap:1rem" });
    nav.innerHTML = (nr > 1 ? `<a class="knopf hell" href="#/kapitel/${nr - 1}">← Kapitel ${nr - 1}</a>` : "<span></span>") + (nr < KAP.length ? `<a class="knopf" href="#/kapitel/${nr + 1}">Kapitel ${nr + 1} →</a>` : `<a class="knopf" href="#/">Zur Startseite</a>`);
    add(nav);

    app.querySelectorAll("[data-sprung]").forEach(a => a.onclick = e => { e.preventDefault(); document.getElementById(a.dataset.sprung).scrollIntoView({ behavior: "smooth" }); });
  }

  function versuchKarte(id, kurz) {
    const v = LV[id];
    const c = el("section", { class: "karte versuchkarte", style: "border-top-color:#f4b400" });
    c.innerHTML = `<span class="marke" style="background:#f4b400;color:#1d2a3a">Versuch vor Ort – mit der Lehrkraft</span><h2>${v.titel}</h2>
      <p><b>Forscherfrage:</b> ${v.frage}</p>
      <div class="labortisch" style="grid-template-columns:1fr 1.4fr"><div><h4>Material</h4><ul>${v.material.map(m => `<li>${m}</li>`).join("")}</ul></div>
      <div><h4>Durchführung</h4><ol>${v.schritte.map(m => `<li>${m}</li>`).join("")}</ol></div></div>
      <p class="warn"><b>Sicherheit:</b> ${v.sicherheit}</p>
      <p><b>Darauf achtest du:</b> ${v.beobachtung.join(" · ")}</p>
      <h4>Auswertung (im Arbeitsheft)</h4><ol>${v.auswertung.map(m => `<li>${m}</li>`).join("")}</ol>
      <p>📄 Das Versuchsprotokoll dazu füllst du im <b>Arbeitsheft</b> aus (Seite „Versuch vor Ort“ in Kapitel ${v.kapitel}).</p>`;
    return c;
  }

  function seiteVersuche() {
    setzeFarbe("#f4b400");
    app.innerHTML = `<h1>Versuche vor Ort</h1><p>Diese Versuche machen wir gemeinsam im Chemieraum. Auf der Seite kannst du dich vorbereiten.</p>`;
    Object.keys(LV).sort((a, b) => LV[a].kapitel - LV[b].kapitel).forEach(id => app.appendChild(versuchKarte(id)));
  }

  function seiteLabore() {
    setzeFarbe("#13202e");
    app.innerHTML = `<h1>Alle Labore</h1><p>Hier kannst du jedes virtuelle Labor direkt öffnen. Die Labor-Aufgaben stehen auch im Arbeitsheft.</p><div class="kapitelgitter">${KAP.map(k => `<a class="kachel" style="--k:${k.farbe}" href="#/labor/${k.labor.id}"><span class="ic">${k.icon}</span><span class="nr">Kapitel ${k.nr}</span><h3>${k.labor.titel.replace("Labor: ", "")}</h3><small>${k.labor.auftrag.slice(0, 90)}…</small></a>`).join("")}</div>`;
  }
  function seiteLabor(id) {
    const kap = KAP.find(k => k.labor.id === id); if (!kap) return seiteLabore();
    setzeFarbe(kap.farbe);
    app.innerHTML = `<p><a href="#/labore">← alle Labore</a> · <a href="#/kapitel/${kap.nr}">zum Kapitel ${kap.nr}</a></p>`;
    const lab = el("section", { class: "labor" }, `<h1 style="color:#fff">${kap.labor.titel}</h1><p>${begriffe(kap.labor.auftrag)}</p>`); app.appendChild(lab);
    const t = el("div"); lab.appendChild(t); window.LABORE[id](t);
    const lf = el("div", { class: "laborfrei" }, "<h3>Labor-Aufgaben</h3>"); kap.labor.aufgaben.forEach(a => lf.appendChild(aufgabeBauen(a))); lab.appendChild(lf);
  }

  function seiteWoerterbuch() {
    setzeFarbe("#2e86ab");
    const keys = Object.keys(GL).sort((a, b) => a.localeCompare(b, "de"));
    app.innerHTML = `<h1>📖 Wörterbuch</h1><p>Alle Fachwörter und Fremdwörter, einfach erklärt. Klicke 🔊, um sie dir vorlesen zu lassen.</p><input class="suche" type="text" placeholder="Wort suchen …" aria-label="Wort suchen"><div class="woerter"></div>`;
    const box = app.querySelector(".woerter"); const su = app.querySelector(".suche");
    function zeig() {
      const q = su.value.toLowerCase(); box.innerHTML = "";
      keys.filter(k => !q || k.toLowerCase().includes(q) || GL[k].toLowerCase().includes(q)).forEach(k => {
        const d = el("div", null, `<b>${k}</b> – ${esc(GL[k])} `); const b = el("button", { class: "knopf klein hell" }, "🔊"); b.onclick = () => vorlesen(k + ". " + GL[k]); d.appendChild(b); box.appendChild(d);
      });
    }
    su.oninput = zeig; zeig();
  }

  /* ---------- Router ---------- */
  function route() {
    const h = location.hash.replace(/^#\/?/, "").split("/");
    document.querySelectorAll(".hauptnav a").forEach(a => a.classList.toggle("aktiv", a.getAttribute("href") === "#/" + (h[0] || "")));
    if (window.speechSynthesis) speechSynthesis.cancel();
    if (h[0] === "kapitel" && h[1]) seiteKapitel(+h[1]);
    else if (h[0] === "kapitel") seiteKapitelListe();
    else if (h[0] === "labore") seiteLabore();
    else if (h[0] === "labor") seiteLabor(h[1]);
    else if (h[0] === "woerterbuch") seiteWoerterbuch();
    else if (h[0] === "versuche") seiteVersuche();
    else seiteStart();
    LABOR_HELFER.platzhalter(app);
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
})();
