export type Language = "en" | "fr" | "rw";
export type NavKey = "about" | "services" | "platform" | "why" | "insights" | "contact";

export const navItems: Array<{ key: NavKey; href: string }> = [
  { key: "about", href: "about" },
  { key: "services", href: "services" },
  { key: "platform", href: "platform" },
  { key: "why", href: "why" },
  { key: "insights", href: "insights" },
  { key: "contact", href: "contact" },
];

export const languageOptions: Array<{ code: Language; short: string; label: string }> = [
  { code: "en", short: "EN", label: "English" },
  { code: "rw", short: "RW", label: "Kinyarwanda" },
  { code: "fr", short: "FR", label: "Français" },
];

export const siteCopy = {
  en: {
    languageLabel: "Language",
    logoSubtitle: "Precision food safety",
    nav: {
      about: "About",
      services: "Services",
      platform: "Platform",
      why: "Why Vera",
      insights: "Insights",
      contact: "Contact",
    },
    actions: {
      bookDemo: "Book demo",
      bookConsultation: "Book consultation",
      explorePlatform: "Explore platform",
      learnMore: "Learn more",
      requestDemo: "Request live demo",
      nextStep: "Next step",
      sendMessage: "Send message",
      sending: "Sending…",
      lightMode: "Light mode",
      darkMode: "Dark mode",
    },
    hero: {
      titleStart: "From inspection records to",
      highlight: "daily control",
      titleEnd: ".",
      body: "Vera brings HACCP, ISO 22000, supplier checks, temperature logs, and corrective actions into one workspace built for food teams in East Africa.",
      stats: [
        { k: "3", l: "cold-room deviations in 3 months" },
        { k: "1", l: "pending supplier visit" },
        { k: "Live", l: "supplier competence visibility" },
      ],
    },
    clients: {
      eyebrow: "Trusted by food businesses across Rwanda & East Africa",
      items: [
        "Processors",
        "Restaurants",
        "Exporters",
        "Manufacturers",
        "Hotels",
        "Catering firms",
        "Cloud kitchens",
        "Cold chain",
      ],
    },
    about: {
      eyebrow: "About Vera",
      title: "Food Safety Systems Built on the Foundation of Data and Real-time Monitoring",
      body: "Vera Systems began because the same compliance gaps kept appearing across the food businesses we audited: backfilled logs, missed deviations, and HACCP files completed only the week before an audit. We are a team with food science, data science, and audit experience, building working systems your floor staff can use every day, so food safety management decisions are informed by real data, not the scattered paperwork an auditor sees on Friday.",
      established: "Based in",
      location: "Kigali · Rwanda",
      missionLabel: "Mission",
      mission:
        "To elevate food safety across Africa through scientific rigor and data-driven systems that improve compliance, efficiency, and trust.",
      pills: [
        {
          title: "Standards-led",
          body: "HACCP and ISO 22000 methods connected to records your team can verify.",
        },
        {
          title: "Operational fit",
          body: "Workflows shaped around kitchens, factories, warehouses, and cold-chain routines.",
        },
      ],
      stats: [
        { k: "5+", l: "Years experience" },
        { k: "140+", l: "Checks completed" },
        { k: "60+", l: "Operations supported" },
      ],
      foundersEyebrow: "Founders",
      foundersTitle: "Built by food-safety and data practitioners",
      team: [
        {
          name: "Norbert Rafiki",
          role: "Co-founder & Food Safety Management Consultant",
          credential: "FSSC 22000 IRCA Certified Lead Auditor · 7 years",
          bio: "Norbert leads food safety management systems, audit readiness, and implementation support for teams that need practical controls, not paperwork theater.",
          initials: "NR",
        },
        {
          name: "Corneille Pierre Niyobyiringiro",
          role: "Co-founder & Data Systems Lead",
          credential: "Data science, analytics, and digital systems",
          bio: "Corneille brings data science and system-building experience to turn compliance records into real-time visibility for managers and operational teams.",
          initials: "CP",
        },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "Services.",
      body: "Most food businesses face the same challenge: compliance systems that are built for auditors, not for operations. At Vera Systems, we take a different approach. We believe food safety is not a single problem; it is a system that demands expertise across standards, technology, people, and science. That is why we bring all four together, combining deep food safety knowledge with digital tools, capacity building, and research capability to help manufacturers, exporters, and hospitality businesses build compliance that actually works on the floor, not just on paper.",
      items: [
        {
          label: "Food Safety Consultancy",
          title: "Compliance support that meets you where you are",
          impact:
            "Whether you are preparing for export certification or navigating HACCP compliance for the first time, we meet you where you are.",
          body: "Vera Systems provides hands-on advisory, gap assessment, and implementation support aligned to internationally recognized standards, including HACCP, FSSC 22000, and ISO 22000. We do not just audit and leave; we work alongside your team to build food safety systems that are practical, audit-ready, and built to last.",
          bullets: [
            "Hands-on advisory and gap assessment",
            "Implementation support aligned to HACCP, FSSC 22000, and ISO 22000",
            "Practical systems built alongside your team",
            "Audit-ready systems built to last",
          ],
          statLabel: "audit readiness",
        },
        {
          label: "Digital Records & Software",
          title: "Live records for daily food-safety control",
          impact:
            "Replace scattered paper logs with dashboards, alerts, audit trails, and supplier scorecards.",
          body: "A practical records layer for CCP monitoring, hygiene checks, deviation follow-up, supplier performance, and compliance reporting.",
          bullets: [
            "CCP monitoring dashboards",
            "Deviation notifications",
            "Digital hygiene logs and sign-offs",
            "Supplier performance tracking",
          ],
          statLabel: "faster follow-up",
        },
        {
          label: "Training & Capacity Building",
          title: "Competence that keeps compliance alive",
          impact:
            "Compliance is only sustainable when your people understand it.",
          body: "We deliver structured training programs tailored to your sector and operations, covering food safety fundamentals, HACCP principles, internal auditing, and standard-specific requirements such as ISO 22000. From front-line staff to quality managers, we build the internal competence your organization needs to maintain compliance confidently, not just at certification time.",
          bullets: [
            "Food safety fundamentals",
            "HACCP principles and practice",
            "Internal auditing skills",
            "ISO 22000 role-based requirements",
          ],
          statLabel: "team competence",
        },
        {
          label: "Research & Technical Studies",
          title: "Scientific evidence for better decisions",
          impact:
            "When a standard is not enough and you need evidence, we provide it.",
          body: "Vera Systems supports food businesses, individuals in the sector, and hospitality operators in designing and executing scientific studies, including shelf-life testing, process validation, microbiological risk assessments, and HACCP-based hazard studies. Whether launching a new product, responding to a regulatory requirement, or validating a critical control point, our research services translate scientific rigor into actionable compliance outcomes.",
          bullets: [
            "Shelf-life testing support",
            "Process validation studies",
            "Microbiological risk assessments",
            "HACCP-based hazard studies",
          ],
          statLabel: "technical evidence",
        },
      ],
    },
    stack: {
      eyebrow: "How it works",
      title: "A practical route to stronger food safety",
      body: "From the first site walkthrough to working records and routine reporting, each step is clear and usable.",
      nextStep: "Next step",
      cards: [
        {
          title: "Map the real operating risk",
          body: "We review CCPs, hygiene behavior, supplier risk, documentation gaps, staff routines, and audit pressure points.",
          label: "first risk snapshot",
        },
        {
          title: "Turn compliance into workflow",
          body: "Procedures become checklists, controls, escalation paths, and evidence trails that fit day-to-day work.",
          label: "faster evidence retrieval",
        },
        {
          title: "Track performance in real time",
          body: "Dashboards show CCP status, deviations, supplier scores, hygiene logs, and readiness indicators.",
          label: "CCP tracking",
        },
        {
          title: "Use data to reduce repeat failures",
          body: "Management sees trends, corrective-action loops, supplier patterns, and practical recommendations.",
          label: "audit-ready reporting",
        },
      ],
    },
    platform: {
      eyebrow: "The Platform",
      title: "One workspace for the records that matter.",
      quote:
        "A control desk for food-safety work: deviations logged, suppliers scored, CCPs visible, and reports ready when needed.",
    },
    outcomes: {
      eyebrow: "Client priorities",
      title: "What better records make easier.",
      body: "The focus is simple: less chasing, fewer missing logs, clearer accountability, and stronger audit preparation.",
      items: [
        {
          quote:
            "Audit preparation becomes faster because documents, checks, and sign-offs are already organized.",
          name: "Audit readiness",
          role: "Evidence in one place",
          initials: "AR",
        },
        {
          quote:
            "Supervisors can see which deviations still need action instead of waiting for end-of-day reviews.",
          name: "Team follow-up",
          role: "Clear ownership",
          initials: "TF",
        },
        {
          quote:
            "Supplier reviews become easier when receiving checks, documents, and corrective actions are tracked together.",
          name: "Supplier control",
          role: "Better purchasing decisions",
          initials: "SC",
        },
      ],
    },
    insights: {
      eyebrow: "Insights",
      title: "Notes from food operations.",
      body: "Practical observations from compliance work, supplier checks, CCP monitoring, and daily food-safety routines.",
      items: [
        {
          tag: "Case note",
          title: "How a processor reduced deviation follow-up delays",
          body: "Live alerts helped the team act before end-of-shift paper reviews.",
          read: "6 min read",
        },
        {
          tag: "Data note",
          title: "Supplier records that often create audit gaps",
          body: "Certificate lapses, receiving temperatures, and traceability records need steady review.",
          read: "5 min read",
        },
        {
          tag: "Operations",
          title: "Why paper HACCP logs slow down response",
          body: "Manual logging creates a gap between the issue, the review, and the corrective action.",
          read: "7 min read",
        },
        {
          tag: "Field note",
          title: "How to read CCP stability before problems grow",
          body: "A practical look at the signals that show whether controls are holding during the week.",
          read: "6 min read",
        },
      ],
    },
    why: {
      eyebrow: "Why Vera",
      title: "Built around how food businesses actually work.",
      body: "Vera keeps the focus on usable controls, clear records, and evidence that helps managers act quickly.",
      cards: [
        {
          title: "Standards-based work",
          body: "Recommendations connect to HACCP control points, ISO clauses, audit evidence, or operating data.",
        },
        {
          title: "Live risk visibility",
          body: "Teams can see CCP status, deviation alerts, and corrective action progress from one workspace.",
        },
        {
          title: "Compliance mapped to data",
          body: "Findings become measurable outputs that are easier to verify and report.",
        },
        {
          title: "Made for East Africa",
          body: "Designed around local supply-chain realities, team capacity, and the pace of food operations.",
        },
      ],
    },
    cta: {
      eyebrow: "Get started",
      title: "Ready to replace paper logs with live records?",
      body: "Move from late reviews to clearer daily control across CCPs, hygiene checks, suppliers, and reports.",
    },
    contact: {
      eyebrow: "Get in touch",
      title: "Start with clarity. Move to control.",
      body: "Book a consultation and see how Vera can improve compliance work, records, and follow-up.",
      talk: "Talk to us",
      cardTitle: "Ready to improve your food-safety system?",
      cardBody:
        "Tell us about your operation and we will come back with a practical plan within two business days.",
      response: "Typically responds within 4 hours",
      trusted: "Trusted by teams in",
      formEyebrow: "Send a message",
      formTitle: "Tell us about your operation",
      fields: {
        name: "Full name",
        company: "Company",
        email: "Work email",
        phone: "Phone",
        interest: "Service interest",
        message: "Message",
      },
      placeholders: {
        name: "Your name",
        company: "Company name",
        email: "you@company.rw",
        phone: "+250 …",
        message: "Tell us about your operation, scale, and current pain points.",
      },
      interests: [
        "Food Safety Consultancy",
        "Digital Records Platform",
        "Platform Demo Request",
        "Both Services",
      ],
      success: "Message sent. Vera Systems will get back to you shortly.",
      error: "Could not send message. Please try again.",
    },
    footer: {
      summary:
        "Precision food safety for East Africa. Practical standards, clean records, and stronger daily control.",
      columns: [
        { heading: "Company", links: ["About", "Services", "Platform", "Why Vera"] },
        { heading: "Resources", links: ["Insights", "Case studies", "Documentation", "Pricing"] },
        { heading: "Legal", links: ["Privacy policy", "Terms of service", "Cookie policy"] },
      ],
      copyright:
        "© 2026 Vera Systems Ltd. · Kigali, Rwanda · All rights reserved.",
    },
  },
} as const;

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? Array<Widen<U>>
        : T extends object
          ? { -readonly [K in keyof T]: Widen<T[K]> }
          : T;

export type SiteCopy = Widen<(typeof siteCopy)["en"]>;

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

function mergeCopy<T>(base: T, override: DeepPartial<T>): T {
  if (Array.isArray(base)) {
    return (override ?? base) as T;
  }

  if (typeof base !== "object" || base === null) {
    return (override ?? base) as T;
  }

  const result = { ...base } as Record<string, unknown>;

  Object.entries(override as Record<string, unknown>).forEach(([key, value]) => {
    const baseValue = (base as Record<string, unknown>)[key];

    result[key] =
      value &&
      baseValue &&
      typeof value === "object" &&
      typeof baseValue === "object" &&
      !Array.isArray(value) &&
      !Array.isArray(baseValue)
        ? mergeCopy(baseValue, value as DeepPartial<typeof baseValue>)
        : value;
  });

  return result as T;
}

const translatedCopy: Record<Exclude<Language, "en">, SiteCopy> = {
  fr: mergeCopy(siteCopy.en as unknown as SiteCopy, {
    languageLabel: "Langue",
    logoSubtitle: "Sécurité alimentaire de précision",
    nav: {
      about: "À propos",
      services: "Services",
      platform: "Plateforme",
      why: "Pourquoi Vera",
      insights: "Articles",
      contact: "Contact",
    },
    actions: {
      bookDemo: "Réserver une démo",
      bookConsultation: "Réserver une consultation",
      explorePlatform: "Explorer la plateforme",
      learnMore: "En savoir plus",
      requestDemo: "Demander une démo",
      nextStep: "Étape suivante",
      sendMessage: "Envoyer le message",
      sending: "Envoi…",
      lightMode: "Mode clair",
      darkMode: "Mode sombre",
    },
    hero: {
      titleStart: "Des registres d’inspection au",
      highlight: "contrôle quotidien",
      titleEnd: ".",
      body: "Vera réunit HACCP, ISO 22000, contrôles fournisseurs, relevés de température et actions correctives dans un espace de travail clair pour les équipes alimentaires d’Afrique de l’Est.",
      stats: [
        { k: "3", l: "écarts chambre froide en 3 mois" },
        { k: "1", l: "visite fournisseur en attente" },
        { k: "Live", l: "visibilité compétence fournisseur" },
      ],
    },
    clients: {
      eyebrow: "Adopté par des entreprises alimentaires au Rwanda et en Afrique de l’Est",
      items: [
        "Transformateurs",
        "Restaurants",
        "Exportateurs",
        "Fabricants",
        "Hôtels",
        "Traiteurs",
        "Cuisines cloud",
        "Chaîne du froid",
      ],
    },
    about: {
      eyebrow: "À propos de Vera",
      title: "Des systèmes de sécurité alimentaire fondés sur les données et le suivi en temps réel",
      body: "Vera Systems est né parce que les mêmes écarts de conformité revenaient dans les entreprises alimentaires que nous auditions : registres remplis après coup, déviations manquées et dossiers HACCP complétés seulement la semaine précédant l’audit. Notre équipe réunit science alimentaire, data science et expérience d’audit pour construire des systèmes que les équipes de terrain utilisent chaque jour, afin que les décisions de sécurité alimentaire reposent sur des données réelles, pas sur des documents dispersés vus par l’auditeur le vendredi.",
      established: "Basé à",
      location: "Kigali · Rwanda",
      missionLabel: "Mission",
      mission:
        "Élever la sécurité alimentaire en Afrique grâce à la rigueur scientifique et à des systèmes pilotés par les données qui améliorent la conformité, l’efficacité et la confiance.",
      pills: [
        {
          title: "Basé sur les standards",
          body: "Les méthodes HACCP et ISO 22000 reliées à des registres vérifiables.",
        },
        {
          title: "Adapté aux opérations",
          body: "Des flux de travail pensés pour cuisines, usines, entrepôts et chaîne du froid.",
        },
      ],
      stats: [
        { k: "5+", l: "Années d’expérience" },
        { k: "140+", l: "Contrôles réalisés" },
        { k: "60+", l: "Opérations accompagnées" },
      ],
      foundersEyebrow: "Fondateurs",
      foundersTitle: "Créé par des praticiens de la sécurité alimentaire et de la donnée",
      team: [
        {
          name: "Norbert Rafiki",
          role: "Co-fondateur et consultant en systèmes de management de la sécurité alimentaire",
          credential: "Lead Auditor FSSC 22000 certifié IRCA · 7 ans",
          bio: "Norbert dirige les systèmes de management de la sécurité alimentaire, la préparation aux audits et l’appui à la mise en œuvre pour des contrôles pratiques.",
          initials: "NR",
        },
        {
          name: "Corneille Pierre Niyobyiringiro",
          role: "Co-fondateur et responsable systèmes de données",
          credential: "Data science, analytique et systèmes numériques",
          bio: "Corneille apporte une expérience en data science et en conception de systèmes pour transformer les registres de conformité en visibilité temps réel.",
          initials: "CP",
        },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "Services.",
      body: "La plupart des entreprises alimentaires rencontrent le même défi : des systèmes de conformité conçus pour les auditeurs, pas pour les opérations. Chez Vera Systems, nous adoptons une autre approche. Nous pensons que la sécurité alimentaire n’est pas un problème unique ; c’est un système qui exige une expertise des standards, de la technologie, des personnes et de la science. C’est pourquoi nous réunissons ces quatre dimensions, avec une expertise approfondie en sécurité alimentaire, des outils numériques, le renforcement des capacités et la recherche pour aider fabricants, exportateurs et entreprises hôtelières à bâtir une conformité qui fonctionne sur le terrain, pas seulement sur papier.",
      items: [
        {
          label: "Conseil en sécurité alimentaire",
          title: "Un accompagnement adapté à votre niveau de départ",
          impact:
            "Que vous prépariez une certification export ou découvriez la conformité HACCP, nous partons de votre réalité.",
          body: "Vera Systems fournit du conseil terrain, des évaluations d’écarts et un appui à la mise en œuvre alignés sur les standards reconnus, dont HACCP, FSSC 22000 et ISO 22000. Nous n’auditons pas pour partir ensuite ; nous travaillons avec votre équipe pour construire des systèmes pratiques, prêts pour l’audit et durables.",
          bullets: [
            "Conseil terrain et évaluations d’écarts",
            "Appui aligné sur HACCP, FSSC 22000 et ISO 22000",
            "Systèmes pratiques construits avec votre équipe",
            "Systèmes prêts pour l’audit et durables",
          ],
          statLabel: "préparation audit",
        },
        {
          label: "Registres numériques & logiciel",
          title: "Des registres en direct pour le contrôle quotidien",
          impact:
            "Remplacez les journaux papier dispersés par des tableaux de bord, alertes, pistes d’audit et scorecards fournisseurs.",
          body: "Une couche pratique pour le suivi des CCP, l’hygiène, les écarts, les fournisseurs et les rapports de conformité.",
          bullets: [
            "Tableaux de bord CCP",
            "Notifications d’écarts",
            "Registres d’hygiène numériques",
            "Suivi des fournisseurs",
          ],
          statLabel: "suivi plus rapide",
        },
        {
          label: "Formation & renforcement des capacités",
          title: "Des compétences qui maintiennent la conformité",
          impact:
            "La conformité n’est durable que lorsque vos équipes la comprennent.",
          body: "Nous proposons des formations structurées adaptées à votre secteur et à vos opérations : bases de la sécurité alimentaire, principes HACCP, audit interne et exigences spécifiques comme ISO 22000. Du personnel terrain aux responsables qualité, nous renforçons la compétence interne nécessaire pour maintenir la conformité avec confiance.",
          bullets: [
            "Fondamentaux de sécurité alimentaire",
            "Principes et pratique HACCP",
            "Compétences d’audit interne",
            "Exigences ISO 22000 par rôle",
          ],
          statLabel: "compétence équipe",
        },
        {
          label: "Recherche & études techniques",
          title: "Des preuves scientifiques pour décider",
          impact:
            "Quand un standard ne suffit pas et qu’il faut des preuves, nous les produisons.",
          body: "Vera Systems accompagne les entreprises alimentaires, les professionnels du secteur et les opérateurs hôteliers dans la conception et l’exécution d’études scientifiques : durée de vie, validation de procédés, évaluations de risques microbiologiques et études de dangers HACCP. Nos services traduisent la rigueur scientifique en résultats de conformité actionnables.",
          bullets: [
            "Appui aux tests de durée de vie",
            "Études de validation de procédés",
            "Évaluations de risques microbiologiques",
            "Études de dangers basées sur HACCP",
          ],
          statLabel: "preuves techniques",
        },
      ],
    },
    stack: {
      eyebrow: "Méthode",
      title: "Un chemin pratique vers une sécurité alimentaire plus forte",
      body: "De la première visite de site aux registres actifs et rapports réguliers, chaque étape reste claire et utilisable.",
      nextStep: "Étape suivante",
      cards: [
        {
          title: "Cartographier le risque réel",
          body: "Nous analysons CCP, hygiène, risques fournisseurs, écarts documentaires, routines et points de pression d’audit.",
          label: "premier aperçu risque",
        },
        {
          title: "Transformer la conformité en flux de travail",
          body: "Les procédures deviennent checklists, contrôles, chemins d’escalade et preuves adaptées au quotidien.",
          label: "preuves retrouvées plus vite",
        },
        {
          title: "Suivre la performance en temps réel",
          body: "Les tableaux de bord montrent l’état CCP, les écarts, les scores fournisseurs, l’hygiène et la préparation.",
          label: "suivi CCP",
        },
        {
          title: "Utiliser les données pour réduire les répétitions",
          body: "La direction voit tendances, boucles correctives, modèles fournisseurs et recommandations pratiques.",
          label: "rapport prêt pour audit",
        },
      ],
    },
    platform: {
      eyebrow: "La plateforme",
      title: "Un espace de travail pour les registres essentiels.",
      quote:
        "Un poste de contrôle pour la sécurité alimentaire : écarts enregistrés, fournisseurs notés, CCP visibles et rapports prêts.",
    },
    insights: {
      eyebrow: "Articles",
      title: "Notes issues des opérations alimentaires.",
      body: "Observations pratiques sur conformité, fournisseurs, suivi CCP et routines quotidiennes.",
      items: [
        {
          tag: "Cas pratique",
          title: "Comment un transformateur a réduit les retards de suivi des écarts",
          body: "Les alertes en direct ont aidé l’équipe à agir avant les revues papier de fin de journée.",
          read: "6 min de lecture",
        },
        {
          tag: "Note data",
          title: "Les registres fournisseurs qui créent souvent des écarts d’audit",
          body: "Certificats expirés, températures de réception et traçabilité demandent une revue régulière.",
          read: "5 min de lecture",
        },
        {
          tag: "Opérations",
          title: "Pourquoi les journaux HACCP papier ralentissent la réponse",
          body: "Le papier crée un délai entre l’incident, la revue et l’action corrective.",
          read: "7 min de lecture",
        },
        {
          tag: "Note terrain",
          title: "Lire la stabilité CCP avant que les problèmes grandissent",
          body: "Un regard pratique sur les signaux montrant si les contrôles tiennent pendant la semaine.",
          read: "6 min de lecture",
        },
      ],
    },
    why: {
      eyebrow: "Pourquoi Vera",
      title: "Conçu autour du fonctionnement réel des entreprises alimentaires.",
      body: "Vera garde l’accent sur des contrôles utilisables, des registres clairs et des preuves qui aident les managers à agir vite.",
      cards: [
        {
          title: "Travail basé sur les standards",
          body: "Les recommandations se relient aux CCP HACCP, clauses ISO, preuves d’audit ou données opérationnelles.",
        },
        {
          title: "Visibilité du risque en direct",
          body: "Les équipes voient l’état CCP, les alertes d’écarts et l’avancement des actions correctives.",
        },
        {
          title: "Conformité reliée aux données",
          body: "Les constats deviennent des résultats mesurables, faciles à vérifier et à rapporter.",
        },
        {
          title: "Conçu pour l’Afrique de l’Est",
          body: "Adapté aux réalités locales de la chaîne d’approvisionnement, aux capacités d’équipe et au rythme des opérations.",
        },
      ],
    },
    cta: {
      eyebrow: "Commencer",
      title: "Prêt à remplacer les journaux papier par des registres en direct ?",
      body: "Passez des revues tardives à un contrôle quotidien plus clair des CCP, de l’hygiène, des fournisseurs et des rapports.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Commencez avec clarté. Avancez vers le contrôle.",
      body: "Réservez une consultation et voyez comment Vera peut améliorer votre conformité, vos registres et votre suivi.",
      talk: "Parlez-nous",
      cardTitle: "Prêt à améliorer votre système de sécurité alimentaire ?",
      cardBody:
        "Parlez-nous de votre opération et nous reviendrons avec un plan pratique sous deux jours ouvrables.",
      response: "Réponse habituelle sous 4 heures",
      trusted: "Équipes accompagnées au",
      formEyebrow: "Envoyer un message",
      formTitle: "Parlez-nous de votre opération",
      fields: {
        name: "Nom complet",
        company: "Entreprise",
        email: "Email professionnel",
        phone: "Téléphone",
        interest: "Service souhaité",
        message: "Message",
      },
      placeholders: {
        name: "Votre nom",
        company: "Nom de l’entreprise",
        email: "vous@entreprise.rw",
        phone: "+250 …",
        message: "Décrivez votre opération, sa taille et vos difficultés actuelles.",
      },
      interests: [
        "Conseil en sécurité alimentaire",
        "Plateforme de registres numériques",
        "Demande de démo plateforme",
        "Les deux services",
      ],
      success: "Message envoyé. Vera Systems vous répondra rapidement.",
      error: "Impossible d’envoyer le message. Veuillez réessayer.",
    },
    footer: {
      summary:
        "Sécurité alimentaire de précision pour l’Afrique de l’Est. Standards pratiques, registres propres et meilleur contrôle quotidien.",
      columns: [
        { heading: "Entreprise", links: ["À propos", "Services", "Plateforme", "Pourquoi Vera"] },
        { heading: "Ressources", links: ["Articles", "Cas clients", "Documentation", "Tarifs"] },
        { heading: "Légal", links: ["Confidentialité", "Conditions", "Cookies"] },
      ],
      copyright:
        "© 2026 Vera Systems Ltd. · Kigali, Rwanda · Tous droits réservés.",
    },
  }),
  rw: mergeCopy(siteCopy.en as unknown as SiteCopy, {
    languageLabel: "Ururimi",
    logoSubtitle: "Umutekano w’ibiribwa ushingiye ku makuru",
    nav: {
      about: "Ibyerekeye",
      services: "Serivisi",
      platform: "Sisitemu",
      why: "Impamvu Vera",
      insights: "Inyandiko",
      contact: "Twandikire",
    },
    actions: {
      bookDemo: "Saba demo",
      bookConsultation: "Saba ubujyanama",
      explorePlatform: "Reba sisitemu",
      learnMore: "Menya byinshi",
      requestDemo: "Saba demo",
      nextStep: "Intambwe ikurikira",
      sendMessage: "Ohereza ubutumwa",
      sending: "Kohereza…",
      lightMode: "Uburyo bubona",
      darkMode: "Uburyo bwijimye",
    },
    hero: {
      titleStart: "Kuva ku nyandiko z’isuzuma kugera kuri",
      highlight: "kontorole ya buri munsi",
      titleEnd: ".",
      body: "Vera ihuza HACCP, ISO 22000, igenzura ry’abatanga ibicuruzwa, ubushyuhe n’ibikorwa bikosora mu mwanya umwe worohereza amakipe y’ibiribwa muri Afurika y’Iburasirazuba.",
      stats: [
        { k: "3", l: "deviations za cold rooms mu mezi 3" },
        { k: "1", l: "supplier visit itararangira" },
        { k: "Live", l: "kureba supplier competence" },
      ],
    },
    clients: {
      eyebrow: "Yizewe n’ubucuruzi bw’ibiribwa mu Rwanda no muri Afurika y’Iburasirazuba",
      items: [
        "Abatunganya ibiribwa",
        "Restaurants",
        "Abohereza hanze",
        "Inganda",
        "Amahoteli",
        "Catering",
        "Cloud kitchens",
        "Cold chain",
      ],
    },
    about: {
      eyebrow: "Ibyerekeye Vera",
      title: "Sisitemu z’umutekano w’ibiribwa zubakiye kuri data no gukurikirana ako kanya",
      body: "Vera Systems yatangiye kubera ko icyuho kimwe cya compliance cyakomezaga kugaragara mu bucuruzi bw’ibiribwa twakoragamo audit: inyandiko zuzuzwa nyuma, deviations zitamenyekanye, na dosiye za HACCP zuzuzwa mu cyumweru kibanziriza audit gusa. Turi ikipe ifite food science, data science n’ubunararibonye bwa audit, yubaka sisitemu abakozi bo hasi bakoresha buri munsi kugira ngo ibyemezo bya food safety management bishingire kuri data nyayo, atari ku mpapuro zitandukanye auditor abona ku wa Gatanu.",
      established: "Iherereye",
      location: "Kigali · Rwanda",
      missionLabel: "Intego",
      mission:
        "Kuzamura umutekano w’ibiribwa muri Afurika binyuze ku rigor ya science na sisitemu ziyobowe na data, zigateza imbere compliance, efficiency n’icyizere.",
      pills: [
        {
          title: "Bishingiye ku bipimo",
          body: "HACCP na ISO 22000 bihuzwa n’inyandiko ikipe ishobora kugenzura.",
        },
        {
          title: "Bihuye n’imikorere",
          body: "Imirongo y’akazi ijyanye na kitchens, inganda, ububiko na cold-chain.",
        },
      ],
      stats: [
        { k: "5+", l: "Imyaka y’ubunararibonye" },
        { k: "140+", l: "Isuzuma ryakozwe" },
        { k: "60+", l: "Ibikorwa byafashijwe" },
      ],
      foundersEyebrow: "Abashinze",
      foundersTitle: "Yubatswe n’abakora food safety na data",
      team: [
        {
          name: "Norbert Rafiki",
          role: "Co-founder & Food Safety Management Consultant",
          credential: "FSSC 22000 IRCA Certified Lead Auditor · imyaka 7",
          bio: "Norbert ayobora food safety management systems, kwitegura audit no gushyira mu bikorwa controls zikora mu kazi ka buri munsi.",
          initials: "NR",
        },
        {
          name: "Corneille Pierre Niyobyiringiro",
          role: "Co-founder & Data Systems Lead",
          credential: "Data science, analytics na digital systems",
          bio: "Corneille azana ubumenyi bwa data science no kubaka systems kugira ngo compliance records zihinduke real-time visibility ku bayobozi n’amakipe akora.",
          initials: "CP",
        },
      ],
    },
    services: {
      eyebrow: "Serivisi",
      title: "Serivisi.",
      body: "Ubucuruzi bwinshi bw’ibiribwa buhura n’ikibazo kimwe: compliance systems zubakiwe auditors, si operations. Kuri Vera Systems tubifata ukundi. Twemera ko food safety atari ikibazo kimwe; ni system isaba ubumenyi mu standards, technology, people na science. Ni yo mpamvu tubihuza byose, tukavanga food safety knowledge, digital tools, capacity building na research capability kugira ngo manufacturers, exporters n’amahoteli bubake compliance ikora ku kazi, atari ku mpapuro gusa.",
      items: [
        {
          label: "Ubujyanama mu mutekano w’ibiribwa",
          title: "Ubufasha buhera aho mugeze",
          impact:
            "Waba utegura export certification cyangwa utangiye HACCP compliance, duhera ku kuri kw’ibikorwa byawe.",
          body: "Vera Systems itanga hands-on advisory, gap assessment n’ubufasha mu implementation bujyanye na standards zemewe ku rwego mpuzamahanga nka HACCP, FSSC 22000 na ISO 22000. Ntidukora audit ngo tugende; dukorana n’ikipe yawe kubaka food safety systems zikora, ziteguye audit kandi zirambye.",
          bullets: [
            "Hands-on advisory na gap assessment",
            "Implementation support ijyanye na HACCP, FSSC 22000 na ISO 22000",
            "Sisitemu zikora zubakwa hamwe n’ikipe yawe",
            "Sisitemu ziteguye audit kandi zirambye",
          ],
          statLabel: "kwitegura audit",
        },
        {
          label: "Inyandiko z’ikoranabuhanga & software",
          title: "Inyandiko z’ako kanya zo kugenzura buri munsi",
          impact:
            "Simbuza impapuro zitandukanye dashboards, alerts, audit trails na supplier scorecards.",
          body: "Urwego rufasha CCP monitoring, hygiene checks, deviation follow-up, supplier performance na compliance reports.",
          bullets: [
            "Dashboards za CCP",
            "Alerts z’ibyavuye ku murongo",
            "Inyandiko za hygiene z’ikoranabuhanga",
            "Gukurikirana abatanga ibicuruzwa",
          ],
          statLabel: "gukurikirana byihuse",
        },
        {
          label: "Training & Capacity Building",
          title: "Ubumenyi butuma compliance ikomeza",
          impact:
            "Compliance iramba iyo abantu bayisobanukiwe.",
          body: "Dutanga structured training programs zijyanye na sector n’ibikorwa byanyu, zirimo food safety fundamentals, HACCP principles, internal auditing n’ibisabwa na standards nka ISO 22000. Kuva ku bakozi bo hasi kugeza kuri quality managers, twubaka competence ikenewe ngo mukomeze compliance mutegereje certification gusa.",
          bullets: [
            "Food safety fundamentals",
            "HACCP principles and practice",
            "Internal auditing skills",
            "ISO 22000 role-based requirements",
          ],
          statLabel: "team competence",
        },
        {
          label: "Research & Technical Studies",
          title: "Ibimenyetso bya science byo gufata ibyemezo",
          impact:
            "Iyo standard idahagije mukeneye evidence, turayitanga.",
          body: "Vera Systems ifasha food businesses, abantu bakora muri sector n’amahoteli gutegura no gukora scientific studies nka shelf-life testing, process validation, microbiological risk assessments na HACCP-based hazard studies. Serivisi zacu zihindura scientific rigor mo compliance outcomes zikoreshwa mu bikorwa.",
          bullets: [
            "Shelf-life testing support",
            "Process validation studies",
            "Microbiological risk assessments",
            "HACCP-based hazard studies",
          ],
          statLabel: "technical evidence",
        },
      ],
    },
    stack: {
      eyebrow: "Uko bikora",
      title: "Inzira ifatika iganisha ku mutekano w’ibiribwa ukomeye",
      body: "Kuva ku gusura site bwa mbere kugeza ku nyandiko zikora na reports, buri ntambwe iba isobanutse.",
      nextStep: "Intambwe ikurikira",
      cards: [
        {
          title: "Kugaragaza risk nyayo",
          body: "Tureba CCPs, hygiene, supplier risk, icyuho mu nyandiko, routines n’ibibazo bya audit.",
          label: "ishusho ya mbere ya risk",
        },
        {
          title: "Guhindura compliance mu murongo w’akazi",
          body: "Procedures zihinduka checklists, controls, escalation paths n’ibimenyetso bihuye n’akazi.",
          label: "kubona evidence vuba",
        },
        {
          title: "Gukurikirana performance ako kanya",
          body: "Dashboards zerekana CCP status, deviations, supplier scores, hygiene logs na readiness.",
          label: "gukurikirana CCP",
        },
        {
          title: "Gukoresha data kugabanya amakosa asubira",
          body: "Management ibona trends, corrective actions, supplier patterns n’inama zifatika.",
          label: "raporo yiteguye audit",
        },
      ],
    },
    platform: {
      eyebrow: "Sisitemu",
      title: "Umwanya umwe w’inyandiko z’ingenzi.",
      quote:
        "Aho kugenzurira umutekano w’ibiribwa: deviations zandikwa, suppliers bagapimwa, CCP zikagaragara na reports zikitegura.",
    },
    insights: {
      eyebrow: "Inyandiko",
      title: "Inyandiko zivuye mu bikorwa by’ibiribwa.",
      body: "Ibitekerezo bifatika kuri compliance, supplier checks, CCP monitoring n’imikorere ya buri munsi.",
      items: [
        {
          tag: "Case note",
          title: "Uko processor yagabanyije gutinda gukurikirana deviations",
          body: "Alerts z’ako kanya zafashije ikipe kugira icyo ikora mbere y’isuzuma ry’impapuro rya nimugoroba.",
          read: "Iminota 6",
        },
        {
          tag: "Data note",
          title: "Inyandiko za suppliers zikunze guteza icyuho muri audit",
          body: "Certificates zarengeje igihe, ubushyuhe bwo kwakira n’inyandiko za traceability bisaba isuzuma rihoraho.",
          read: "Iminota 5",
        },
        {
          tag: "Operations",
          title: "Impamvu impapuro za HACCP zitinza igisubizo",
          body: "Kwandika ku mpapuro bitera intera hagati y’ikibazo, isuzuma n’igikorwa gikosora.",
          read: "Iminota 7",
        },
        {
          tag: "Field note",
          title: "Gusoma stability ya CCP mbere y’uko ibibazo bikura",
          body: "Uko wabona ibimenyetso byerekana niba controls zikomeje gukora mu cyumweru.",
          read: "Iminota 6",
        },
      ],
    },
    why: {
      eyebrow: "Impamvu Vera",
      title: "Yubakiye ku buryo ubucuruzi bw’ibiribwa bukora koko.",
      body: "Vera yibanda kuri controls zikoreshwa, inyandiko zisobanutse n’ibimenyetso bifasha managers gufata ibyemezo vuba.",
      cards: [
        {
          title: "Akazi gashingiye ku bipimo",
          body: "Inama zihuzwa na HACCP control points, ISO clauses, audit evidence cyangwa operational data.",
        },
        {
          title: "Kugaragaza risk ako kanya",
          body: "Amakipe abona CCP status, deviation alerts n’aho corrective actions zigeze.",
        },
        {
          title: "Compliance ihujwe na data",
          body: "Ibyabonetse bihinduka ibisubizo bipimwa kandi byoroshye kugenzura no gutangaza.",
        },
        {
          title: "Yakorewe Afurika y’Iburasirazuba",
          body: "Yubakiye ku by’aho supply chain ikorera, ubushobozi bw’ikipe n’umuvuduko w’ibikorwa.",
        },
      ],
    },
    cta: {
      eyebrow: "Tangira",
      title: "Witeguye gusimbuza impapuro inyandiko z’ako kanya ?",
      body: "Va ku gusuzuma bitinze ujye ku kugenzura buri munsi CCPs, hygiene, suppliers na reports.",
    },
    contact: {
      eyebrow: "Twandikire",
      title: "Tangira neza. Komereza kuri control.",
      body: "Saba ubujyanama urebe uko Vera yafasha compliance, inyandiko no gukurikirana.",
      talk: "Tuvugishe",
      cardTitle: "Witeguye kunoza sisitemu y’umutekano w’ibiribwa ?",
      cardBody:
        "Tubwire uko mukora, tuzagaruka dufite gahunda ifatika mu minsi ibiri y’akazi.",
      response: "Dusubiza kenshi mu masaha 4",
      trusted: "Yizewe n’amakipe muri",
      formEyebrow: "Ohereza ubutumwa",
      formTitle: "Tubwire uko mukora",
      fields: {
        name: "Amazina yose",
        company: "Ikigo",
        email: "Email y’akazi",
        phone: "Telefone",
        interest: "Serivisi ukeneye",
        message: "Ubutumwa",
      },
      placeholders: {
        name: "Amazina yawe",
        company: "Izina ry’ikigo",
        email: "wowe@company.rw",
        phone: "+250 …",
        message: "Tubwire uko mukora, ingano y’ibikorwa n’ibibazo mufite.",
      },
      interests: [
        "Ubujyanama mu mutekano w’ibiribwa",
        "Sisitemu y’inyandiko z’ikoranabuhanga",
        "Gusaba demo ya platform",
        "Serivisi zombi",
      ],
      success: "Ubutumwa bwoherejwe. Vera Systems iragusubiza vuba.",
      error: "Ubutumwa ntibwoherejwe. Ongera ugerageze.",
    },
    footer: {
      summary:
        "Umutekano w’ibiribwa ushingiye ku makuru muri Afurika y’Iburasirazuba. Standards zikora, inyandiko zisobanutse na control nziza ya buri munsi.",
      columns: [
        { heading: "Ikigo", links: ["Ibyerekeye", "Serivisi", "Sisitemu", "Impamvu Vera"] },
        { heading: "Ibikoresho", links: ["Inyandiko", "Case studies", "Documentation", "Ibiciro"] },
        { heading: "Amategeko", links: ["Privacy policy", "Terms of service", "Cookie policy"] },
      ],
      copyright:
        "© 2026 Vera Systems Ltd. · Kigali, Rwanda · Uburenganzira bwose burabitswe.",
    },
  }),
};

export function getLocalizedCopy(language: Language): SiteCopy {
  return language === "en" ? (siteCopy.en as unknown as SiteCopy) : translatedCopy[language];
}
