#!/usr/bin/env bash
# Lance l'intégralité de l'outillage. Nécessite `npm install` dans .tests/.
set -u
cd "$(dirname "$0")"

fail=0
echo "── Synchronisation en-tête / pied de page ──"
python3 gen.py --check || fail=1

for f in check.js test-menu.js test-structure.js test-calc.js test-prices.js test-legal.js test-float.js; do
  echo ""
  echo "── $f ──"
  node "$f" | tail -3
  [ "${PIPESTATUS[0]}" -ne 0 ] && fail=1
done

echo ""
[ "$fail" -eq 0 ] && echo "✓ TOUT PASSE" || echo "✗ AU MOINS UNE SUITE A ÉCHOUÉ"
exit "$fail"
