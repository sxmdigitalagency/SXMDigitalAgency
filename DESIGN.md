# DESIGN.md — SXM Digital Agency (agence digitale, Saint-Martin)

> La clarté d'un matin caribéen : du crème lumineux, un vert lagon profond qui ancre, une touche de corail qui réveille.

## 1. Visual Theme & Atmosphere

**Style**: Tropical Premium Light — éditorial clair aux accents lagon
**Keywords**: lumineux, chaleureux, direct, précis, insulaire, premium, accessible
**Tone**: confiant et solaire — NOT criard, NOT cliché « flyer de plage », NOT corporate froid
**Feel**: comme une terrasse ombragée face au lagon à 9h du matin.

**Interaction Tier**: L2 — interactions fluides (reveal au scroll, spotlight, marquee, compteurs)
**Dependencies**: CSS only + IntersectionObserver (zéro librairie externe)

## 2. Color Palette & Roles

```css
:root {
  /* Backgrounds */
  --bg: #FAF6EF;              /* crème — fond de page */
  --surface: #FFFFFF;         /* cartes / conteneurs */
  --surface-alt: #F3EDE1;     /* sections alternées */
  --surface-hover: #FFFFFF;   /* surface au survol (relief via ombre) */

  /* Borders */
  --border: rgba(14, 94, 89, .14);
  --border-hover: rgba(14, 94, 89, .35);

  /* Text */
  --text: #1C1C1C;            /* anthracite — texte courant, texte fort */
  --text-secondary: #44443E;  /* corps de texte secondaire */
  --text-tertiary: #6B6A61;   /* labels, légendes (≥ 4.5:1 sur crème) */

  /* Primary — titres, boutons secondaires, liens */
  --primary: #0E5E59;         /* vert lagon profond */
  --primary-hover: #0A4946;

  /* Accent — CTA, hover, gros éléments uniquement */
  --accent: #FF6B5B;          /* corail */
  --accent-hover: #F2543F;

  /* RGB variants for rgba() */
  --bg-rgb: 250, 246, 239;
  --surface-rgb: 255, 255, 255;
  --primary-rgb: 14, 94, 89;
  --accent-rgb: 255, 107, 91;
  --text-rgb: 28, 28, 28;

  /* Semantic */
  --success: #1A7F4E;
  --error: #C2362B;
  --warning: #B45309;
}
```

**Color Rules:**
- Toutes les couleurs passent par les variables CSS — zéro hex codé en dur dans les composants.
- **Contraste WCAG AA obligatoire.** Le corail `#FF6B5B` sur crème ≈ 2.8:1 : il est donc **interdit en texte courant**. Réservé aux gros éléments : fonds de bouton (texte anthracite dessus ≈ 5.6:1 ✓), gros numéros décoratifs, soulignés, points, icônes décoratives.
- Les titres et liens sont en `--primary` (≈ 7.4:1 sur crème ✓) ; le texte courant en `--text` / `--text-secondary`.
- Sur fond `--primary` (encart offre), le texte est en `--bg` crème (≈ 7:1 ✓), jamais en corail.
- Une seule touche corail dominante par écran (CTA, numéro ou dot).

## 3. Typography Rules

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
```
- Headings : `'Sora', 'Inter', system-ui, sans-serif` — couleur `--primary`
- Body : `'Inter', system-ui, -apple-system, sans-serif` — couleur `--text` / `--text-secondary`

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 | Sora | clamp(2.6rem, 7vw, 5.2rem) | 800 | 1.05 | -0.03em |
| Section H2 | Sora | clamp(1.8rem, 4vw, 2.8rem) | 700 | 1.15 | -0.02em |
| H3 | Sora | 1.25rem | 600 | 1.3 | — |
| Body | Inter | 1.0625rem (17px) | 400 | 1.7 | — |
| Label / eyebrow | Inter | 0.8125rem | 600 | 1.4 | 0.14em (uppercase) |
| Stat number | Sora | clamp(2.2rem, 4vw, 3.2rem) | 800 | 1 | -0.02em |
| Step number | Sora | 3rem | 800 | 1 | -0.02em |

**Typography Rules:**
- Heading weight ≥ 700 ; les eyebrows sont en uppercase + letter-spacing large.
- Corps de texte jamais sous 16px ; largeur de lecture max ~62ch.
- **NEVER use**: Lobster, Pacifico, Comic Sans, polices « tropicales » script.

**Text Decoration:**
- Hero H1 : un seul mot-clé porte le dégradé animé vert lagon → corail ; le reste du titre reste en `--primary`, sans ombre.
- H2 de section : pas de dégradé, pas d'ombre.
- Les stats portent le dégradé statique vert → corail (gros chiffres décoratifs uniquement).

## 4. Component Stylings

### Buttons
```css
.btn {
  display: inline-flex; align-items: center; gap: .5rem;
  font: 600 1rem/1 'Sora', sans-serif;
  padding: 1rem 1.75rem; border-radius: 999px;
  cursor: pointer; border: 1px solid transparent;
  transition: transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s, background .25s, border-color .25s;
  min-height: 48px;
}
/* CTA : corail + texte anthracite (AA ✓) */
.btn-primary { background: var(--accent); color: var(--text); }
.btn-primary:hover { background: var(--accent-hover); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(var(--accent-rgb), .35); }
.btn-primary:active { transform: translateY(0); box-shadow: 0 4px 12px rgba(var(--accent-rgb), .25); }
.btn-primary:focus-visible { outline: 2px solid var(--primary); outline-offset: 3px; }
.btn-primary:disabled { background: var(--surface-alt); color: var(--text-tertiary); cursor: not-allowed; transform: none; box-shadow: none; }

/* Secondaire : vert lagon */
.btn-ghost { background: transparent; color: var(--primary); border-color: var(--border-hover); }
.btn-ghost:hover { border-color: var(--primary); background: rgba(var(--primary-rgb), .06); transform: translateY(-2px); }
.btn-ghost:active { transform: translateY(0); }
.btn-ghost:focus-visible { outline: 2px solid var(--primary); outline-offset: 3px; }
.btn-ghost:disabled { color: var(--text-tertiary); border-color: var(--border); cursor: not-allowed; }
```

### Cards (SpotlightCard)
```css
.card {
  position: relative; overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px; padding: 2rem;
  transition: border-color .3s, transform .3s, box-shadow .3s;
}
.card::before { /* halo qui suit la souris */
  content: ""; position: absolute; inset: 0; opacity: 0;
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%),
              rgba(var(--primary-rgb), .07), transparent 65%);
  transition: opacity .35s; pointer-events: none;
}
.card:hover { border-color: var(--border-hover); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(var(--primary-rgb), .12); }
.card:hover::before { opacity: 1; }
.card:focus-within { border-color: var(--primary); }
```

### Navigation
```css
.nav {
  position: fixed; inset: 0 0 auto 0; z-index: 100;
  padding: 1.25rem 0;
  transition: padding .3s, background .3s, border-color .3s;
  border-bottom: 1px solid transparent;
}
.nav.scrolled {
  padding: .75rem 0;
  background: rgba(var(--bg-rgb), .85);
  backdrop-filter: blur(12px);          /* ≤ 14px, bandeau fin uniquement */
  border-bottom-color: var(--border);
}
```

### Links (nav + inline)
```css
.link { color: var(--text-secondary); text-decoration: none; position: relative; transition: color .25s; }
.link::after { content: ""; position: absolute; left: 0; bottom: -4px; width: 100%; height: 2px;
               background: var(--accent); /* souligné corail = décoratif, OK */
               transform: scaleX(0); transform-origin: right; transition: transform .3s; }
.link:hover, .link:focus-visible { color: var(--primary); }
.link:hover::after, .link:focus-visible::after { transform: scaleX(1); transform-origin: left; }
```

### Tags / Badges (eyebrow)
```css
.badge {
  display: inline-flex; align-items: center; gap: .45rem;
  font: 600 .8125rem/1 'Inter', sans-serif; letter-spacing: .14em; text-transform: uppercase;
  color: var(--primary); padding: .5rem 1rem; border-radius: 999px;
  border: 1px solid rgba(var(--primary-rgb), .25);
  background: rgba(var(--primary-rgb), .06);
}
/* le point décoratif du badge est corail */
```

### Offer panel (encart offre de lancement)
```css
.offer {
  background: var(--primary); border-radius: 24px;
  padding: clamp(2rem, 5vw, 3.5rem);
  display: grid; grid-template-columns: 1.6fr auto; align-items: center; gap: 2.5rem;
}
.offer h3 { color: var(--bg); }
.offer p { color: rgba(var(--bg-rgb), .85); }
/* CTA corail à l'intérieur : seul gros aplat corail de l'écran */
```

### Inputs (formulaire contact)
```css
.input { width: 100%; padding: .9rem 1.1rem; border-radius: 12px;
  background: var(--surface); border: 1px solid var(--border);
  color: var(--text); font: 400 1rem 'Inter', sans-serif; transition: border-color .25s; }
.input::placeholder { color: var(--text-tertiary); }
.input:hover { border-color: var(--border-hover); }
.input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(var(--primary-rgb), .15); }
.input:disabled { opacity: .5; cursor: not-allowed; }
```

## 5. Layout Principles

**Container:**
- Max width: 1200px
- Padding: clamp(1.25rem, 5vw, 2.5rem) latéral
- Narrow variant (texte) : 760px

**Spacing Scale:**
- Section padding: clamp(5rem, 10vw, 8.5rem) vertical
- Component gap: 1.25–1.5rem (cartes), 4rem (blocs)
- Card internal padding: 2rem

**Grid:**
```css
.bento { display: grid; gap: 1.25rem; grid-template-columns: repeat(3, 1fr); }
.bento .span-2 { grid-column: span 2; }   /* bento non uniforme : 2 cartes larges */
.steps { display: grid; gap: 1.25rem; grid-template-columns: repeat(3, 1fr); }
@media (max-width: 900px) { .bento { grid-template-columns: 1fr 1fr; } .steps { grid-template-columns: 1fr; } }
@media (max-width: 600px) { .bento { grid-template-columns: 1fr; } .bento .span-2 { grid-column: span 1; } }
```

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | aucune ombre, bordure `--border` | cartes au repos, sections |
| Subtle | `0 4px 16px rgba(var(--primary-rgb),.08)` | nav scrolled, petits éléments |
| Elevated | `0 16px 40px rgba(var(--primary-rgb),.12)` | cartes au hover, toast |
| Glow | `0 12px 32px rgba(var(--accent-rgb),.35)` | CTA primaire hover uniquement |

Sur fond clair, les ombres sont teintées vert lagon (jamais noir pur) et restent légères ; le relief vient aussi des aplats `--surface` sur `--bg`.

## 7. Animation & Interaction

**Motion Philosophy**: uniquement `opacity` + `transform` ; la page glisse comme une vague, jamais elle ne saute.
**Tier**: L2

### Dependencies
Aucune. CSS keyframes + IntersectionObserver natif. `scroll-behavior: smooth` natif.

### Entrance Animation (hero, au chargement)
```css
@keyframes riseIn { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
.hero [data-rise] { opacity: 0; animation: riseIn .8s cubic-bezier(.2,.8,.2,1) forwards; }
/* stagger : delay = index * 90ms ; les mots du H1 montent un par un */
```

### Scroll Behavior (reveal)
```js
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
```
```css
[data-reveal] { opacity: 0; transform: translateY(32px); transition: opacity .7s, transform .7s cubic-bezier(.2,.8,.2,1); }
[data-reveal].in { opacity: 1; transform: none; }
/* stagger enfants : transition-delay via --d */
```

### Hover & Focus States
Tous les éléments interactifs ont un état hover **et** focus-visible (cf. §4).

### Special Effects
- **Aurora hero** : 2 grands halos `radial-gradient` (vert lagon .10 + corail .12, très doux sur crème) animés en `transform: translate/scale` lents (26s+). Pré-adoucis dans le dégradé — **aucun `filter: blur()`**.
- **Spotlight souris** : variables `--mx/--my` mises à jour via `pointermove` **throttlé par rAF**, hero + cartes. Activé seulement si `matchMedia('(hover: hover)')`.
- **Marquee manifeste** : bande de texte géant en `translateX` keyframes infini, pause au hover ; un mot sur deux en outline (`-webkit-text-stroke`).
- **Compteurs stats** : count-up en JS déclenché par IntersectionObserver, une seule fois.
- **Dégradé animé** sur le mot-clé du H1 : `background-position` animé, vert lagon → corail.
- **Magnetic CTA** : le bouton hero suit légèrement le curseur (±6px max, rAF, hover: hover seulement).

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  [data-reveal], .hero [data-rise] { opacity: 1 !important; transform: none !important; }
  html { scroll-behavior: auto; }
}
```

## 8. Do's and Don'ts

### Do
- Utiliser la lumière (halos, dégradés radiaux très doux) pour créer la profondeur, même sur fond clair.
- Réserver le corail aux gros éléments : CTA, gros numéros, dots, soulignés — un aplat corail dominant par écran.
- Garder les titres et liens en `--primary`, le texte courant en `--text` / `--text-secondary`.
- Toujours fournir hover + focus-visible sur chaque élément interactif.
- Laisser respirer : sections ≥ 5rem de padding vertical, max-width de lecture 62ch.
- Sur fond `--primary`, écrire en crème `--bg`.
- Rester honnête : aucun faux chiffre, faux client ou faux témoignage — le positionnement est « agence qui se lance ».

### Don't
- ❌ Pas de hex codé en dur — variables CSS uniquement.
- ❌ **Pas de corail en texte courant ni en petit texte** (contraste ≈ 2.8:1 sur crème, échec AA).
- ❌ Pas de `filter: blur()` sur des éléments animés ; pas de `backdrop-filter` > 14px.
- ❌ Pas de clichés « agence tropicale » : flamants roses, police script, motifs ananas.
- ❌ Pas d'ombres noires lourdes sur fond clair — ombres teintées `--primary-rgb`, opacité ≤ .18.
- ❌ Pas d'emoji en guise d'icônes — SVG inline uniquement.
- ❌ Pas plus d'un dégradé animé visible par écran.
- ❌ Pas de scroll-jacking (Lenis & co) — scroll natif.
- ❌ Pas de projets fictifs, stats inventées ou témoignages imaginaires.

## 9. Responsive Behavior

**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | > 900px | bento 3 col, steps 3 col, nav complète, offre 2 col |
| Tablet | 601–900px | bento 2 col, steps 1 col, stats 2×2, offre 1 col |
| Mobile | ≤ 600px | tout en 1 col, nav burger, marquee taille réduite, effets souris désactivés |

**Touch Targets:** minimum 44×44px (boutons 48px de haut).
**Collapsing Strategy:** la nav devient un panneau plein écran ; le bento et les étapes s'empilent dans l'ordre du DOM ; les effets `hover`/souris (spotlight, magnetic) sont désactivés sous `(hover: none)`.

```css
@media (max-width: 600px) {
  .hero h1 { font-size: clamp(2.2rem, 11vw, 2.8rem); }
  .section { padding: 4.5rem 0; }
  .nav-links { display: none; } .nav-burger { display: flex; }
}
```
