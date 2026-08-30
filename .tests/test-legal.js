/* Page légale : cohérence avec le reste du site et mentions obligatoires. */
const { ok, bad, is, section, read, i18n, boot, report } = require('./lib.js');

const legal   = read('mentions-legales.html');
const contact = read('contact.html');
const site    = read('assets/site.js');
const I18N    = i18n();
const mails   = t => [...new Set(t.match(/[\w.+-]+@[\w.-]+\.\w+/g) || [])];

section('COHÉRENCE AVEC /CONTACT');
const mL = mails(legal), mC = mails(contact);
console.log('      /contact          : ' + mC.join(', '));
console.log('      /mentions-legales : ' + mL.join(', '));
is(mL.length, 1, 'une seule adresse sur la page légale');
is(mL[0], mC[0], 'même adresse que /contact');
is(/tel:\+590690543256/.test(legal), true, 'même numéro (lien tel:)');
is(/\+590 690 54 32 56/.test(legal), true, 'même numéro au même format affiché');
is(/106 977 234 00017/.test(legal), true, 'SIRET présent');
is(/106 977 234 00017/.test(I18N.fr['footer.siret']), true, '  identique au pied de page FR');
is(/106 977 234 00017/.test(I18N.en['footer.siret']), true, '  identique au pied de page EN');

section('MENTIONS OBLIGATOIRES (FR et EN)');
const allFr = Object.keys(I18N.fr).filter(k => k.startsWith('legal.')).map(k => I18N.fr[k]).join(' ');
const allEn = Object.keys(I18N.en).filter(k => k.startsWith('legal.')).map(k => I18N.en[k]).join(' ');
const musts = {
  'raison sociale':        ['VASQUEZ PEREZ Mirlène', 'VASQUEZ PEREZ Mirlène'],
  'statut EI':             ['entrepreneur individuel', 'sole trader'],
  'SIRET':                 ['106 977 234 00017', '106 977 234 00017'],
  'adresse':               ['97150 Saint-Martin', '97150 Saint-Martin'],
  'régime TGCA':           ['TGCA', 'TGCA'],
  'hébergeur':             ['Cloudflare, Inc.', 'Cloudflare, Inc.'],
  'adresse hébergeur':     ['101 Townsend St', '101 Townsend St'],
  'RGPD':                  ['RGPD', 'GDPR'],
  'propriété intell.':     ['reproduction', 'reproduction'],
  'droit applicable':      ['droit français', 'French law'],
};
for (const [label, [nFr, nEn]] of Object.entries(musts))
  (allFr.includes(nFr) && allEn.includes(nEn))
    ? ok(label.padEnd(20) + ' présent en FR et en EN')
    : bad(label + ' manquant');

section('ADRESSE COMPLÈTE (art. R.526-27)');
for (const bit of ['Rue Louis Constant Fleming', 'résidence Hibiscus', 'bât E4 apt 17', 'Concordia', '97150'])
  is(I18N.fr['legal.editor.p2'].includes(bit), true, '  « ' + bit + ' »');

section('COOKIES : la page l’affirme, le site doit le respecter');
const { PAGES } = require('./lib.js');
const trackers = /googletagmanager|google-analytics|gtag\(|fbq\(|connect\.facebook|hotjar|matomo|plausible|segment\.com/i;
const hits = PAGES.filter(p => trackers.test(read(p))).concat(trackers.test(site) ? ['assets/site.js'] : []);
is(hits.length, 0, 'aucun script d\'analytics tiers' + (hits.length ? ' — ' + hits.join(', ') : ''));
is(/document\.cookie/.test(site), false, 'aucune écriture de cookie dans le JS');

section('OBFUSCATION : l’adresse doit rester dans le HTML');
is(/sxmdigital\.agency@gmail\.com/.test(site), false,
   'aucune adresse dans site.js — Cloudflare ne réécrit que le HTML');
is(/href="mailto:sxmdigital\.agency@gmail\.com/.test(legal), true, 'mailto en HTML sur la page légale');
is(/href="mailto:sxmdigital\.agency@gmail\.com/.test(contact), true, '  et sur /contact');

section('BASCULE DE LANGUE : l’adresse ne doit pas disparaître');
const b = boot('mentions-legales.html');
const line = () => b.d.querySelector('[data-i18n="legal.editor.p3"]').parentElement.textContent;
is(line().includes('sxmdigital.agency@gmail.com'), true, 'adresse visible au chargement (FR)');
b.d.getElementById('lang-en').click();
is(line().includes('sxmdigital.agency@gmail.com'), true, '  toujours là en anglais');
is(line().includes('Contact:'), true, '  libellé bien traduit');
b.d.getElementById('lang-fr').click();
is(line().includes('sxmdigital.agency@gmail.com'), true, '  toujours là de retour en français');
is(b.d.querySelector('a[href^="tel:"]') !== null, true, '  lien téléphone préservé');

report();
