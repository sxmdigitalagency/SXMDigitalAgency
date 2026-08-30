# Outillage de test

Cloudflare Pages déploie la racine du dépôt sans étape de build : tout ce
qui est commité y est servi, **y compris les dossiers commençant par un
point** — vérifié par requête réelle, contrairement à une idée répandue.

Ce qui protège réellement ce dossier est le fichier `_redirects` à la
racine, qui renvoie `/.tests/*` et `/tests/*` vers l'accueil en 301. Ne
le supprimez pas sans mesurer ce que ça rouvre :

    curl -o /dev/null -w '%{http_code}\n' https://sxmdigitalagency.com/.tests/gen.py

Le point initial ne sert plus qu'à signaler l'intention et à garder le
dossier hors des listings courants.

Rien de ce dossier n'est utilisé par le site : celui-ci reste huit fichiers
HTML statiques plus `assets/`, sans dépendance ni étape de build.

## Installation

    cd .tests && npm install

Seule dépendance : `jsdom`, pour exécuter le JavaScript du site hors
navigateur.

## Lancer

    .tests/run.sh

## Contenu

| Fichier | Rôle |
|---|---|
| `gen.py` | Source unique de l'en-tête et du pied de page, réécrits dans les 8 pages. `--check` vérifie sans écrire. |
| `lib.js` | Socle commun : assertions, amorçage jsdom, ratios de contraste. |
| `check.js` | Vérification transversale : clés i18n, métadonnées, liens, navigation, structure, sitemap. |
| `test-menu.js` | Menu mobile : ouverture, fermetures, piège de focus, verrou de défilement. |
| `test-structure.js` | Invariantes CSS/JS et verrous de contraste WCAG. |
| `test-calc.js` | Calculateur : arithmétique, bornes, cas limites, onglets. |
| `test-prices.js` | Cohérence des tarifs entre `PRICES`, i18n et HTML. |
| `test-legal.js` | Page légale : non-contradiction avec `/contact`, mentions obligatoires. |
| `test-float.js` | Bouton flottant : état initial, zones évitées, réapparition. |

## Ce que les tests ne couvrent pas

Aucun rendu visuel. jsdom ne calcule pas de mise en page : les suites
vérifient la logique, la structure et les valeurs, jamais l'apparence.
Un chevauchement, un débordement ou un scintillement au défilement ne
peuvent être vus que dans un vrai navigateur.
