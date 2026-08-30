/* Invariantes de structure CSS/JS et verrous de contraste. */
const { ok, bad, is, section, read, contrast, tokens, report } = require('./lib.js');

const css  = read('assets/styles.css');
const site = read('assets/site.js');
const tok  = tokens();
const mobile = css.split('@media (max-width: 760px)')[1];

section('POINTS DE RUPTURE');
const queries = (css.match(/@media \([^)]*\)/g) || []);
is(queries.filter(q => /max-width/.test(q)).length, 1,
   'un seul point de rupture de largeur, réutilisé partout');
is(/@media \(max-width: 760px\)/.test(css), true, 'et c\'est bien 760px');

section('MENU MOBILE : UN SEUL CALQUE FIXE');
is((mobile.match(/position: fixed/g) || []).length, 1, 'un seul « position: fixed » dans le bloc mobile');
is(/html\[data-nav-open="true"\] \.site-header \{[^}]*position: fixed/.test(mobile), true,
   'et il est porté par .site-header');
is(/\.site-nav \{ display: none; \}/.test(mobile), true,
   'menu fermé : .site-nav hors flux et hors tabulation');
is(/html\[data-nav-open="true"\] \.site-nav \{[^}]*display: flex/.test(mobile), true,
   'menu ouvert : les liens coulent dans l\'en-tête');
is(/position: fixed/.test((css.split('@media')[0].split('html[data-nav-open="true"]')[1] || '')), false,
   'verrou de défilement sans position:fixed sur body (bug Safari iOS)');
is(/env\(safe-area-inset-top/.test(mobile), true, 'marge de sécurité iOS prise en compte');
is(/overscroll-behavior: contain/.test(mobile), true, 'pas de chaînage du défilement');

section('CONTRASTE — SÉLECTEUR DE LANGUE');
const active = css.match(/\.lang-btn\[aria-pressed="true"\] \{[^}]*\}/)[0];
is(/text-decoration: underline/.test(active), true, 'l\'onglet actif porte un soulignement');
is(/font-weight: 700/.test(active), true, '  et une graisse renforcée');
const underline = (active.match(/text-decoration-color:\s*var\((--[\w-]+)\)/) || [])[1];
is(contrast(tok[underline], tok['--cream']) >= 3, true,
   '  filet à ' + contrast(tok[underline], tok['--cream']).toFixed(2) + ':1 sur crème (seuil 1.4.11 : 3:1)');
console.log('      note : le texte corail actif reste à '
  + contrast(tok['--coral'], tok['--cream']).toFixed(2) + ':1, sous 4.5:1 — choix de marque assumé,'
  + ' compensé par l\'indice non coloré');

section('CONTRASTE — BOUTON FLOTTANT');
const rule = css.match(/\.float-cta \{[^}]*\}/)[0];
const varOf = prop => {
  const m = rule.match(new RegExp('(?:^|\\s)' + prop + ':\\s*[^;]*var\\((--[\\w-]+)\\)'));
  return m ? tok[m[1]] : null;
};
const bg = varOf('background'), fg = varOf('color'), border = varOf('border');
is(bg, tok['--coral'], 'fond = --coral');
is(fg, tok['--anthracite'], 'texte = --anthracite (jamais crème sur corail)');
const r = contrast(fg, bg);
is(r >= 4.5, true, 'contraste texte/fond = ' + r.toFixed(2) + ':1 (seuil AA 4.5:1)');
is(contrast(tok['--cream'], tok['--coral']) >= 4.5, false,
   '  crème sur corail resterait à ' + contrast(tok['--cream'], tok['--coral']).toFixed(2) + ':1 — écarté à raison');
const onLagoon = contrast(border, tok['--lagoon']);
console.log('      contour : ' + contrast(border, tok['--cream']).toFixed(2) + ':1 sur crème, '
  + onLagoon.toFixed(2) + ':1 sur lagon');
is(onLagoon < 3, true, 'contour insuffisant sur lagon — la situation doit être évitée');
is(/querySelectorAll\('\.section-dark'\)/.test(site), true, '  -> masquage au-dessus des sections lagon');
is(/rootMargin: buttonBand\(\)/.test(site), true, '  -> sur la seule bande occupée par le bouton');

section('BOUTON FLOTTANT : ÉTAT DE REPOS CACHÉ');
is(/visibility: hidden/.test(rule), true, 'la règle de base cache le bouton');
is(/opacity: 0/.test(rule), true, '  opacity: 0');
is(/display:\s*none/.test(rule), false, '  sans display:none, pour garder la transition');
is(/\.float-cta\.is-visible \{[^}]*visibility: visible/.test(css), true, '.is-visible est le seul état visible');
is(/is-hidden/.test(css) || /is-hidden/.test(site), false, 'plus aucune trace de l\'ancienne classe .is-hidden');
is(/floatShouldHide/.test(site), true, 'décision prise sur la géométrie réelle');
is(/document\.fonts/.test(site), true, 'recalcul après chargement des polices');
is(/addEventListener\('scroll'/.test(site), true, 'filet de sécurité au défilement');
is(/refreshFloat\(\)/.test(site), true, 'recalcul au changement de langue');

section('ORDRE DES DÉCLARATIONS DANS site.js');
/* Une régression réelle : le calculateur s'exécute au chargement et lit
   currentLang, qui doit donc être déclarée avant lui. */
is(site.indexOf('let currentLang') < site.indexOf('CALCULATEUR DE PERTE'), true,
   'currentLang déclarée avant le calculateur (zone morte temporelle)');
is(site.indexOf('const PAGE =') < site.indexOf('CALCULATEUR DE PERTE'), true,
   'PAGE déclarée avant le calculateur');

section('PALETTE');
['--lagoon', '--cream', '--coral', '--anthracite'].forEach(t =>
  is(!!tok[t], true, t + ' défini dans :root'));
is(contrast(tok['--anthracite'], tok['--cream']) >= 4.5, true,
   'corps de texte à ' + contrast(tok['--anthracite'], tok['--cream']).toFixed(2) + ':1');
is(contrast(tok['--cream'], tok['--lagoon']) >= 4.5, true,
   'texte sur lagon à ' + contrast(tok['--cream'], tok['--lagoon']).toFixed(2) + ':1');

report();
