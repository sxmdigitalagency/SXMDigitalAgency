/* ==========================================================
   SXM DIGITAL — TRADUCTIONS ET COMPORTEMENTS
   Partagé par les 6 pages.

   Une clé par nœud de texte. FR est la langue par défaut.
   Les métadonnées sont préfixées par la page : chaque document
   déclare son identifiant via <body data-page="...">.
   Modifier ici, et uniquement ici, pour changer le contenu.
   ========================================================== */

const I18N = {

  fr: {
    /* ---------- Métadonnées ----------
       Une description propre à chaque page : Google réécrit les
       descriptions dupliquées. Cible : 150-160 caractères. */
    "meta.home.title": "SXM Digital, agence digitale à Saint-Martin",
    "meta.home.description": "Sites web, référencement local et automatisations sur mesure pour les commerces de Saint-Martin. Agence 100 % locale et bilingue.",
    "meta.sites-web.title": "Sites web sur mesure à Saint-Martin — SXM Digital",
    "meta.sites-web.description": "Sites web sur mesure à partir de 800€ pour les commerces de Saint-Martin — codés pour votre activité, pas des thèmes déballés. Hébergement inclus.",
    "meta.seo-local.title": "Référencement local (SEO) à Saint-Martin — SXM Digital",
    "meta.seo-local.description": "Diagnostic et mise en place de référencement local pour être trouvé sur Google à Saint-Martin : fiche Google Business, structure technique, visibilité.",
    "meta.automatisations.title": "Automatisations IA et logiciels métier — SXM Digital",
    "meta.automatisations.description": "Automatisations et logiciels métier sur mesure pour les commerces de Saint-Martin — des outils construits pour vos besoins réels, pas un logiciel générique.",
    "meta.faq.title": "Questions fréquentes — SXM Digital",
    "meta.faq.description": "Réponses aux questions fréquentes sur les sites web, le référencement et les automatisations SXM Digital Agency : délais, tarifs, domaine, paiement.",
    "meta.contact.title": "Contact — SXM Digital",
    "meta.contact.description": "Contactez SXM Digital Agency à Saint-Martin — devis gratuit, échange sans engagement, en français ou en anglais. Sites web, référencement, automatisations.",

    /* ---------- Éléments communs ---------- */
    "skip": "Aller au contenu",

    "nav.sites": "Sites web",
    "nav.seo": "Référencement",
    "nav.auto": "Automatisations",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",

    "cta.more": "En savoir plus",
    "cta.visit": "Voir le site",

    "closing.label": "Contact",
    "closing.title": "Parlons de votre projet.",
    "closing.text": "Un premier échange, sans engagement. En français ou en anglais, comme vous préférez.",
    "closing.cta": "Me contacter",

    "footer.tagline": "Agence digitale indépendante, Marigot, Saint-Martin.",
    "footer.siret": "SIRET&nbsp;: 106 977 234 00017",
    "nav.mainLabel": "Navigation principale",
    "nav.open": "Ouvrir le menu",
    "nav.close": "Fermer le menu",
    "footer.navLabel": "Navigation de pied de page",

    /* ---------- Accueil ---------- */
    "home.hero.eyebrow": "Agence digitale indépendante, Saint-Martin",
    "home.hero.title": "Votre commerce mérite <em>mieux</em> qu’une page Facebook<span class=\"mark\">.</span>",
    "home.hero.sub": "Sites, référencement, outils sur mesure — pensés pour votre activité, pas déballés d’un thème. 100&nbsp;% local, bilingue, conçu et suivi par une seule personne, ici.",
    "home.hero.cta": "Parlons de votre projet",

    "home.services.label": "Services",
    "home.services.title": "Ce que nous faisons.",
    "home.s1.name": "Sites web",
    "home.s1.desc": "Vitrine, réservation, présentation en ligne. Des sites rapides, clairs, dessinés pour vous — pas déballés d’un thème. À partir de 800€.",
    "home.s2.name": "Référencement local",
    "home.s2.desc": "Fiche Google, structure technique, visibilité. Être trouvé par les clients qui cherchent ici, au moment où ils cherchent.",
    "home.s3.name": "Automatisations &amp; logiciels",
    "home.s3.desc": "Des outils construits sur mesure pour vos tâches répétitives — pas un logiciel générique auquel s’adapter.",

    "home.work.label": "Réalisation",
    "home.work.title": "Une réalisation récente",
    "home.work.name": "SXM Sunset Charter",
    "home.work.desc": "Site bilingue pour une activité de location de bateau à Saint-Martin.",

    "home.method.label": "Méthode",
    "home.method.title": "Comment nous travaillons.",
    "home.method.intro": "Pas de formule toute faite. Trois principes guident chaque projet, du premier rendez-vous à la mise en ligne.",
    "home.method.s1.name": "Écoute d’abord",
    "home.method.s1.desc": "Avant de parler de site, on parle de votre métier&nbsp;: vos clients, vos saisons, ce qui marche déjà. Le projet part de là.",
    "home.method.s2.name": "Sur-mesure",
    "home.method.s2.desc": "Pas de thème acheté, pas de copier-coller. Chaque site est dessiné et écrit pour un seul commerce&nbsp;: le vôtre.",
    "home.method.s3.name": "Ancrage local",
    "home.method.s3.desc": "Nous vivons et travaillons à Saint-Martin. On se rencontre, on se rappelle, on ajuste. Votre agence n’est pas à six fuseaux horaires.",

    "home.contact.label": "Contact",
    "home.contact.title": "Parlez-nous de votre commerce.",
    "home.contact.lead": "Un premier échange, sans engagement. En français ou en anglais, comme vous préférez.",
    "home.contact.cta": "Aller à la page contact",

    /* ---------- Sites web ---------- */
    "sw.eyebrow": "Service",
    "sw.title": "Sites web",
    "sw.lead": "Un site web, c’est votre vitrine ouverte 24h/24 — celle que les clients regardent avant de pousser votre porte.",
    "sw.intro": "Ce n’est pas un profil Facebook, ni une fiche Google Maps. C’est une page que vous possédez, que vous contrôlez, et qui donne confiance à quelqu’un qui ne vous connaît pas encore.",

    "sw.problems.label": "Le constat",
    "sw.problems.title": "Les problèmes que ça résout",
    "sw.p1.q": "Vos clients potentiels vous cherchent et ne vous trouvent pas.",
    "sw.p1.a": "Ils tapent «&nbsp;restaurant Grand-Case&nbsp;» ou «&nbsp;location bateau Marigot&nbsp;» sur Google, et un concurrent avec un site apparaît avant vous — même si votre établissement est meilleur.",
    "sw.p2.q": "On vous prend au sérieux ou pas, en 5 secondes.",
    "sw.p2.a": "Un client qui atterrit sur un profil Instagram figé depuis trois mois, ou pas de présence du tout, doute. Un site propre et à jour rassure immédiatement.",
    "sw.p3.q": "Vous répondez vingt fois par jour aux mêmes questions.",
    "sw.p3.a": "Horaires, tarifs, comment réserver — par message ou téléphone. Un site répond à votre place, tout le temps, sans vous.",

    "sw.outcomes.label": "Le résultat",
    "sw.outcomes.title": "Ce que ça change concrètement",
    "sw.o1": "Un client qui vous découvre à 23h peut déjà voir vos prestations, vos tarifs, vous contacter — sans attendre votre réouverture.",
    "sw.o2": "Votre activité apparaît dans les recherches Google de gens qui ne vous connaissaient pas.",
    "sw.o3": "Vous n’êtes plus dépendant d’un algorithme de réseau social qui peut changer ses règles du jour au lendemain — le site est à vous.",

    "sw.build.label": "La fabrication",
    "sw.build.title": "Ce qu’on construit",
    "sw.build.text": "Pas de thème générique téléchargé et personnalisé à la va-vite. Chaque site est codé sur-mesure (HTML/CSS/JavaScript), pensé pour votre activité et hébergé sur une infrastructure rapide (Cloudflare) — pas de plugin superflu qui ralentit tout.",
    "sw.ex.label": "Exemple",
    "sw.ex.name": "SXM Sunset Charter",
    "sw.ex.desc": "Site bilingue français/anglais pour une activité de location de bateau à Saint-Martin, avec structuration technique pour apparaître correctement dans les recherches Google (référencement de base inclus dès la construction).",

    "sw.price.label": "Tarif",
    "sw.price.title": "Combien ça coûte",
    "sw.price.figure": "À partir de 800€",
    "sw.price.text": "Sur-mesure, hébergement inclus (Cloudflare). Le prix final dépend de la complexité de votre projet (nombre de pages, langues, fonctionnalités spécifiques). Discutons-en pour un devis précis.",

    /* ---------- Référencement local ---------- */
    "seo.eyebrow": "Service",
    "seo.title": "Référencement local (SEO)",
    "seo.lead": "Être trouvé sur Google quand quelqu’un cherche ce que vous vendez, dans votre zone — sans payer pour de la publicité.",
    "seo.intro": "Le référencement local, c’est l’ensemble des réglages techniques et éditoriaux qui déterminent si votre commerce apparaît (et où) quand un client tape une recherche géolocalisée&nbsp;: «&nbsp;plombier Marigot&nbsp;», «&nbsp;restaurant Grand-Case&nbsp;», «&nbsp;location voiture Saint-Martin&nbsp;».",

    "seo.problems.label": "Le constat",
    "seo.problems.title": "Les problèmes que ça résout",
    "seo.p1.q": "Vous existez, mais vous êtes invisible.",
    "seo.p1.a": "Un client peut chercher exactement ce que vous proposez sans jamais tomber sur vous, parce que votre fiche Google Business est incomplète, mal catégorisée, ou que votre site n’est pas structuré pour être compris par Google.",
    "seo.p2.q": "Vous dépendez du bouche-à-oreille et rien d’autre.",
    "seo.p2.a": "C’est solide, mais ça plafonne — un client qui débarque à Saint-Martin sans connaître personne ne vous trouvera jamais par ce biais.",
    "seo.p3.q": "Vos concurrents avec un site optimisé passent devant vous.",
    "seo.p3.a": "Même s’ils sont moins bons, simplement parce qu’ils sont techniquement mieux référencés.",

    "seo.outcomes.label": "Le résultat",
    "seo.outcomes.title": "Ce que ça change concrètement",
    "seo.o1": "Votre commerce apparaît dans les recherches Google Maps et le moteur de recherche classique pour les requêtes liées à votre activité et votre zone.",
    "seo.o2": "Votre fiche Google Business devient un outil actif (avis, photos, horaires à jour, réponses aux questions) au lieu d’une coquille vide.",
    "seo.o3": "Vous captez des clients qui ne vous cherchaient pas nommément, mais qui cherchaient votre service.",

    "seo.how.label": "Déroulé",
    "seo.how.title": "Comment ça se passe",
    "seo.h1.name": "Consultation (diagnostic B2B)",
    "seo.h1.desc": "On regarde où vous en êtes réellement&nbsp;: fiche Google Business, présence actuelle, ce qui bloque. Vous repartez avec un état des lieux clair, même si vous ne continuez pas avec moi.",
    "seo.h2.name": "Mise en place",
    "seo.h2.desc": "Correction technique et éditoriale de votre présence en ligne (structuration du site pour Google, fiche Google Business, cohérence des informations) pour que le travail du diagnostic se traduise en résultats visibles.",

    "seo.price.label": "Tarif",
    "seo.price.title": "Combien ça coûte",
    "seo.price.figure": "Sur diagnostic",
    "seo.price.text": "Pas de prix affiché ici — chaque situation de départ est différente (certains commerces n’ont rien, d’autres ont une fiche mal configurée à corriger). Contactez-moi pour un diagnostic.",

    /* ---------- Automatisations ---------- */
    "auto.eyebrow": "Service",
    "auto.title": "Automatisations IA &amp; logiciels métier",
    "auto.lead": "Des outils qui font le travail répétitif à votre place — construits sur mesure pour votre activité, pas un logiciel générique mal adapté.",
    "auto.intro": "Automatiser, ce n’est pas «&nbsp;mettre de l’IA partout&nbsp;». C’est identifier une tâche que vous (ou votre équipe) refaites manuellement chaque jour, et construire un outil qui la fait sans vous.",

    "auto.problems.label": "Le constat",
    "auto.problems.title": "Les problèmes que ça résout",
    "auto.p1.q": "Vous perdez du temps sur des tâches répétitives.",
    "auto.p1.a": "Saisie, relances, calculs, suivi de dossiers — autant d’opérations qui pourraient être automatisées.",
    "auto.p2.q": "Les logiciels génériques du marché ne collent pas à votre façon de travailler.",
    "auto.p2.a": "Trop de fonctions inutiles, pas assez sur ce qui compte vraiment pour vous.",
    "auto.p3.q": "Le suivi de vos clients ou dossiers se fait sur papier, tableur ou dans votre tête.",
    "auto.p3.a": "Ça marche jusqu’au jour où ça déborde.",

    "auto.outcomes.label": "Le résultat",
    "auto.outcomes.title": "Ce que ça change concrètement",
    "auto.o1": "Une tâche qui prenait 20 minutes par jour peut être ramenée à un clic.",
    "auto.o2": "Vos informations clients sont centralisées et accessibles, pas éparpillées.",
    "auto.o3": "Un outil pensé pour votre activité précise, pas un logiciel générique auquel vous devez vous adapter.",

    "auto.built.label": "Concret",
    "auto.built.title": "Ce que j’ai déjà construit",
    "auto.built.intro": "Pas encore de client sur ce service précis — je le dis clairement plutôt que d’inventer un historique. Mais voici du concret, construit et fonctionnel, pour ma propre activité&nbsp;:",
    "auto.b1.name": "Système de parrainage automatisé pour Pause Récup",
    "auto.b1.desc": "Un Worker Cloudflare avec base de données qui suit les filleuls et calcule les récompenses, sans intervention manuelle.",
    "auto.b2.name": "Générateur de devis automatique",
    "auto.b2.desc": "Calcule les montants, la taxe locale (TGCA) et l’acompte instantanément, sans tableur ni erreur de calcul.",
    "auto.built.outro": "Ce sont les mêmes compétences techniques qui permettent de construire un CRM ou un outil de suivi sur mesure pour votre activité.",

    "auto.price.label": "Tarif",
    "auto.price.title": "Combien ça coûte",
    "auto.price.figure": "Sur devis",
    "auto.price.text": "Chaque automatisation dépend entièrement du besoin réel, il n’y a pas de prix générique honnête à afficher ici.",

    /* ---------- FAQ ---------- */
    "faq.eyebrow": "Aide",
    "faq.title": "Questions fréquentes",
    "faq.lead": "Les questions qui reviennent le plus souvent, répondues sans détour.",
    "faq.q1": "J’ai déjà un nom de domaine, vous pouvez l’utiliser pour le nouveau site&nbsp;?",
    "faq.a1": "Oui. Si vous avez déjà un domaine actif, on le connecte directement au nouveau site — pas besoin d’en racheter un.",
    "faq.q2": "Combien de temps pour avoir mon site en ligne&nbsp;?",
    "faq.a2": "Entre 3 et 5 jours en général, marge comprise pour les échanges et validations. Ça peut aller plus vite selon votre disponibilité.",
    "faq.q3": "Je n’ai pas de photos ou de textes prêts, c’est un problème&nbsp;?",
    "faq.a3": "On peut travailler avec ce que vous avez, et je peux vous aider à organiser ou trouver le contenu manquant si besoin.",
    "faq.q4": "Le site fonctionne aussi bien sur téléphone&nbsp;?",
    "faq.a4": "Oui, chaque site est conçu pour bien s’afficher sur mobile dès le départ.",
    "faq.q5": "Est-ce que je peux modifier mon site moi-même après la mise en ligne&nbsp;?",
    "faq.a5": "Les modifications passent par moi — je m’occupe du suivi pour garder le site cohérent et fonctionnel dans le temps.",
    "faq.q6": "Comment se passe le paiement&nbsp;?",
    "faq.a6": "50&nbsp;% à la commande, 50&nbsp;% à la livraison. Par virement ou lien de paiement.",
    "faq.q7": "Le site m’appartient une fois payé&nbsp;?",
    "faq.a7": "Le nom de domaine vous appartient (je vous conseille de l’acheter vous-même). Le code source du site est disponible sur demande.",

    /* ---------- Contact ---------- */
    "ct.eyebrow": "Contact",
    "ct.title": "Parlez-nous de votre commerce.",
    "ct.lead": "Un premier échange, sans engagement. En français ou en anglais, comme vous préférez.",
    "ct.telLabel": "Téléphone",
    "ct.waLink": "Envoyer un message",
    "ct.igLink": "@sxmdigitalagency",
    "ct.cta": "Écrire à l’agence"
  },

  en: {
    /* ---------- Metadata ----------
       One description per page: Google rewrites duplicated ones.
       Target length: 150-160 characters. */
    "meta.home.title": "SXM Digital, digital agency in Saint-Martin",
    "meta.home.description": "Custom websites, local SEO and automation for businesses in Saint-Martin. A fully local, bilingual agency, run by one person here.",
    "meta.sites-web.title": "Custom websites in Saint-Martin — SXM Digital",
    "meta.sites-web.description": "Custom-built websites from €800 for Saint-Martin businesses — coded around your trade, not unpacked from a theme. Hosting included.",
    "meta.seo-local.title": "Local SEO in Saint-Martin — SXM Digital",
    "meta.seo-local.description": "Local SEO audit and setup so customers find you on Google in Saint-Martin: Google Business profile, technical structure, visibility.",
    "meta.automatisations.title": "AI automation and custom software — SXM Digital",
    "meta.automatisations.description": "Custom automation and business software for Saint-Martin businesses — tools built around what you actually need, not generic software.",
    "meta.faq.title": "Frequently asked questions — SXM Digital",
    "meta.faq.description": "Answers to common questions about websites, local SEO and automation at SXM Digital Agency: timelines, pricing, domain names, payment.",
    "meta.contact.title": "Contact — SXM Digital",
    "meta.contact.description": "Get in touch with SXM Digital Agency in Saint-Martin — free quote, a no-strings conversation, in French or English. Websites, SEO, automation.",

    /* ---------- Shared ---------- */
    "skip": "Skip to content",

    "nav.sites": "Websites",
    "nav.seo": "Local SEO",
    "nav.auto": "Automation",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",

    "cta.more": "Find out more",
    "cta.visit": "Visit the site",

    "closing.label": "Contact",
    "closing.title": "Let’s talk about your project.",
    "closing.text": "A first conversation, no strings attached. In French or in English, whichever you prefer.",
    "closing.cta": "Get in touch",

    "footer.tagline": "Independent digital agency, Marigot, Saint-Martin.",
    "footer.siret": "SIRET: 106 977 234 00017",
    "nav.mainLabel": "Main navigation",
    "nav.open": "Open menu",
    "nav.close": "Close menu",
    "footer.navLabel": "Footer navigation",

    /* ---------- Home ---------- */
    "home.hero.eyebrow": "Independent digital agency, Saint-Martin",
    "home.hero.title": "Your business deserves <em>more</em> than a Facebook page<span class=\"mark\">.</span>",
    "home.hero.sub": "Websites, search visibility, custom tools — built around how you actually work, not unpacked from a theme. 100% local, bilingual, built and handled by one person, here.",
    "home.hero.cta": "Let’s talk about your project",

    "home.services.label": "Services",
    "home.services.title": "What we do.",
    "home.s1.name": "Websites",
    "home.s1.desc": "Storefront, booking, showing what you offer. Fast, clear sites, designed for you — not unpacked from a theme. From €800.",
    "home.s2.name": "Local SEO",
    "home.s2.desc": "Google profile, technical structure, visibility. Get found by customers searching here, right when they search.",
    "home.s3.name": "Automation &amp; software",
    "home.s3.desc": "Tools built to measure for your repetitive tasks — not generic software you have to bend around.",

    "home.work.label": "Recent work",
    "home.work.title": "A recent project",
    "home.work.name": "SXM Sunset Charter",
    "home.work.desc": "A bilingual site for a boat rental business in Saint-Martin.",

    "home.method.label": "Method",
    "home.method.title": "How we work.",
    "home.method.intro": "No ready-made formula. Three principles guide every project, from the first meeting to launch day.",
    "home.method.s1.name": "Listening first",
    "home.method.s1.desc": "Before we talk about a website, we talk about your trade: your customers, your seasons, what already works. The project starts there.",
    "home.method.s2.name": "Made to measure",
    "home.method.s2.desc": "No off-the-shelf themes, no copy and paste. Every site is designed and written for one business: yours.",
    "home.method.s3.name": "Rooted here",
    "home.method.s3.desc": "We live and work in Saint-Martin. We meet, we call back, we adjust. Your agency is not six time zones away.",

    "home.contact.label": "Contact",
    "home.contact.title": "Tell us about your business.",
    "home.contact.lead": "A first conversation, no strings attached. In French or in English, whichever you prefer.",
    "home.contact.cta": "Go to the contact page",

    /* ---------- Websites ---------- */
    "sw.eyebrow": "Service",
    "sw.title": "Websites",
    "sw.lead": "A website is your storefront, open around the clock — the one customers check before they walk through your door.",
    "sw.intro": "It is not a Facebook profile, and not a Google Maps listing. It is a page you own, that you control, and that earns the trust of someone who does not know you yet.",

    "sw.problems.label": "The problem",
    "sw.problems.title": "What it solves",
    "sw.p1.q": "Potential customers look for you and cannot find you.",
    "sw.p1.a": "They type “restaurant Grand-Case” or “boat rental Marigot” into Google, and a competitor with a website shows up before you — even when your place is better.",
    "sw.p2.q": "People decide whether to take you seriously in 5 seconds.",
    "sw.p2.a": "A customer landing on an Instagram profile frozen for three months, or on nothing at all, hesitates. A clean, current website reassures them straight away.",
    "sw.p3.q": "You answer the same questions twenty times a day.",
    "sw.p3.a": "Opening hours, prices, how to book — by message or by phone. A website answers for you, all the time, without you.",

    "sw.outcomes.label": "The outcome",
    "sw.outcomes.title": "What actually changes",
    "sw.o1": "A customer who finds you at 11pm can already see what you offer, what it costs, and how to reach you — without waiting for you to reopen.",
    "sw.o2": "Your business shows up in Google searches by people who had never heard of you.",
    "sw.o3": "You no longer depend on a social network algorithm that can change its rules overnight — the site is yours.",

    "sw.build.label": "The build",
    "sw.build.title": "What we build",
    "sw.build.text": "No generic theme downloaded and hastily customised. Every site is coded to measure (HTML/CSS/JavaScript), designed around your business and hosted on fast infrastructure (Cloudflare) — no surplus plugins slowing everything down.",
    "sw.ex.label": "Example",
    "sw.ex.name": "SXM Sunset Charter",
    "sw.ex.desc": "A bilingual French/English site for a boat rental business in Saint-Martin, technically structured to appear properly in Google searches (baseline SEO included from the build itself).",

    "sw.price.label": "Pricing",
    "sw.price.title": "What it costs",
    "sw.price.figure": "From €800",
    "sw.price.text": "Made to measure, hosting included (Cloudflare). The final price depends on how complex your project is (number of pages, languages, specific features). Let’s talk it through for a precise quote.",

    /* ---------- Local SEO ---------- */
    "seo.eyebrow": "Service",
    "seo.title": "Local SEO",
    "seo.lead": "Getting found on Google when someone searches for what you sell, in your area — without paying for ads.",
    "seo.intro": "Local SEO is the set of technical and editorial settings that decide whether your business appears (and where) when a customer runs a location-based search: “plumber Marigot”, “restaurant Grand-Case”, “car rental Saint-Martin”.",

    "seo.problems.label": "The problem",
    "seo.problems.title": "What it solves",
    "seo.p1.q": "You exist, but you are invisible.",
    "seo.p1.a": "A customer can search for exactly what you offer and never come across you, because your Google Business profile is incomplete, wrongly categorised, or your site is not structured for Google to understand.",
    "seo.p2.q": "You depend on word of mouth and nothing else.",
    "seo.p2.a": "It is solid, but it has a ceiling — a customer arriving in Saint-Martin knowing no one will never find you that way.",
    "seo.p3.q": "Competitors with an optimised site get ahead of you.",
    "seo.p3.a": "Even when they are not as good, simply because they are technically better referenced.",

    "seo.outcomes.label": "The outcome",
    "seo.outcomes.title": "What actually changes",
    "seo.o1": "Your business appears in Google Maps and in regular search results for queries tied to your trade and your area.",
    "seo.o2": "Your Google Business profile becomes an active tool (reviews, photos, current hours, answers to questions) instead of an empty shell.",
    "seo.o3": "You capture customers who were not looking for you by name, but were looking for your service.",

    "seo.how.label": "Process",
    "seo.how.title": "How it works",
    "seo.h1.name": "Consultation (B2B audit)",
    "seo.h1.desc": "We look at where you really stand: Google Business profile, current presence, what is holding you back. You leave with a clear picture, even if you do not continue with me.",
    "seo.h2.name": "Implementation",
    "seo.h2.desc": "Technical and editorial correction of your online presence (structuring the site for Google, Google Business profile, consistency of your information) so the audit turns into visible results.",

    "seo.price.label": "Pricing",
    "seo.price.title": "What it costs",
    "seo.price.figure": "After an audit",
    "seo.price.text": "No price listed here — every starting point is different (some businesses have nothing, others have a badly configured profile to fix). Get in touch for an audit.",

    /* ---------- Automation ---------- */
    "auto.eyebrow": "Service",
    "auto.title": "AI automation &amp; custom software",
    "auto.lead": "Tools that do the repetitive work for you — built to measure for your business, not generic software that fits badly.",
    "auto.intro": "Automating is not about “putting AI everywhere”. It is about spotting a task you (or your team) redo by hand every day, and building a tool that does it without you.",

    "auto.problems.label": "The problem",
    "auto.problems.title": "What it solves",
    "auto.p1.q": "You lose time on repetitive tasks.",
    "auto.p1.a": "Data entry, follow-ups, calculations, tracking files — all of it could be automated.",
    "auto.p2.q": "Off-the-shelf software does not match how you work.",
    "auto.p2.a": "Too many features you never use, not enough of what actually matters to you.",
    "auto.p3.q": "You track customers or jobs on paper, in a spreadsheet, or in your head.",
    "auto.p3.a": "That works right up until the day it overflows.",

    "auto.outcomes.label": "The outcome",
    "auto.outcomes.title": "What actually changes",
    "auto.o1": "A task that took 20 minutes a day can come down to a single click.",
    "auto.o2": "Your customer information is centralised and reachable, not scattered.",
    "auto.o3": "A tool shaped around your specific business, not generic software you have to adapt to.",

    "auto.built.label": "Evidence",
    "auto.built.title": "What I have already built",
    "auto.built.intro": "No client yet on this particular service — I would rather say so plainly than invent a track record. But here is something concrete, built and working, for my own business:",
    "auto.b1.name": "Automated referral system for Pause Récup",
    "auto.b1.desc": "A Cloudflare Worker with a database that tracks referrals and calculates rewards, with no manual intervention.",
    "auto.b2.name": "Automatic quote generator",
    "auto.b2.desc": "Works out amounts, local tax (TGCA) and the deposit instantly, with no spreadsheet and no arithmetic slips.",
    "auto.built.outro": "These are the same technical skills that go into building a CRM or a tracking tool made to measure for your business.",

    "auto.price.label": "Pricing",
    "auto.price.title": "What it costs",
    "auto.price.figure": "On quote",
    "auto.price.text": "Every automation depends entirely on the real need — there is no honest generic price to put here.",

    /* ---------- FAQ ---------- */
    "faq.eyebrow": "Help",
    "faq.title": "Frequently asked questions",
    "faq.lead": "The questions that come up most often, answered straight.",
    "faq.q1": "I already have a domain name — can you use it for the new site?",
    "faq.a1": "Yes. If you already have an active domain, we connect it straight to the new site — no need to buy another one.",
    "faq.q2": "How long until my site is online?",
    "faq.a2": "Between 3 and 5 days as a rule, including room for back-and-forth and sign-off. It can be quicker depending on how available you are.",
    "faq.q3": "I don’t have photos or copy ready — is that a problem?",
    "faq.a3": "We can work with what you have, and I can help you organise or source the missing content if needed.",
    "faq.q4": "Does the site work just as well on a phone?",
    "faq.a4": "Yes, every site is designed to display properly on mobile from the start.",
    "faq.q5": "Can I edit the site myself once it is live?",
    "faq.a5": "Changes go through me — I handle the upkeep so the site stays coherent and working over time.",
    "faq.q6": "How does payment work?",
    "faq.a6": "50% on order, 50% on delivery. By bank transfer or payment link.",
    "faq.q7": "Do I own the site once it is paid for?",
    "faq.a7": "The domain name is yours (I recommend buying it yourself). The site’s source code is available on request.",

    /* ---------- Contact ---------- */
    "ct.eyebrow": "Contact",
    "ct.title": "Tell us about your business.",
    "ct.lead": "A first conversation, no strings attached. In French or in English, whichever you prefer.",
    "ct.telLabel": "Phone",
    "ct.waLink": "Send a message",
    "ct.igLink": "@sxmdigitalagency",
    "ct.cta": "Email the agency"
  }
};

/* ==========================================================
   BASCULE DE LANGUE
   FR par défaut, choix persisté dans localStorage.
   ========================================================== */
const langButtons = { fr: document.getElementById('lang-fr'), en: document.getElementById('lang-en') };

/* Identifiant de la page courante, pour les métadonnées */
const PAGE = document.body.dataset.page || 'home';

/* Langue affichée : le libellé du bouton de menu la suit */
let currentLang = 'fr';

function setLang(lang) {
  const dict = I18N[lang];
  if (!dict) return;

  currentLang = lang;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    const value = dict[el.dataset.i18n];
    if (value !== undefined) el.innerHTML = value;
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
    const value = dict[el.dataset.i18nAria];
    if (value !== undefined) el.setAttribute('aria-label', value);
  });

  document.documentElement.lang = lang;

  const title = dict['meta.' + PAGE + '.title'];
  if (title) document.title = title;

  const metaDesc = document.querySelector('meta[name="description"]');
  const desc = dict['meta.' + PAGE + '.description'];
  if (metaDesc && desc) metaDesc.setAttribute('content', desc);

  Object.keys(langButtons).forEach(function (key) {
    if (langButtons[key]) langButtons[key].setAttribute('aria-pressed', String(key === lang));
  });

  try { localStorage.setItem('sxm-lang', lang); } catch (e) { /* stockage indisponible */ }
}

if (langButtons.fr) langButtons.fr.addEventListener('click', function () { setLang('fr'); });
if (langButtons.en) langButtons.en.addEventListener('click', function () { setLang('en'); });

let saved = null;
try { saved = localStorage.getItem('sxm-lang'); } catch (e) { /* stockage indisponible */ }
if (saved === 'en') setLang('en');

/* ==========================================================
   MENU MOBILE
   Overlay plein écran sous 760px, le même point de rupture que
   le reste de la feuille de style. Le sélecteur FR/EN reste dans
   l'en-tête : il n'est jamais rangé dans le menu.
   ========================================================== */
const siteHeader = document.querySelector('.site-header');
const navToggle  = document.getElementById('nav-toggle');
const siteNav    = document.getElementById('site-nav');
const mobileMQ   = window.matchMedia('(max-width: 760px)');

let scrollLockY = 0;

/* Éléments atteignables au clavier pendant que l'overlay est ouvert :
   tout l'en-tête, overlay compris, puisque le nav en est un descendant. */
function headerFocusables() {
  return Array.prototype.slice
    .call(siteHeader.querySelectorAll('a[href], button:not([disabled])'))
    .filter(function (el) { return el.offsetWidth > 0 || el.offsetHeight > 0; });
}

function onNavKeydown(e) {
  if (e.key === 'Escape') {
    setNavOpen(false);
    navToggle.focus();
    return;
  }
  if (e.key !== 'Tab') return;

  const els = headerFocusables();
  if (!els.length) return;
  const first = els[0], last = els[els.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault(); last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault(); first.focus();
  }
}

function setNavOpen(open) {
  if (!navToggle || !siteNav) return;

  navToggle.setAttribute('aria-expanded', String(open));
  siteNav.setAttribute('data-open', String(open));

  navToggle.dataset.i18nAria = open ? 'nav.close' : 'nav.open';
  const label = I18N[currentLang] && I18N[currentLang][navToggle.dataset.i18nAria];
  if (label) navToggle.setAttribute('aria-label', label);

  if (open) {
    scrollLockY = window.scrollY;
    document.body.style.top = (-scrollLockY) + 'px';
    document.body.dataset.navOpen = 'true';
    document.addEventListener('keydown', onNavKeydown);
    const firstLink = siteNav.querySelector('a[href]');
    if (firstLink) firstLink.focus();
  } else {
    delete document.body.dataset.navOpen;
    document.body.style.top = '';
    window.scrollTo(0, scrollLockY);
    document.removeEventListener('keydown', onNavKeydown);
  }
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', function () {
    setNavOpen(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  siteNav.addEventListener('click', function (e) {
    /* Un lien : on laisse la navigation se faire, l'état est réinitialisé.
       Le fond de l'overlay : fermeture au clic en dehors des liens. */
    if (e.target.closest('a[href]') || e.target === siteNav) setNavOpen(false);
  });

  /* Repasser au-dessus du point de rupture ne doit pas laisser d'état bloqué */
  const onBreakpointChange = function (e) { if (!e.matches) setNavOpen(false); };
  if (mobileMQ.addEventListener) mobileMQ.addEventListener('change', onBreakpointChange);
  else if (mobileMQ.addListener) mobileMQ.addListener(onBreakpointChange);
}

/* ==========================================================
   APPARITION AU DÉFILEMENT
   ========================================================== */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach(function (el) { el.classList.add('in'); });
} else {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function (el) { observer.observe(el); });
}
