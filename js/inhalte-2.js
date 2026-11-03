/* Chemie-Labor 8 – Inhalte Teil 2 (Kapitel 6–9) */
window.KAPITEL = window.KAPITEL || [];
window.KAPITEL.push(

/* =====================================================================
   KAPITEL 6 – Verbrennung, Luft und Feuer
   ===================================================================== */
{
  nr: 6, id: "verbrennung", icon: "🔥", farbe: "#d62828", wochen: 3,
  titel: "Verbrennung, Luft und Feuer",
  untertitel: "Zusammensetzung der Luft, Oxidation, Brandbekämpfung",
  buch: { thema: "Luft und Verbrennung / Oxidation / Brandschutz", seiten: "" },
  ziele: [
    "Ich kenne die Zusammensetzung der Luft.",
    "Ich weiß: Eine Verbrennung ist eine Reaktion mit Sauerstoff (Oxidation). Dabei entstehen Oxide.",
    "Ich kenne die Nachweise für Sauerstoff und Kohlenstoffdioxid.",
    "Ich kann das Verbrennungsdreieck erklären und Löschmethoden begründen."
  ],
  einstieg: {
    titel: "Die Kerze unter dem Glas",
    text: "Eine brennende Kerze steht auf dem Tisch. Stülpt man ein Glas darüber, wird die Flamme kleiner und geht nach einigen Sekunden aus. Unter einem großen Glas brennt sie länger als unter einem kleinen.",
    frage: "Was braucht die Kerze zum Brennen, das im Glas „verbraucht“ wird?"
  },
  abschnitte: [
    { titel: "Luft ist ein Gemisch",
      text: `<p>Luft ist ein homogenes Gasgemisch:</p>
      <div class="balken"><span style="width:78%;background:#5fa8d3">Stickstoff 78 %</span><span style="width:21%;background:#e4572e">Sauerstoff 21 %</span><span style="width:1%;background:#888" title="Edelgase und Kohlenstoffdioxid"></span></div>
      <p>Dazu kommen ca. 0,9 % Edelgase (vor allem Argon) und ca. 0,04 % Kohlenstoffdioxid. Für das Brennen ist der <b>Sauerstoff</b> wichtig. Unter dem Glas ist er irgendwann aufgebraucht – die Kerze geht aus.</p>` },
    { titel: "Verbrennung ist Oxidation",
      text: `<p>Eine {Verbrennung} ist eine exotherme chemische Reaktion eines Stoffes mit Sauerstoff. Eine Reaktion mit Sauerstoff heißt {Oxidation}. Die Produkte heißen {Oxide|Oxid}.</p>
      <p class="formel">Kohlenstoff + Sauerstoff → Kohlenstoffdioxid</p>
      <p class="formel">Magnesium + Sauerstoff → Magnesiumoxid (grelles, weißes Licht!)</p>
      <p class="formel">Kerzenwachs + Sauerstoff → Kohlenstoffdioxid + Wasser</p>
      <p>Auch <b>Rosten</b> ist eine Oxidation – nur sehr langsam und ohne Flamme.</p>` },
    { titel: "Gase nachweisen",
      text: `<ul>
      <li><b>Sauerstoff:</b> {Glimmspanprobe}. Ein glimmender Holzspan flammt hell auf.</li>
      <li><b>Kohlenstoffdioxid:</b> {Kalkwasserprobe}. Kalkwasser wird milchig-trüb.</li>
      <li><b>Wasserstoff:</b> {Knallgasprobe}. Es gibt einen pfeifenden Knall.</li></ul>` },
    { titel: "Das Verbrennungsdreieck",
      text: `<p>Ein Feuer brennt nur, wenn <b>drei Dinge</b> gleichzeitig da sind ({Verbrennungsdreieck}):</p>
      <ol><li>ein <b>brennbarer Stoff</b> (Holz, Papier, Gas, Wachs)</li><li><b>Sauerstoff</b> (aus der Luft)</li><li>die <b>{Zündtemperatur}</b> (genug Wärme)</li></ol>
      <p>Wie gut etwas brennt, hängt auch vom {Zerteilungsgrad} ab: Eisenwolle brennt, ein Eisennagel nicht. Mehl in der Luft kann sogar explodieren.</p>` },
    { titel: "Feuer löschen",
      text: `<p>Zum Löschen entfernt man <b>mindestens eine Seite</b> des Dreiecks:</p>
      <table class="tab"><tr><th>Methode</th><th>Was wird entfernt?</th></tr>
      <tr><td>Mit Wasser löschen</td><td>Wärme (Abkühlen unter die Zündtemperatur)</td></tr>
      <tr><td>Löschdecke, Sand, Deckel, CO₂-Löscher</td><td>Sauerstoff (Ersticken)</td></tr>
      <tr><td>Gashahn zudrehen, Holz wegnehmen</td><td>brennbarer Stoff</td></tr></table>
      <p class="warn">⚠️ <b>Fettbrand nie mit Wasser löschen!</b> Das Wasser verdampft schlagartig und schleudert brennendes Fett heraus (Fettexplosion). Richtig: Deckel drauf, Herd aus.</p>` }
  ],
  merke: [
    "Luft: 78 % Stickstoff, 21 % Sauerstoff, 1 % Edelgase und Kohlenstoffdioxid.",
    "Verbrennung = Reaktion mit Sauerstoff = Oxidation. Produkte heißen Oxide.",
    "Feuer braucht brennbaren Stoff + Sauerstoff + Zündtemperatur. Löschen = eine Seite entfernen.",
    "Nachweise: Sauerstoff – Glimmspan; Kohlenstoffdioxid – Kalkwasser; Wasserstoff – Knallgasprobe."
  ],
  beispiel: {
    titel: "Fettbrand in der Küche",
    aufgabe: "In einer Pfanne fängt heißes Öl Feuer. Was ist zu tun und warum?",
    schritte: [
      "Auf keinen Fall Wasser! Es würde sofort verdampfen und brennendes Öl herausschleudern.",
      "Einen passenden Deckel auf die Pfanne legen → der Sauerstoff wird entzogen (Ersticken).",
      "Herdplatte ausschalten → die Wärme wird nicht mehr zugeführt.",
      "Pfanne stehen lassen und abkühlen lassen, Deckel nicht gleich anheben."
    ],
    ergebnis: "Deckel drauf und Herd aus: Sauerstoff und Wärme werden entfernt."
  },
  labor: {
    id: "verbrennung", titel: "Labor: Feuer-Labor",
    auftrag: "Teil A: Stülpe verschieden große Gläser über die Kerze und miss die Brenndauer. Teil B: Lösche das Feuer, indem du eine Seite des Verbrennungsdreiecks entfernst.",
    aufgaben: [
      { id: "6.L1", typ: "frei", zeilen: 3, frage: "Trage deine Messwerte ein (kleines, mittleres, großes Glas). Was fällt dir auf?",
        muster: "z. B. klein: ca. 5 s, mittel: ca. 11 s, groß: ca. 22 s. Je größer das Glas, desto mehr Luft und Sauerstoff ist darin, desto länger brennt die Kerze." },
      { id: "6.L2", typ: "zuordnen", frage: "Welche Seite des Dreiecks entfernt die Löschmethode im Labor?",
        paare: [["Wasser", "Wärme"], ["Löschdecke", "Sauerstoff"], ["Gashahn zu", "brennbarer Stoff"]] }
    ]
  },
  aufgaben: [
    { id: "6.1", typ: "luecke", frage: "Fülle die Lücken zur Zusammensetzung der Luft aus.",
      text: "Luft besteht zu etwa ___ % aus Stickstoff und zu etwa ___ % aus Sauerstoff. Der Rest sind vor allem Edelgase und ___.",
      loesungen: [["78"], ["21"], ["Kohlenstoffdioxid", "CO2", "CO₂"]] },
    { id: "6.2", typ: "luecke", frage: "Ergänze die Wortgleichungen der Verbrennungen.",
      text: "Kohlenstoff + Sauerstoff → ___. Eisen + Sauerstoff → ___. Schwefel + Sauerstoff → ___.",
      loesungen: [["Kohlenstoffdioxid"], ["Eisenoxid"], ["Schwefeldioxid", "Schwefeloxid"]] },
    { id: "6.3", typ: "zuordnen", frage: "Welcher Nachweis gehört zu welchem Gas?",
      paare: [["Sauerstoff", "Glimmspanprobe"], ["Kohlenstoffdioxid", "Kalkwasserprobe"], ["Wasserstoff", "Knallgasprobe"]] },
    { id: "6.4", typ: "zuordnen", frage: "Welche Seite des Verbrennungsdreiecks wird entfernt?",
      paare: [["Ein Lagerfeuer wird mit Wasser gelöscht.", "Wärme (Zündtemperatur)"], ["Eine brennende Jacke wird mit einer Decke umwickelt.", "Sauerstoff"], ["Bei einem Waldbrand wird eine Schneise geschlagen.", "brennbarer Stoff"]] },
    { id: "6.5", typ: "wf", frage: "Richtig oder falsch?",
      aussagen: [
        ["Rosten ist eine langsame Oxidation.", true],
        ["Einen Fettbrand löscht man mit Wasser.", false],
        ["Eisenwolle brennt leichter als ein Eisennagel.", true],
        ["Stickstoff ist das Gas, das die Verbrennung unterhält.", false]
      ] },
    { id: "6.6", typ: "frei", zeilen: 3, frage: "Erkläre, warum die Kerze unter einem großen Glas länger brennt als unter einem kleinen.",
      muster: "Die Kerze braucht Sauerstoff zum Brennen. In einem großen Glas ist mehr Luft und damit mehr Sauerstoff. Es dauert länger, bis der Sauerstoff verbraucht ist." }
  ],
  test: [
    { id: "6.T1", typ: "mc", frage: "Welches Gas macht den größten Teil der Luft aus?", optionen: ["Sauerstoff", "Stickstoff", "Kohlenstoffdioxid"], richtig: 1 },
    { id: "6.T2", typ: "mc", frage: "Eine Reaktion mit Sauerstoff heißt …", optionen: ["Oxidation", "Destillation", "Neutralisation"], richtig: 0 },
    { id: "6.T3", typ: "mc", frage: "Kalkwasser wird trüb. Welches Gas ist da?", optionen: ["Sauerstoff", "Wasserstoff", "Kohlenstoffdioxid"], richtig: 2 },
    { id: "6.T4", typ: "mc", frage: "Was gehört NICHT zum Verbrennungsdreieck?", optionen: ["Sauerstoff", "brennbarer Stoff", "Wasser"], richtig: 2 },
    { id: "6.T5", typ: "mc", frage: "Fettbrand: Was ist richtig?", optionen: ["Wasser drüber", "Deckel drauf", "pusten"], richtig: 1 }
  ]
},

/* =====================================================================
   KAPITEL 7 – Atombau und Periodensystem
   ===================================================================== */
{
  nr: 7, id: "atome", icon: "⚛️", farbe: "#1b998b", wochen: 5,
  titel: "Atombau und Periodensystem",
  untertitel: "Elemente, Kern-Hülle-Modell, Schalenmodell, Periodensystem",
  buch: { thema: "Elemente / Atombau / Kern-Hülle-Modell / Schalenmodell / Periodensystem", seiten: "" },
  ziele: [
    "Ich weiß, was ein Element ist, und kenne wichtige Elementsymbole.",
    "Ich kann den Aufbau eines Atoms mit Kern und Hülle beschreiben.",
    "Ich kann aus der Ordnungszahl Protonen und Elektronen bestimmen.",
    "Ich kann das Schalenmodell für die Elemente 1–20 zeichnen.",
    "Ich kann aus dem Periodensystem Schalen und Außenelektronen ablesen."
  ],
  einstieg: {
    titel: "Wie klein ist ein Atom?",
    text: "Stell dir vor, ein Apfel wird so groß wie die ganze Erde. Dann wäre ein Atom aus diesem Apfel ungefähr so groß wie ein normaler Apfel. In einem einzigen Wassertropfen stecken mehr Atome, als es Sandkörner an allen Stränden der Welt gibt.",
    frage: "Atome sind unvorstellbar klein. Wie konnten Forscher trotzdem herausfinden, wie ein Atom aufgebaut ist? Stelle eine Vermutung auf."
  },
  abschnitte: [
    { titel: "Elemente und ihre Symbole",
      text: `<p>Ein {Element} ist ein Reinstoff, der nur aus einer Atomsorte besteht. Es gibt 118 Elemente. Jedes hat ein Symbol mit einem oder zwei Buchstaben (der erste groß):</p>
      <table class="tab"><tr><td>H – Wasserstoff</td><td>C – Kohlenstoff</td><td>N – Stickstoff</td><td>O – Sauerstoff</td></tr>
      <tr><td>Na – Natrium</td><td>Mg – Magnesium</td><td>Al – Aluminium</td><td>S – Schwefel</td></tr>
      <tr><td>Cl – Chlor</td><td>Fe – Eisen</td><td>Cu – Kupfer</td><td>Au – Gold</td></tr></table>
      <p>Manche Symbole kommen aus dem Lateinischen: Na von „Natrium“, Fe von „Ferrum“, Au von „Aurum“.</p>` },
    { titel: "Das Kern-Hülle-Modell",
      text: `<p>Früher dachte man, Atome seien kleine, massive Kugeln (Dalton, um 1800). Der Forscher Ernest Rutherford beschoss 1911 eine hauchdünne Goldfolie mit winzigen Teilchen. Fast alle flogen einfach durch! Nur ganz wenige prallten zurück. Daraus folgte: Ein Atom ist fast leer und hat einen winzigen, schweren {Kern|Atomkern}.</p>
      <div class="atomkasten"><div><b>{Atomkern}</b> (winzig, schwer)<br>• {Protonen|Proton} p⁺ – positiv geladen<br>• {Neutronen|Neutron} n – nicht geladen</div>
      <div><b>{Atomhülle}</b> (riesig, fast leer)<br>• {Elektronen|Elektron} e⁻ – negativ geladen, sehr leicht</div></div>
      <p>Ein Atom ist nach außen <b>neutral</b>: Es hat gleich viele Protonen wie Elektronen.</p>
      <p class="formel">{Ordnungszahl} = Anzahl Protonen = Anzahl Elektronen</p>
      <p class="formel">{Massenzahl} = Protonen + Neutronen</p>` },
    { titel: "Das Schalenmodell",
      text: `<p>Im {Schalenmodell} sind die Elektronen auf Schalen um den Kern verteilt. Von innen nach außen gilt (vereinfacht für die ersten 20 Elemente):</p>
      <p class="formel">1. Schale: max. 2 e⁻ &nbsp;|&nbsp; 2. Schale: max. 8 e⁻ &nbsp;|&nbsp; 3. Schale: max. 8 e⁻ &nbsp;|&nbsp; 4. Schale: Rest</p>
      <p>Die Elektronen auf der äußersten Schale heißen {Außenelektronen} (oder {Valenzelektronen}). Sie sind für chemische Reaktionen am wichtigsten.</p>
      <p>Beispiel Natrium (11 Elektronen): 2 – 8 – 1. Natrium hat 3 Schalen und 1 Außenelektron.</p>` },
    { titel: "Das Periodensystem lesen",
      text: `<p>Im {Periodensystem} sind die Elemente nach der Ordnungszahl sortiert.</p>
      <ul><li>Eine <b>Zeile</b> heißt {Periode}. Periodennummer = <b>Anzahl der Schalen</b>.</li>
      <li>Eine <b>Spalte</b> heißt {Hauptgruppe}. Hauptgruppennummer = <b>Anzahl der Außenelektronen</b>.</li></ul>
      <p>Elemente einer Hauptgruppe verhalten sich ähnlich. Wichtige Familien: I {Alkalimetalle} (sehr reaktiv), II {Erdalkalimetalle}, VII {Halogene}, VIII {Edelgase} (volle Außenschale, reagieren kaum).</p>
      <div class="pse-mini" data-pse="1"></div>` }
  ],
  merke: [
    "Element = Reinstoff aus einer Atomsorte. Symbole: H, C, O, Na, Cl, Fe …",
    "Atomkern: Protonen (+) und Neutronen (0). Atomhülle: Elektronen (−).",
    "Ordnungszahl = Protonen = Elektronen. Massenzahl = Protonen + Neutronen.",
    "Schalen: 2 – 8 – 8. Periode = Anzahl Schalen, Hauptgruppe = Anzahl Außenelektronen."
  ],
  beispiel: {
    titel: "Steckbrief eines Atoms: Natrium",
    aufgabe: "Natrium (Na) hat die Ordnungszahl 11 und die Massenzahl 23. Bestimme Protonen, Elektronen, Neutronen, die Elektronenverteilung, die Periode und die Hauptgruppe.",
    schritte: [
      "Protonen = Ordnungszahl = 11. Elektronen = 11 (Atom ist neutral).",
      "Neutronen = Massenzahl − Protonen = 23 − 11 = 12.",
      "Elektronen verteilen: 1. Schale 2, 2. Schale 8, 3. Schale 1 → 2 – 8 – 1.",
      "3 Schalen → 3. Periode. 1 Außenelektron → I. Hauptgruppe (Alkalimetall)."
    ],
    ergebnis: "Natrium: 11 p⁺, 11 e⁻, 12 n; 2 – 8 – 1; 3. Periode, I. Hauptgruppe."
  },
  labor: {
    id: "atome", titel: "Labor: Atom-Baukasten",
    auftrag: "Baue Atome aus Protonen, Neutronen und Elektronen. Der Baukasten zeigt dir, welches Element du gebaut hast und wie die Elektronen auf den Schalen verteilt sind.",
    aufgaben: [
      { id: "7.L1", typ: "frei", zeilen: 3, frage: "Baue ein Kohlenstoffatom (6 p⁺, 6 n, 6 e⁻) und ein Sauerstoffatom (8 p⁺, 8 n, 8 e⁻). Notiere jeweils die Elektronenverteilung.",
        muster: "Kohlenstoff: 2 – 4 (4 Außenelektronen). Sauerstoff: 2 – 6 (6 Außenelektronen)." },
      { id: "7.L2", typ: "frei", zeilen: 2, frage: "Was passiert, wenn du bei einem Atom ein Elektron wegnimmst? Was zeigt der Baukasten an?",
        muster: "Das Teilchen hat dann mehr Protonen als Elektronen. Es ist positiv geladen – ein Ion (z. B. Na⁺)." }
    ]
  },
  aufgaben: [
    { id: "7.1", typ: "zuordnen", frage: "Ordne das Elementsymbol dem Namen zu.",
      paare: [["O", "Sauerstoff"], ["Na", "Natrium"], ["Fe", "Eisen"], ["C", "Kohlenstoff"], ["Cl", "Chlor"], ["Au", "Gold"]] },
    { id: "7.2", typ: "zuordnen", frage: "Ordne die Atombausteine richtig zu.",
      paare: [["Proton", "im Kern, positiv"], ["Neutron", "im Kern, nicht geladen"], ["Elektron", "in der Hülle, negativ"]] },
    { id: "7.3", typ: "luecke", frage: "Sauerstoff hat die Ordnungszahl 8 und die Massenzahl 16. Ergänze.",
      text: "Protonen: ___. Elektronen: ___. Neutronen: ___. Elektronenverteilung: 2 – ___.",
      loesungen: [["8"], ["8"], ["8"], ["6"]] },
    { id: "7.4", typ: "luecke", frage: "Bestimme die Elektronenverteilung.",
      text: "Lithium (3 e⁻): 2 – ___. Magnesium (12 e⁻): 2 – 8 – ___. Chlor (17 e⁻): 2 – 8 – ___. Argon (18 e⁻): 2 – 8 – ___.",
      loesungen: [["1"], ["2"], ["7"], ["8"]] },
    { id: "7.5", typ: "luecke", frage: "Lies aus dem Periodensystem ab.",
      text: "Aluminium steht in der 3. Periode und in der III. Hauptgruppe. Es hat also ___ Schalen und ___ Außenelektronen.",
      loesungen: [["3", "drei"], ["3", "drei"]] },
    { id: "7.6", typ: "frei", zeilen: 3, zeichnen: true, frage: "Zeichne das Schalenmodell von Natrium (2 – 8 – 1). Beschrifte Kern und Schalen.",
      muster: "Kern in der Mitte mit „11 p⁺, 12 n“. Drei Kreise darum: innen 2 Punkte, Mitte 8 Punkte, außen 1 Punkt." },
    { id: "7.7", typ: "frei", zeilen: 3, frage: "Rutherford beschoss eine Goldfolie. Fast alle Teilchen flogen durch. Was schloss er daraus?",
      muster: "Das Atom ist fast leer. Die Masse sitzt in einem winzigen Kern in der Mitte. Darum fliegen fast alle Teilchen durch die Folie und nur sehr wenige treffen einen Kern und prallen zurück." }
  ],
  test: [
    { id: "7.T1", typ: "mc", frage: "Welche Teilchen sind im Atomkern?", optionen: ["Elektronen und Protonen", "Protonen und Neutronen", "nur Elektronen"], richtig: 1 },
    { id: "7.T2", typ: "mc", frage: "Die Ordnungszahl gibt an …", optionen: ["die Zahl der Protonen", "die Zahl der Neutronen", "die Masse"], richtig: 0 },
    { id: "7.T3", typ: "mc", frage: "Wie viele Elektronen passen auf die 1. Schale?", optionen: ["2", "8", "18"], richtig: 0 },
    { id: "7.T4", typ: "mc", frage: "Die Hauptgruppe zeigt …", optionen: ["die Zahl der Schalen", "die Zahl der Außenelektronen", "die Massenzahl"], richtig: 1 },
    { id: "7.T5", typ: "mc", frage: "Warum reagieren Edelgase kaum?", optionen: ["Sie sind zu schwer.", "Ihre Außenschale ist voll.", "Sie haben keinen Kern."], richtig: 1 }
  ]
},

/* =====================================================================
   KAPITEL 8 – Chemische Bindung
   ===================================================================== */
{
  nr: 8, id: "bindung", icon: "🔗", farbe: "#3a0ca3", wochen: 4,
  titel: "Chemische Bindung",
  untertitel: "Ionenbindung, Elektronenpaarbindung, Metallbindung",
  buch: { thema: "Ionen und Salze / Ionenbindung / Elektronenpaarbindung / Moleküle / Metalle", seiten: "" },
  ziele: [
    "Ich kann die Edelgasregel erklären.",
    "Ich kann erklären, wie Ionen entstehen.",
    "Ich kann die Ionenbindung am Beispiel Kochsalz beschreiben.",
    "Ich kann die Elektronenpaarbindung an Molekülen wie H₂ und H₂O erklären.",
    "Ich kann die drei Bindungsarten unterscheiden und Stoffen zuordnen."
  ],
  einstieg: {
    titel: "Was hält Atome zusammen?",
    text: "Natrium ist ein weiches Metall, das heftig mit Wasser reagiert. Chlor ist ein giftiges, gelbgrünes Gas. Lässt man beide miteinander reagieren, entsteht – Kochsalz! Einen Stoff, den wir täglich essen. Aus zwei gefährlichen Stoffen wird ein harmloser.",
    frage: "Was könnte bei der Reaktion mit den Atomen von Natrium und Chlor passieren?"
  },
  abschnitte: [
    { titel: "Die Edelgasregel",
      text: `<p>Edelgase reagieren fast nie, weil ihre Außenschale <b>voll</b> ist (meist 8 Außenelektronen, bei Helium 2). Alle anderen Atome „wollen“ auch eine volle Außenschale. Das nennt man {Edelgasregel} (Achterregel / Oktettregel).</p>
      <p>Dafür gibt es drei Möglichkeiten: Elektronen <b>abgeben</b>, Elektronen <b>aufnehmen</b> oder Elektronen <b>teilen</b>.</p>` },
    { titel: "Ionen und Ionenbindung",
      text: `<p><b>Metallatome</b> haben wenige Außenelektronen (1–3). Sie <b>geben</b> diese ab. Dann haben sie mehr Protonen als Elektronen: Es entsteht ein positives {Ion} ({Kation}), z. B. Na⁺.</p>
      <p><b>Nichtmetallatome</b> haben viele Außenelektronen (5–7). Sie <b>nehmen</b> Elektronen auf. Es entsteht ein negatives Ion ({Anion}), z. B. Cl⁻.</p>
      <p class="formel">Na (2-8-1) → Na⁺ (2-8) + e⁻ &nbsp;&nbsp;&nbsp; Cl (2-8-7) + e⁻ → Cl⁻ (2-8-8)</p>
      <p>Positive und negative Ionen ziehen sich stark an. Das ist die {Ionenbindung}. Die Ionen ordnen sich in einem {Ionengitter} an: So entsteht ein Salzkristall, z. B. Natriumchlorid NaCl.</p>
      <p><b>Eigenschaften von Salzen:</b> hart, spröde, hohe Schmelztemperatur (Kochsalz: 801 °C), Schmelze und Lösung leiten den Strom (frei bewegliche Ionen).</p>` },
    { titel: "Elektronenpaarbindung und Moleküle",
      text: `<p>Treffen <b>zwei Nichtmetallatome</b> aufeinander, will keins Elektronen abgeben. Sie <b>teilen</b> sich deshalb Elektronen. Ein gemeinsames Elektronenpaar hält die Atome zusammen: {Elektronenpaarbindung} (Atombindung). So entstehen {Moleküle|Molekül}.</p>
      <p>Man schreibt ein gemeinsames Elektronenpaar als Strich:</p>
      <p class="formel">H–H (Wasserstoff H₂) &nbsp;|&nbsp; H–O–H (Wasser H₂O) &nbsp;|&nbsp; Cl–Cl (Chlor Cl₂) &nbsp;|&nbsp; O=C=O (Kohlenstoffdioxid CO₂)</p>
      <p>Merkhilfe – so viele Bindungen braucht ein Atom: H: 1, Cl: 1, O: 2, N: 3, C: 4.</p>
      <p>Molekülstoffe haben meist niedrige Schmelz- und Siedetemperaturen und leiten keinen Strom.</p>` },
    { titel: "Metallbindung",
      text: `<p>In Metallen geben alle Atome ihre Außenelektronen ab. Die Elektronen bewegen sich frei zwischen den positiven Metall-Ionen als {Elektronengas}. Das ist die {Metallbindung}.</p>
      <p>Darum leiten Metalle den Strom (frei bewegliche Elektronen) und sind verformbar (die Ionen können gegeneinander verschoben werden).</p>
      <table class="tab"><tr><th>Bindung</th><th>Wer?</th><th>Was passiert?</th><th>Beispiel</th></tr>
      <tr><td>Ionenbindung</td><td>Metall + Nichtmetall</td><td>Elektronen werden übertragen</td><td>Kochsalz NaCl</td></tr>
      <tr><td>Elektronenpaarbindung</td><td>Nichtmetall + Nichtmetall</td><td>Elektronen werden geteilt</td><td>Wasser H₂O</td></tr>
      <tr><td>Metallbindung</td><td>Metall + Metall</td><td>Elektronengas</td><td>Kupfer, Messing</td></tr></table>` }
  ],
  merke: [
    "Edelgasregel: Atome streben eine volle Außenschale (8 Elektronen) an.",
    "Metall + Nichtmetall → Ionenbindung: Elektronen werden übertragen, es entstehen Ionen und ein Salz.",
    "Nichtmetall + Nichtmetall → Elektronenpaarbindung: Elektronen werden geteilt, es entstehen Moleküle.",
    "Metall + Metall → Metallbindung mit Elektronengas."
  ],
  beispiel: {
    titel: "Formel eines Salzes bestimmen: Calciumchlorid",
    aufgabe: "Calcium (II. Hauptgruppe) reagiert mit Chlor (VII. Hauptgruppe). Welche Ionen entstehen? Wie lautet die Formel?",
    schritte: [
      "Calcium hat 2 Außenelektronen. Es gibt beide ab → Ca²⁺.",
      "Chlor hat 7 Außenelektronen. Es nimmt 1 Elektron auf → Cl⁻.",
      "Die Ladungen müssen sich ausgleichen: Ein Ca²⁺ braucht zwei Cl⁻ (2+ und 2 · 1− = 0).",
      "Formel: CaCl₂. Bindungsart: Ionenbindung (Metall + Nichtmetall)."
    ],
    ergebnis: "Es entsteht das Salz Calciumchlorid CaCl₂ aus Ca²⁺- und Cl⁻-Ionen."
  },
  labor: {
    id: "bindung", titel: "Labor: Bindungs-Werkstatt",
    auftrag: "Wähle zwei Elemente aus. Starte die Reaktion und beobachte, ob Elektronen übertragen oder geteilt werden. Notiere Bindungsart und Formel.",
    aufgaben: [
      { id: "8.L1", typ: "frei", zeilen: 4, frage: "Probiere diese Paare aus und notiere jeweils Bindungsart und Formel: Na + Cl, Mg + O, H + O, Cu + Zn.",
        muster: "Na + Cl: Ionenbindung, NaCl. Mg + O: Ionenbindung, MgO. H + O: Elektronenpaarbindung, H₂O. Cu + Zn: Metallbindung (Legierung Messing)." },
      { id: "8.L2", typ: "frei", zeilen: 2, frage: "Bei welchem Paar werden Elektronen geteilt? Woran erkennst du das?",
        muster: "Bei H + O (und anderen Nichtmetall-Paaren). Beide sind Nichtmetalle. Im Labor bleiben die Elektronenpaare zwischen beiden Atomen." }
    ]
  },
  aufgaben: [
    { id: "8.1", typ: "luecke", frage: "Ergänze die Sätze.",
      wortliste: ["abgeben", "aufnehmen", "positiv", "negativ"],
      text: "Metallatome ___ Elektronen. Es entstehen ___ geladene Ionen. Nichtmetallatome ___ Elektronen. Es entstehen ___ geladene Ionen.",
      loesungen: [["abgeben", "geben ab"], ["positiv"], ["aufnehmen", "nehmen auf"], ["negativ"]] },
    { id: "8.2", typ: "zuordnen", frage: "Welches Ion entsteht?",
      paare: [["Natrium (I)", "Na⁺"], ["Magnesium (II)", "Mg²⁺"], ["Chlor (VII)", "Cl⁻"], ["Sauerstoff (VI)", "O²⁻"]] },
    { id: "8.3", typ: "zuordnen", frage: "Welche Bindungsart liegt vor?",
      paare: [["Kochsalz (Natrium + Chlor)", "Ionenbindung"], ["Wasser (Wasserstoff + Sauerstoff)", "Elektronenpaarbindung"], ["Kupferdraht", "Metallbindung"], ["Magnesiumoxid", "Ionenbindung"], ["Chlorgas Cl₂", "Elektronenpaarbindung"]] },
    { id: "8.4", typ: "luecke", frage: "Bestimme die Formeln der Salze.",
      text: "Natrium + Chlor: ___. Magnesium + Sauerstoff: ___. Calcium + Chlor: ___.",
      loesungen: [["NaCl"], ["MgO"], ["CaCl2", "CaCl₂"]] },
    { id: "8.5", typ: "wf", frage: "Richtig oder falsch?",
      aussagen: [
        ["Salze leiten als Feststoff den Strom.", false],
        ["In einem Wassermolekül teilen sich Atome Elektronenpaare.", true],
        ["Metalle leiten den Strom wegen des Elektronengases.", true],
        ["Ein Natrium-Ion Na⁺ hat ein Elektron mehr als ein Natriumatom.", false]
      ] },
    { id: "8.6", typ: "frei", zeilen: 4, frage: "Beschreibe mit eigenen Worten, wie aus einem Natriumatom und einem Chloratom Kochsalz entsteht.",
      muster: "Natrium hat 1 Außenelektron, Chlor hat 7. Natrium gibt sein Elektron an Chlor ab. Natrium wird zum positiven Na⁺-Ion, Chlor zum negativen Cl⁻-Ion. Beide haben jetzt eine volle Außenschale. Die Ionen ziehen sich an (Ionenbindung) und bilden ein Ionengitter: Kochsalz NaCl." }
  ],
  test: [
    { id: "8.T1", typ: "mc", frage: "Was besagt die Edelgasregel?", optionen: ["Atome wollen eine volle Außenschale.", "Atome wollen keine Elektronen.", "Edelgase reagieren oft."], richtig: 0 },
    { id: "8.T2", typ: "mc", frage: "Ein Ion ist …", optionen: ["ein geladenes Teilchen", "ein Molekül", "ein Edelgas"], richtig: 0 },
    { id: "8.T3", typ: "mc", frage: "Metall + Nichtmetall ergibt …", optionen: ["Elektronenpaarbindung", "Ionenbindung", "Metallbindung"], richtig: 1 },
    { id: "8.T4", typ: "mc", frage: "Welcher Stoff besteht aus Molekülen?", optionen: ["Kochsalz", "Wasser", "Eisen"], richtig: 1 },
    { id: "8.T5", typ: "mc", frage: "Warum leiten Metalle den Strom?", optionen: ["wegen frei beweglicher Elektronen", "weil sie glänzen", "wegen der Neutronen"], richtig: 0 }
  ]
},

/* =====================================================================
   KAPITEL 9 – Säuren, Laugen und Neutralisation
   ===================================================================== */
{
  nr: 9, id: "saeuren", icon: "🧪", farbe: "#9d0208", wochen: 5,
  titel: "Säuren, Laugen und Neutralisation",
  untertitel: "sauer – neutral – alkalisch, pH-Wert, Indikatoren",
  buch: { thema: "Säuren und Laugen / pH-Wert / Indikatoren / Neutralisation", seiten: "" },
  lehrerversuch: "rotkohl",
  ziele: [
    "Ich kann Lösungen als sauer, neutral oder alkalisch einordnen.",
    "Ich kann mit Indikatoren und der pH-Skala arbeiten.",
    "Ich kenne Säuren und Laugen aus dem Alltag und ihre Gefahren.",
    "Ich weiß, welche Ionen Säuren (H⁺) und Laugen (OH⁻) enthalten.",
    "Ich kann die Neutralisation beschreiben und eine Wortgleichung dazu aufstellen."
  ],
  einstieg: {
    titel: "Zauberei mit Rotkohl",
    text: "Rotkohlsaft ist violett. Gibt man Zitronensaft hinein, wird er rot. Gibt man etwas Waschpulver hinein, wird er grün. Kein Trick – sondern Chemie! Rotkohlsaft ist ein Farbstoff, der „anzeigt“, wie eine Lösung ist.",
    frage: "Welche Farbe erwartest du, wenn du Essig in Rotkohlsaft gibst? Begründe."
  },
  abschnitte: [
    { titel: "Sauer, neutral, alkalisch",
      text: `<p>Lösungen können <b>sauer</b>, <b>{neutral}</b> oder <b>{alkalisch}</b> (auch: basisch) sein. Erkennen kann man das mit einem {Indikator} – einem Farbstoff, der seine Farbe ändert:</p>
      <table class="tab"><tr><th>Indikator</th><th>sauer</th><th>neutral</th><th>alkalisch</th></tr>
      <tr><td>Rotkohlsaft</td><td style="background:#e0245e;color:#fff">rot</td><td style="background:#7d3c98;color:#fff">violett</td><td style="background:#2e9e6a;color:#fff">blau → grün → gelb</td></tr>
      <tr><td>{Universalindikator}</td><td style="background:#e63946;color:#fff">rot/orange</td><td style="background:#8ac926">grün</td><td style="background:#3a0ca3;color:#fff">blau/violett</td></tr></table>` },
    { titel: "Die pH-Skala",
      text: `<p>Wie stark sauer oder alkalisch eine Lösung ist, gibt der {pH-Wert} an. Die Skala geht von 0 bis 14:</p>
      <div class="phskala" data-ph="1"></div>
      <ul><li><b>pH unter 7:</b> sauer (je kleiner, desto stärker sauer)</li><li><b>pH = 7:</b> neutral (reines Wasser)</li><li><b>pH über 7:</b> alkalisch (je größer, desto stärker alkalisch)</li></ul>` },
    { titel: "Säuren",
      text: `<p>{Säuren|Säure} im Alltag: Zitronensäure (Zitrone, Entkalker), Essigsäure (Essig), Kohlensäure (Sprudel), Salzsäure (im Magen, pH ca. 1–2).</p>
      <p><b>Gemeinsam ist allen sauren Lösungen:</b> Sie enthalten <b>Wasserstoff-Ionen H⁺</b>. Diese machen die Lösung sauer.</p>
      <p><b>Eigenschaften:</b> schmecken sauer (nur Lebensmittel!), färben Indikatoren rot, lösen Kalk auf, reagieren mit unedlen Metallen wie Magnesium oder Zink → dabei entsteht Wasserstoff (Knallgasprobe).</p>
      <p class="warn">⚠️ Konzentrierte Säuren sind ätzend. Beim Verdünnen gilt: <b>„Erst das Wasser, dann die Säure, sonst geschieht das Ungeheure!“</b></p>` },
    { titel: "Laugen",
      text: `<p>{Laugen|Lauge} sind alkalische Lösungen. Sie entstehen z. B., wenn man Metallhydroxide in Wasser löst: Natriumhydroxid + Wasser → Natronlauge.</p>
      <p><b>Gemeinsam ist allen Laugen:</b> Sie enthalten <b>{Hydroxid-Ionen|Hydroxid-Ion} OH⁻</b>.</p>
      <p>Laugen im Alltag: Seifenlauge (schwach), Waschmittel, Abflussreiniger, Backofenreiniger (stark!). Laugen fühlen sich seifig an und lösen Fett und Haare.</p>
      <p class="warn">⚠️ Laugen sind für die Augen besonders gefährlich – Schutzbrille! Spritzer sofort mit viel Wasser abspülen.</p>` },
    { titel: "Die Neutralisation",
      text: `<p>Gibt man zu einer Säure genau so viel Lauge, dass die Lösung neutral wird (pH 7), heißt das {Neutralisation}. Dabei reagieren die H⁺-Ionen der Säure mit den OH⁻-Ionen der Lauge zu Wasser:</p>
      <p class="formel">H⁺ + OH⁻ → H₂O</p>
      <p class="formel">Säure + Lauge → Salz + Wasser</p>
      <p class="formel">Salzsäure + Natronlauge → Natriumchlorid (Kochsalz) + Wasser</p>
      <p>Anwendungen: Tabletten gegen Sodbrennen (zu viel Magensäure), Kalk auf saure Böden streuen, Abwasser in Fabriken neutralisieren. Die Neutralisation ist exotherm – die Lösung wird warm.</p>` }
  ],
  merke: [
    "pH unter 7 = sauer, pH 7 = neutral, pH über 7 = alkalisch. Indikatoren zeigen das durch ihre Farbe.",
    "Saure Lösungen enthalten H⁺-Ionen. Laugen enthalten OH⁻-Ionen.",
    "Neutralisation: Säure + Lauge → Salz + Wasser (H⁺ + OH⁻ → H₂O).",
    "Säuren und Laugen können ätzend sein: immer Schutzbrille!"
  ],
  beispiel: {
    titel: "Stoffe nach dem pH-Wert ordnen",
    aufgabe: "Ordne die Stoffe von stark sauer nach stark alkalisch: Seifenlauge (pH 10), Zitronensaft (pH 2), Leitungswasser (pH 7), Abflussreiniger (pH 14), Cola (pH 3).",
    schritte: [
      "Zuerst den kleinsten pH-Wert suchen: Zitronensaft (2), dann Cola (3) → beide sauer.",
      "pH 7: Leitungswasser → neutral.",
      "Größere pH-Werte: Seifenlauge (10), Abflussreiniger (14) → alkalisch.",
      "Reihenfolge: Zitronensaft – Cola – Leitungswasser – Seifenlauge – Abflussreiniger."
    ],
    ergebnis: "Zitronensaft (2) < Cola (3) < Wasser (7) < Seifenlauge (10) < Abflussreiniger (14)."
  },
  labor: {
    id: "saeuren", titel: "Labor: pH-Labor",
    auftrag: "Teil A: Teste Haushaltsstoffe mit Rotkohlsaft. Teil B: Neutralisiere Salzsäure, indem du tropfenweise Natronlauge zugibst. Beobachte pH-Wert und Farbe.",
    aufgaben: [
      { id: "9.L1", typ: "frei", zeilen: 4, frage: "Trage für 5 Haushaltsstoffe aus dem Labor Farbe und pH-Wert ein und ordne zu: sauer, neutral oder alkalisch.",
        muster: "z. B. Essig: rot, pH 3, sauer; Leitungswasser: violett, pH 7, neutral; Seifenlauge: blaugrün, pH 10, alkalisch; Zitronensaft: rot, pH 2, sauer; Natron-Lösung: blau, pH 8–9, alkalisch." },
      { id: "9.L2", typ: "luecke", frage: "Teil B: Neutralisation.",
        text: "Zu Beginn hat die Salzsäure pH ___. Nach ___ Tropfen Natronlauge ist die Lösung neutral. Gibt man weiter Lauge zu, wird die Lösung ___.",
        loesungen: [["1"], ["20", "zwanzig"], ["alkalisch", "basisch"]] }
    ]
  },
  aufgaben: [
    { id: "9.1", typ: "zuordnen", frage: "Sauer, neutral oder alkalisch?",
      paare: [["Essig (pH 3)", "sauer"], ["destilliertes Wasser (pH 7)", "neutral"], ["Seifenlauge (pH 10)", "alkalisch"], ["Magensaft (pH 1)", "sauer"], ["Abflussreiniger (pH 14)", "alkalisch"]] },
    { id: "9.2", typ: "luecke", frage: "Welche Farbe zeigt Rotkohlsaft?",
      text: "In Zitronensaft wird Rotkohlsaft ___. In Wasser bleibt er ___. In Waschmittellösung wird er ___.",
      loesungen: [["rot"], ["violett", "lila"], ["grün", "blaugrün", "blau", "gelb"]] },
    { id: "9.3", typ: "reihe", frage: "Ordne die Stoffe von stark sauer (1) nach stark alkalisch (5).",
      schritte: ["Magensaft (pH 1)", "Essig (pH 3)", "Wasser (pH 7)", "Seifenlauge (pH 10)", "Abflussreiniger (pH 14)"] },
    { id: "9.4", typ: "luecke", frage: "Ergänze.",
      wortliste: ["H⁺", "OH⁻", "Wasser", "Salz"],
      text: "Saure Lösungen enthalten ___-Ionen. Laugen enthalten ___-Ionen. Bei der Neutralisation entstehen ___ und ein ___.",
      loesungen: [["H⁺", "H+", "Wasserstoff"], ["OH⁻", "OH-", "Hydroxid"], ["Wasser", "Salz"], ["Salz", "Wasser"]] },
    { id: "9.5", typ: "luecke", frage: "Ergänze die Wortgleichung der Neutralisation.",
      text: "Salzsäure + Natronlauge → ___ + ___",
      loesungen: [["Natriumchlorid", "Kochsalz", "Wasser"], ["Wasser", "Natriumchlorid", "Kochsalz"]] },
    { id: "9.6", typ: "wf", frage: "Richtig oder falsch?",
      aussagen: [
        ["Ein pH-Wert von 2 ist stärker sauer als ein pH-Wert von 5.", true],
        ["Laugen sind für die Augen ungefährlich.", false],
        ["Säuren reagieren mit Magnesium, dabei entsteht Wasserstoff.", true],
        ["Beim Verdünnen gießt man Wasser in die konzentrierte Säure.", false]
      ] },
    { id: "9.7", typ: "frei", zeilen: 3, frage: "Lisa hat Sodbrennen (zu viel Magensäure). Der Arzt gibt ihr eine Tablette, die eine schwache Base enthält. Erkläre, warum das hilft.",
      muster: "Die Base in der Tablette reagiert mit der Magensäure. Es findet eine Neutralisation statt: Die H⁺-Ionen der Säure reagieren zu Wasser. Dadurch ist weniger Säure im Magen und das Brennen lässt nach." }
  ],
  test: [
    { id: "9.T1", typ: "mc", frage: "Eine Lösung hat pH 7. Sie ist …", optionen: ["sauer", "neutral", "alkalisch"], richtig: 1 },
    { id: "9.T2", typ: "mc", frage: "Rotkohlsaft wird rot. Die Lösung ist …", optionen: ["sauer", "neutral", "alkalisch"], richtig: 0 },
    { id: "9.T3", typ: "mc", frage: "Welche Ionen machen eine Lösung alkalisch?", optionen: ["H⁺", "OH⁻", "Na⁺"], richtig: 1 },
    { id: "9.T4", typ: "mc", frage: "Säure + Lauge → …", optionen: ["Salz + Wasser", "Wasserstoff", "Sauerstoff + Salz"], richtig: 0 },
    { id: "9.T5", typ: "mc", frage: "Merksatz beim Verdünnen von Säure?", optionen: ["Erst die Säure, dann das Wasser", "Erst das Wasser, dann die Säure", "Egal"], richtig: 1 }
  ]
}

);
