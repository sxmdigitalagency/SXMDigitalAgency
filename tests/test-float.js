/* Bouton flottant : état initial, zones à éviter, réapparition.
   jsdom ne calcule aucune mise en page : lib.js fournit les rectangles,
   ce qui permet de rejouer le scénario du bug (CTA du hero visible dès
   le chargement, avant tout défilement). */
const { PAGES, ok, bad, is, section, read, boot, rect, report } = require('./lib.js');

const VH = 800;
const BTN = rect(720, 768, 980, 1160);          /* bas à droite */
const open = p => boot(p, { floatRect: BTN, viewport: VH });
const visible = d => d.querySelector('.float-cta').classList.contains('is-visible');

section('ÉTAT AU CHARGEMENT, AVANT TOUT DÉFILEMENT');
{
  const b = open('index.html');
  is(visible(b.d), true, 'rien ne chevauche → visible dès l\'exécution du script');
}
{
  /* Le bug : le CTA du hero occupe la zone du bouton au premier rendu. */
  const b = open('index.html');
  b.d.querySelector('.hero-cta').__rect = rect(700, 760, 900, 1180);
  b.w.dispatchEvent(new b.w.Event('scroll')); b.flush();
  is(visible(b.d), false, 'CTA du hero sous le bouton → reste caché');
}

section('SANS JAVASCRIPT');
{
  const html = read('index.html');
  is(/class="float-cta"/.test(html), true, 'le bouton est dans le HTML');
  is(/class="float-cta is-visible"/.test(html), false, 'mais sans .is-visible : caché si le JS ne tourne pas');
  is(html.match(/<nav class="footer-nav".*?<\/nav>/s)[0].includes('/calculateur'), true,
     'le calculateur reste atteignable par le pied de page');
}

section('ZONES À ÉVITER');
{
  const b = open('index.html');
  const dark = b.d.querySelector('.section-dark');
  const foot = b.d.querySelector('.site-footer');
  const hero = b.d.querySelector('.hero-cta');

  b.place([]);                              is(visible(b.d), true,  'rien dans la zone → visible');
  b.place([[dark, rect(600, 900)]]);        is(visible(b.d), false, 'section lagon dans la bande → caché');
  b.place([[dark, rect(0, 200)]]);          is(visible(b.d), true,  '  repartie → revisible');
  b.place([[foot, rect(400, 900)]]);        is(visible(b.d), false, 'pied de page à l\'écran → caché');
  b.place([[foot, rect(1200, 1600)]]);      is(visible(b.d), true,  '  hors écran → revisible');
  b.place([[hero, rect(700, 760, 900, 1180)]]); is(visible(b.d), false, 'un CTA chevauche → caché');
  b.place([[hero, rect(100, 160, 900, 1180)]]); is(visible(b.d), true,  '  CTA éloigné verticalement → revisible');
  b.place([[hero, rect(700, 760, 0, 300)]]);    is(visible(b.d), true,  '  CTA à la même hauteur mais à gauche → revisible');

  b.place([[dark, rect(600, 900)], [foot, rect(400, 900)]]);
  is(visible(b.d), false, 'deux causes → caché');
  b.place([[dark, rect(600, 900)]]);
  is(visible(b.d), false, '  une seule levée → toujours caché');
  b.place([]);
  is(visible(b.d), true,  '  les deux levées → revisible');
}

section('RÉAPPARITION APRÈS ALLERS-RETOURS');
{
  const b = open('index.html');
  const dark = b.d.querySelector('.section-dark');
  for (let i = 0; i < 4; i++) { b.place([[dark, rect(600, 900)]]); b.place([]); }
  is(visible(b.d), true, 'quatre cycles → toujours revisible (pas d\'état bloqué)');
}

section('MARGE DE GARDE');
{
  const b = open('index.html');
  const hero = b.d.querySelector('.hero-cta');
  b.place([[hero, rect(700, 712, 980, 1160)]]);
  is(visible(b.d), false, 'CTA à 8px du bouton → caché (marge de 12px)');
  b.place([[hero, rect(600, 690, 980, 1160)]]);
  is(visible(b.d), true,  'CTA à 30px → visible');
}

section('BASCULE DE LANGUE');
{
  const b = open('index.html');
  const hero = b.d.querySelector('.hero-cta');
  b.place([]);
  is(visible(b.d), true, 'visible en français');
  /* Le libellé anglais est plus long : on simule le CTA qui s'étend
     jusque sous le bouton au changement de langue. */
  b.d.getElementById('lang-en').addEventListener('click',
    () => { hero.__rect = rect(700, 760, 900, 1180); }, true);
  b.d.getElementById('lang-en').click();
  is(visible(b.d), false, 'le passage en anglais recalcule et masque');
}

section('DÉCLENCHEURS');
{
  const b = open('index.html');
  const obs = b.observers.filter(o => o.targets.length && !o.targets[0].classList.contains('reveal'));
  is(obs.length, 2, 'deux observateurs : bas de page et bande');
  const banded = obs.find(o => (o.opts.rootMargin || '').startsWith('-'));
  is(!!banded, true, '  l\'un restreint à la bande du bouton');
  const nCtas = b.d.querySelectorAll('main .btn').length;
  const nDark = b.d.querySelectorAll('.section-dark').length;
  is(banded.targets.length, nCtas + nDark, '  il surveille les ' + nCtas + ' CTA et les ' + nDark + ' sections lagon');
}

section('LES 8 PAGES');
for (const p of PAGES) {
  const b = open(p);
  if (!b.d.querySelector('.float-cta')) { ok(p.padEnd(22) + ' aucun bouton (page calculateur)'); continue; }
  b.place([]);
  const shown = visible(b.d);
  const dark = b.d.querySelector('.section-dark');
  if (dark) b.place([[dark, rect(600, 900)]]);
  const hid = dark ? !visible(b.d) : true;
  b.place([]);
  const back = visible(b.d);
  (shown && hid && back) ? ok(p.padEnd(22) + ' visible, masqué, revisible')
                         : bad(p + ' : visible=' + shown + ' masqué=' + hid + ' revenu=' + back);
}

report();
