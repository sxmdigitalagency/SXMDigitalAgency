/* Les tarifs vivent dans PRICES (site.js). Chaque surface qui les affiche
   doit rester synchronisée avec cette source. */
const { ok, bad, is, section, read, i18n, report } = require('./lib.js');

const site = read('assets/site.js');
const I18N = i18n();
const m = site.match(/const PRICES = \{ web: (\d+), seo: (\d+), auto: (\d+) \}/);
if (!m) { console.log('  ✗ constante PRICES introuvable'); process.exit(1); }
const P = { web: +m[1], seo: +m[2], auto: +m[3] };
console.log('\nSOURCE UNIQUE : ' + JSON.stringify(P));

const fr = n => n + '€';
const en = n => '€' + n.toLocaleString('en-US');

section('PAGES SERVICE');
is(I18N.fr['sw.price.figure'],   'À partir de ' + fr(P.web),  'FR /sites-web → ' + fr(P.web));
is(I18N.en['sw.price.figure'],   'From ' + en(P.web),         'EN /sites-web → ' + en(P.web));
is(I18N.fr['seo.price.figure'],  'À partir de ' + fr(P.seo),  'FR /seo-local → ' + fr(P.seo));
is(I18N.en['seo.price.figure'],  'From ' + en(P.seo),         'EN /seo-local → ' + en(P.seo));
is(I18N.fr['auto.price.figure'], 'À partir de ' + fr(P.auto) + '/mois',  'FR /automatisations → ' + fr(P.auto) + '/mois');
is(I18N.en['auto.price.figure'], 'From ' + en(P.auto) + '/month',        'EN /automatisations → ' + en(P.auto) + '/month');

section('CARTES DE L’ACCUEIL');
is(I18N.fr['home.s1.desc'].includes('À partir de ' + fr(P.web) + '.'),  true, 'FR carte Sites web');
is(I18N.fr['home.s2.desc'].includes('À partir de ' + fr(P.seo) + '.'),  true, 'FR carte Référencement');
is(I18N.fr['home.s3.desc'].includes('À partir de ' + fr(P.auto) + '/mois.'), true, 'FR carte Automatisations');
is(I18N.en['home.s1.desc'].includes('From ' + en(P.web) + '.'),  true, 'EN carte Sites web');
is(I18N.en['home.s2.desc'].includes('From ' + en(P.seo) + '.'),  true, 'EN carte Référencement');
is(I18N.en['home.s3.desc'].includes('From ' + en(P.auto) + '/month.'), true, 'EN carte Automatisations');

section('HTML STATIQUE (langue par défaut)');
const has = (f, t) => is(read(f).includes(t), true, f.padEnd(22) + ' contient « ' + t + ' »');
has('sites-web.html', 'À partir de ' + fr(P.web));
has('seo-local.html', 'À partir de ' + fr(P.seo));
has('automatisations.html', 'À partir de ' + fr(P.auto) + '/mois');
has('index.html', 'À partir de ' + fr(P.web) + '.');
has('index.html', 'À partir de ' + fr(P.seo) + '.');
has('index.html', 'À partir de ' + fr(P.auto) + '/mois.');

section('CALCULATEUR : gabarits, jamais de montant en dur');
for (const k of ['calc.web.fix','calc.web.fixAmortized','calc.seo.fix','calc.seo.fixAmortized','calc.auto.fix'])
  for (const lang of ['fr','en']) {
    const t = I18N[lang][k];
    is(t.includes('{price}') && !new RegExp('\\b(' + P.web + '|' + P.seo + '|' + P.seo.toLocaleString('en-US') + '|' + P.auto + ')\\b').test(t),
       true, lang.toUpperCase() + ' ' + k.padEnd(22) + ' utilise {price}');
  }

section('ANCIENS TEXTES DISPARUS');
for (const t of ['Sur diagnostic', 'Sur devis', 'Pas de prix affiché', 'On quote', 'After an audit'])
  is(site.includes(t), false, '« ' + t +' » retiré');

report();
