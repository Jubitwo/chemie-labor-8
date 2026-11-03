/* Chemie-Labor 8 – Die 9 virtuellen Labore
   Jedes Labor: window.LABORE[id] = function(container) { ... }
   Alles läuft ohne Internet und ohne Bibliotheken. */
(function () {
  "use strict";
  const LABORE = {};
  function el(tag, attr, html) { const e = document.createElement(tag); if (attr) for (const k in attr) { if (k === "class") e.className = attr[k]; else e.setAttribute(k, attr[k]); } if (html != null) e.innerHTML = html; return e; }
  function log(ul, text) { const li = el("li", null, text); ul.prepend(li); }
  const SVGNS = "http://www.w3.org/2000/svg";
  function svgEl(tag, attr) { const e = document.createElementNS(SVGNS, tag); for (const k in attr) e.setAttribute(k, attr[k]); return e; }
  // Läuft ein Labor-Takt weiter, obwohl das Labor nicht mehr auf der Seite ist? -> stoppen
  function takt(container, fn, ms) { const id = setInterval(() => { if (!document.body.contains(container)) { clearInterval(id); return; } fn(); }, ms); return id; }

  /* ================= Helfer für Inhalte ================= */
  const PIKTOS = [
    { s: "💥", n: "explosiv", b: "kann explodieren" },
    { s: "🔥", n: "entzündbar", b: "fängt leicht Feuer" },
    { s: "⭕", n: "brandfördernd", b: "macht ein Feuer stärker (Flamme über Kreis)" },
    { s: "🛢️", n: "Gas unter Druck", b: "Gasflasche – kann bei Hitze platzen" },
    { s: "🧪", n: "ätzend", b: "zerstört Haut, Augen und Metalle" },
    { s: "☠️", n: "giftig", b: "kann schon in kleinen Mengen tödlich sein" },
    { s: "❗", n: "reizend / gesundheitsschädlich", b: "reizt Haut und Augen, schadet der Gesundheit" },
    { s: "🫁", n: "gesundheitsgefährdend", b: "kann Organe schädigen oder Krebs erzeugen" },
    { s: "🐟", n: "umweltgefährlich", b: "schadet Tieren und Pflanzen im Wasser" }
  ];
  function piktoHTML(p, mitText) { return `<div class="pikto"><div class="raute"><span>${p.s}</span></div>${mitText ? `<b>${p.n}</b><span>${p.b}</span>` : ""}</div>`; }
  function pseHTML(klickbar) {
    let h = `<div class="pse"><div class="kopfz"></div>` + [1, 2, 3, 4, 5, 6, 7, 8].map(g => `<div class="kopfz">${C8.ROEM[g]}</div>`).join("");
    for (let p = 1; p <= 4; p++) {
      h += `<div class="kopfz">${p}</div>`;
      for (let g = 1; g <= 8; g++) {
        const e = C8.ELEMENTE.find(x => x.periode === p && x.gruppe === g);
        h += e ? `<div class="el ${e.art === "m" ? "met" : e.art === "e" ? "edel" : "nmet"} ${klickbar ? "klickbar" : ""}" data-oz="${e.oz}" title="${e.name}"><small>${e.oz}</small><b>${e.sym}</b>${e.name}</div>` : `<div style="background:none"></div>`;
      }
    }
    return h + `</div><small>Blau = Metalle · Gelb = Nichtmetalle (und Halbmetalle) · Lila = Edelgase · Zeile = Periode · Spalte = Hauptgruppe</small>`;
  }
  const PHFARBE = ["#c1121f", "#e63946", "#f3722c", "#f8961e", "#f9c74f", "#e9d84a", "#b5d33c", "#43aa8b", "#2a9d8f", "#277da1", "#1d4e89", "#3a0ca3", "#5a189a", "#6a1b9a", "#4a148c"];
  function phHTML() { return PHFARBE.map((f, i) => `<span style="background:${f}">${i}</span>`).join(""); }
  function rotkohl(ph) { if (ph < 3) return "#d0234e"; if (ph < 5) return "#c2185b"; if (ph < 6.5) return "#9c3d9a"; if (ph < 7.5) return "#6a3d9a"; if (ph < 9) return "#3f51b5"; if (ph < 11) return "#00897b"; if (ph < 13) return "#43a047"; return "#c0ca33"; }
  function rotkohlName(ph) { if (ph < 5) return "rot"; if (ph < 6.5) return "rotviolett"; if (ph < 7.5) return "violett"; if (ph < 9) return "blau"; if (ph < 11) return "blaugrün"; if (ph < 13) return "grün"; return "gelb"; }

  window.LABOR_HELFER = {
    platzhalter(root) {
      root.querySelectorAll("[data-piktos]:not([data-fertig])").forEach(d => { d.innerHTML = PIKTOS.map(p => piktoHTML(p, true)).join(""); d.dataset.fertig = 1; });
      root.querySelectorAll("[data-pse]:not([data-fertig])").forEach(d => { d.innerHTML = pseHTML(false); d.dataset.fertig = 1; });
      root.querySelectorAll("[data-ph]:not([data-fertig])").forEach(d => { d.innerHTML = phHTML(); d.dataset.fertig = 1; });
    }, PIKTOS, rotkohl
  };

  /* ================= 1 Sicherheit ================= */
  LABORE.sicherheit = function (c) {
    c.innerHTML = `<div class="labortisch"><div class="feld"><h4>A: Welches Symbol ist das?</h4><div class="piktos" id="sA"></div><button class="knopf" id="sAp">Prüfen</button><div class="anzeige" id="sAe" style="margin-top:.6rem">Wähle zu jedem Symbol die Bedeutung.</div></div>
    <div class="feld"><h4>B: Gasbrenner anzünden</h4><p>Klicke die Schritte in der richtigen Reihenfolge.</p><div class="chips" id="sB"></div>
    <svg viewBox="0 0 200 170" width="200" height="170" id="sBr" style="margin-top:.7rem"></svg><div class="anzeige" id="sBe">Brenner ist aus.</div></div></div>`;
    const mix = C8.mischen(PIKTOS, "lab-pikto");
    const namen = C8.mischen(PIKTOS.map(p => p.n), "lab-namen");
    const A = c.querySelector("#sA");
    mix.forEach(p => { const d = el("div", { class: "pikto" }, `<div class="raute"><span>${p.s}</span></div>`); const s = el("select"); s.innerHTML = `<option value="">?</option>` + namen.map(n => `<option>${n}</option>`).join(""); s.dataset.soll = p.n; d.appendChild(s); A.appendChild(d); });
    c.querySelector("#sAp").onclick = () => { let n = 0; A.querySelectorAll("select").forEach(s => { const ok = s.value === s.dataset.soll; s.classList.toggle("ok", ok); s.classList.toggle("nein", !ok); if (ok) n++; }); c.querySelector("#sAe").textContent = `${n} von ${PIKTOS.length} richtig.` + (n === PIKTOS.length ? " Perfekt – du kennst alle Gefahrensymbole! 🏆" : " Die roten stimmen noch nicht."); };

    const SCHR = ["Schutzbrille auf, Haare zusammen", "Luftzufuhr schließen", "Streichholz anzünden", "Gashahn öffnen + Flamme ans Rohr", "Luftzufuhr öffnen"];
    const B = c.querySelector("#sB"), Be = c.querySelector("#sBe"), svg = c.querySelector("#sBr");
    let schritt = 0;
    function brenner(flamme) {
      svg.innerHTML = `<rect x="70" y="150" width="60" height="12" rx="3" fill="#8899aa"/><rect x="92" y="70" width="16" height="82" fill="#aab7c4"/><rect x="88" y="120" width="24" height="10" fill="${schritt >= 2 && schritt < 5 ? "#555" : "#c9a227"}"/>` +
        (flamme === "gelb" ? `<path d="M100 10 C80 40 85 65 100 70 C115 65 120 40 100 10Z" fill="#ffb703"/><path d="M100 30 C90 50 92 62 100 66 C108 62 110 50 100 30Z" fill="#fb8500"/>` : "") +
        (flamme === "blau" ? `<path d="M100 25 C88 45 90 66 100 70 C110 66 112 45 100 25Z" fill="#4cc9f0"/><path d="M100 45 C95 55 96 64 100 67 C104 64 105 55 100 45Z" fill="#4361ee"/>` : "");
    }
    function bauen() {
      B.innerHTML = ""; C8.mischen(SCHR, "brenner").forEach(t => {
        const b = el("button", { class: "chip" }, t); b.onclick = () => {
          if (t === SCHR[schritt]) { b.classList.add("an"); b.disabled = true; schritt++; Be.textContent = "✓ " + t;
            if (schritt === 4) brenner("gelb"); if (schritt === 4) Be.textContent = "Gelbe, leuchtende Flamme – sie rußt. Jetzt Luftzufuhr öffnen!";
            if (schritt === 5) { brenner("blau"); Be.textContent = "Geschafft! Blaue, rauschende Flamme – sehr heiß (bis 1500 °C). 🔥"; } }
          else { Be.textContent = "⚠️ Falsche Reihenfolge! „" + t + "“ ist jetzt gefährlich oder unmöglich. Fang noch einmal an."; schritt = 0; setTimeout(bauen, 1400); brenner(""); }
        }; B.appendChild(b);
      });
    }
    bauen(); brenner("");
  };

  /* ================= 2 Stoffe ================= */
  const PROBEN = [
    { n: "Eisen", aus: "grau, metallisch glänzend", mag: true, loe: false, str: true, strL: null, d: 7.9, erh: "glüht rot, schmilzt nicht" },
    { n: "Kupfer", aus: "rotbraun, metallisch glänzend", mag: false, loe: false, str: true, strL: null, d: 8.9, erh: "läuft schwarz an, schmilzt nicht" },
    { n: "Aluminium", aus: "silbrig-hell, metallisch glänzend", mag: false, loe: false, str: true, strL: null, d: 2.7, erh: "wird heiß, schmilzt erst bei 660 °C" },
    { n: "Kochsalz", aus: "weiße, würfelförmige Kristalle", mag: false, loe: true, str: false, strL: true, d: 2.2, erh: "knistert, schmilzt erst bei 801 °C" },
    { n: "Zucker", aus: "weiße Kristalle", mag: false, loe: true, str: false, strL: false, d: 1.6, erh: "schmilzt, wird braun, riecht nach Karamell" },
    { n: "Schwefel", aus: "gelbes Pulver", mag: false, loe: false, str: false, strL: null, d: 2.0, erh: "schmilzt bei 115 °C, brennt mit blauer Flamme, stechender Geruch" },
    { n: "Holz", aus: "braun, faserig, matt", mag: false, loe: false, str: false, strL: null, d: 0.5, erh: "brennt mit gelber Flamme, wird zu Kohle" },
    { n: "Kerzenwachs", aus: "weiß, matt, fühlt sich wachsig an", mag: false, loe: false, str: false, strL: null, d: 0.9, erh: "schmilzt schon bei ca. 60 °C" }
  ];
  LABORE.stoffe = function (c) {
    c.innerHTML = `<div class="labortisch"><div class="feld"><h4>Unbekannte Probe <span id="pNr"></span></h4><div style="font-size:4rem;text-align:center">🧫</div>
      <div class="chips" id="tests"></div><p><button class="knopf hell klein" id="neu">🔄 Neue Probe</button></p></div>
      <div class="feld"><h4>Mein Steckbrief</h4><ul class="protokoll" id="prot"><li>Noch keine Tests gemacht.</li></ul>
      <p>Das ist: <select id="tipp"><option value="">– Stoff wählen –</option>${PROBEN.map(p => `<option>${p.n}</option>`).join("")}</select> <button class="knopf klein" id="rat">Prüfen</button></p><div class="anzeige" id="erg">Mache mindestens 3 Tests.</div></div></div>`;
    const T = [
      ["👀 Aussehen", p => "Aussehen: " + p.aus],
      ["🧲 Magnet", p => "Magnet: " + (p.mag ? "wird angezogen" : "wird nicht angezogen")],
      ["💧 in Wasser", p => "Wasser: " + (p.loe ? "löst sich auf" : "löst sich nicht") + " · " + (p.d < 1 ? "schwimmt oben" : "sinkt nach unten")],
      ["💡 Strom (fest)", p => "Strom (fest): " + (p.str ? "Lämpchen leuchtet" : "Lämpchen bleibt aus")],
      ["💡 Strom (Lösung)", p => "Strom (Lösung): " + (p.strL === null ? "löst sich nicht – kein Test möglich" : p.strL ? "Lämpchen leuchtet" : "Lämpchen bleibt aus")],
      ["⚖️ Dichte messen", p => "Dichte: " + String(p.d).replace(".", ",") + " g/cm³"],
      ["🔥 Erhitzen", p => "Erhitzen: " + p.erh]
    ];
    let probe, nr = 0, n = 0; const prot = c.querySelector("#prot");
    function neu() { probe = PROBEN[Math.floor(Math.random() * PROBEN.length)]; nr++; n = 0; c.querySelector("#pNr").textContent = "Nr. " + nr; prot.innerHTML = "<li>Noch keine Tests gemacht.</li>"; c.querySelectorAll("#tests .chip").forEach(b => b.classList.remove("an")); c.querySelector("#erg").textContent = "Mache mindestens 3 Tests."; c.querySelector("#tipp").value = ""; }
    const tb = c.querySelector("#tests");
    T.forEach(t => { const b = el("button", { class: "chip" }, t[0]); b.onclick = () => { if (b.classList.contains("an")) return; if (n === 0) prot.innerHTML = ""; n++; b.classList.add("an"); const li = el("li", null, t[1](probe)); prot.appendChild(li); }; tb.appendChild(b); });
    c.querySelector("#neu").onclick = neu;
    c.querySelector("#rat").onclick = () => { const v = c.querySelector("#tipp").value; const e = c.querySelector("#erg"); if (!v) return; if (n < 3) { e.textContent = "Mache erst mindestens 3 Tests – Forscher raten nicht!"; return; } e.textContent = v === probe.n ? `✓ Richtig! Es ist ${probe.n}. Du hast ${n} Tests gebraucht. Übertrage den Steckbrief ins Arbeitsheft.` : `✗ Leider nicht. Schau dir deinen Steckbrief noch einmal an. Tipp: Vergleiche mit der Dichte-Tabelle.`; };
    neu();
  };

  /* ================= 3 Teilchen ================= */
  LABORE.teilchen = function (c) {
    c.innerHTML = `<div class="labortisch" style="grid-template-columns:1.4fr 1fr"><div class="feld"><canvas width="480" height="300" id="cv"></canvas></div>
    <div class="feld"><h4>Temperatur</h4><input type="range" class="slider" id="tr" min="-40" max="140" value="-20"><div class="anzeige" id="ta"></div>
    <h4>Was passiert gerade?</h4><ul class="protokoll" id="tp"></ul></div></div>`;
    const cv = c.querySelector("#cv"), cx = cv.getContext("2d"), tr = c.querySelector("#tr"), ta = c.querySelector("#ta"), tp = c.querySelector("#tp");
    const W = 480, H = 300, R = 9, N = 42; const P = [];
    for (let i = 0; i < N; i++) { const col = i % 7, row = Math.floor(i / 7); P.push({ hx: 150 + col * 2.2 * R + R, hy: H - 20 - row * 2.2 * R, x: 0, y: 0, vx: 0, vy: 0 }); }
    P.forEach(p => { p.x = p.hx; p.y = p.hy; });
    function zustand(t) { return t < 0 ? "fest" : t < 100 ? "flüssig" : "gasförmig"; }
    let alt = zustand(+tr.value);
    const UEB = { "fest>flüssig": "Schmelzen", "flüssig>fest": "Erstarren", "flüssig>gasförmig": "Sieden / Verdampfen", "gasförmig>flüssig": "Kondensieren", "fest>gasförmig": "Sublimieren", "gasförmig>fest": "Resublimieren" };
    function info() {
      const t = +tr.value, z = zustand(t);
      const txt = { fest: "Die Teilchen sind eng und geordnet. Sie schwingen nur auf der Stelle.", "flüssig": "Die Teilchen sind nah beieinander, aber ungeordnet. Sie gleiten aneinander vorbei.", "gasförmig": "Die Teilchen sind weit voneinander entfernt und fliegen frei herum." }[z];
      ta.innerHTML = `${t} °C → Wasser ist <b>${z}</b>${z === "fest" ? " (Eis)" : z === "gasförmig" ? " (Wasserdampf)" : ""}.<br>${txt}`;
      if (z !== alt) { log(tp, `<b>${UEB[alt + ">" + z]}</b> bei ${z === "fest" || alt === "fest" ? "0" : "100"} °C (${alt} → ${z})`); alt = z; }
    }
    tr.oninput = info; info();
    function schritt() {
      const t = +tr.value, z = zustand(t), tempo = 0.4 + (t + 40) / 45;
      if (z === "fest") {
        const amp = 0.6 + (t + 40) / 18;
        P.forEach(p => { p.x += (p.hx - p.x) * 0.3 + (Math.random() - .5) * amp; p.y += (p.hy - p.y) * 0.3 + (Math.random() - .5) * amp; p.vx = p.vy = 0; });
      } else {
        const top = z === "flüssig" ? H * 0.42 : 0;
        P.forEach(p => {
          if (z === "flüssig") { p.vy += 0.15; p.vx += (Math.random() - .5) * tempo * .6; p.vy += (Math.random() - .5) * tempo * .6; }
          const v = Math.hypot(p.vx, p.vy), max = z === "flüssig" ? tempo * 1.3 : tempo * 2.2;
          if (z === "gasförmig" && v < max * 0.6) { const a = Math.random() * 6.28; p.vx = Math.cos(a) * max; p.vy = Math.sin(a) * max; }
          if (v > max) { p.vx *= max / v; p.vy *= max / v; }
          p.x += p.vx; p.y += p.vy;
          if (p.x < R) { p.x = R; p.vx = Math.abs(p.vx); } if (p.x > W - R) { p.x = W - R; p.vx = -Math.abs(p.vx); }
          if (p.y > H - R) { p.y = H - R; p.vy = -Math.abs(p.vy) * (z === "flüssig" ? 0.3 : 1); } if (p.y < top + R) { p.y = top + R; p.vy = Math.abs(p.vy); }
        });
        if (z === "flüssig") for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) { const a = P[i], b = P[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy); if (d < 2 * R && d > 0) { const k = (2 * R - d) / d * 0.5; a.x -= dx * k; a.y -= dy * k; b.x += dx * k; b.y += dy * k; } }
      }
      cx.clearRect(0, 0, W, H);
      cx.fillStyle = "#123"; cx.fillRect(0, 0, W, H);
      cx.strokeStyle = "#3b5875"; cx.lineWidth = 3; cx.strokeRect(1.5, 1.5, W - 3, H - 3);
      P.forEach(p => { const g = cx.createRadialGradient(p.x - 3, p.y - 3, 1, p.x, p.y, R); g.addColorStop(0, "#bde0fe"); g.addColorStop(1, "#2e86ab"); cx.fillStyle = g; cx.beginPath(); cx.arc(p.x, p.y, R, 0, 6.29); cx.fill(); });
      cx.fillStyle = "#9ff0b6"; cx.font = "14px sans-serif"; cx.fillText("Wasserteilchen (Modell)", 10, 20);
    }
    takt(c, schritt, 33);
  };

  /* ================= 4 Gemische ================= */
  const K = {
    Sand: { art: "fest", korn: "fein" }, Kies: { art: "fest", korn: "grob" }, Salz: { art: "fest", loe: true, korn: "fein" },
    Eisenspäne: { art: "fest", mag: true, korn: "fein" }, Wasser: { art: "fl" }, "Öl": { art: "fl", oel: true }
  };
  const GEMISCHE = [
    { n: "Sand + Salz", k: ["Sand", "Salz"] },
    { n: "Sand + Eisenspäne + Salz", k: ["Sand", "Eisenspäne", "Salz"] },
    { n: "Schlammwasser (Sand + Wasser)", k: ["Sand", "Wasser"] },
    { n: "Salzwasser", k: ["Salz", "Wasser"], geloest: true },
    { n: "Öl + Wasser", k: ["Öl", "Wasser"] },
    { n: "Kies + Sand + Eisenspäne", k: ["Kies", "Sand", "Eisenspäne"] },
    { n: "schwarze Filzstiftfarbe", farbe: true }
  ];
  const METH = ["Sieben", "Magnet", "In Wasser lösen", "Filtrieren", "Dekantieren", "Eindampfen", "Destillieren", "Scheidetrichter", "Chromatografie"];
  LABORE.gemische = function (c) {
    c.innerHTML = `<p>Gemisch: <select id="gw">${GEMISCHE.map((g, i) => `<option value="${i}">${g.n}</option>`).join("")}</select> <button class="knopf hell klein" id="gr">🔄 Neu anfangen</button></p>
    <div class="labortisch"><div class="feld"><h4>Trennverfahren</h4><div class="chips" id="gm"></div><h4>Im Gefäß</h4><div class="anzeige" id="gb"></div></div>
    <div class="feld"><h4>Getrennte Stoffe</h4><div class="anzeige" id="gf">–</div><h4>Protokoll</h4><ol class="protokoll" id="gp"></ol></div></div>`;
    const gw = c.querySelector("#gw"), gb = c.querySelector("#gb"), gf = c.querySelector("#gf"), gp = c.querySelector("#gp");
    let g, rest, gel, frak, fertig, wasserWeg, plan;
    function start() { g = GEMISCHE[+gw.value]; rest = g.farbe ? ["Farbe"] : g.k.slice(); gel = !!g.geloest; frak = []; fertig = false; wasserWeg = false; plan = []; gp.innerHTML = ""; zeig(); }
    function hatWasser() { return rest.includes("Wasser"); }
    function zeig() {
      if (g.farbe) gb.textContent = rest.length ? "schwarze Filzstiftfarbe (sieht aus wie eine Farbe)" : "leer";
      else gb.innerHTML = rest.length ? rest.map(s => s === "Salz" && gel ? "Salz (gelöst)" : s).join(" + ") : "leer";
      gf.innerHTML = frak.length ? frak.map(f => "🧫 " + f.join(" + ")).join("<br>") : "–";
    }
    function pruefeFertig() {
      if (g.farbe) return;
      const orig = g.k.filter(s => s !== "Wasser" || !wasserWeg);
      if (rest.length === 1 && orig.includes(rest[0])) { frak.push([rest[0]]); rest = []; }
      if (rest.length === 1 && rest[0] === "Wasser" && !g.k.includes("Wasser")) rest = [];
      const rein = frak.every(f => f.length === 1);
      if (!rest.length && !fertig) {
        fertig = true;
        if (rein) log(gp, `🏆 <b>Geschafft!</b> Alle Stoffe sind sauber getrennt. Dein Plan: ${plan.join(" → ")}.` + (wasserWeg && g.k.includes("Wasser") ? " Tipp: Mit Destillieren bekommst du auch das Wasser zurück." : ""));
        else log(gp, "⚠️ Manche Stoffe sind noch zusammen. Fang neu an und überlege eine bessere Reihenfolge.");
      }
    }
    function machen(m) {
      if (fertig) { log(gp, "Fertig! Wähle ein neues Gemisch oder fang neu an."); return; }
      const fl = rest.some(s => K[s] && K[s].art === "fl");
      let msg = "";
      if (g.farbe) {
        if (m === "Chromatografie") { frak.push(["blauer Farbstoff"], ["gelber Farbstoff"], ["roter/violetter Farbstoff"]); rest = []; fertig = true; plan.push(m); log(gp, "🏆 Das Wasser wandert im Papier nach oben und nimmt die Farbstoffe verschieden weit mit: Blau, Gelb und Rot/Violett erscheinen. Schwarz war ein Gemisch!"); }
        else log(gp, `${m}: Das funktioniert hier nicht. Die Farbstoffe sind fein gelöst und mischen sich zu Schwarz.`);
        zeig(); return;
      }
      plan.push(m);
      switch (m) {
        case "Sieben": { if (fl) { msg = "Sieben im Nassen klappt nicht gut. Erst trennen, wenn keine Flüssigkeit da ist."; plan.pop(); break; } const grob = rest.filter(s => K[s].korn === "grob"); if (!grob.length) { msg = "Alle Körner sind gleich fein – das Sieb hilft nicht."; plan.pop(); break; } frak.push(grob); rest = rest.filter(s => !grob.includes(s)); msg = "Die groben Körner (" + grob.join(", ") + ") bleiben im Sieb."; break; }
        case "Magnet": { const m2 = rest.filter(s => K[s].mag); if (!m2.length) { msg = "Der Magnet zieht nichts an."; plan.pop(); break; } frak.push(m2); rest = rest.filter(s => !K[s].mag); msg = "Der Magnet zieht die Eisenspäne heraus."; break; }
        case "In Wasser lösen": { if (!hatWasser()) rest.push("Wasser"); if (rest.includes("Salz")) { gel = true; msg = "Wasser dazu, umrühren: Das Salz löst sich auf. " + (rest.includes("Sand") || rest.includes("Kies") ? "Sand/Kies lösen sich nicht." : ""); } else msg = "Wasser dazu – aber nichts löst sich."; break; }
        case "Filtrieren": case "Dekantieren": {
          if (!fl) { msg = "Es gibt keine Flüssigkeit zum " + (m === "Filtrieren" ? "Filtrieren" : "Abgießen") + ". Tipp: Erst in Wasser lösen."; plan.pop(); break; }
          if (rest.includes("Öl")) { msg = "Öl und Wasser laufen beide durch den Filter. Hier hilft ein Scheidetrichter."; plan.pop(); break; }
          const fest = rest.filter(s => K[s].art === "fest" && !(s === "Salz" && gel));
          if (!fest.length) { msg = "Nichts bleibt " + (m === "Filtrieren" ? "im Filter" : "am Boden") + ". Gelöste Stoffe gehen durch!"; plan.pop(); break; }
          if (rest.includes("Salz") && !gel) { msg = "Das Salz ist noch nicht gelöst und bleibt mit im Filter hängen. Erst lösen!"; frak.push(fest); rest = rest.filter(s => !fest.includes(s)); break; }
          frak.push(fest); rest = rest.filter(s => !fest.includes(s));
          msg = (m === "Filtrieren" ? "Im Filter bleibt der Rückstand: " : "Am Boden setzt sich ab: ") + fest.join(", ") + ". " + (m === "Dekantieren" ? "(Abgießen ist etwas ungenau – Filtrieren ist sauberer.) " : "") + "Durch läuft: " + rest.map(s => s === "Salz" ? "gelöstes Salz" : s).join(" + ") + "."; break; }
        case "Eindampfen": {
          if (!hatWasser()) { msg = "Es gibt kein Wasser zum Eindampfen."; plan.pop(); break; }
          if (rest.includes("Öl")) { msg = "Öl verdampft nicht so leicht und kann sogar brennen! Erst Öl abtrennen."; plan.pop(); break; }
          if (rest.some(s => K[s].art === "fest" && s !== "Salz")) { msg = "Der Sand ist noch dabei und bleibt mit dem Salz zusammen zurück."; }
          rest = rest.filter(s => s !== "Wasser"); wasserWeg = true;
          const r = rest.slice(); if (r.length) { frak.push(r); rest = []; msg += " Das Wasser verdampft. Zurück bleibt: " + r.join(" + ") + "."; } else msg += " Das Wasser verdampft – es bleibt nichts zurück."; gel = false; break; }
        case "Destillieren": {
          if (!hatWasser()) { msg = "Es gibt keine Flüssigkeit zum Destillieren."; plan.pop(); break; }
          if (rest.includes("Öl")) { msg = "Für Öl und Wasser nimmt man im Unterricht den Scheidetrichter – das ist einfacher und sicherer."; plan.pop(); break; }
          frak.push(["Wasser"]); rest = rest.filter(s => s !== "Wasser");
          const r = rest.slice(); if (r.length) { frak.push(r); rest = []; } gel = false; msg = "Das Wasser verdampft, wird im Kühler wieder flüssig und tropft rein ins Auffanggefäß." + (r.length ? " Im Kolben bleibt: " + r.join(" + ") + "." : ""); break; }
        case "Scheidetrichter": {
          if (!rest.includes("Öl")) { msg = "Es gibt keine zwei Flüssigkeiten, die sich nicht mischen."; plan.pop(); break; }
          frak.push(["Wasser"]); frak.push(["Öl"]); rest = rest.filter(s => s !== "Öl" && s !== "Wasser"); msg = "Das Öl schwimmt oben (kleinere Dichte). Unten lässt man das Wasser ab."; break; }
        case "Chromatografie": msg = "Chromatografie nutzt man für Farbstoffe. Hier hilft sie nicht."; plan.pop(); break;
      }
      log(gp, `<b>${m}:</b> ${msg}`); pruefeFertig(); zeig();
    }
    const gm = c.querySelector("#gm"); METH.forEach(m => { const b = el("button", { class: "chip" }, m); b.onclick = () => machen(m); gm.appendChild(b); });
    gw.onchange = start; c.querySelector("#gr").onclick = start; start();
  };

  /* ================= 5 Reaktion (Karamell) ================= */
  LABORE.reaktion = function (c) {
    c.innerHTML = `<div class="labortisch"><div class="feld"><svg viewBox="0 0 300 220" width="300" height="220" id="ks"></svg>
    <p style="text-align:center"><button class="knopf" id="kh">🔥 Erhitzen</button> <button class="knopf hell" id="kk">❄️ Abkühlen</button> <button class="knopf hell klein" id="kn">🔄 Neu</button></p></div>
    <div class="feld"><div class="anzeige" id="ka"></div><h4>Beobachtungen</h4><ul class="protokoll" id="kp"></ul></div></div>`;
    const svg = c.querySelector("#ks"), ka = c.querySelector("#ka"), kp = c.querySelector("#kp");
    let T, maxT, heiz, stufe;
    const STUFEN = [
      { ab: -1, f: "#ffffff", t: "weißer Zucker (Kristalle)" },
      { ab: 185, f: "#fff3c4", t: "Zucker schmilzt – klare, hellgelbe Flüssigkeit" },
      { ab: 195, f: "#f2b134", t: "goldgelb – es riecht nach Karamell" },
      { ab: 210, f: "#a0581c", t: "braun – Karamell ist entstanden" },
      { ab: 235, f: "#1b1b1b", t: "schwarz! Es raucht und riecht verbrannt – Zuckerkohle (Kohlenstoff)" }
    ];
    function neu() { T = 20; maxT = 20; heiz = false; stufe = 0; kp.innerHTML = ""; log(kp, "Start: 2 Esslöffel weißer Zucker in der Pfanne, 20 °C."); malen(); }
    function malen() {
      let s = 0; STUFEN.forEach((x, i) => { if (maxT >= x.ab) s = i; });
      if (s !== stufe) { stufe = s; log(kp, `${Math.round(T)} °C: ${STUFEN[s].t}`); }
      const fluessig = T >= 185 && s >= 1, kalt = T < 60;
      const f = STUFEN[s].f;
      svg.innerHTML = `<rect x="0" y="0" width="300" height="220" fill="#0b141e"/>
      ${heiz ? `<g fill="#ff6b35"><path d="M100 205 q10 -25 20 0z"/><path d="M140 205 q10 -30 20 0z"/><path d="M180 205 q10 -25 20 0z"/></g>` : ""}
      <rect x="70" y="190" width="160" height="8" fill="#556"/>
      <path d="M60 150 L240 150 L225 185 L75 185 Z" fill="#8a97a6"/><rect x="240" y="155" width="55" height="9" rx="4" fill="#444"/>
      ${fluessig || s >= 1 ? `<path d="M72 152 L228 152 L221 172 L79 172 Z" fill="${f}" opacity="${fluessig ? 1 : .95}"/>` : [...Array(22)].map((_, i) => `<rect x="${80 + (i * 37) % 140}" y="${140 + (i * 13) % 12}" width="8" height="8" fill="#fff" transform="rotate(${i * 17} ${84 + (i * 37) % 140} ${144 + (i * 13) % 12})"/>`).join("")}
      ${s >= 2 && T > 150 ? `<g stroke="#ccc" stroke-width="3" fill="none" opacity=".6"><path d="M120 130 q-10 -20 0 -40 q10 -20 0 -40"/><path d="M170 130 q-10 -20 0 -40 q10 -20 0 -40"/></g>` : ""}
      ${s >= 4 && T > 150 ? `<g fill="#777" opacity=".7"><circle cx="150" cy="80" r="22"/><circle cx="175" cy="60" r="18"/><circle cx="130" cy="55" r="15"/></g>` : ""}
      <rect x="20" y="20" width="16" height="140" rx="8" fill="#223"/><rect x="23" y="${155 - Math.min(132, T / 260 * 132)}" width="10" height="${Math.min(132, T / 260 * 132)}" fill="#e63946"/>
      <text x="44" y="30" fill="#9ff0b6" font-size="14">${Math.round(T)} °C</text>`;
      ka.innerHTML = `Temperatur: <b>${Math.round(T)} °C</b> · Höchste Temperatur: ${Math.round(maxT)} °C<br>Zustand: ${s === 0 ? "weißer Zucker" : STUFEN[s].t}${s >= 1 && kalt ? " – abgekühlt: fest und hart" : ""}`;
    }
    c.querySelector("#kh").onclick = () => { heiz = true; log(kp, "Herd an – es wird erhitzt."); };
    c.querySelector("#kk").onclick = () => { if (heiz) { heiz = false; log(kp, "Herd aus – abkühlen lassen."); } };
    c.querySelector("#kn").onclick = neu;
    let kaltGemeldet = false;
    takt(c, () => {
      if (heiz) { T = Math.min(260, T + 3); kaltGemeldet = false; } else if (T > 20) T = Math.max(20, T - 4);
      maxT = Math.max(maxT, T);
      if (!heiz && T <= 25 && maxT >= 185 && !kaltGemeldet) { kaltGemeldet = true; log(kp, "<b>Abgekühlt:</b> Der Stoff ist hart und " + (stufe >= 4 ? "schwarz" : "braun bzw. goldgelb") + ". Er wird <b>nicht wieder zu weißem Zucker</b>. → Ein neuer Stoff ist entstanden: chemische Reaktion! Ohne Wärme läuft sie nicht weiter: endotherm."); }
      if (!heiz && T <= 25 && maxT < 185 && maxT > 60 && !kaltGemeldet) { kaltGemeldet = true; log(kp, "Abgekühlt: Der Zucker war nicht heiß genug und ist unverändert weiß."); }
      malen();
    }, 200);
    neu();
  };

  /* ================= 6 Verbrennung ================= */
  LABORE.verbrennung = function (c) {
    c.innerHTML = `<div class="labortisch"><div class="feld"><h4>A: Kerze unter dem Glas</h4><svg viewBox="0 0 240 220" width="240" height="220" id="vk"></svg>
    <p>Glas: <span class="chips" id="vg"></span></p><p><button class="knopf" id="vs">Glas überstülpen</button> <button class="knopf hell klein" id="vn">Kerze anzünden</button></p>
    <div class="anzeige" id="va">Kerze brennt. Wähle ein Glas.</div><ul class="protokoll" id="vm"></ul></div>
    <div class="feld"><h4>B: Das Verbrennungsdreieck</h4><p>Situation: <select id="vsit"><option value="holz">Lagerfeuer (Holz)</option><option value="fett">Fettbrand in der Pfanne</option></select></p>
    <svg viewBox="0 0 240 200" width="240" height="200" id="vd"></svg><div class="chips" id="vl"></div><div class="anzeige" id="vb" style="margin-top:.5rem"></div></div></div>`;
    // Teil A
    const vk = c.querySelector("#vk"), va = c.querySelector("#va"), vm = c.querySelector("#vm");
    const GL = { klein: { r: 38, h: 70, t: 5.5 }, mittel: { r: 52, h: 95, t: 11 }, "groß": { r: 70, h: 130, t: 22 } };
    let glas = "mittel", drauf = false, brennt = true, t0 = 0, dauer = 0, fl = 1;
    const vg = c.querySelector("#vg"); Object.keys(GL).forEach(k => { const b = el("button", { class: "chip" + (k === glas ? " an" : "") }, k); b.onclick = () => { if (drauf) return; glas = k; vg.querySelectorAll(".chip").forEach(x => x.classList.toggle("an", x === b)); malK(); }; vg.appendChild(b); });
    function malK() {
      const g = GL[glas];
      vk.innerHTML = `<rect width="240" height="220" fill="#0b141e"/><rect x="20" y="200" width="200" height="8" fill="#556"/>
      <rect x="108" y="150" width="24" height="50" rx="3" fill="#f1faee"/><line x1="120" y1="150" x2="120" y2="141" stroke="#222" stroke-width="2"/>
      ${brennt ? `<path d="M120 ${142 - 22 * fl} C${112 - 2 * fl} ${136 - 8 * fl} ${113} 141 120 143 C127 141 ${128 + 2 * fl} ${136 - 8 * fl} 120 ${142 - 22 * fl}Z" fill="#ffb703"/>` : `<path d="M120 138 q-6 -12 2 -24 q-8 -10 0 -22" stroke="#999" stroke-width="2" fill="none" opacity=".6"/>`}
      ${drauf ? `<rect x="${120 - g.r}" y="${200 - g.h}" width="${2 * g.r}" height="${g.h}" rx="6" fill="rgba(160,220,255,.15)" stroke="#a8dadc" stroke-width="3"/>` : `<rect x="${120 - g.r}" y="10" width="${2 * g.r}" height="${g.h}" rx="6" fill="rgba(160,220,255,.08)" stroke="#a8dadc" stroke-dasharray="5 4" stroke-width="2"/>`}`;
    }
    c.querySelector("#vs").onclick = () => { if (drauf || !brennt) return; drauf = true; t0 = performance.now(); dauer = GL[glas].t + (Math.random() - .5); va.textContent = "Glas ist drauf … Zeit läuft."; malK(); };
    c.querySelector("#vn").onclick = () => { drauf = false; brennt = true; fl = 1; va.textContent = "Kerze brennt. Wähle ein Glas."; malK(); };
    takt(c, () => {
      if (drauf && brennt) { const t = (performance.now() - t0) / 1000; fl = Math.max(0.15, 1 - t / dauer); va.textContent = `Stoppuhr: ${t.toFixed(1).replace(".", ",")} s`; if (t >= dauer) { brennt = false; va.textContent = `Die Kerze ist aus! Brenndauer: ${dauer.toFixed(1).replace(".", ",")} s`; log(vm, `${glas}es Glas: ${dauer.toFixed(1).replace(".", ",")} s`); } malK(); }
    }, 100);
    malK();
    // Teil B
    const vd = c.querySelector("#vd"), vb = c.querySelector("#vb"), vl = c.querySelector("#vl"), sit = c.querySelector("#vsit");
    let seiten = { stoff: true, sauer: true, waerme: true }, boom = false;
    function malD() {
      const an = seiten.stoff && seiten.sauer && seiten.waerme && !boom;
      const s = (on, x1, y1, x2, y2, txt, tx, ty) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${on ? "#9ff0b6" : "#444"}" stroke-width="8" stroke-linecap="round" ${on ? "" : 'stroke-dasharray="4 10"'}/><text x="${tx}" y="${ty}" fill="${on ? "#fff" : "#777"}" font-size="12" text-anchor="middle">${txt}</text>`;
      vd.innerHTML = `<rect width="240" height="200" fill="#0b141e"/>` + s(seiten.stoff, 40, 170, 200, 170, "brennbarer Stoff", 120, 192) + s(seiten.sauer, 40, 170, 120, 30, "Sauerstoff", 52, 95) + s(seiten.waerme, 200, 170, 120, 30, "Wärme", 192, 95) +
        (an ? `<path d="M120 70 C95 105 100 140 120 150 C140 140 145 105 120 70Z" fill="#fb8500"/><path d="M120 100 C110 120 112 140 120 146 C128 140 130 120 120 100Z" fill="#ffb703"/>` : "") +
        (boom ? `<text x="120" y="120" font-size="54" text-anchor="middle">💥</text>` : "");
      vb.innerHTML = boom ? "💥 <b>Fettexplosion!</b> Das Wasser verdampft schlagartig und reißt brennendes Fett mit. Fettbrände <b>niemals</b> mit Wasser löschen! Richtig: Deckel drauf." : an ? "Das Feuer brennt – alle drei Seiten sind da." : "Das Feuer ist aus! Fehlende Seite: " + [!seiten.stoff && "brennbarer Stoff", !seiten.sauer && "Sauerstoff", !seiten.waerme && "Wärme"].filter(Boolean).join(", ") + ".";
    }
    function knoepfe() {
      vl.innerHTML = ""; const fett = sit.value === "fett";
      const L = [["💧 Wasser", () => { if (fett) boom = true; else seiten.waerme = false; }], [fett ? "🍳 Deckel drauf" : "🧣 Löschdecke", () => seiten.sauer = false], [fett ? "🔌 Herd aus + Pfanne weg" : "🪵 Holz wegnehmen", () => seiten.stoff = false], ["🔥 Neu anzünden", () => { seiten = { stoff: true, sauer: true, waerme: true }; boom = false; }]];
      L.forEach(([t, f]) => { const b = el("button", { class: "chip" }, t); b.onclick = () => { f(); malD(); }; vl.appendChild(b); });
    }
    sit.onchange = () => { seiten = { stoff: true, sauer: true, waerme: true }; boom = false; knoepfe(); malD(); };
    knoepfe(); malD();
  };

  /* ================= 7 Atome ================= */
  LABORE.atome = function (c) {
    c.innerHTML = `<div class="labortisch"><div class="feld"><svg viewBox="0 0 320 320" width="320" height="320" id="as"></svg></div>
    <div class="feld"><div id="az"></div><div class="anzeige" id="aa"></div>
    <p><button class="knopf klein" id="aauf">🎲 Bau-Auftrag</button> <button class="knopf hell klein" id="a0">Leeren</button></p><div class="anzeige" id="aauft">Klicke auf „Bau-Auftrag“ oder auf ein Element.</div></div></div><div class="feld" style="margin-top:1rem" id="apse"></div>`;
    let p = 1, n = 0, e = 1, ziel = null;
    const az = c.querySelector("#az");
    [["Protonen p⁺", "p", "#e63946"], ["Neutronen n", "n", "#adb5bd"], ["Elektronen e⁻", "e", "#4cc9f0"]].forEach(([t, k, f]) => {
      const z = el("p", { style: "display:flex;align-items:center;gap:.5rem" }, `<span style="width:9rem"><span style="color:${f}">●</span> ${t}</span>`);
      const m = el("button", { class: "knopf hell klein" }, "−"), pl = el("button", { class: "knopf klein" }, "+"), w = el("b", { id: "w" + k });
      m.onclick = () => { if (k === "p") p = Math.max(1, p - 1); if (k === "n") n = Math.max(0, n - 1); if (k === "e") e = Math.max(0, e - 1); mal(); };
      pl.onclick = () => { if (k === "p") p = Math.min(20, p + 1); if (k === "n") n = Math.min(24, n + 1); if (k === "e") e = Math.min(20, e + 1); mal(); };
      z.append(m, w, pl); az.appendChild(z);
    });
    c.querySelector("#apse").innerHTML = pseHTML(true);
    c.querySelectorAll("#apse .el").forEach(d => d.onclick = () => { const x = C8.ELEMENTE[+d.dataset.oz - 1]; p = x.oz; e = x.oz; n = x.masse - x.oz; mal(); });
    c.querySelector("#a0").onclick = () => { p = 1; n = 0; e = 0; mal(); };
    c.querySelector("#aauf").onclick = () => { ziel = C8.ELEMENTE[Math.floor(Math.random() * 20)]; c.querySelector("#aauft").innerHTML = `Baue ein <b>${ziel.name}</b>-Atom (neutral, Massenzahl ${ziel.masse}). Wie viele p⁺, n und e⁻ brauchst du?`; };
    function mal() {
      ["p", "n", "e"].forEach(k => c.querySelector("#w" + k).textContent = { p, n, e }[k]);
      const x = C8.ELEMENTE[p - 1], sch = C8.schalen(e), lad = p - e;
      const svg = c.querySelector("#as"); let h = `<rect width="320" height="320" fill="#0b141e"/>`;
      sch.forEach((anz, i) => { const r = 55 + i * 32; h += `<circle cx="160" cy="160" r="${r}" fill="none" stroke="#36506b" stroke-width="2"/>`; for (let j = 0; j < anz; j++) { const a = -Math.PI / 2 + j * 2 * Math.PI / anz + i * .3; h += `<circle cx="${160 + r * Math.cos(a)}" cy="${160 + r * Math.sin(a)}" r="7" fill="#4cc9f0"/>`; } });
      const teile = []; for (let i = 0; i < p; i++) teile.push("#e63946"); for (let i = 0; i < n; i++) teile.push("#adb5bd");
      C8.mischen(teile, "k" + p + "-" + n).forEach((f, i) => { const a = i * 2.4, r = 4.2 * Math.sqrt(i); h += `<circle cx="${160 + r * Math.cos(a)}" cy="${160 + r * Math.sin(a)}" r="6" fill="${f}" stroke="#0b141e"/>`; });
      svg.innerHTML = h;
      const ladTxt = lad === 0 ? "neutral (Atom)" : lad > 0 ? `positiv geladen: Ion ${x.sym}${lad > 1 ? lad : ""}⁺` : `negativ geladen: Ion ${x.sym}${-lad > 1 ? -lad : ""}⁻`;
      const aussen = sch.length ? sch[sch.length - 1] : 0;
      c.querySelector("#aa").innerHTML = `Element: <b>${x.name} (${x.sym})</b> · Ordnungszahl ${p}<br>Massenzahl: ${p + n}${p + n !== x.masse ? ` <span style="color:#ffd166">(häufigste: ${x.masse})</span>` : " ✓"}<br>Ladung: ${ladTxt}<br>Elektronen auf den Schalen: ${sch.join(" – ") || "keine"}${e === p ? `<br>Periode ${x.periode}, Hauptgruppe ${C8.ROEM[x.gruppe]} (${aussen} Außenelektron${aussen === 1 ? "" : "en"})` : ""}`;
      c.querySelectorAll("#apse .el").forEach(d => d.classList.toggle("wahl", +d.dataset.oz === p));
      if (ziel && p === ziel.oz && e === p && p + n === ziel.masse) { c.querySelector("#aauft").innerHTML = `🏆 Super! Das ist ein ${ziel.name}-Atom: ${p} p⁺, ${n} n, ${e} e⁻. Verteilung: ${sch.join(" – ")}.`; ziel = null; }
    }
    mal();
  };

  /* ================= 8 Bindung ================= */
  const BIND = ["Na", "K", "Li", "Mg", "Ca", "Al", "Cu", "Zn", "Fe", "H", "C", "N", "O", "S", "F", "Cl"];
  const EXTRA = { Cu: { name: "Kupfer", art: "m", lad: 2 }, Zn: { name: "Zink", art: "m", lad: 2 }, Fe: { name: "Eisen", art: "m", lad: 3 } };
  const ANION = { Cl: "chlorid", O: "oxid", S: "sulfid", F: "fluorid", N: "nitrid", H: "hydrid", C: "carbid" };
  const WERT = { H: 1, F: 1, Cl: 1, O: 2, S: 2, N: 3, C: 4 };
  const LEWIS = { "H2": "H–H", "O2": "O=O", "N2": "N≡N", "Cl2": "Cl–Cl", "F2": "F–F", "H2O": "H–O–H", "CH4": "H–C–H mit zwei weiteren H oben und unten", "NH3": "H–N–H mit einem weiteren H", "CO2": "O=C=O", "HCl": "H–Cl", "HF": "H–F", "H2S": "H–S–H" };
  function info(sym) { const e = C8.ELEMENTE.find(x => x.sym === sym); if (e) return { sym, name: e.name, art: e.art === "h" ? "n" : e.art, gruppe: e.gruppe, lad: e.art === "m" ? e.gruppe : (sym === "H" ? 1 : 8 - e.gruppe) }; const x = EXTRA[sym]; return { sym, name: x.name, art: "m", gruppe: null, lad: x.lad }; }
  const ggT = (a, b) => b ? ggT(b, a % b) : a;
  const idx = n => n > 1 ? String(n).split("").map(d => "₀₁₂₃₄₅₆₇₈₉"[d]).join("") : "";
  const hoch = n => (n > 1 ? String(n).split("").map(d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]).join("") : "");
  function analyse(a, b) {
    const A = info(a), B = info(b);
    if (A.art === "m" && B.art === "m") return { art: "Metallbindung", formel: a === b ? a : a + " + " + b, text: a === b ? `Im ${A.name} geben alle Atome ihre Außenelektronen ins Elektronengas ab. Die positiven Metall-Ionen werden vom Elektronengas zusammengehalten.` : `Zwei Metalle bilden keine feste Verbindung, sondern ein Metallgemisch: eine Legierung${(a + b).includes("Cu") && (a + b).includes("Zn") ? " – Kupfer + Zink = Messing" : ""}. Auch hier hält die Metallbindung (Elektronengas) alles zusammen.` };
    if (A.art !== B.art) {
      const M = A.art === "m" ? A : B, N = A.art === "m" ? B : A;
      const g = ggT(M.lad, N.lad), xm = N.lad / g, xn = M.lad / g;
      return { art: "Ionenbindung", M, N, xm, xn, formel: M.sym + idx(xm) + N.sym + idx(xn), name: M.name + ANION[N.sym],
        text: `${M.name} ist ein Metall und gibt ${M.lad} Elektron${M.lad > 1 ? "en" : ""} ab → ${M.sym}${hoch(M.lad)}⁺. ${N.name} ist ein Nichtmetall und nimmt ${N.lad} Elektron${N.lad > 1 ? "en" : ""} auf → ${N.sym}${hoch(N.lad)}⁻. Damit sich die Ladungen ausgleichen, braucht man ${xm} × ${M.sym} und ${xn} × ${N.sym}. Die Ionen ziehen sich an und bilden ein Ionengitter: das Salz <b>${M.name}${ANION[N.sym]}</b>.` };
    }
    // Nichtmetall + Nichtmetall
    if (a === b) { const v = WERT[a]; const f = a + "₂"; return { art: "Elektronenpaarbindung", formel: f, text: `Zwei ${A.name}-Atome teilen sich ${v} Elektronenpaar${v > 1 ? "e" : ""}. So hat jedes Atom eine volle Außenschale. Es entsteht ein Molekül ${f}. Strichformel: ${LEWIS[a + "2"]}.` }; }
    let Z = WERT[a] >= WERT[b] ? A : B, X = Z === A ? B : A;
    const vz = WERT[Z.sym], vx = WERT[X.sym], g = ggT(vz, vx), nz = vx / g, nx = vz / g;
    const hVorne = X.sym === "H" && (Z.gruppe >= 6);
    const f = hVorne ? X.sym + idx(nx) + Z.sym + idx(nz) : Z.sym + idx(nz) + X.sym + idx(nx);
    const key = f.replace(/[₀-₉]/g, d => "0123456789"["₀₁₂₃₄₅₆₇₈₉".indexOf(d)]);
    return { art: "Elektronenpaarbindung", formel: f, text: `${A.name} und ${B.name} sind beide Nichtmetalle. Keins will Elektronen abgeben – sie <b>teilen</b> sich Elektronenpaare. ${Z.name} bildet ${vz} Bindung${vz > 1 ? "en" : ""}, ${X.name} ${vx}. Es entsteht ein Molekül <b>${f}</b>.${LEWIS[key] ? " Strichformel: " + LEWIS[key] + "." : ""}` };
  }
  LABORE.bindung = function (c) {
    const opt = BIND.map(s => `<option>${s}</option>`).join("");
    c.innerHTML = `<p>Element 1: <select id="b1">${opt}</select> &nbsp; Element 2: <select id="b2">${opt}</select> <button class="knopf" id="bs">⚡ Reaktion starten</button></p>
    <div class="labortisch"><div class="feld"><svg viewBox="0 0 480 260" width="480" height="260" id="bv"></svg></div>
    <div class="feld"><div class="anzeige" id="ba">Wähle zwei Elemente und starte die Reaktion.</div><h4>Meine Ergebnisse</h4><ul class="protokoll" id="bp"></ul></div></div>`;
    const b1 = c.querySelector("#b1"), b2 = c.querySelector("#b2"); b2.value = "Cl";
    const bv = c.querySelector("#bv");
    function aussen(sym) { const e = C8.ELEMENTE.find(x => x.sym === sym); if (e) { const s = C8.schalen(e.oz); return s[s.length - 1]; } return EXTRA[sym].lad; }
    function atom(cx, sym, n, farbe, id) {
      let h = `<g id="${id}" style="transition:transform 1.2s"><circle cx="${cx}" cy="120" r="70" fill="none" stroke="#36506b" stroke-width="2"/><circle cx="${cx}" cy="120" r="26" fill="${farbe}"/><text x="${cx}" y="128" text-anchor="middle" fill="#fff" font-size="22" font-weight="700">${sym}</text></g>`;
      return h;
    }
    function punkte(cx, n, start, kl) { let h = ""; for (let j = 0; j < n; j++) { const a = (start + j) * Math.PI / 4 - Math.PI / 2; h += `<circle class="${kl}" cx="${cx + 70 * Math.cos(a)}" cy="${120 + 70 * Math.sin(a)}" r="8" fill="#4cc9f0" style="transition:transform 1.2s"/>`; } return h; }
    function start() {
      const a = b1.value, b = b2.value, r = analyse(a, b), A = info(a), B = info(b);
      const fa = A.art === "m" ? "#3a86ff" : "#e9a23b", fb = B.art === "m" ? "#3a86ff" : "#e9a23b";
      let h = `<rect width="480" height="260" fill="#0b141e"/>`;
      if (r.art === "Metallbindung") {
        for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { const s = (i + j) % 2 && a !== b ? b : a; h += `<circle cx="${90 + i * 100}" cy="${50 + j * 80}" r="24" fill="#3a86ff"/><text x="${90 + i * 100}" y="${57 + j * 80}" text-anchor="middle" fill="#fff" font-size="15" font-weight="700">${s}⁺</text>`; }
        for (let k = 0; k < 18; k++) h += `<circle class="eg" cx="${40 + (k * 53) % 420}" cy="${20 + (k * 37) % 220}" r="6" fill="#4cc9f0"/>`;
        bv.innerHTML = h;
        let t = 0; const id = takt(c, () => { t++; bv.querySelectorAll(".eg").forEach((p, k) => { p.setAttribute("cx", 40 + ((k * 53 + t * (2 + k % 3)) % 420)); p.setAttribute("cy", 20 + ((k * 37 + t * (1 + k % 2)) % 220)); }); if (t > 300) clearInterval(id); }, 50);
      } else if (r.art === "Ionenbindung") {
        const M = r.M, N = r.N, nm = aussen(M.sym), nn = aussen(N.sym);
        h += atom(120, M.sym, 0, "#3a86ff", "am") + atom(360, N.sym, 0, "#e9a23b", "an") + punkte(120, Math.min(nm, 8), 0, "em") + punkte(360, nn, 0, "en");
        if (r.xm > 1) h += `<text x="120" y="240" text-anchor="middle" fill="#ffd166" font-size="15">${r.xm} ×</text>`;
        if (r.xn > 1) h += `<text x="360" y="240" text-anchor="middle" fill="#ffd166" font-size="15">${r.xn} ×</text>`;
        bv.innerHTML = h;
        setTimeout(() => { const ems = bv.querySelectorAll(".em"); const anz = Math.min(ems.length, N.lad); for (let j = 0; j < anz; j++) { const ang = (nn + j) * Math.PI / 4 - Math.PI / 2; const zx = 360 + 70 * Math.cos(ang), zy = 120 + 70 * Math.sin(ang); const p = ems[j]; p.style.transform = `translate(${zx - p.getAttribute("cx")}px,${zy - p.getAttribute("cy")}px)`; p.setAttribute("fill", "#ffd166"); } for (let j = anz; j < ems.length; j++) ems[j].style.opacity = .25; }, 400);
        setTimeout(() => { bv.insertAdjacentHTML("beforeend", `<text x="120" y="35" text-anchor="middle" fill="#9ff0b6" font-size="20" font-weight="700">${M.sym}${hoch(M.lad)}⁺</text><text x="360" y="35" text-anchor="middle" fill="#9ff0b6" font-size="20" font-weight="700">${N.sym}${hoch(N.lad)}⁻</text><text x="240" y="125" text-anchor="middle" fill="#fff" font-size="26">⇄</text>`); }, 1800);
      } else {
        const ea = aussen(a), eb = aussen(b);
        h += atom(150, a, 0, fa, "a1") + atom(330, b, 0, fb, "a2") + punkte(150, ea, 0, "e1") + punkte(330, eb, 4, "e2");
        bv.innerHTML = h;
        setTimeout(() => { bv.querySelector("#a1").style.transform = "translate(45px,0)"; bv.querySelector("#a2").style.transform = "translate(-45px,0)"; bv.querySelectorAll(".e1").forEach(p => p.style.transform = "translate(45px,0)"); bv.querySelectorAll(".e2").forEach(p => p.style.transform = "translate(-45px,0)"); }, 300);
        setTimeout(() => { const n = Math.min(WERT[a], WERT[b]); for (let k = 0; k < n; k++) bv.insertAdjacentHTML("beforeend", `<ellipse cx="240" cy="${120 - (n - 1) * 14 + k * 28}" rx="16" ry="11" fill="none" stroke="#ffd166" stroke-width="3"/>`); bv.insertAdjacentHTML("beforeend", `<text x="240" y="245" text-anchor="middle" fill="#9ff0b6" font-size="20" font-weight="700">${r.formel}</text>`); }, 1600);
      }
      c.querySelector("#ba").innerHTML = `<b>${r.art}</b> · Formel: <b>${r.formel}</b><br>${r.text}`;
      log(c.querySelector("#bp"), `${a} + ${b}: ${r.art}, ${r.formel}`);
    }
    c.querySelector("#bs").onclick = start;
  };

  /* ================= 9 Säuren ================= */
  const HAUS = [["Zitronensaft", 2], ["Essig", 3], ["Cola", 3], ["Apfelsaft", 4], ["Mineralwasser (mit Kohlensäure)", 5], ["Milch", 6.5], ["Leitungswasser", 7], ["Natron-Lösung", 8.5], ["Seifenlauge", 10], ["Waschmittellösung", 11]];
  LABORE.saeuren = function (c) {
    c.innerHTML = `<div class="labortisch"><div class="feld"><h4>A: Rotkohl-Test</h4><div class="chips" id="sh"></div>
    <svg viewBox="0 0 200 170" width="200" height="170" id="sb" style="margin-top:.6rem"></svg><div class="anzeige" id="sa">Wähle einen Stoff.</div><ul class="protokoll" id="sl"></ul></div>
    <div class="feld"><h4>B: Neutralisation</h4><p>20 ml Salzsäure + Universalindikator. Gib Natronlauge zu.</p>
    <p><button class="knopf klein" id="t1">+1 Tropfen</button> <button class="knopf klein" id="t5">+5 Tropfen</button> <button class="knopf hell klein" id="t0">🔄 Neu</button></p>
    <svg viewBox="0 0 200 150" width="200" height="150" id="nb"></svg><div class="anzeige" id="na"></div><canvas id="nk" width="300" height="160" style="margin-top:.5rem"></canvas></div></div>`;
    const sb = c.querySelector("#sb");
    function becher(svg, farbe, h) { svg.innerHTML = `<rect width="${svg.viewBox.baseVal.width}" height="${svg.viewBox.baseVal.height}" fill="#0b141e"/><path d="M60 ${h ? 20 : 30} L60 140 Q60 150 70 150 L130 150 Q140 150 140 140 L140 ${h ? 20 : 30}" fill="none" stroke="#a8dadc" stroke-width="3"/><rect x="62" y="70" width="76" height="78" rx="6" fill="${farbe}" style="transition:fill .6s"/>`; }
    becher(sb, rotkohl(7));
    const sh = c.querySelector("#sh"), sl = c.querySelector("#sl");
    HAUS.forEach(([n, ph]) => { const b = el("button", { class: "chip" }, n); b.onclick = () => { becher(sb, rotkohl(ph)); c.querySelector("#sa").innerHTML = `${n}: Rotkohlsaft wird <b>${rotkohlName(ph)}</b> → pH ca. ${String(ph).replace(".", ",")} → <b>${ph < 7 ? "sauer" : ph === 7 ? "neutral" : "alkalisch"}</b>`; if (!b.classList.contains("an")) log(sl, `${n}: ${rotkohlName(ph)}, pH ${String(ph).replace(".", ",")}, ${ph < 7 ? "sauer" : ph === 7 ? "neutral" : "alkalisch"}`); b.classList.add("an"); }; sh.appendChild(b); });
    // Neutralisation
    let d = 0; const nb = c.querySelector("#nb"), na = c.querySelector("#na"), nk = c.querySelector("#nk"), kx = nk.getContext("2d"); const kurve = [];
    function ph(d) { const V = 20 + d * 0.05; const ueb = 2 - 0.1 * d; if (Math.abs(ueb) < 1e-9) return 7; if (ueb > 0) return -Math.log10(ueb / V); return 14 + Math.log10(-ueb / V); }
    function mal() {
      const p = ph(d); const f = PHFARBE[Math.max(0, Math.min(14, Math.round(p)))];
      nb.innerHTML = `<rect width="200" height="150" fill="#0b141e"/><path d="M55 15 L55 135 Q55 145 65 145 L135 145 Q145 145 145 135 L145 15" fill="none" stroke="#a8dadc" stroke-width="3"/><rect x="57" y="60" width="86" height="83" rx="6" fill="${f}" style="transition:fill .5s"/><rect x="93" y="0" width="14" height="30" fill="#ccc"/><text x="112" y="22" fill="#9ff0b6" font-size="11">Natronlauge</text>`;
      na.innerHTML = `Tropfen Natronlauge: <b>${d}</b> · pH = <b>${p.toFixed(1).replace(".", ",")}</b> → ${p < 6.5 ? "sauer" : p <= 7.5 ? "<b>neutral – Neutralisation erreicht! Es sind Kochsalz und Wasser entstanden. Die Lösung ist etwas warm geworden.</b>" : "alkalisch (zu viel Lauge!)"}`;
      kurve[d] = p; kx.fillStyle = "#0b141e"; kx.fillRect(0, 0, 300, 160);
      kx.strokeStyle = "#36506b"; kx.beginPath(); kx.moveTo(30, 10); kx.lineTo(30, 140); kx.lineTo(295, 140); kx.stroke();
      kx.fillStyle = "#9ab"; kx.font = "10px sans-serif"; kx.fillText("pH", 34, 12); kx.fillText("14", 10, 16); kx.fillText("7", 14, 78); kx.fillText("0", 14, 140); kx.fillText("Tropfen →", 240, 155);
      kx.setLineDash([3, 3]); kx.beginPath(); kx.moveTo(30, 75); kx.lineTo(295, 75); kx.stroke(); kx.setLineDash([]);
      kx.strokeStyle = "#ffd166"; kx.lineWidth = 2; kx.beginPath(); kurve.forEach((v, i) => { if (v == null) return; const x = 30 + i * 6.5, y = 140 - v / 14 * 130; kx.lineTo(x, y); }); kx.stroke(); kx.lineWidth = 1;
    }
    function dazu(n) { for (let i = 0; i < n && d < 40; i++) { d++; kurve[d] = ph(d); } mal(); }
    c.querySelector("#t1").onclick = () => dazu(1); c.querySelector("#t5").onclick = () => dazu(5);
    c.querySelector("#t0").onclick = () => { d = 0; kurve.length = 0; mal(); };
    mal();
  };

  window.LABORE = LABORE;
})();
