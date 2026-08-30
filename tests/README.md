# Outillage de test

Rien de ce dossier n'est utilisé par le site : celui-ci reste huit fichiers
HTML statiques plus `assets/`, sans dépendance ni étape de build.

## Installation

    cd tests && npm install

Seule dépendance : `jsdom`, pour exécuter le JavaScript du site hors
navigateur.

## Lancer

    tests/run.sh

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
