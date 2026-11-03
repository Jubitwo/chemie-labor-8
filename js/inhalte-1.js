/* Chemie-Labor 8 – Inhalte Teil 1 (Kapitel 1–5)
   Diese Datei ist die EINZIGE Quelle für Webseite UND Arbeitsheft.
   Wer hier eine Aufgabe ändert, ändert sie automatisch auch im Arbeitsheft
   (danach: node tools/build-arbeitsheft.js ausführen).
   Fremdwörter: {Begriff} oder {angezeigtes Wort|Begriff} -> Klick-Erklärung aus glossar.js */
window.KAPITEL = window.KAPITEL || [];
window.KAPITEL.push(

/* =====================================================================
   KAPITEL 1 – Sicher experimentieren
   ===================================================================== */
{
  nr: 1, id: "sicherheit", icon: "🥽", farbe: "#e4572e", wochen: 3,
  titel: "Sicher experimentieren",
  untertitel: "Regeln, Gefahrensymbole, Gasbrenner, Versuchsprotokoll",
  buch: { thema: "Arbeiten im Chemieraum / Sicherheit / Gasbrenner", seiten: "" },
  ziele: [
    "Ich kenne die wichtigsten Regeln im Chemieraum.",
    "Ich kann die Gefahrensymbole erklären.",
    "Ich weiß, wie man den Gasbrenner sicher anzündet.",
    "Ich kann ein Versuchsprotokoll schreiben."
  ],
  einstieg: {
    titel: "Achtung, Labor!",
    text: "Im Chemieraum gibt es Stoffe, die brennen, ätzen oder giftig sind. Profis im Labor tragen Schutzbrille und Kittel und halten sich an feste Regeln. Nicht, weil sie ängstlich sind, sondern weil sie wissen: Mit Regeln kann man fast alles sicher ausprobieren.",
    frage: "Überlege: Welche Gefahren könnte es im Chemieraum geben? Nenne zwei."
  },
  abschnitte: [
    { titel: "Die wichtigsten Regeln im Chemieraum",
      text: `<ul>
        <li>Ich experimentiere <b>nur</b>, wenn die Lehrkraft es erlaubt.</li>
        <li>Ich trage beim Experimentieren eine <b>Schutzbrille</b>. Lange Haare binde ich zusammen.</li>
        <li>Im Chemieraum wird <b>nicht gegessen und nicht getrunken</b>. Ich probiere keine Stoffe.</li>
        <li>Ich rieche nie direkt an einem Gefäß. Ich <b>fächle</b> den Geruch mit der Hand zu mir.</li>
        <li>Ich lese die Anleitung zuerst ganz durch. Ich nehme nur so viel Stoff wie nötig.</li>
        <li>Reste kommen in den richtigen <b>Entsorgungsbehälter</b>, nie einfach in den Ausguss.</li>
        <li>Unfälle oder Verletzungen melde ich <b>sofort</b> der Lehrkraft.</li>
        <li>Am Ende räume ich meinen Platz auf und wasche mir die Hände.</li>
      </ul>` },
    { titel: "Gefahrensymbole lesen",
      text: `<p>Auf Flaschen mit Chemikalien – und auch auf Putzmitteln zu Hause – findest du rote Rauten mit schwarzen Bildern. Das sind {Gefahrenpiktogramme|Gefahrenpiktogramm}. Sie warnen dich auf einen Blick:</p>
      <div class="piktos" data-piktos="alle"></div>
      <p>Tipp: Schau zu Hause einmal auf die Rückseite eines Abflussreinigers oder WC-Reinigers. Welches Symbol findest du?</p>` },
    { titel: "Der Gasbrenner",
      text: `<p>Zum Erhitzen benutzt man im Chemieraum den {Gasbrenner}. Er hat ein Gasventil, eine Luftzufuhr (Luftregulierung) und ein Brennerrohr.</p>
      <ul>
        <li><b>Luftzufuhr geschlossen:</b> gelbe, leuchtende Flamme. Sie rußt und ist nicht so heiß.</li>
        <li><b>Luftzufuhr offen:</b> blaue, rauschende Flamme. Sie ist sehr heiß (bis etwa 1500 °C).</li>
      </ul>
      <p><b>So zündest du ihn an:</b> Schutzbrille auf, Haare zusammen → Luftzufuhr schließen → Streichholz anzünden → Gashahn öffnen und Flamme an das Brennerrohr halten → Luftzufuhr langsam öffnen, bis die Flamme blau ist. Zum Ausmachen schließt du den Gashahn.</p>` },
    { titel: "Das Versuchsprotokoll",
      text: `<p>Forscher schreiben jeden Versuch genau auf, damit andere ihn nachmachen können. Das nennt man {Versuchsprotokoll}. Es hat immer diese Teile:</p>
      <ol>
        <li><b>Frage:</b> Was will ich herausfinden?</li>
        <li><b>Vermutung:</b> Was glaube ich, passiert?</li>
        <li><b>Material:</b> Geräte und Stoffe</li>
        <li><b>Durchführung:</b> Was mache ich Schritt für Schritt? (mit Skizze)</li>
        <li><b>Beobachtung:</b> Was sehe, höre, rieche ich? (nur beschreiben, nicht erklären!)</li>
        <li><b>Auswertung:</b> Was bedeutet das? Stimmt meine Vermutung?</li>
      </ol>` }
  ],
  merke: [
    "Schutzbrille auf, Haare zusammen, nichts essen oder probieren.",
    "Gefahrenpiktogramme sind rote Rauten mit schwarzem Bild. Sie zeigen die Gefahr eines Stoffes.",
    "Ein Versuchsprotokoll hat: Frage – Vermutung – Material – Durchführung – Beobachtung – Auswertung."
  ],
  beispiel: {
    titel: "Fehler-Detektiv",
    aufgabe: "Tim erhitzt Wasser im Reagenzglas. Seine langen Haare sind offen, die Schutzbrille liegt auf dem Tisch und nebenbei trinkt er aus seiner Wasserflasche. Finde die Fehler und sage, was Tim richtig machen muss.",
    schritte: [
      "Fehler 1: Haare offen → Tim muss die Haare zusammenbinden (Brandgefahr am Brenner).",
      "Fehler 2: Schutzbrille liegt auf dem Tisch → Tim muss sie aufsetzen (heiße Spritzer).",
      "Fehler 3: Trinken im Chemieraum → verboten, Getränk könnte verunreinigt werden."
    ],
    ergebnis: "Tim macht drei Fehler. Erst wenn alle behoben sind, darf er weiterarbeiten."
  },
  labor: {
    id: "sicherheit", titel: "Labor: Sicherheits-Check",
    auftrag: "Ordne im Labor alle Gefahrensymbole richtig zu. Bringe danach die Schritte zum Anzünden des Gasbrenners in die richtige Reihenfolge.",
    aufgaben: [
      { id: "1.L1", typ: "frei", zeilen: 2, frage: "Wie viele Gefahrensymbole hast du im Labor beim ersten Versuch richtig zugeordnet? Welches war am schwierigsten?",
        muster: "Individuelle Antwort, z. B.: 7 von 9. Am schwierigsten war „brandfördernd“, weil es ähnlich aussieht wie „entzündbar“." }
    ]
  },
  aufgaben: [
    { id: "1.1", typ: "wf", frage: "Richtig oder falsch? Kreuze an.",
      aussagen: [
        ["Im Chemieraum darf ich etwas trinken, wenn ich Durst habe.", false],
        ["Lange Haare binde ich beim Experimentieren zusammen.", true],
        ["An einem Stoff rieche ich, indem ich die Nase direkt über das Glas halte.", false],
        ["Reste kommen in den Entsorgungsbehälter.", true],
        ["Eine kleine Verletzung muss ich nicht melden.", false]
      ] },
    { id: "1.2", typ: "zuordnen", frage: "Verbinde das Gefahrensymbol mit seiner Bedeutung.",
      paare: [
        ["Flamme", "entzündbar – fängt leicht Feuer"],
        ["Totenkopf", "giftig – kann tödlich sein"],
        ["Ätzwirkung (Hand und Fläche werden zerfressen)", "ätzend – zerstört Haut und Metall"],
        ["Ausrufezeichen", "reizend / gesundheitsschädlich"],
        ["toter Baum und Fisch", "umweltgefährlich"]
      ] },
    { id: "1.3", typ: "reihe", frage: "Bringe die Schritte beim Anzünden des Gasbrenners in die richtige Reihenfolge. Nummeriere von 1 bis 5.",
      schritte: [
        "Schutzbrille aufsetzen, Haare zusammenbinden",
        "Luftzufuhr schließen",
        "Streichholz anzünden",
        "Gashahn öffnen und Flamme an das Brennerrohr halten",
        "Luftzufuhr langsam öffnen, bis die Flamme blau rauscht"
      ] },
    { id: "1.4", typ: "luecke", frage: "Fülle die Lücken aus.",
      wortliste: ["blau", "gelb", "heißer", "rußt"],
      text: "Ist die Luftzufuhr geschlossen, brennt die Flamme ___ und ___. Ist die Luftzufuhr offen, ist die Flamme ___ und viel ___.",
      loesungen: [["gelb"], ["rußt"], ["blau"], ["heißer"]] },
    { id: "1.5", typ: "reihe", frage: "Bringe die Teile eines Versuchsprotokolls in die richtige Reihenfolge.",
      schritte: ["Frage", "Vermutung", "Material", "Durchführung", "Beobachtung", "Auswertung"] },
    { id: "1.6", typ: "frei", zeilen: 3, frage: "Erkläre, warum man im Chemieraum nichts essen und nichts probieren darf.",
      muster: "Viele Stoffe im Chemieraum sind giftig oder ätzend und sehen harmlos aus (z. B. wie Zucker oder Wasser). Auch Essen kann mit Chemikalien in Kontakt kommen. Darum darf man nichts essen und nichts probieren." }
  ],
  test: [
    { id: "1.T1", typ: "mc", frage: "Was trägst du beim Experimentieren immer?", optionen: ["Eine Mütze", "Eine Schutzbrille", "Handschuhe aus Wolle"], richtig: 1 },
    { id: "1.T2", typ: "mc", frage: "Welche Flamme ist am heißesten?", optionen: ["gelbe, leuchtende Flamme", "blaue, rauschende Flamme", "beide gleich heiß"], richtig: 1 },
    { id: "1.T3", typ: "mc", frage: "Wie riechst du an einem Stoff?", optionen: ["Nase direkt drüber halten", "Geruch mit der Hand zufächeln", "gar nicht, das ist verboten"], richtig: 1 },
    { id: "1.T4", typ: "mc", frage: "Was gehört in die „Beobachtung“?", optionen: ["Was ich vermute", "Was ich sehe, höre, rieche", "Warum das passiert"], richtig: 1 },
    { id: "1.T5", typ: "mc", frage: "Wie sieht ein Gefahrenpiktogramm aus?", optionen: ["Grünes Viereck", "Rote Raute mit schwarzem Bild", "Blauer Kreis"], richtig: 1 }
  ]
},

/* =====================================================================
   KAPITEL 2 – Stoffe und ihre Eigenschaften
   ===================================================================== */
{
  nr: 2, id: "stoffe", icon: "🔍", farbe: "#2e86ab", wochen: 4,
  titel: "Stoffe und ihre Eigenschaften",
  untertitel: "Stoffe erkennen, Steckbrief, Dichte, Metalle und Salze",
  buch: { thema: "Stoffe und ihre Eigenschaften / Stoffe untersuchen / Dichte", seiten: "" },
  ziele: [
    "Ich kann zwischen Stoff und Gegenstand unterscheiden.",
    "Ich kenne Stoffeigenschaften, die man mit den Sinnen und durch Messen erkennt.",
    "Ich kann einen Stoffsteckbrief erstellen.",
    "Ich kann die Dichte berechnen.",
    "Ich kenne typische Eigenschaften von Metallen und Salzen."
  ],
  einstieg: {
    titel: "Zucker oder Salz?",
    text: "Zwei Schälchen stehen vor dir. In beiden ist ein weißes, körniges Pulver. Eins ist Zucker, eins ist Salz. Probieren ist im Chemieraum verboten! Wie kannst du trotzdem herausfinden, was was ist?",
    frage: "Überlege dir eine Idee, wie du die beiden Stoffe unterscheiden könntest, ohne sie zu probieren."
  },
  abschnitte: [
    { titel: "Stoff oder Gegenstand?",
      text: `<p>Ein <b>Gegenstand</b> (in der Chemie auch „Körper“) hat eine bestimmte Form, z. B. ein Löffel, ein Nagel oder eine Flasche. Ein <b>Stoff</b> ist das Material, aus dem der Gegenstand besteht.</p>
      <p>Beispiel: Ein Löffel (Gegenstand) kann aus Holz, Metall oder Kunststoff (Stoffe) sein. Die Chemie interessiert sich für die <b>Stoffe</b>.</p>` },
    { titel: "Stoffeigenschaften",
      text: `<p>Jeder Stoff hat typische Merkmale, an denen man ihn erkennt. Das sind {Stoffeigenschaften|Stoffeigenschaft}.</p>
      <table class="tab"><tr><th>Mit den Sinnen</th><th>Mit Messgeräten / Versuchen</th></tr>
      <tr><td>Farbe, Glanz, Geruch, Form der Kristalle, wie es sich anfühlt</td>
      <td>{Schmelztemperatur} und {Siedetemperatur} (Thermometer), {Dichte} (Waage + Messzylinder), {Löslichkeit} in Wasser, elektrische Leitfähigkeit (Stromkreis mit Lämpchen), Magnetisierbarkeit (Magnet), Härte, Brennbarkeit</td></tr></table>
      <p>Zucker und Salz unterscheidet man z. B. durch Erhitzen: Zucker schmilzt schnell und wird braun. Salz schmilzt erst bei über 800 °C. Auch eine Salzlösung leitet den Strom, Zuckerlösung nicht.</p>
      <p>Alle Eigenschaften eines Stoffes zusammen ergeben seinen {Steckbrief}.</p>` },
    { titel: "Die Dichte",
      text: `<p>Ein Kilogramm Federn ist genauso schwer wie ein Kilogramm Eisen – aber die Federn brauchen viel mehr Platz. Eisen hat eine größere {Dichte}.</p>
      <p class="formel">Dichte = Masse : Volumen &nbsp;&nbsp; ρ = m : V &nbsp;&nbsp; Einheit: g/cm³</p>
      <table class="tab"><tr><th>Stoff</th><th>Dichte in g/cm³</th></tr>
      <tr><td>Holz (Fichte)</td><td>ca. 0,5</td></tr><tr><td>Speiseöl</td><td>0,9</td></tr><tr><td>Eis</td><td>0,92</td></tr>
      <tr><td>Wasser</td><td>1,0</td></tr><tr><td>Aluminium</td><td>2,7</td></tr><tr><td>Eisen</td><td>7,9</td></tr>
      <tr><td>Kupfer</td><td>8,9</td></tr><tr><td>Gold</td><td>19,3</td></tr></table>
      <p><b>Wichtig:</b> Stoffe mit einer Dichte <b>kleiner als 1 g/cm³</b> schwimmen auf Wasser. Stoffe mit einer Dichte <b>größer als 1 g/cm³</b> gehen unter.</p>` },
    { titel: "Stoffgruppen: Metalle und Salze",
      text: `<p>Stoffe mit ähnlichen Eigenschaften fasst man zu Gruppen zusammen.</p>
      <p><b>Metalle</b> (z. B. Eisen, Kupfer, Aluminium, Gold): glänzen, leiten Strom und Wärme sehr gut, sind verformbar. Nur Eisen, Nickel und Cobalt werden vom Magneten angezogen.</p>
      <p><b>{Salze|Salz}</b> (z. B. Kochsalz): bilden Kristalle, sind hart, aber {spröde}, schmelzen erst bei sehr hohen Temperaturen. Fest leiten sie keinen Strom, gelöst in Wasser aber schon.</p>
      <p><b>Weitere Gruppen:</b> Kunststoffe (leicht, isolieren), Nichtmetalle wie Schwefel oder Kohlenstoff (glänzen meist nicht, leiten kaum Strom).</p>` }
  ],
  merke: [
    "Stoffe erkennt man an ihren Stoffeigenschaften. Alle Eigenschaften zusammen ergeben den Steckbrief.",
    "Dichte = Masse : Volumen (g/cm³). Dichte kleiner als 1 g/cm³ → der Stoff schwimmt auf Wasser.",
    "Metalle glänzen und leiten Strom. Salze sind hart, spröde und leiten nur gelöst den Strom."
  ],
  beispiel: {
    titel: "Dichte berechnen und Stoff bestimmen",
    aufgabe: "Ein silbrig glänzender Würfel hat ein Volumen von 10 cm³ und eine Masse von 27 g. Aus welchem Metall ist er?",
    schritte: [
      "Gegeben: Masse m = 27 g, Volumen V = 10 cm³. Gesucht: Dichte ρ.",
      "Formel: ρ = m : V",
      "Einsetzen: ρ = 27 g : 10 cm³ = 2,7 g/cm³",
      "In der Tabelle nachsehen: 2,7 g/cm³ hat Aluminium."
    ],
    ergebnis: "Der Würfel ist aus Aluminium."
  },
  labor: {
    id: "stoffe", titel: "Labor: Stoff-Detektiv",
    auftrag: "Du bekommst eine unbekannte Stoffprobe. Führe die Tests im Labor durch und notiere die Ergebnisse. Finde dann heraus, um welchen Stoff es sich handelt.",
    aufgaben: [
      { id: "2.L1", typ: "frei", zeilen: 4, frage: "Notiere den Steckbrief deiner ersten Probe (Aussehen, Magnet, Löslichkeit, Strom, Dichte). Welcher Stoff war es?",
        muster: "Beispiel Probe Eisen: grau glänzend, magnetisch, nicht löslich, leitet Strom, Dichte 7,9 g/cm³ → Eisen." },
      { id: "2.L2", typ: "frei", zeilen: 2, frage: "Mit welchem Test kannst du Zucker und Salz am sichersten unterscheiden?",
        muster: "Mit dem Strom-Test der Lösung: Salzlösung leitet den Strom, Zuckerlösung nicht. (Auch Erhitzen: Zucker schmilzt und wird braun, Salz nicht.)" }
    ]
  },
  aufgaben: [
    { id: "2.1", typ: "zuordnen", frage: "Ist das ein Stoff oder ein Gegenstand? Ordne zu.",
      paare: [["Nagel", "Gegenstand"], ["Eisen", "Stoff"], ["Glas (Material)", "Stoff"], ["Trinkflasche", "Gegenstand"], ["Holz", "Stoff"]] },
    { id: "2.2", typ: "zuordnen", frage: "Welches Messgerät oder welcher Versuch gehört zu welcher Eigenschaft?",
      paare: [["Schmelztemperatur", "Thermometer"], ["Magnetisierbarkeit", "Magnet"], ["elektrische Leitfähigkeit", "Stromkreis mit Lämpchen"], ["Masse", "Waage"], ["Volumen einer Flüssigkeit", "Messzylinder"]] },
    { id: "2.3", typ: "luecke", frage: "Berechne die Dichte. Schreibe nur die Zahl (mit Komma).",
      text: "Ein Stein hat die Masse 30 g und das Volumen 10 cm³. Dichte = ___ g/cm³. Ein Stück Holz hat die Masse 25 g und das Volumen 50 cm³. Dichte = ___ g/cm³. Das Holz ___ auf Wasser (schwimmt/sinkt).",
      loesungen: [["3", "3,0"], ["0,5", "0,50"], ["schwimmt"]] },
    { id: "2.4", typ: "mc", frage: "Welche Eigenschaften haben alle Metalle? (Mehrere Antworten richtig)",
      optionen: ["Sie glänzen.", "Sie werden alle vom Magneten angezogen.", "Sie leiten den elektrischen Strom.", "Sie lösen sich in Wasser."], richtig: [0, 2] },
    { id: "2.5", typ: "wf", frage: "Richtig oder falsch?",
      aussagen: [
        ["Speiseöl schwimmt auf Wasser, weil seine Dichte kleiner als 1 g/cm³ ist.", true],
        ["Salzkristalle sind weich und lassen sich verbiegen.", false],
        ["Eine Kochsalzlösung leitet den Strom.", true],
        ["Ein Kilogramm Eisen ist schwerer als ein Kilogramm Federn.", false]
      ] },
    { id: "2.6", typ: "frei", zeilen: 4, frage: "Schreibe einen Steckbrief für Kupfer. Nutze: Farbe, Glanz, Magnet, Strom, Dichte (8,9 g/cm³).",
      muster: "Kupfer: rotbraun (rötlich), glänzt metallisch, wird nicht vom Magneten angezogen, leitet Strom und Wärme sehr gut, Dichte 8,9 g/cm³, Stoffgruppe: Metall." }
  ],
  test: [
    { id: "2.T1", typ: "mc", frage: "Was ist ein Stoff?", optionen: ["Schere", "Kupfer", "Tasse"], richtig: 1 },
    { id: "2.T2", typ: "mc", frage: "Formel für die Dichte?", optionen: ["Masse · Volumen", "Masse : Volumen", "Volumen : Masse"], richtig: 1 },
    { id: "2.T3", typ: "mc", frage: "Ein Stoff hat die Dichte 0,8 g/cm³. Was passiert in Wasser?", optionen: ["Er schwimmt.", "Er sinkt.", "Er löst sich auf."], richtig: 0 },
    { id: "2.T4", typ: "mc", frage: "Woran erkennt man Salz sicher im Vergleich zu Zucker?", optionen: ["Farbe", "Lösung leitet Strom", "Es ist körnig"], richtig: 1 },
    { id: "2.T5", typ: "mc", frage: "Welches Metall wird vom Magneten angezogen?", optionen: ["Kupfer", "Aluminium", "Eisen"], richtig: 2 }
  ]
},

/* =====================================================================
   KAPITEL 3 – Das Teilchenmodell
   ===================================================================== */
{
  nr: 3, id: "teilchen", icon: "⚪", farbe: "#7b2cbf", wochen: 3,
  titel: "Das Teilchenmodell",
  untertitel: "Kleinste Teilchen, Aggregatzustände, Zustandsänderungen",
  buch: { thema: "Teilchenmodell / Aggregatzustände / Diffusion", seiten: "" },
  ziele: [
    "Ich kann das Teilchenmodell mit drei Regeln beschreiben.",
    "Ich kann die drei Aggregatzustände im Teilchenmodell zeichnen und erklären.",
    "Ich kenne die Namen aller Zustandsänderungen.",
    "Ich kann Alltagsbeobachtungen (Duft, Pfütze) mit dem Teilchenmodell erklären."
  ],
  einstieg: {
    titel: "Der Duft wandert",
    text: "Jemand öffnet vorne im Klassenzimmer eine Parfümflasche. Nach kurzer Zeit riechen es auch die Schülerinnen und Schüler in der letzten Reihe. Niemand hat gepustet oder gefächelt. Wie kommt der Duft nach hinten?",
    frage: "Schreibe deine Erklärung auf. Du kannst sie am Ende des Kapitels überprüfen."
  },
  abschnitte: [
    { titel: "Alles besteht aus Teilchen",
      text: `<p>Man kann es nicht sehen, aber alle Stoffe bestehen aus winzig kleinen Teilchen. Um uns das vorzustellen, benutzen wir ein {Modell}: das {Teilchenmodell}. Wir zeichnen die Teilchen als kleine Kugeln.</p>
      <ol class="regeln">
        <li><b>Alle Stoffe bestehen aus kleinsten Teilchen.</b> Teilchen eines Stoffes sind gleich, Teilchen verschiedener Stoffe unterschiedlich.</li>
        <li><b>Die Teilchen bewegen sich ständig.</b> Je wärmer es ist, desto schneller bewegen sie sich.</li>
        <li><b>Zwischen den Teilchen ist leerer Raum.</b></li>
      </ol>
      <p>Damit ist der Duft erklärt: Die Duftteilchen bewegen sich von selbst und verteilen sich zwischen den Luftteilchen im ganzen Raum. Das nennt man {Diffusion}.</p>` },
    { titel: "Die drei Aggregatzustände",
      text: `<p>Ein Stoff kann fest, flüssig oder gasförmig sein. Das sind die {Aggregatzustände|Aggregatzustand}.</p>
      <div class="zustaende"><div><b>fest</b><div class="tm fest"></div>Teilchen eng, geordnet, schwingen nur auf der Stelle.</div>
      <div><b>flüssig</b><div class="tm fluessig"></div>Teilchen nah beieinander, ungeordnet, können aneinander vorbeigleiten.</div>
      <div><b>gasförmig</b><div class="tm gas"></div>Teilchen weit voneinander entfernt, fliegen schnell und frei durcheinander.</div></div>` },
    { titel: "Zustandsänderungen",
      text: `<p>Wenn man einen Stoff erwärmt oder abkühlt, kann sich sein Aggregatzustand ändern. Der Stoff bleibt dabei derselbe!</p>
      <table class="tab"><tr><th>von → nach</th><th>Name</th><th>Beispiel</th></tr>
      <tr><td>fest → flüssig</td><td>{Schmelzen}</td><td>Eis schmilzt (0 °C)</td></tr>
      <tr><td>flüssig → fest</td><td>{Erstarren}</td><td>Wasser gefriert</td></tr>
      <tr><td>flüssig → gasförmig</td><td>{Verdampfen} / {Sieden}</td><td>Wasser kocht (100 °C)</td></tr>
      <tr><td>gasförmig → flüssig</td><td>{Kondensieren}</td><td>Spiegel beschlägt</td></tr>
      <tr><td>fest → gasförmig</td><td>{Sublimieren}</td><td>Trockeneis „raucht“</td></tr>
      <tr><td>gasförmig → fest</td><td>{Resublimieren}</td><td>Raureif im Winter</td></tr></table>
      <p>Eine Pfütze verschwindet auch ohne Kochen: Die schnellsten Wasserteilchen verlassen die Oberfläche. Das heißt {Verdunsten}.</p>` }
  ],
  merke: [
    "Teilchenmodell: 1. Alles besteht aus Teilchen. 2. Teilchen bewegen sich ständig (je wärmer, desto schneller). 3. Dazwischen ist leerer Raum.",
    "fest: eng und geordnet – flüssig: nah, aber beweglich – gasförmig: weit entfernt und frei.",
    "Schmelzen, Erstarren, Verdampfen, Kondensieren, Sublimieren, Resublimieren: Der Stoff bleibt derselbe."
  ],
  beispiel: {
    titel: "Mit dem Teilchenmodell erklären",
    aufgabe: "Erkläre mit dem Teilchenmodell, warum sich Zucker in heißem Tee schneller auflöst als in kaltem.",
    schritte: [
      "Regel suchen: Teilchen bewegen sich ständig, je wärmer, desto schneller.",
      "Im heißen Tee bewegen sich die Wasserteilchen schneller.",
      "Sie stoßen öfter und stärker gegen die Zuckerteilchen und lösen sie schneller heraus.",
      "Die Zuckerteilchen verteilen sich schneller zwischen den Wasserteilchen."
    ],
    ergebnis: "In heißem Tee bewegen sich die Teilchen schneller, darum löst sich der Zucker schneller."
  },
  labor: {
    id: "teilchen", titel: "Labor: Teilchen-Simulator",
    auftrag: "Verändere die Temperatur mit dem Regler. Beobachte, wie sich die Wasserteilchen bewegen und wann sich der Aggregatzustand ändert.",
    aufgaben: [
      { id: "3.L1", typ: "luecke", frage: "Lies die Temperaturen im Simulator ab.",
        text: "Wasser schmilzt bei ___ °C. Wasser siedet bei ___ °C. Bei −20 °C ist Wasser ___.",
        loesungen: [["0"], ["100"], ["fest"]] },
      { id: "3.L2", typ: "frei", zeilen: 2, frage: "Beschreibe, was mit der Bewegung der Teilchen passiert, wenn du die Temperatur erhöhst.",
        muster: "Die Teilchen bewegen sich immer schneller und ihre Abstände werden größer. Ab 0 °C lösen sie sich aus der Ordnung (flüssig), ab 100 °C fliegen sie frei herum (gasförmig)." }
    ]
  },
  aufgaben: [
    { id: "3.1", typ: "luecke", frage: "Ergänze die drei Regeln des Teilchenmodells.",
      wortliste: ["Teilchen", "schneller", "leerer Raum", "bewegen"],
      text: "1. Alle Stoffe bestehen aus kleinsten ___. 2. Die Teilchen ___ sich ständig. Je wärmer, desto ___. 3. Zwischen den Teilchen ist ___.",
      loesungen: [["Teilchen"], ["bewegen"], ["schneller"], ["leerer Raum", "leerer raum"]] },
    { id: "3.2", typ: "zuordnen", frage: "Ordne die Zustandsänderung dem richtigen Namen zu.",
      paare: [["fest → flüssig", "Schmelzen"], ["flüssig → gasförmig", "Verdampfen"], ["gasförmig → flüssig", "Kondensieren"], ["flüssig → fest", "Erstarren"], ["fest → gasförmig", "Sublimieren"]] },
    { id: "3.3", typ: "zuordnen", frage: "Welcher Aggregatzustand passt zur Beschreibung?",
      paare: [["Teilchen eng und geordnet, schwingen auf der Stelle", "fest"], ["Teilchen nah, aber gleiten aneinander vorbei", "flüssig"], ["Teilchen weit entfernt, fliegen frei herum", "gasförmig"]] },
    { id: "3.4", typ: "wf", frage: "Richtig oder falsch?",
      aussagen: [
        ["Beim Schmelzen von Eis entsteht ein neuer Stoff.", false],
        ["In warmer Luft bewegen sich die Teilchen schneller als in kalter.", true],
        ["Zwischen den Teilchen ist Luft.", false],
        ["Ein Spiegel beschlägt, weil Wasserdampf kondensiert.", true]
      ] },
    { id: "3.5", typ: "frei", zeilen: 3, zeichnen: true, frage: "Zeichne in drei Kästchen Wasser als Eis, als flüssiges Wasser und als Wasserdampf im Teilchenmodell.",
      muster: "Eis: Kugeln dicht und regelmäßig in Reihen. Wasser: Kugeln dicht, aber durcheinander. Dampf: wenige Kugeln weit verteilt mit Bewegungspfeilen." },
    { id: "3.6", typ: "frei", zeilen: 3, frage: "Im Sommer verschwindet eine Pfütze, obwohl das Wasser nicht kocht. Erkläre mit dem Teilchenmodell.",
      muster: "Die Wasserteilchen bewegen sich ständig. Einige sind so schnell, dass sie die Oberfläche verlassen und in die Luft gelangen. Das Wasser verdunstet. In der Sonne bewegen sich die Teilchen schneller, darum geht es schneller." }
  ],
  test: [
    { id: "3.T1", typ: "mc", frage: "Was ist zwischen den Teilchen?", optionen: ["Luft", "Wasser", "leerer Raum"], richtig: 2 },
    { id: "3.T2", typ: "mc", frage: "Wie heißt der Übergang gasförmig → flüssig?", optionen: ["Kondensieren", "Verdampfen", "Schmelzen"], richtig: 0 },
    { id: "3.T3", typ: "mc", frage: "Wann bewegen sich Teilchen schneller?", optionen: ["wenn es kälter wird", "wenn es wärmer wird", "nie"], richtig: 1 },
    { id: "3.T4", typ: "mc", frage: "Wie nennt man das selbstständige Vermischen von Teilchen?", optionen: ["Diffusion", "Destillation", "Reaktion"], richtig: 0 },
    { id: "3.T5", typ: "mc", frage: "In welchem Zustand sind die Teilchen am weitesten voneinander entfernt?", optionen: ["fest", "flüssig", "gasförmig"], richtig: 2 }
  ]
},

/* =====================================================================
   KAPITEL 4 – Stoffgemische und Trennverfahren
   ===================================================================== */
{
  nr: 4, id: "gemische", icon: "🧂", farbe: "#06a77d", wochen: 4,
  titel: "Stoffgemische und Trennverfahren",
  untertitel: "Reinstoff oder Gemisch? Gemische erkennen und trennen",
  buch: { thema: "Reinstoffe und Stoffgemische / Trennverfahren", seiten: "" },
  lehrerversuch: "chromatografie",
  ziele: [
    "Ich kann Reinstoffe und Gemische unterscheiden.",
    "Ich kann homogene und heterogene Gemische erkennen und benennen.",
    "Ich kenne die wichtigsten Trennverfahren und weiß, welche Stoffeigenschaft sie nutzen.",
    "Ich kann einen Plan zum Trennen eines Gemisches aufstellen."
  ],
  einstieg: {
    titel: "Salz aus dem Meer",
    text: "Meerwasser ist salzig. In Südeuropa gibt es flache Becken am Meer (Salinen). Dort lässt man Meerwasser hineinlaufen. Nach einigen Wochen in der Sonne liegt im Becken weißes Salz. Das Meerwasser war also ein Gemisch aus Wasser und Salz.",
    frage: "Was ist mit dem Wasser passiert? Und warum funktioniert das nur bei Sonne?"
  },
  abschnitte: [
    { titel: "Reinstoff oder Gemisch?",
      text: `<p>Ein {Reinstoff} besteht nur aus einem einzigen Stoff, z. B. destilliertes Wasser, Zucker oder Kupfer. Er hat immer dieselben Eigenschaften (z. B. feste Siedetemperatur).</p>
      <p>Ein {Gemisch} besteht aus zwei oder mehr Reinstoffen, z. B. Meerwasser, Luft, Müsli oder Milch. Im Teilchenmodell siehst du verschiedene Teilchensorten durcheinander.</p>` },
    { titel: "Gemische erkennen",
      text: `<p><b>{Heterogen|heterogen}</b> (uneinheitlich): Man kann die Bestandteile sehen (mit bloßem Auge oder Lupe).<br><b>{Homogen|homogen}</b> (einheitlich): Man kann die Bestandteile nicht mehr unterscheiden.</p>
      <table class="tab"><tr><th>Name</th><th>Was ist gemischt?</th><th>Art</th><th>Beispiel</th></tr>
      <tr><td>{Lösung}</td><td>fest/flüssig/gasförmig in flüssig, gelöst</td><td>homogen</td><td>Salzwasser, Sprudel</td></tr>
      <tr><td>{Legierung}</td><td>Metall in Metall</td><td>homogen</td><td>Messing, Bronze</td></tr>
      <tr><td>Gasgemisch</td><td>Gas in Gas</td><td>homogen</td><td>Luft</td></tr>
      <tr><td>{Suspension}</td><td>fest in flüssig</td><td>heterogen</td><td>Schlammwasser, O-Saft mit Fruchtfleisch</td></tr>
      <tr><td>{Emulsion}</td><td>flüssig in flüssig</td><td>heterogen</td><td>Milch, Mayonnaise, Salatsoße</td></tr>
      <tr><td>{Gemenge}</td><td>fest in fest</td><td>heterogen</td><td>Müsli, Sand mit Kies</td></tr>
      <tr><td>Rauch / Nebel / Schaum</td><td>fest in Gas / flüssig in Gas / Gas in flüssig</td><td>heterogen</td><td>Rauch, Nebel, Seifenschaum</td></tr></table>` },
    { titel: "Trennverfahren",
      text: `<p>Ein {Trennverfahren} nutzt aus, dass die Stoffe im Gemisch <b>unterschiedliche Eigenschaften</b> haben.</p>
      <table class="tab"><tr><th>Verfahren</th><th>Genutzte Eigenschaft</th><th>Beispiel</th></tr>
      <tr><td>Sieben</td><td>Korngröße</td><td>Sand und Kies</td></tr>
      <tr><td>Magnettrennung</td><td>Magnetisierbarkeit</td><td>Eisenspäne aus Sand</td></tr>
      <tr><td>{Sedimentieren} und {Dekantieren}</td><td>Dichte</td><td>Schlammwasser absetzen lassen und abgießen</td></tr>
      <tr><td>{Filtrieren}</td><td>Teilchengröße</td><td>Sand aus Wasser; Kaffeefilter</td></tr>
      <tr><td>{Eindampfen} / {Verdunsten}</td><td>Siedetemperatur</td><td>Salz aus Salzwasser</td></tr>
      <tr><td>{Destillieren}</td><td>Siedetemperatur</td><td>Trinkwasser aus Meerwasser, Alkohol aus Wein</td></tr>
      <tr><td>Scheidetrichter</td><td>Dichte</td><td>Öl und Wasser trennen</td></tr>
      <tr><td>{Extrahieren}</td><td>Löslichkeit</td><td>Tee kochen</td></tr>
      <tr><td>{Chromatografie}</td><td>Haften und Löslichkeit</td><td>Farbstoffe in Filzstiften</td></tr></table>
      <p>Beim Filtrieren heißt das, was im Filter bleibt, {Rückstand}. Was durchläuft, heißt {Filtrat}.</p>` }
  ],
  merke: [
    "Reinstoff = ein Stoff. Gemisch = mehrere Stoffe.",
    "Homogen = Bestandteile nicht erkennbar (Lösung, Legierung). Heterogen = Bestandteile erkennbar (Suspension, Emulsion, Gemenge).",
    "Trennverfahren nutzen unterschiedliche Stoffeigenschaften: Filtrieren (Teilchengröße), Eindampfen/Destillieren (Siedetemperatur), Magnet, Dichte."
  ],
  beispiel: {
    titel: "Sand-Salz-Gemisch trennen",
    aufgabe: "Ein Gemisch aus Sand und Salz soll getrennt werden, sodass am Ende reiner Sand und reines Salz übrig sind. Stelle einen Plan auf.",
    schritte: [
      "1. Lösen: Gemisch in Wasser geben und umrühren. Das Salz löst sich, der Sand nicht.",
      "2. Filtrieren: Der Sand bleibt als Rückstand im Filter. Das Salzwasser läuft als Filtrat durch.",
      "3. Eindampfen: Das Salzwasser erhitzen. Das Wasser verdampft, das Salz bleibt zurück.",
      "4. Sand trocknen lassen."
    ],
    ergebnis: "Lösen → Filtrieren → Eindampfen. Genutzt werden Löslichkeit, Teilchengröße und Siedetemperatur."
  },
  labor: {
    id: "gemische", titel: "Labor: Trenn-Werkstatt",
    auftrag: "Wähle ein Gemisch. Klicke die Trennverfahren in der richtigen Reihenfolge an. Das Labor zeigt dir, ob du die Stoffe sauber getrennt hast.",
    aufgaben: [
      { id: "4.L1", typ: "frei", zeilen: 3, frage: "Schreibe für das Gemisch „Sand, Eisenspäne und Salz“ deinen erfolgreichen Trennplan auf.",
        muster: "1. Magnet: Eisenspäne herausholen. 2. In Wasser lösen. 3. Filtrieren: Sand bleibt im Filter. 4. Eindampfen: Salz bleibt zurück." },
      { id: "4.L2", typ: "frei", zeilen: 2, frage: "Welches Trennverfahren nutzt du für schwarze Filzstiftfarbe? Was hast du gesehen?",
        muster: "Chromatografie. Die schwarze Farbe trennt sich auf dem Papier in mehrere Farben auf (z. B. blau, gelb, rot/violett)." }
    ]
  },
  aufgaben: [
    { id: "4.1", typ: "zuordnen", frage: "Reinstoff oder Gemisch? Ordne zu.",
      paare: [["destilliertes Wasser", "Reinstoff"], ["Luft", "Gemisch"], ["Kupfer", "Reinstoff"], ["Milch", "Gemisch"], ["Meerwasser", "Gemisch"]] },
    { id: "4.2", typ: "zuordnen", frage: "Wie heißt das Gemisch?",
      paare: [["Schlammwasser", "Suspension"], ["Salatsoße aus Öl und Essig", "Emulsion"], ["Zuckerwasser", "Lösung"], ["Müsli", "Gemenge"], ["Messing", "Legierung"]] },
    { id: "4.3", typ: "zuordnen", frage: "Welches Trennverfahren passt?",
      paare: [["Eisenspäne aus Sand holen", "Magnettrennung"], ["Sand aus Wasser holen", "Filtrieren"], ["Salz aus Salzwasser gewinnen", "Eindampfen"], ["Trinkwasser aus Meerwasser gewinnen", "Destillieren"], ["Farbstoffe eines Filzstifts trennen", "Chromatografie"]] },
    { id: "4.4", typ: "luecke", frage: "Fülle die Lücken aus.",
      wortliste: ["Rückstand", "Filtrat", "heterogen", "homogen"],
      text: "Beim Filtrieren bleibt der ___ im Filter, durch den Filter läuft das ___. Salzwasser ist ein ___ Gemisch, Schlammwasser ein ___ Gemisch.",
      loesungen: [["Rückstand"], ["Filtrat"], ["homogen", "homogenes"], ["heterogen", "heterogenes"]] },
    { id: "4.5", typ: "reihe", frage: "Ein Gemisch aus Sand und Salz soll getrennt werden. Bringe die Schritte in die richtige Reihenfolge.",
      schritte: ["Gemisch in Wasser geben und umrühren", "Filtrieren", "Filtrat in eine Schale gießen", "Eindampfen", "Salz und Sand getrennt aufbewahren"] },
    { id: "4.6", typ: "frei", zeilen: 3, frage: "Erkläre, warum man Salzwasser nicht durch Filtrieren trennen kann.",
      muster: "Salzwasser ist eine Lösung (homogen). Die Salzteilchen sind so klein, dass sie zusammen mit den Wasserteilchen durch den Filter gehen. Man muss das Wasser eindampfen." }
  ],
  test: [
    { id: "4.T1", typ: "mc", frage: "Was ist ein Reinstoff?", optionen: ["Apfelsaft", "Gold", "Luft"], richtig: 1 },
    { id: "4.T2", typ: "mc", frage: "Milch ist eine …", optionen: ["Lösung", "Emulsion", "Legierung"], richtig: 1 },
    { id: "4.T3", typ: "mc", frage: "Welche Eigenschaft nutzt das Eindampfen?", optionen: ["Siedetemperatur", "Magnetisierbarkeit", "Farbe"], richtig: 0 },
    { id: "4.T4", typ: "mc", frage: "Was bleibt beim Filtrieren im Filter?", optionen: ["Filtrat", "Rückstand", "Lösung"], richtig: 1 },
    { id: "4.T5", typ: "mc", frage: "Wie trennst du Öl und Wasser?", optionen: ["Scheidetrichter", "Magnet", "Sieb"], richtig: 0 }
  ]
},

/* =====================================================================
   KAPITEL 5 – Die chemische Reaktion
   ===================================================================== */
{
  nr: 5, id: "reaktion", icon: "🍮", farbe: "#c77d1a", wochen: 4,
  titel: "Die chemische Reaktion",
  untertitel: "Neue Stoffe entstehen – vom Zucker zum Karamell",
  buch: { thema: "Chemische Reaktion / Kennzeichen / Energie bei Reaktionen / Massenerhaltung", seiten: "" },
  lehrerversuch: "karamell",
  ziele: [
    "Ich kann physikalische Vorgänge und chemische Reaktionen unterscheiden.",
    "Ich kenne die Kennzeichen einer chemischen Reaktion.",
    "Ich kann eine Wortgleichung aufstellen und Edukte und Produkte benennen.",
    "Ich kann exotherme und endotherme Reaktionen unterscheiden.",
    "Ich weiß: Bei einer Reaktion geht keine Masse verloren."
  ],
  einstieg: {
    titel: "Ist das noch Zucker?",
    text: "Weißer Zucker wird in einer Pfanne erhitzt. Erst schmilzt er zu einer klaren Flüssigkeit. Dann wird er goldgelb, später braun. Es riecht nach Karamell. Nach dem Abkühlen ist der Stoff hart, braun und schmeckt ganz anders als Zucker. Er lässt sich nicht mehr in weißen Zucker zurückverwandeln.",
    frage: "Ist der braune Stoff noch Zucker? Begründe deine Meinung."
  },
  abschnitte: [
    { titel: "Physikalischer Vorgang oder chemische Reaktion?",
      text: `<p>Beim {physikalischen Vorgang|physikalischer Vorgang} ändert sich nur der Zustand oder die Form. Der Stoff bleibt derselbe. Beispiele: Eis schmilzt, Zucker löst sich in Wasser, Papier wird zerschnitten.</p>
      <p>Bei einer <b>chemischen {Reaktion}</b> entstehen <b>neue Stoffe mit neuen Eigenschaften</b>. Beispiele: Zucker wird zu {Karamell}, Holz verbrennt, Eisen rostet, Brot wird getoastet, ein Ei wird gekocht.</p>` },
    { titel: "Kennzeichen einer chemischen Reaktion",
      text: `<p>Jede chemische Reaktion hat <b>zwei Kennzeichen</b>:</p>
      <ol><li><b>Stoffumwandlung:</b> Aus den Ausgangsstoffen entstehen neue Stoffe.</li>
      <li><b>Energieumwandlung:</b> Es wird Energie abgegeben (Wärme, Licht) oder aufgenommen.</li></ol>
      <p>Hinweise, an denen du eine Reaktion oft erkennst: Farbänderung, neuer Geruch, Gasbildung (Bläschen), Licht oder Wärme, ein {Niederschlag} (Trübung).</p>` },
    { titel: "Wortgleichung: Edukte und Produkte",
      text: `<p>Eine Reaktion schreibt man als {Wortgleichung}. Links stehen die Ausgangsstoffe ({Edukte}), rechts die neuen Stoffe ({Produkte}). Der Pfeil bedeutet „reagiert zu“.</p>
      <p class="formel">Eisen + Schwefel → Eisensulfid</p>
      <p class="formel">Zucker → Karamell + Wasser(dampf)</p>
      <p>Erhitzt man Karamell weiter, wird er schwarz. Dann ist Kohlenstoff (Zuckerkohle) entstanden. Der Zucker wurde zerlegt. Das Zerlegen eines Stoffes nennt man {Analyse}, das Aufbauen eines neuen Stoffes aus mehreren Stoffen {Synthese}.</p>` },
    { titel: "Energie bei Reaktionen",
      text: `<p><b>{Exotherme|exotherm}</b> Reaktionen geben Wärme ab. Einmal gestartet, laufen sie von selbst weiter, z. B. die Verbrennung oder Eisen + Schwefel.</p>
      <p><b>{Endotherme|endotherm}</b> Reaktionen brauchen ständig Wärme. Hört man auf zu erhitzen, stoppt die Reaktion, z. B. das Karamellisieren von Zucker.</p>
      <p>Viele Reaktionen brauchen zum Start einen Anstoß, die {Aktivierungsenergie}: Ein Streichholz muss man reiben, eine Kerze anzünden.</p>` },
    { titel: "Nichts geht verloren",
      text: `<p>Der französische Forscher Antoine Lavoisier hat schon vor über 200 Jahren gewogen: Bei einer chemischen Reaktion in einem geschlossenen Gefäß ist die Masse vorher und nachher gleich.</p>
      <p class="formel">Masse der Edukte = Masse der Produkte</p>
      <p>Wenn Holz verbrennt, scheint es leichter zu werden. Das liegt daran, dass Gase entstehen, die in die Luft entweichen.</p>` }
  ],
  merke: [
    "Chemische Reaktion: Neue Stoffe mit neuen Eigenschaften entstehen (Stoffumwandlung) und Energie wird umgesetzt (Energieumwandlung).",
    "Wortgleichung: Edukte → Produkte. Beispiel: Zucker → Karamell + Wasser.",
    "Exotherm = gibt Wärme ab. Endotherm = braucht ständig Wärme.",
    "Bei einer Reaktion bleibt die Gesamtmasse gleich."
  ],
  beispiel: {
    titel: "Reaktion erkennen und Wortgleichung schreiben",
    aufgabe: "Eisenpulver und gelbes Schwefelpulver werden gemischt und mit einem glühenden Draht angestoßen. Das Gemisch glüht von selbst durch. Danach liegt ein grauschwarzer Stoff da, der nicht mehr vom Magneten angezogen wird. Ist das eine chemische Reaktion? Schreibe die Wortgleichung.",
    schritte: [
      "Stoffumwandlung? Ja: Der neue Stoff ist grauschwarz und nicht magnetisch – neue Eigenschaften.",
      "Energieumwandlung? Ja: Das Gemisch glüht, es wird Wärme und Licht frei.",
      "Edukte: Eisen und Schwefel. Produkt: Eisensulfid.",
      "Wortgleichung: Eisen + Schwefel → Eisensulfid. Die Reaktion läuft von selbst weiter, also exotherm."
    ],
    ergebnis: "Es ist eine exotherme chemische Reaktion: Eisen + Schwefel → Eisensulfid."
  },
  labor: {
    id: "reaktion", titel: "Labor: Karamell-Küche (virtuell)",
    auftrag: "Erhitze den Zucker im virtuellen Labor. Beobachte Farbe, Geruch und Temperatur. Lass ihn danach abkühlen. Wird er wieder zu weißem Zucker?",
    aufgaben: [
      { id: "5.L1", typ: "luecke", frage: "Notiere deine Beobachtungen aus dem Labor.",
        text: "Bei etwa ___ °C schmilzt der Zucker. Danach wird er goldgelb und dann ___. Bei sehr starkem Erhitzen wird er ___. Nach dem Abkühlen ist er ___ wieder weißer Zucker (wieder / nicht wieder).",
        loesungen: [["185", "ca. 185", "etwa 185", "186", "180", "190"], ["braun"], ["schwarz"], ["nicht wieder", "nicht"]] },
      { id: "5.L2", typ: "frei", zeilen: 3, frage: "Begründe mit den zwei Kennzeichen, dass beim Karamellisieren eine chemische Reaktion abläuft.",
        muster: "1. Stoffumwandlung: Es entsteht ein neuer Stoff mit neuen Eigenschaften (braun, anderer Geruch und Geschmack). Er wird beim Abkühlen nicht wieder zu Zucker. 2. Energieumwandlung: Es muss ständig Wärme zugeführt werden (endotherm)." }
    ]
  },
  aufgaben: [
    { id: "5.1", typ: "zuordnen", frage: "Physikalischer Vorgang oder chemische Reaktion?",
      paare: [["Eis schmilzt", "physikalischer Vorgang"], ["Holz verbrennt", "chemische Reaktion"], ["Zucker löst sich in Tee", "physikalischer Vorgang"], ["Ein Nagel rostet", "chemische Reaktion"], ["Zucker wird zu Karamell", "chemische Reaktion"]] },
    { id: "5.2", typ: "mc", frage: "Woran kannst du eine chemische Reaktion erkennen? (Mehrere Antworten richtig)",
      optionen: ["Ein neuer Geruch entsteht.", "Die Farbe ändert sich dauerhaft.", "Der Stoff wird nur kleiner geschnitten.", "Es entstehen Gasbläschen.", "Wasser verdampft beim Kochen."], richtig: [0, 1, 3] },
    { id: "5.3", typ: "luecke", frage: "Ergänze die Wortgleichungen.",
      text: "Kupfer + Schwefel → ___. Magnesium + Sauerstoff → ___. Zucker → Karamell + ___.",
      loesungen: [["Kupfersulfid"], ["Magnesiumoxid"], ["Wasser", "Wasserdampf"]] },
    { id: "5.4", typ: "luecke", frage: "Fülle die Lücken aus.",
      wortliste: ["Edukte", "Produkte", "exotherm", "endotherm"],
      text: "Die Ausgangsstoffe heißen ___, die neuen Stoffe heißen ___. Eine Reaktion, die Wärme abgibt, ist ___. Eine Reaktion, die ständig Wärme braucht, ist ___.",
      loesungen: [["Edukte"], ["Produkte"], ["exotherm"], ["endotherm"]] },
    { id: "5.5", typ: "luecke", frage: "In einem geschlossenen Glas reagieren 5,6 g Eisen mit 3,2 g Schwefel vollständig. Wie viel Gramm Eisensulfid entstehen?",
      text: "Es entstehen ___ g Eisensulfid.",
      loesungen: [["8,8"]] },
    { id: "5.6", typ: "frei", zeilen: 3, frage: "Erkläre, warum ein Lagerfeuer nach dem Abbrennen weniger wiegt, obwohl bei Reaktionen keine Masse verloren geht.",
      muster: "Beim Verbrennen entstehen Gase (Kohlenstoffdioxid und Wasserdampf). Sie steigen in die Luft auf und werden nicht mitgewogen. Zusammen mit den Gasen wäre die Masse gleich." }
  ],
  test: [
    { id: "5.T1", typ: "mc", frage: "Was ist eine chemische Reaktion?", optionen: ["Wasser gefriert", "Brot wird getoastet", "Salz löst sich"], richtig: 1 },
    { id: "5.T2", typ: "mc", frage: "Die zwei Kennzeichen einer chemischen Reaktion sind …", optionen: ["Farbe und Geruch", "Stoffumwandlung und Energieumwandlung", "Schmelzen und Sieden"], richtig: 1 },
    { id: "5.T3", typ: "mc", frage: "In der Wortgleichung stehen die Produkte …", optionen: ["links vom Pfeil", "rechts vom Pfeil", "über dem Pfeil"], richtig: 1 },
    { id: "5.T4", typ: "mc", frage: "Eine Kerzenflamme gibt Wärme ab. Die Reaktion ist …", optionen: ["exotherm", "endotherm", "keine Reaktion"], richtig: 0 },
    { id: "5.T5", typ: "mc", frage: "Was passiert mit der Masse bei einer Reaktion im geschlossenen Gefäß?", optionen: ["Sie wird kleiner", "Sie wird größer", "Sie bleibt gleich"], richtig: 2 }
  ]
}

);
