/* Calculateur de perte : arithmétique, bornes, cas limites, onglets. */
const { ok, bad, is, section, boot, report } = require('./lib.js');

const NEUTRAL = 'Renseignez vos chiffres pour voir le résultat.';
const IDS = { web: ['calc-web-hours','calc-web-rate'], auto: ['calc-auto-hours','calc-auto-rate'],
              seo: ['calc-seo-value','calc-seo-clients'] };

function run(ctx, tab, a, b) {
  const set = (id, v) => {
    const el = ctx.d.getElementById(id);
    el.value = v;
    el.dispatchEvent(new ctx.w.Event('input', { bubbles: true }));
  };
  set(IDS[tab][0], a); set(IDS[tab][1], b);
  const res = ctx.d.getElementById('calc-' + tab + '-result');
  const fix = ctx.d.getElementById('calc-' + tab + '-fix');
  return { result: res.textContent, state: res.dataset.state, fix: fix.textContent, fixHidden: fix.hidden };
}
const fr = n => n.toLocaleString('fr-FR');

section('CALCULS NOMINAUX');
let b = boot('calculateur.html');
let r = run(b, 'web', '5', '12');
is(r.result, 'Vous perdez environ 240€ par mois en temps.', 'Sites web : 5 h × 12€ × 4 = 240€');
is(r.fix, 'Ce problème se règle à partir de 800€ — un coût unique, amorti en 3 mois au rythme de cette perte.',
   '  amortissement 800/240 = 3,33 → 3 mois');
r = run(b, 'auto', '3', '12');
is(r.result, 'Cette tâche vous coûte environ 144€ par mois.', 'Automatisations : 3 h × 12€ × 4 = 144€');
is(/à comparer directement/.test(r.fix), true, '  comparaison directe, sans amortissement');
r = run(b, 'seo', '50', '1');
is(r.result, 'D’après votre estimation, vous perdriez environ ' + fr(1500) + '€ par mois.',
   'SEO : 50€ × 1 client/jour × 30 = 1500€/mois');
is(/amorti en 1 mois/.test(r.fix), true, '  amortissement 1500/1500 = 1 mois');
r = run(b, 'seo', '10', '1');
is(r.result, 'D’après votre estimation, vous perdriez environ 300€ par mois.',
   '  conversion jours→mois = ×30 (et non ×4)');

section('BORNES DE L’AMORTISSEMENT (1 à 24 mois inclus)');
is(/amorti en 1 mois/.test(run(b, 'web', '200', '1').fix), true, 'mois = 1 exactement : phrase affichée');
is(/amorti en 24 mois/.test(run(b, 'web', '8.35', '1').fix), true, 'mois = 23,95 : inclus, arrondi à 24');
is(run(b, 'web', '8.3', '1').fix, 'Ce problème se règle à partir de 800€ — un coût unique.',
   'mois = 24,10 : au-delà, phrase omise');
r = run(b, 'web', '1000', '12');
is(r.fix, 'Ce problème se règle à partir de 800€ — un coût unique.', 'mois < 1 : phrase omise');
is(r.result, 'Vous perdez environ ' + fr(48000) + '€ par mois en temps.', '  montant toujours correct');

section('CAS LIMITES → ÉTAT NEUTRE');
for (const [label, x, y] of [
  ['champs vides', '', ''], ['premier vide', '', '12'], ['second vide', '5', ''],
  ['zéro', '0', '12'], ['zéro sur le second', '5', '0'],
  ['négatif', '-5', '12'], ['deux négatifs', '-5', '-12'],
  ['texte', 'abc', '12'], ['espaces', '   ', '12']]) {
  const x2 = run(b, 'web', x, y);
  (x2.result === NEUTRAL && x2.state === 'empty' && x2.fixHidden)
    ? ok('« ' + label + ' » → neutre, aucun résultat')
    : bad('« ' + label + ' » → ' + x2.result);
}

section('VALEURS EXTRÊMES : ni NaN, ni Infinity, ni négatif');
for (const [label, x, y] of [
  ['débordement', '1e300', '1e300'], ['grandes mais finies', '100000', '100000'],
  ['décimales', '2.5', '13.75'], ['exponentielle', '1e3', '2']]) {
  const o = run(b, 'web', x, y);
  /NaN|Infinity|-\d/.test(o.result + ' ' + o.fix)
    ? bad('« ' + label + ' » → sortie douteuse : ' + o.result)
    : ok('« ' + label + ' » → ' + (o.state === 'empty' ? 'état neutre' : o.result));
}

section('ONGLETS');
b = boot('calculateur.html');
const tabs = [...b.d.querySelectorAll('.calc-tab')];
is(tabs.length, 3, 'trois onglets');
is(tabs[0].getAttribute('aria-selected'), 'true', 'le premier est actif au chargement');
is(b.d.getElementById('panel-auto').hidden, true, 'les autres panneaux sont masqués');
tabs[1].click();
is(tabs[1].getAttribute('aria-selected'), 'true', 'clic : le deuxième devient actif');
is(b.d.getElementById('panel-web').hidden, true, '  le premier se masque');
is(tabs[0].tabIndex, -1, 'tabindex mobile : seul l\'actif est atteignable');
const arrow = (el, key) => el.dispatchEvent(new b.w.KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
arrow(tabs[1], 'ArrowRight');
is(tabs[2].getAttribute('aria-selected'), 'true', 'flèche droite : onglet suivant');
arrow(tabs[2], 'ArrowRight');
is(tabs[0].getAttribute('aria-selected'), 'true', '  et reboucle en fin de liste');
arrow(tabs[0], 'End');
is(tabs[2].getAttribute('aria-selected'), 'true', 'touche Fin : dernier onglet');
arrow(tabs[2], 'Home');
is(tabs[0].getAttribute('aria-selected'), 'true', 'touche Origine : premier onglet');

section('BASCULE EN ANGLAIS');
b = boot('calculateur.html');
run(b, 'web', '5', '12');
b.d.getElementById('lang-en').click();
is(b.d.getElementById('calc-web-result').textContent, 'You are losing roughly €240 a month in time.',
   'résultat recalculé en anglais');
is(/€800/.test(b.d.getElementById('calc-web-fix').textContent), true, 'prix formaté €800');
is(b.d.getElementById('calc-web-hours').getAttribute('placeholder'), 'e.g. 5', 'espace réservé traduit');
run(b, 'seo', '50', '1');
is(/€1,500/.test(b.d.getElementById('calc-seo-fix').textContent), true, 'SEO : prix formaté €1,500');
is(b.d.querySelector('[data-i18n="calc.seo.f2"]').textContent, 'Your estimate: missed customers per day',
   'libellé anglais « per day »');
b.d.getElementById('lang-fr').click();
is(b.d.getElementById('calc-web-result').textContent, 'Vous perdez environ 240€ par mois en temps.',
   'retour au français');

section('CHAMPS');
b = boot('calculateur.html');
const inputs = [...b.d.querySelectorAll('.calc-field input')];
is(inputs.length, 6, 'six champs numériques');
is(inputs.every(i => i.getAttribute('type') === 'number'), true, 'tous en type="number"');
is(inputs.every(i => i.getAttribute('min') === '0'), true, 'tous avec min="0"');
is(b.d.getElementById('calc-web-rate').value, '12', 'valeur horaire par défaut : 12');
is(b.d.getElementById('calc-auto-rate').value, '12', '  idem sur l\'onglet automatisations');
is(b.d.getElementById('calc-web-hours').value, '', 'heures : aucune valeur par défaut');
is(b.d.getElementById('calc-seo-clients').getAttribute('placeholder'), 'ex: 1', 'SEO : espace réservé quotidien');
is(/par jour/.test(b.d.querySelector('[data-i18n="calc.seo.f2"]').textContent), true, 'SEO : libellé « par jour »');
is(/chaque jour/.test(b.d.querySelector('[data-i18n="calc.seo.intro"]').textContent), true,
   'SEO : intro alignée sur « chaque jour »');

report();
