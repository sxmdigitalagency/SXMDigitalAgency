/* Vérification transversale : ce qui doit rester vrai sur tout le site,
   indépendamment du comportement d'un composant donné. */
const fs = require('fs');
const path = require('path');
const { PAGES, ROUTES, ok, bad, is, section, read, i18n, report, ROOT } = require('./lib.js');

const src = {}; PAGES.forEach(p => src[p] = read(p));
const site = read('assets/site.js');
const css  = read('assets/styles.css');
const I18N = i18n();

section('1. CLÉS I18N');
const FR = Object.keys(I18N.fr), EN = Object.keys(I18N.en);
is(FR.length, EN.length, 'même nombre de clés en FR et en EN (' + FR.length + ')');
const gap = FR.filter(k => !EN.includes(k)).concat(EN.filter(k => !FR.includes(k)));
is(gap.length, 0, 'aucun écart de clés' + (gap.length ? ' — ' + gap.join(', ') : ''));
const used = new Set(), missing = [];
PAGES.forEach(p => (src[p].match(/data-i18n(?:-aria|-placeholder)?="([^"]+)"/g) || []).forEach(m => {
  const k = m.match(/="([^"]+)"$/)[1]; used.add(k);
  if (I18N.fr[k] === undefined || I18N.en[k] === undefined) missing.push(p + ':' + k);
}));
is(missing.length, 0, 'les ' + used.size + ' clés du HTML existent dans les deux langues'
   + (missing.length ? ' — ' + missing.join(', ') : ''));
/* Clés posées par le JS et non par un attribut data-i18n */
const RUNTIME = new Set(['nav.close']);
const orphans = FR.filter(k => !used.has(k) && !k.startsWith('meta.') && !RUNTIME.has(k)
                            && !/\.(result|fix|fixAmortized)$/.test(k) && k !== 'calc.empty');
is(orphans.length, 0, 'aucune clé orpheline' + (orphans.length ? ' — ' + orphans.join(', ') : ''));

section('2. MÉTADONNÉES');
let metaBad = 0;
PAGES.forEach(p => {
  const page = (src[p].match(/data-page="([^"]+)"/) || [])[1];
  if (!page) { bad(p + ' : data-page absent'); metaBad++; return; }
  ['title', 'description'].forEach(kind => {
    if (!I18N.fr['meta.' + page + '.' + kind] || !I18N.en['meta.' + page + '.' + kind]) {
      bad(p + ' : meta.' + page + '.' + kind + ' manquant'); metaBad++;
    }
  });
  if (!/rel="canonical"/.test(src[p])) { bad(p + ' : canonical absent'); metaBad++; }
  if (!/<meta name="description"/.test(src[p])) { bad(p + ' : meta description absente'); metaBad++; }
});
if (!metaBad) ok('les 8 pages ont data-page, canonical, titre et description traduits');
const descs = PAGES.map(p => I18N.fr['meta.' + src[p].match(/data-page="([^"]+)"/)[1] + '.description']);
is(new Set(descs).size, PAGES.length, 'les 8 descriptions sont distinctes');
descs.forEach((d, i) => { if (d.length > 160) bad(PAGES[i] + ' : description de ' + d.length + ' caractères'); });
if (!descs.some(d => d.length > 160)) ok('toutes sous 160 caractères (max ' + Math.max(...descs.map(d => d.length)) + ')');

section('3. LIENS');
const broken = [], noopener = [];
PAGES.forEach(p => {
  (src[p].match(/href="([^"]+)"/g) || []).forEach(m => {
    const h = m.slice(6, -1);
    if (/^(https?:|mailto:|tel:|data:|#)/.test(h)) return;
    if (h.startsWith('/assets/')) { if (!fs.existsSync(path.join(ROOT, h.slice(1)))) broken.push(p + ' -> ' + h); return; }
    if (!ROUTES[h]) broken.push(p + ' -> ' + h);
  });
  (src[p].match(/<a[^>]+target="_blank"[^>]*>/g) || []).forEach(t => {
    if (!/rel="noopener"/.test(t)) noopener.push(p);
  });
});
is(broken.length, 0, 'tous les liens internes résolvent' + (broken.length ? ' — ' + broken.join(', ') : ''));
is(noopener.length, 0, 'tout lien en nouvel onglet porte rel="noopener"');
is(/https:\/\/sxmsunsetcharter\.com/.test(src['index.html'] + src['sites-web.html']), true,
   'lien SXM Sunset Charter présent sur l\'accueil et /sites-web');

section('4. NAVIGATION ET PIED DE PAGE');
const navOf  = p => src[p].match(/<nav class="site-nav".*?<\/nav>/s)[0];
const footOf = p => src[p].match(/<nav class="footer-nav".*?<\/nav>/s)[0];
const hrefs  = s => (s.match(/href="(\/[^"]*)"/g) || []).map(x => x.slice(6, -1));
is(new Set(PAGES.map(p => hrefs(navOf(p)).join('|'))).size, 1,
   'nav principal identique sur les 8 pages (' + hrefs(navOf('index.html')).length + ' liens)');
is(new Set(PAGES.map(p => hrefs(footOf(p)).join('|'))).size, 1,
   'pied de page identique sur les 8 pages (' + hrefs(footOf('index.html')).length + ' liens)');
is(hrefs(footOf('index.html')).includes('/mentions-legales'), true, 'mentions légales au pied de page');
is(PAGES.some(p => hrefs(navOf(p)).includes('/mentions-legales')), false, 'et absentes du nav principal');
const metaBlocks = PAGES.map(p => src[p].match(/<div class="footer-meta">.*?<\/div>\s*<\/div>/s)[0]);
is(new Set(metaBlocks).size, 1, 'bloc SIRET / tagline identique partout');

section('5. PAGE COURANTE');
let ariaBad = 0;
PAGES.forEach(p => {
  const n = (src[p].match(/aria-current="page"/g) || []).length;
  const exp = (p === 'index.html' || p === 'mentions-legales.html') ? 0 : 1;
  if (n !== exp) { bad(p + ' : ' + n + ' aria-current (attendu ' + exp + ')'); ariaBad++; }
});
if (!ariaBad) ok('aria-current correct (0 sur l\'accueil et la page légale, 1 ailleurs)');

section('6. BASCULE FR/EN ET ASSETS');
let assetBad = 0;
PAGES.forEach(p => ['id="lang-fr"', 'id="lang-en"', 'src="/assets/site.js"', 'href="/assets/styles.css"']
  .forEach(need => { if (!src[p].includes(need)) { bad(p + ' : ' + need + ' manquant'); assetBad++; } }));
if (!assetBad) ok('les 8 pages ont les deux boutons de langue, la CSS et le JS partagés');

section('7. BOUTON FLOTTANT');
let floatBad = 0;
PAGES.forEach(p => {
  const n = (src[p].match(/class="float-cta"/g) || []).length;
  const exp = p === 'calculateur.html' ? 0 : 1;
  if (n !== exp) { bad(p + ' : ' + n + ' bouton (attendu ' + exp + ')'); floatBad++; }
});
if (!floatBad) ok('présent sur 7 pages, absent de /calculateur');
is(PAGES.every(p => !/class="float-cta is-visible"/.test(src[p])), true,
   'jamais pré-marqué visible dans le HTML (état de repos : caché)');

section('8. STRUCTURE HTML');
const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
let structBad = 0;
PAGES.forEach(p => {
  const stack = [];
  const re = /<(\/?)([a-zA-Z][\w-]*)([^>]*)>/g;
  let m;
  while ((m = re.exec(src[p]))) {
    const [, slash, tag, attrs] = m;
    if (VOID.has(tag.toLowerCase()) || attrs.endsWith('/') || tag === '!DOCTYPE') continue;
    if (!slash) stack.push(tag);
    else if (stack.pop() !== tag) { bad(p + ' : </' + tag + '> mal apparié'); structBad++; break; }
  }
  if (stack.length) { bad(p + ' : balises non fermées ' + stack.join(', ')); structBad++; }
  if ((src[p].match(/<h1/g) || []).length !== 1) { bad(p + ' : h1 multiple ou absent'); structBad++; }
});
if (!structBad) ok('les 8 pages sont bien formées et ont exactement un <h1>');

section('9. SERVICES RETIRÉS');
const banned = /réseaux sociaux|identité visuelle|social media|brand identity/i;
const hits = PAGES.filter(p => banned.test(src[p])).concat(banned.test(site) ? ['assets/site.js'] : []);
is(hits.length, 0, 'aucune mention de « réseaux sociaux » ni « identité visuelle »'
   + (hits.length ? ' — ' + hits.join(', ') : ''));

section('10. SITEMAP ET ROBOTS');
const sitemap = read('sitemap.xml');
const locs = (sitemap.match(/<loc>([^<]+)<\/loc>/g) || []).map(l => l.slice(5, -6));
is(locs.length, 8, 'le sitemap liste les 8 pages');
is(Object.keys(ROUTES).every(r => locs.includes('https://sxmdigitalagency.com' + (r === '/' ? '/' : r))), true,
   'chaque route du site y figure');
is(/pages\.dev/.test(sitemap), false, 'aucune URL de preview dans le sitemap');
is(PAGES.every(p => !/pages\.dev/.test(src[p])), true, 'ni dans les pages');
is(/Sitemap: https:\/\/sxmdigitalagency\.com\/sitemap\.xml/.test(read('robots.txt')), true,
   'robots.txt référence le sitemap');

report();
