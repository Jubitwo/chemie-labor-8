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
