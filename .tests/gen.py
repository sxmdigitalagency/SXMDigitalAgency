#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Synchronise l'en-tête et le pied de page des 8 fichiers HTML.

POURQUOI
    Le site n'a pas d'étape de build : chaque page est un fichier HTML
    autonome, servi tel quel par Cloudflare Pages. L'en-tête, la
    navigation, le pied de page et le bouton flottant sont donc dupliqués
    huit fois. Ce script est la source unique de ces fragments : il les
    réécrit à l'identique dans chaque page.

COMMENT LE RELANCER
    Après toute modification de l'en-tête, de la navigation, du pied de
    page ou du bouton flottant :

        python3 .tests/gen.py            # applique les changements
        python3 .tests/gen.py --check    # vérifie sans écrire (code 1 si écart)

    Modifier UNIQUEMENT les constantes NAV, FOOTER_EXTRA, HEADER et TAIL
    ci-dessous, jamais les fragments correspondants dans les .html : ils
    seraient écrasés au prochain passage.

    Le script est idempotent : le relancer sans avoir rien changé ne doit
    produire aucune différence. C'est ce que vérifie --check, et ce que
    contrôle aussi .tests/check.js.

CE QU'IL NE FAIT PAS
    Il ne génère pas le contenu propre à chaque page (hero, sections,
    calculateur, texte légal) : celui-ci vit dans les fichiers HTML, qui
    en restent la référence. Le script ne touche qu'aux fragments
    partagés, entre <header> et </header> d'une part, entre </main> et
    </html> d'autre part.
"""
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Navigation principale : ordre et libellés font foi.
NAV = [
    ("sites-web",       "/sites-web",       "nav.sites",   "Sites web"),
    ("seo-local",       "/seo-local",       "nav.seo",     "Référencement"),
    ("automatisations", "/automatisations", "nav.auto",    "Automatisations"),
    ("calculateur",     "/calculateur",     "nav.calc",    "Calculateur"),
    ("faq",             "/faq",             "nav.faq",     "FAQ"),
    ("contact",         "/contact",         "nav.contact", "Contact"),
]

# Liens présents au pied de page seulement. Les mentions légales sont une
# page réglementaire : accessibles, mais hors navigation commerciale.
FOOTER_EXTRA = [
    ("mentions-legales", "/mentions-legales", "nav.legal", "Mentions légales"),
]

# Pages sans bouton flottant (il pointerait vers elles-mêmes).
NO_FLOAT = {"calculateur"}


def header_html(current):
    """En-tête complet. `current` est le slug data-page de la page."""
    links = "\n".join(
        '        <a href="%s"%s data-i18n="%s">%s</a>'
        % (href, ' aria-current="page"' if slug == current else "", key, label)
        for slug, href, key, label in NAV
    )
    return '''<header class="site-header">
    <div class="container header-grid">
      <a class="wordmark" href="/" aria-label="SXM Digital">SXM Digital<span class="mark">.</span></a>

      <button type="button" class="nav-toggle" id="nav-toggle"
              aria-controls="site-nav" aria-expanded="false"
              aria-label="Ouvrir le menu" data-i18n-aria="nav.open">
        <span class="nav-toggle-icon" aria-hidden="true"></span>
      </button>

      <nav class="site-nav" id="site-nav" aria-label="Navigation principale" data-i18n-aria="nav.mainLabel">
%s
      </nav>

      <div class="lang-switch" role="group" aria-label="Langue / Language">
        <button type="button" class="lang-btn" id="lang-fr" aria-pressed="true" lang="fr">FR</button>
        <span class="lang-sep" aria-hidden="true">/</span>
        <button type="button" class="lang-btn" id="lang-en" aria-pressed="false" lang="en">EN</button>
      </div>
    </div>
  </header>''' % links


FLOAT = '''
  <!-- Bouton flottant : masqué quand le menu plein écran est ouvert -->
  <a class="float-cta" href="/calculateur" data-i18n="calc.float">Calculez votre perte</a>
'''


def tail_html(page):
    """Pied de page, bouton flottant éventuel, script, fermeture."""
    links = "\n".join(
        '          <a href="%s" data-i18n="%s">%s</a>' % (href, key, label)
        for _, href, key, label in NAV + FOOTER_EXTRA
    )
    # Le bouton est précédé d'une ligne vide ; sans lui, le pied de page
    # est directement suivi du script, sans ligne supplémentaire.
    floating = "" if page in NO_FLOAT else "\n" + FLOAT
    return '''</main>

  <!-- ================= FOOTER ================= -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="wordmark wordmark-footer" href="/">SXM Digital<span class="mark">.</span></a>
          <nav class="footer-nav" aria-label="Navigation de pied de page" data-i18n-aria="footer.navLabel">
%s
          </nav>
        </div>
        <div class="footer-meta">
          <p class="footer-coords">18.07° N, 63.08° W</p>
          <p data-i18n="footer.tagline">Agence digitale indépendante, Marigot, Saint-Martin.</p>
          <p><span data-i18n="footer.siret">SIRET&nbsp;: 106 977 234 00017</span></p>
          <p>© 2026 SXM Digital</p>
        </div>
      </div>
    </div>
  </footer>
%s
  <script src="/assets/site.js"></script>
</body>
</html>
''' % (links, floating)


def pages():
    for name in sorted(os.listdir(ROOT)):
        if name.endswith(".html"):
            yield name


def rewrite(name):
    path = os.path.join(ROOT, name)
    before = io.open(path, encoding="utf-8").read()

    m = re.search(r'data-page="([^"]+)"', before)
    if not m:
        raise SystemExit("%s : attribut data-page absent" % name)
    page = m.group(1)
    # L'accueil et la page légale ne correspondent à aucun lien du nav.
    current = page if any(slug == page for slug, _, _, _ in NAV) else None

    after = re.sub(r"<header class=\"site-header\">.*?</header>",
                   lambda _: header_html(current), before, count=1, flags=re.S)
    after = re.sub(r"</main>.*</html>\s*\Z",
                   lambda _: tail_html(page), after, count=1, flags=re.S)
    return path, before, after


def main():
    check_only = "--check" in sys.argv
    changed = []
    for name in pages():
        path, before, after = rewrite(name)
        if before != after:
            changed.append(name)
            if not check_only:
                io.open(path, "w", encoding="utf-8").write(after)

    if check_only:
        if changed:
            print("✗ en-tête ou pied de page désynchronisé : %s" % ", ".join(changed))
            return 1
        print("✓ en-tête et pied de page synchronisés sur les %d pages"
              % len(list(pages())))
        return 0

    if changed:
        print("réécrit : %s" % ", ".join(changed))
    else:
        print("✓ aucune différence — les %d pages étaient déjà synchronisées"
              % len(list(pages())))
    return 0


if __name__ == "__main__":
    sys.exit(main())
