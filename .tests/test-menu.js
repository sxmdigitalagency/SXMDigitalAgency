/* Menu mobile : overlay plein écran sous 760px. */
const { PAGES, ok, bad, is, section, read, boot, report } = require('./lib.js');

section('ÉTAT INITIAL');
let b = boot('index.html');
let toggle = b.d.getElementById('nav-toggle'), nav = b.d.getElementById('site-nav');
is(toggle.getAttribute('aria-expanded'), 'false', 'aria-expanded="false" au chargement');
is(toggle.getAttribute('aria-controls'), 'site-nav', 'aria-controls pointe vers le nav');
is(toggle.getAttribute('aria-label'), 'Ouvrir le menu', 'aria-label initial en français');
is(b.d.documentElement.dataset.navOpen, undefined, 'aucun verrou de défilement au repos');

section('OUVERTURE');
toggle.click();
is(toggle.getAttribute('aria-expanded'), 'true', 'aria-expanded passe à true');
is(nav.getAttribute('data-open'), 'true', 'overlay marqué ouvert');
is(toggle.getAttribute('aria-label'), 'Fermer le menu', 'aria-label devient « Fermer le menu »');
is(b.d.documentElement.dataset.navOpen, 'true', 'verrou porté par <html>');
is(b.d.body.style.top, '', 'aucun décalage du body (pas de position:fixed)');
is(b.d.activeElement, nav.querySelector('a[href]'), 'focus déplacé sur le premier lien');

section('ORDRE DE TABULATION');
const order = [...b.d.querySelectorAll('.site-header a[href], .site-header button')]
  .map(el => el.id || el.className.split(' ')[0] || el.getAttribute('href'));
console.log('      ' + order.join(' → '));
is(order[0], 'wordmark', 'wordmark en premier');
is(order[1], 'nav-toggle', 'bouton de menu juste après');
is(order[order.length - 2], 'lang-fr', 'FR en avant-dernier');
is(order[order.length - 1], 'lang-en', 'EN en dernier');

section('PIÈGE DE FOCUS');
b.d.getElementById('lang-en').focus();
b.key('Tab');
is(b.d.activeElement.className.split(' ')[0], 'wordmark', 'Tab depuis le dernier revient au premier');
b.d.querySelector('.wordmark').focus();
b.d.dispatchEvent(new b.w.KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));
is(b.d.activeElement.id, 'lang-en', 'Maj+Tab depuis le premier va au dernier');

section('FERMETURES');
b.key('Escape');
is(toggle.getAttribute('aria-expanded'), 'false', 'Échap referme');
is(b.d.documentElement.dataset.navOpen, undefined, '  défilement rendu');
is(b.d.activeElement, toggle, '  focus rendu au bouton');
is(toggle.getAttribute('aria-label'), 'Ouvrir le menu', '  aria-label réinitialisé');

toggle.click();
nav.querySelector('a[href]').click();
is(toggle.getAttribute('aria-expanded'), 'false', 'un clic sur un lien referme');

toggle.click();
b.d.querySelector('.header-grid').dispatchEvent(new b.w.MouseEvent('click', { bubbles: true }));
is(toggle.getAttribute('aria-expanded'), 'false', 'un clic dans le vide referme');

toggle.click();
is(toggle.getAttribute('aria-expanded'), 'true', 'réouvert');
toggle.click();
is(toggle.getAttribute('aria-expanded'), 'false', 'le même bouton referme');

section('LIBELLÉ TRADUIT');
b.d.getElementById('lang-en').click();
is(toggle.getAttribute('aria-label'), 'Open menu', 'aria-label en anglais');
toggle.click();
is(toggle.getAttribute('aria-label'), 'Close menu', 'état ouvert traduit aussi');
is(b.d.documentElement.lang, 'en', 'attribut lang du document mis à jour');
toggle.click();

section('RETOUR AU-DESSUS DE 760px');
toggle.click();
is(toggle.getAttribute('aria-expanded'), 'true', 'ouvert en mobile');
is(b.breakpointListeners.length > 0, true, 'un gestionnaire de point de rupture est enregistré');
b.breakpointListeners.forEach(fn => fn({ matches: false }));
is(toggle.getAttribute('aria-expanded'), 'false', 'le retour desktop referme');
is(b.d.documentElement.dataset.navOpen, undefined, 'aucun verrou résiduel');

section('INVARIANT DE STRUCTURE');
/* Le bug « en-tête invisible » venait de deux calques distincts. Le ✕,
   FR/EN et les liens doivent appartenir au même élément. */
for (const p of PAGES) {
  const d = boot(p).d;
  const header = d.querySelector('.site-header');
  const inside = ['#nav-toggle', '.lang-switch', '#site-nav', '.wordmark']
    .every(sel => header.contains(d.querySelector(sel)));
  inside ? ok(p.padEnd(22) + ' ✕, FR/EN, wordmark et liens dans .site-header')
         : bad(p + ' : commandes et liens dans des conteneurs différents');
}

section('OUVERTURE ET FERMETURE SUR LES 8 PAGES');
for (const p of PAGES) {
  const x = boot(p);
  const t = x.d.getElementById('nav-toggle');
  t.click();
  const opened = t.getAttribute('aria-expanded') === 'true'
              && x.d.documentElement.dataset.navOpen === 'true';
  t.click();
  const closed = t.getAttribute('aria-expanded') === 'false'
              && x.d.documentElement.dataset.navOpen === undefined;
  (opened && closed) ? ok(p.padEnd(22) + ' ouvre et referme')
                     : bad(p + ' : opened=' + opened + ' closed=' + closed);
}

report();
