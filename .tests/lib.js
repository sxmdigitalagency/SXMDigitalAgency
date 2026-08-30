/* Socle commun aux suites de test : assertions, lecture des fichiers du
   site, extraction du dictionnaire i18n, et amorçage d'une page dans
   jsdom avec les stubs nécessaires (jsdom ne calcule aucune mise en page
   et n'implémente ni matchMedia ni IntersectionObserver). */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');

const PAGES = ['index.html', 'sites-web.html', 'seo-local.html', 'automatisations.html',
               'calculateur.html', 'faq.html', 'contact.html', 'mentions-legales.html'];

const ROUTES = {
  '/': 'index.html', '/sites-web': 'sites-web.html', '/seo-local': 'seo-local.html',
  '/automatisations': 'automatisations.html', '/calculateur': 'calculateur.html',
  '/faq': 'faq.html', '/contact': 'contact.html', '/mentions-legales': 'mentions-legales.html'
};

let pass = 0, fail = 0;
const ok  = m => { pass++; console.log('  ✓ ' + m); };
const bad = m => { fail++; console.log('  ✗ ' + m); };
const is  = (a, e, m) => a === e ? ok(m) : bad(m + '  [attendu: ' + e + ' / obtenu: ' + a + ']');
const section = t => console.log('\n' + t);

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

/* Le dictionnaire est extrait sans exécuter le reste de site.js, qui a
   besoin d'un DOM. */
function i18n() {
  const s = read('assets/site.js');
  const start = s.indexOf('const I18N = {');
  const end = s.indexOf('\n};\n', start);
  if (start < 0 || end < 0) throw new Error('objet I18N introuvable dans site.js');
  const g = {};
  new Function('g', s.slice(start, end + 3).replace('const I18N', 'g.I18N'))(g);
  return g.I18N;
}

const FAR = { top: -3000, bottom: -2900, left: 0, right: 1200, width: 1200, height: 100, x: 0, y: -3000 };
const rect = (top, bottom, left = 0, right = 1200) =>
  ({ top, bottom, left, right, width: right - left, height: bottom - top, x: left, y: top });

/* Amorce une page. `opts.mobile` pilote matchMedia, `opts.floatRect` le
   rectangle rendu pour le bouton flottant. */
function boot(page, opts = {}) {
  const mobile = opts.mobile !== false;
  const viewport = opts.viewport || 800;
  const floatRect = opts.floatRect || null;

  let html = read(page);
  html = html.replace('<script src="/assets/site.js"></script>',
                      '<script>' + read('assets/site.js') + '</script>');

  const observers = [];
  const breakpointListeners = [];

  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    beforeParse(w) {
      w.matchMedia = q => {
        const isBp = q.indexOf('max-width: 760px') !== -1;
        return {
          media: q, matches: isBp ? mobile : false,
          addEventListener: (_, fn) => { if (isBp) breakpointListeners.push(fn); },
          addListener: fn => { if (isBp) breakpointListeners.push(fn); },
          removeEventListener() {}, removeListener() {}
        };
      };
      w.scrollTo = () => {};
      Object.defineProperty(w, 'innerHeight', { value: viewport, writable: true });

      /* Un vrai rAF rend la main AVANT d'exécuter le callback ; un stub
         synchrone laisserait armé le garde-fou anti-répétition du bouton
         flottant. La file est vidée explicitement par flush(). */
      w.__raf = [];
      w.requestAnimationFrame = fn => w.__raf.push(fn);

      w.IntersectionObserver = class {
        constructor(cb, o) { this.cb = cb; this.opts = o || {}; this.targets = []; observers.push(this); }
        observe(el) { this.targets.push(el); }
        disconnect() { this.targets = []; }
        fire(el, isIntersecting) { this.cb([{ target: el, isIntersecting }]); }
      };

      if (floatRect) {
        w.Element.prototype.getBoundingClientRect = function () {
          if (this.classList && this.classList.contains('float-cta')) return floatRect;
          return this.__rect || FAR;
        };
      }
      /* Sans moteur de rendu, tout élément a une taille nulle : le piège
         de focus du menu filtrerait alors tous les éléments. */
      Object.defineProperty(w.HTMLElement.prototype, 'offsetWidth',  { get() { return 40; } });
      Object.defineProperty(w.HTMLElement.prototype, 'offsetHeight', { get() { return 20; } });
    }
  });

  const w = dom.window;
  const flush = () => { while (w.__raf.length) w.__raf.shift()(); };
  return {
    dom, w, d: w.document, observers, breakpointListeners, flush,
    key: (k) => w.document.dispatchEvent(new w.KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true })),
    /* Positionne des rectangles puis force un recalcul du bouton flottant */
    place(map) {
      w.document.querySelectorAll('main .btn, .section-dark, .site-footer')
        .forEach(el => { el.__rect = FAR; });
      for (const [sel, r] of map) {
        const el = typeof sel === 'string' ? w.document.querySelector(sel) : sel;
        if (el) el.__rect = r;
      }
      w.dispatchEvent(new w.Event('scroll'));
      flush();
    }
  };
}

function report() {
  console.log('\n' + '='.repeat(60));
  console.log('RÉUSSIS : ' + pass + '   |   ÉCHOUÉS : ' + fail);
  console.log('='.repeat(60));
  process.exit(fail ? 1 : 0);
}

/* Ratios de contraste WCAG, utilisés par plusieurs suites */
const lin = c => (c /= 255) <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const lum = h => { const n = parseInt(h.slice(1), 16);
  return 0.2126 * lin(n >> 16 & 255) + 0.7152 * lin(n >> 8 & 255) + 0.0722 * lin(n & 255); };
const contrast = (a, b) => { const x = lum(a), y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

function tokens() {
  const css = read('assets/styles.css');
  const root = css.match(/:root \{[^}]*\}/)[0];
  const out = {};
  (root.match(/--[\w-]+:\s*#[0-9A-Fa-f]{6}/g) || []).forEach(d => {
    const [k, v] = d.split(/:\s*/); out[k] = v;
  });
  return out;
}

module.exports = { ROOT, PAGES, ROUTES, ok, bad, is, section, read, i18n, boot,
                   report, rect, FAR, contrast, tokens };
