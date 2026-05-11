"use client";

import { FormEvent, useEffect, useMemo, useState, useCallback } from "react";
import {
  ArrowRight, PlayCircle, Sparkles, TrendingUp, Shield, Zap, BarChart3,
  Clock, CheckCircle2, AlertTriangle, Activity, Mail, Phone, MapPin, Menu, X,
  ChevronRight, Star, Award, Users, Globe, Sun, Moon, Database, Cpu, Eye,
  LineChart as LineChartIcon, TrendingDown, RefreshCw,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend,
  ComposedChart,
} from "recharts";

type DemoTab = "ccp" | "deviations" | "suppliers" | "reports";
type Tone = "success" | "warning" | "danger";

/* ── Brand tokens ── */
const C = {
  navy: "#0d1f3c",
  blue: "#2563eb",
  blueMid: "#3b82f6",
  blueLt: "#93c5fd",
  teal: "#0d9488",
  tealLt: "#5eead4",
  violet: "#7c3aed",
  violetLt: "#c4b5fd",
  amber: "#f59e0b",
  amberLt: "#fde68a",
  green: "#10b981",
  greenLt: "#6ee7b7",
  red: "#ef4444",
  slate: "#64748b",
};

/* ── Data ── */
type Language = "en" | "fr" | "rw";
type NavKey = "about" | "services" | "platform" | "why" | "insights" | "contact";

const navItems: Array<{ key: NavKey; href: string }> = [
  { key: "about", href: "about" },
  { key: "services", href: "services" },
  { key: "platform", href: "platform" },
  { key: "why", href: "why" },
  { key: "insights", href: "insights" },
  { key: "contact", href: "contact" },
];

const languageOptions: Array<{ code: Language; short: string; label: string }> = [
  { code: "en", short: "EN", label: "English" },
  { code: "fr", short: "FR", label: "Français" },
  { code: "rw", short: "RW", label: "Kinyarwanda" },
];

const siteCopy = {
  en: {
    languageLabel: "Language",
    logoSubtitle: "Precision food safety",
    nav: { about: "About", services: "Services", platform: "Platform", why: "Why Vera", insights: "Insights", contact: "Contact" },
    actions: { bookDemo: "Book demo", bookConsultation: "Book consultation", explorePlatform: "Explore platform", learnMore: "Learn more", requestDemo: "Request live demo", nextStep: "Next step", sendMessage: "Send message", sending: "Sending…", lightMode: "Light mode", darkMode: "Dark mode" },
    hero: {
      titleStart: "From inspection records to",
      highlight: "daily control",
      titleEnd: ".",
      body: "Vera brings HACCP, ISO 22000, supplier checks, temperature logs, and corrective actions into one workspace built for food teams in East Africa.",
      stats: [
        { k: "98.7%", l: "records complete" },
        { k: "3.4×", l: "faster follow-up" },
        { k: "240+", l: "controls tracked" },
      ],
    },
    clients: { eyebrow: "Trusted by food businesses across Rwanda & East Africa", items: ["Processors", "Restaurants", "Exporters", "Manufacturers", "Hotels", "Catering firms", "Cloud kitchens", "Cold chain"] },
    about: {
      eyebrow: "About Vera",
      title: "Food safety systems built for daily operations",
      body: "We combine food-safety practice with clear digital records. The result is a working system your team can use every day, not only when an audit is close.",
      established: "Based in", location: "Kigali · Rwanda", missionLabel: "Mission",
      mission: "To help food businesses in Rwanda and East Africa keep safer operations through practical standards, better records, and faster corrective action.",
      pills: [
        { title: "Standards-led", body: "HACCP and ISO 22000 methods connected to records your team can verify." },
        { title: "Operational fit", body: "Workflows shaped around kitchens, factories, warehouses, and cold-chain routines." },
      ],
      stats: [{ k: "5+", l: "Years experience" }, { k: "140+", l: "Checks completed" }, { k: "60+", l: "Operations supported" }],
    },
    services: {
      eyebrow: "Services", title: "Consultancy and software working as one system.", body: "Start with the support your operation needs now, then add more structure as the business grows.",
      items: [
        { label: "Food Safety Consultancy", title: "Compliance systems that can be used on site", impact: "Close the gaps that create audit pressure, product risk, and avoidable rework.", body: "HACCP design, ISO 22000 gap analysis, facility checks, verification schedules, staff training, and corrective action planning.", bullets: ["HACCP system design and implementation", "ISO 22000 readiness checks", "Kitchen and facility inspections", "Food-handler training and verification tools"], statLabel: "audit readiness" },
        { label: "Digital Records & Software", title: "Live records for daily food-safety control", impact: "Replace scattered paper logs with dashboards, alerts, audit trails, and supplier scorecards.", body: "A practical records layer for CCP monitoring, hygiene checks, deviation follow-up, supplier performance, and compliance reporting.", bullets: ["CCP monitoring dashboards", "Deviation notifications", "Digital hygiene logs and sign-offs", "Supplier performance tracking"], statLabel: "faster follow-up" },
      ],
    },
    stack: {
      eyebrow: "How it works", title: "A practical route to stronger food safety", body: "From the first site walkthrough to working records and routine reporting, each step is clear and usable.", nextStep: "Next step", cards: [
        { title: "Map the real operating risk", body: "We review CCPs, hygiene behavior, supplier risk, documentation gaps, staff routines, and audit pressure points.", label: "first risk snapshot" },
        { title: "Turn compliance into workflow", body: "Procedures become checklists, controls, escalation paths, and evidence trails that fit day-to-day work.", label: "faster evidence retrieval" },
        { title: "Track performance in real time", body: "Dashboards show CCP status, deviations, supplier scores, hygiene logs, and readiness indicators.", label: "CCP tracking" },
        { title: "Use data to reduce repeat failures", body: "Management sees trends, corrective-action loops, supplier patterns, and practical recommendations.", label: "audit-ready reporting" },
      ]
    },
    platform: { eyebrow: "The Platform", title: "One workspace for the records that matter.", quote: "A control desk for food-safety work: deviations logged, suppliers scored, CCPs visible, and reports ready when needed." },
    outcomes: {
      eyebrow: "Client priorities", title: "What better records make easier.", body: "The focus is simple: less chasing, fewer missing logs, clearer accountability, and stronger audit preparation.", items: [
        { quote: "Audit preparation becomes faster because documents, checks, and sign-offs are already organized.", name: "Audit readiness", role: "Evidence in one place", initials: "AR" },
        { quote: "Supervisors can see which deviations still need action instead of waiting for end-of-day reviews.", name: "Team follow-up", role: "Clear ownership", initials: "TF" },
        { quote: "Supplier reviews become easier when receiving checks, documents, and corrective actions are tracked together.", name: "Supplier control", role: "Better purchasing decisions", initials: "SC" },
      ]
    },
    insights: {
      eyebrow: "Insights", title: "Notes from food operations.", body: "Practical observations from compliance work, supplier checks, CCP monitoring, and daily food-safety routines.", items: [
        { tag: "Case note", title: "How a processor reduced deviation follow-up delays", body: "Live alerts helped the team act before end-of-shift paper reviews.", read: "6 min read" },
        { tag: "Data note", title: "Supplier records that often create audit gaps", body: "Certificate lapses, receiving temperatures, and traceability records need steady review.", read: "5 min read" },
        { tag: "Operations", title: "Why paper HACCP logs slow down response", body: "Manual logging creates a gap between the issue, the review, and the corrective action.", read: "7 min read" },
        { tag: "Field note", title: "How to read CCP stability before problems grow", body: "A practical look at the signals that show whether controls are holding during the week.", read: "6 min read" },
      ]
    },
    why: {
      eyebrow: "Why Vera", title: "Built around how food businesses actually work.", body: "Vera keeps the focus on usable controls, clear records, and evidence that helps managers act quickly.", cards: [
        { title: "Standards-based work", body: "Recommendations connect to HACCP control points, ISO clauses, audit evidence, or operating data." },
        { title: "Live risk visibility", body: "Teams can see CCP status, deviation alerts, and corrective action progress from one workspace." },
        { title: "Compliance mapped to data", body: "Findings become measurable outputs that are easier to verify and report." },
        { title: "Made for East Africa", body: "Designed around local supply-chain realities, team capacity, and the pace of food operations." },
      ]
    },
    cta: { eyebrow: "Get started", title: "Ready to replace paper logs with live records?", body: "Move from late reviews to clearer daily control across CCPs, hygiene checks, suppliers, and reports." },
    contact: { eyebrow: "Get in touch", title: "Start with clarity. Move to control.", body: "Book a consultation and see how Vera can improve compliance work, records, and follow-up.", talk: "Talk to us", cardTitle: "Ready to improve your food-safety system?", cardBody: "Tell us about your operation and we will come back with a practical plan within two business days.", response: "Typically responds within 4 hours", trusted: "Trusted by teams in", formEyebrow: "Send a message", formTitle: "Tell us about your operation", fields: { name: "Full name", company: "Company", email: "Work email", phone: "Phone", interest: "Service interest", message: "Message" }, placeholders: { name: "Your name", company: "Company name", email: "you@company.rw", phone: "+250 …", message: "Tell us about your operation, scale, and current pain points." }, interests: ["Food Safety Consultancy", "Digital Records Platform", "Platform Demo Request", "Both Services"], success: "Message sent. Vera Systems will get back to you shortly.", error: "Could not send message. Please try again." },
    footer: { summary: "Precision food safety for East Africa. Practical standards, clean records, and stronger daily control.", columns: [{ heading: "Company", links: ["About", "Services", "Platform", "Why Vera"] }, { heading: "Resources", links: ["Insights", "Case studies", "Documentation", "Pricing"] }, { heading: "Legal", links: ["Privacy policy", "Terms of service", "Cookie policy"] }], copyright: "© 2026 Vera Systems Ltd. · Kigali, Rwanda · All rights reserved." },
  },
  fr: {
    languageLabel: "Langue", logoSubtitle: "Sécurité alimentaire précise",
    nav: { about: "À propos", services: "Services", platform: "Plateforme", why: "Pourquoi Vera", insights: "Articles", contact: "Contact" },
    actions: { bookDemo: "Réserver une démo", bookConsultation: "Réserver une consultation", explorePlatform: "Voir la plateforme", learnMore: "En savoir plus", requestDemo: "Demander une démo", nextStep: "Étape suivante", sendMessage: "Envoyer", sending: "Envoi…", lightMode: "Mode clair", darkMode: "Mode sombre" },
    hero: { titleStart: "Des registres de contrôle au", highlight: "pilotage quotidien", titleEnd: ".", body: "Vera rassemble HACCP, ISO 22000, contrôles fournisseurs, relevés de température et actions correctives dans un espace conçu pour les équipes alimentaires en Afrique de l’Est.", stats: [{ k: "98.7%", l: "registres complets" }, { k: "3.4×", l: "suivi plus rapide" }, { k: "240+", l: "contrôles suivis" }] },
    clients: { eyebrow: "Utilisé par des entreprises alimentaires au Rwanda et en Afrique de l’Est", items: ["Transformateurs", "Restaurants", "Exportateurs", "Fabricants", "Hôtels", "Traiteurs", "Cuisines cloud", "Chaîne du froid"] },
    about: { eyebrow: "À propos de Vera", title: "Des systèmes de sécurité alimentaire pensés pour le terrain", body: "Nous associons pratique de la sécurité alimentaire et registres numériques clairs. Le système sert tous les jours, pas seulement avant un audit.", established: "Basé à", location: "Kigali · Rwanda", missionLabel: "Mission", mission: "Aider les entreprises alimentaires du Rwanda et d’Afrique de l’Est à sécuriser leurs opérations grâce à des standards pratiques, de meilleurs registres et des actions correctives rapides.", pills: [{ title: "Guidé par les standards", body: "Méthodes HACCP et ISO 22000 reliées à des preuves vérifiables." }, { title: "Adapté aux opérations", body: "Flux de travail adaptés aux cuisines, usines, entrepôts et chaînes du froid." }], stats: [{ k: "5+", l: "Années d’expérience" }, { k: "140+", l: "Contrôles réalisés" }, { k: "60+", l: "Opérations accompagnées" }] },
    services: { eyebrow: "Services", title: "Conseil et logiciel dans un même système.", body: "Commencez par le besoin le plus urgent, puis ajoutez plus de structure à mesure que l’activité grandit.", items: [{ label: "Conseil en sécurité alimentaire", title: "Systèmes de conformité utilisables sur site", impact: "Réduire les écarts qui créent une pression d’audit, des risques produit et du travail repris.", body: "Conception HACCP, analyse ISO 22000, contrôles des installations, calendriers de vérification, formation et plans d’actions correctives.", bullets: ["Conception et mise en œuvre HACCP", "Préparation ISO 22000", "Inspections de cuisines et sites", "Formation et outils de vérification"], statLabel: "préparation audit" }, { label: "Registres numériques & logiciel", title: "Registres en direct pour le contrôle quotidien", impact: "Remplacer les journaux dispersés par tableaux de bord, alertes, traces d’audit et scorecards fournisseurs.", body: "Une couche pratique pour les CCP, l’hygiène, les écarts, les fournisseurs et les rapports de conformité.", bullets: ["Tableaux de bord CCP", "Notifications d’écarts", "Registres d’hygiène numériques", "Suivi performance fournisseurs"], statLabel: "suivi plus rapide" }] },
    stack: { eyebrow: "Méthode", title: "Un parcours pratique vers une sécurité alimentaire plus solide", body: "De la première visite de site aux registres et rapports, chaque étape reste claire et utilisable.", nextStep: "Étape suivante", cards: [{ title: "Cartographier les vrais risques", body: "Nous examinons CCP, hygiène, fournisseurs, documents, routines et points de pression liés aux audits.", label: "premier aperçu risque" }, { title: "Transformer la conformité en routine", body: "Les procédures deviennent checklists, contrôles, escalades et traces de preuve.", label: "preuves retrouvées plus vite" }, { title: "Suivre la performance en direct", body: "Les tableaux de bord montrent les CCP, écarts, fournisseurs, hygiène et indicateurs de préparation.", label: "suivi CCP" }, { title: "Réduire les répétitions d’écarts", body: "La direction voit tendances, actions correctives, fournisseurs et recommandations pratiques.", label: "rapports prêts pour audit" }] },
    platform: { eyebrow: "Plateforme", title: "Un espace pour les registres essentiels.", quote: "Un poste de contrôle pour la sécurité alimentaire : écarts enregistrés, fournisseurs notés, CCP visibles et rapports prêts." },
    outcomes: { eyebrow: "Priorités clients", title: "Ce que de meilleurs registres facilitent.", body: "Moins de relances, moins de journaux manquants, plus de responsabilité et une meilleure préparation audit.", items: [{ quote: "La préparation audit devient plus rapide car documents, contrôles et validations sont déjà organisés.", name: "Préparation audit", role: "Preuves au même endroit", initials: "PA" }, { quote: "Les superviseurs voient les écarts à traiter sans attendre la fin de journée.", name: "Suivi équipe", role: "Responsabilité claire", initials: "SE" }, { quote: "Les fournisseurs sont plus faciles à revoir quand réception, documents et actions sont suivis ensemble.", name: "Contrôle fournisseurs", role: "Meilleures décisions", initials: "CF" }] },
    insights: { eyebrow: "Articles", title: "Notes du terrain.", body: "Observations pratiques sur la conformité, les fournisseurs, les CCP et les routines de sécurité alimentaire.", items: [{ tag: "Cas pratique", title: "Réduire les retards de suivi des écarts", body: "Les alertes en direct aident l’équipe à agir avant la revue papier de fin de poste.", read: "6 min" }, { tag: "Données", title: "Registres fournisseurs qui créent souvent des écarts", body: "Certificats, températures de réception et traçabilité nécessitent un suivi régulier.", read: "5 min" }, { tag: "Opérations", title: "Pourquoi les journaux HACCP papier ralentissent la réponse", body: "La saisie manuelle crée un délai entre l’incident, la revue et l’action corrective.", read: "7 min" }, { tag: "Terrain", title: "Lire la stabilité CCP avant que les problèmes grandissent", body: "Signaux utiles pour savoir si les contrôles tiennent pendant la semaine.", read: "6 min" }] },
    why: { eyebrow: "Pourquoi Vera", title: "Pensé pour le fonctionnement réel des entreprises alimentaires.", body: "Vera privilégie des contrôles utilisables, des registres clairs et des preuves qui aident les managers à agir vite.", cards: [{ title: "Travail basé sur les standards", body: "Les recommandations sont reliées aux CCP, clauses ISO, preuves d’audit ou données d’opération." }, { title: "Visibilité du risque", body: "Les équipes voient le statut CCP, les alertes et les actions correctives dans un même espace." }, { title: "Conformité reliée aux données", body: "Les constats deviennent des résultats mesurables, plus simples à vérifier et rapporter." }, { title: "Conçu pour l’Afrique de l’Est", body: "Adapté aux chaînes d’approvisionnement locales, aux équipes et au rythme des opérations." }] },
    cta: { eyebrow: "Démarrer", title: "Prêt à remplacer les journaux papier par des registres en direct ?", body: "Passez des revues tardives à un contrôle quotidien plus clair des CCP, de l’hygiène, des fournisseurs et des rapports." },
    contact: { eyebrow: "Contact", title: "Commencer avec clarté. Avancer avec contrôle.", body: "Réservez une consultation et voyez comment Vera peut améliorer la conformité, les registres et le suivi.", talk: "Parlez-nous", cardTitle: "Prêt à améliorer votre système ?", cardBody: "Décrivez votre opération et nous proposerons un plan pratique sous deux jours ouvrables.", response: "Réponse habituelle sous 4 heures", trusted: "Utilisé par des équipes au", formEyebrow: "Envoyer un message", formTitle: "Parlez-nous de votre opération", fields: { name: "Nom complet", company: "Entreprise", email: "Email professionnel", phone: "Téléphone", interest: "Service recherché", message: "Message" }, placeholders: { name: "Votre nom", company: "Nom de l’entreprise", email: "vous@entreprise.rw", phone: "+250 …", message: "Décrivez votre opération, sa taille et vos besoins." }, interests: ["Conseil sécurité alimentaire", "Plateforme de registres", "Demande de démo", "Les deux services"], success: "Message envoyé. Vera Systems vous répondra bientôt.", error: "Impossible d’envoyer le message. Veuillez réessayer." },
    footer: { summary: "Sécurité alimentaire précise pour l’Afrique de l’Est. Standards pratiques, registres propres et meilleur contrôle quotidien.", columns: [{ heading: "Entreprise", links: ["À propos", "Services", "Plateforme", "Pourquoi Vera"] }, { heading: "Ressources", links: ["Articles", "Études de cas", "Documentation", "Tarifs"] }, { heading: "Légal", links: ["Confidentialité", "Conditions", "Cookies"] }], copyright: "© 2026 Vera Systems Ltd. · Kigali, Rwanda · Tous droits réservés." },
  },
  rw: {
    languageLabel: "Ururimi", logoSubtitle: "Umutekano w’ibiribwa",
    nav: { about: "Ibyacu", services: "Serivisi", platform: "Urubuga", why: "Impamvu Vera", insights: "Inyandiko", contact: "Twandikire" },
    actions: { bookDemo: "Saba demo", bookConsultation: "Saba inama", explorePlatform: "Reba urubuga", learnMore: "Menya byinshi", requestDemo: "Saba demo", nextStep: "Intambwe ikurikira", sendMessage: "Ohereza", sending: "Biri koherezwa…", lightMode: "Uburyo bw’urumuri", darkMode: "Uburyo bw’umwijima" },
    hero: { titleStart: "Kuva ku nyandiko z’igenzura kugera ku", highlight: "micungire ya buri munsi", titleEnd: ".", body: "Vera ihuza HACCP, ISO 22000, igenzura ry’abatanga ibikoresho, ubushyuhe n’ibikorwa byo gukosora mu rubuga rumwe rworohereza amakipe akora mu biribwa.", stats: [{ k: "98.7%", l: "inyandiko zuzuye" }, { k: "3.4×", l: "gukurikirana vuba" }, { k: "240+", l: "igenzura rikurikiranywa" }] },
    clients: { eyebrow: "Yizewe n’abakora ubucuruzi bw’ibiribwa mu Rwanda no muri Afurika y’Iburasirazuba", items: ["Abatunganya ibiribwa", "Restaurants", "Abajyana hanze", "Inganda", "Hotels", "Catering", "Cloud kitchens", "Cold chain"] },
    about: { eyebrow: "Ibyerekeye Vera", title: "Sisitemu z’umutekano w’ibiribwa zikora mu kazi ka buri munsi", body: "Duhuza ubumenyi bw’umutekano w’ibiribwa n’inyandiko zicungwa neza. Sisitemu ikoreshwa buri munsi, si mbere y’audit gusa.", established: "Dukorera", location: "Kigali · Rwanda", missionLabel: "Intego", mission: "Gufasha ubucuruzi bw’ibiribwa mu Rwanda no muri Afurika y’Iburasirazuba kubaka imikorere itekanye, inyandiko zisobanutse n’ibikorwa byo gukosora ku gihe.", pills: [{ title: "Bishingiye ku bipimo", body: "HACCP na ISO 22000 bihuzwa n’ibimenyetso bishobora kugenzurwa." }, { title: "Bihuye n’imikorere", body: "Inzira z’akazi zubakwa hashingiwe kuri kitchens, factories, warehouses na cold chain." }], stats: [{ k: "5+", l: "Imyaka y’ubunararibonye" }, { k: "140+", l: "Igenzura ryakozwe" }, { k: "60+", l: "Ibikorwa byafashijwe" }] },
    services: { eyebrow: "Serivisi", title: "Ubujyanama na software bikorera hamwe.", body: "Tangira ku cyo ukeneye ubu, wongere urwego uko ibikorwa bikura.", items: [{ label: "Ubujyanama mu mutekano w’ibiribwa", title: "Sisitemu zubahiriza ibisabwa zikoreshwa ku kazi", impact: "Gufunga icyuho giteza ibibazo bya audit, ibyago ku bicuruzwa n’akazi gasubirwamo.", body: "Gutegura HACCP, gusesengura ISO 22000, kugenzura inyubako, gahunda zo gusuzuma, amahugurwa n’ibikorwa byo gukosora.", bullets: ["Gutegura no gushyira mu bikorwa HACCP", "Kwitegura ISO 22000", "Igenzura rya kitchen n’inyubako", "Amahugurwa n’ibikoresho byo kugenzura"], statLabel: "kwitegura audit" }, { label: "Inyandiko za digital & software", title: "Inyandiko z’ako kanya mu micungire ya buri munsi", impact: "Gusimbuza impapuro zitandukanye dashboards, alerts, audit trails na supplier scorecards.", body: "Uburyo bwo gukurikirana CCP, isuku, ibitagenda neza, abatanga ibikoresho na raporo.", bullets: ["Dashboards za CCP", "Alerts z’ibitagenda neza", "Inyandiko z’isuku za digital", "Gukurikirana suppliers"], statLabel: "gukurikirana vuba" }] },
    stack: { eyebrow: "Uko bikorwa", title: "Inzira ifatika yo gukomeza umutekano w’ibiribwa", body: "Kuva ku gusura site bwa mbere kugeza ku nyandiko n’amaraporo, buri ntambwe iba isobanutse.", nextStep: "Intambwe ikurikira", cards: [{ title: "Gusobanukirwa ibyago nyabyo", body: "Tureba CCPs, isuku, suppliers, inyandiko, routine z’abakozi n’ibibazo bya audit.", label: "ishusho ya mbere y’ibyago" }, { title: "Guhindura compliance routine", body: "Procedures zihinduka checklists, controls, escalation paths n’ibimenyetso.", label: "kubona ibimenyetso vuba" }, { title: "Gukurikirana performance ako kanya", body: "Dashboards zerekana CCP, deviations, suppliers, hygiene logs n’ibipimo byo kwitegura.", label: "gukurikirana CCP" }, { title: "Kugabanya amakosa agaruka", body: "Management ibona trends, corrective actions, suppliers n’inama zifatika.", label: "raporo ziteguye audit" }] },
    platform: { eyebrow: "Urubuga", title: "Ahantu hamwe h’inyandiko z’ingenzi.", quote: "Igikoresho cyo gucunga umutekano w’ibiribwa: deviations zandikwa, suppliers bagahabwa amanota, CCP zikagaragara, raporo zikaboneka." },
    outcomes: { eyebrow: "Ibyo abakiriya bakeneye", title: "Icyo inyandiko nziza zoroshya.", body: "Gukurikirana bike, inyandiko nke zibura, inshingano zisobanutse no kwitegura audit neza.", items: [{ quote: "Kwitegura audit birihuta kuko inyandiko, igenzura n’amashyirwaho umukono biba biteguye.", name: "Kwitegura audit", role: "Ibimenyetso hamwe", initials: "KA" }, { quote: "Abayobozi babona ibikeneye gukosorwa batategereje umusozo w’umunsi.", name: "Gukurikirana ikipe", role: "Inshingano zisobanutse", initials: "GI" }, { quote: "Suppliers basuzumwa neza iyo reception checks, documents na corrective actions biri hamwe.", name: "Gucunga suppliers", role: "Ibyemezo byiza", initials: "GS" }] },
    insights: { eyebrow: "Inyandiko", title: "Inyandiko zivuye mu kazi ka buri munsi.", body: "Ibitekerezo bifatika kuri compliance, suppliers, CCP monitoring na routines z’umutekano w’ibiribwa.", items: [{ tag: "Urugero", title: "Kugabanya gutinda gukurikirana ibitagenda neza", body: "Alerts z’ako kanya zifasha ikipe gukora mbere y’isuzuma ry’impapuro rya nyuma y’akazi.", read: "imin 6" }, { tag: "Data", title: "Inyandiko za suppliers zikunze gutera icyuho", body: "Certificates, temperatures na traceability bisaba gukurikiranwa buri gihe.", read: "imin 5" }, { tag: "Operations", title: "Impamvu impapuro za HACCP zitinza reaction", body: "Kwandika ku mpapuro bitera icyuho hagati y’ikibazo, review n’igikorwa cyo gukosora.", read: "imin 7" }, { tag: "Field note", title: "Kumenya uko CCP zihagaze mbere y’uko ibibazo bikura", body: "Ibimenyetso byerekana niba controls zikora neza mu cyumweru.", read: "imin 6" }] },
    why: { eyebrow: "Impamvu Vera", title: "Yubakiye ku mikorere nyayo y’ubucuruzi bw’ibiribwa.", body: "Vera ishyira imbere controls zikoreshwa, inyandiko zisobanutse n’ibimenyetso bifasha managers gukora vuba.", cards: [{ title: "Bishingiye ku bipimo", body: "Inama zihuzwa na HACCP control points, ISO clauses, audit evidence cyangwa operating data." }, { title: "Kureba ibyago ako kanya", body: "Amakipe abona status ya CCP, alerts na corrective actions ahantu hamwe." }, { title: "Compliance ihuzwa na data", body: "Ibyabonetse bihinduka outputs zipimika kandi zoroshye gutanga raporo." }, { title: "Yagenewe Afurika y’Iburasirazuba", body: "Yubakiye ku miterere ya supply chain, ubushobozi bw’amakipe n’umuvuduko w’ibikorwa." }] },
    cta: { eyebrow: "Tangira", title: "Witeguye gusimbuza impapuro inyandiko z’ako kanya?", body: "Va ku isuzuma ritinze ujye ku micungire isobanutse ya CCP, isuku, suppliers na raporo." },
    contact: { eyebrow: "Twandikire", title: "Tangira usobanukiwe. Komereza ku micungire.", body: "Saba inama urebe uko Vera yafasha compliance, inyandiko no gukurikirana.", talk: "Tuvugishe", cardTitle: "Witeguye kunoza sisitemu yawe?", cardBody: "Tubwire ibikorwa byawe, tuzagaruka dufite plan ifatika mu minsi ibiri y’akazi.", response: "Dukunze gusubiza mu masaha 4", trusted: "Yizewe n’amakipe muri", formEyebrow: "Ohereza ubutumwa", formTitle: "Tubwire ibikorwa byawe", fields: { name: "Amazina", company: "Ikigo", email: "Email y’akazi", phone: "Telefone", interest: "Serivisi ushaka", message: "Ubutumwa" }, placeholders: { name: "Amazina yawe", company: "Izina ry’ikigo", email: "wowe@company.rw", phone: "+250 …", message: "Tubwire ibikorwa byawe, ingano yabyo n’ibyo ukeneye." }, interests: ["Ubujyanama mu mutekano w’ibiribwa", "Urubuga rw’inyandiko", "Gusaba demo", "Serivisi zombi"], success: "Ubutumwa bwoherejwe. Vera Systems izagusubiza vuba.", error: "Ubutumwa ntibwoherejwe. Ongera ugerageze." },
    footer: { summary: "Umutekano w’ibiribwa muri Afurika y’Iburasirazuba. Ibipimo bifatika, inyandiko zisobanutse n’imicungire myiza ya buri munsi.", columns: [{ heading: "Ikigo", links: ["Ibyacu", "Serivisi", "Urubuga", "Impamvu Vera"] }, { heading: "Ibikoresho", links: ["Inyandiko", "Case studies", "Documentation", "Ibiciro"] }, { heading: "Amategeko", links: ["Privacy policy", "Terms of service", "Cookie policy"] }], copyright: "© 2026 Vera Systems Ltd. · Kigali, Rwanda · Uburenganzira bwose burubahirizwa." },
  },
} as const;

type Widen<T> =
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends readonly (infer U)[] ? ReadonlyArray<Widen<U>> :
  T extends object ? { readonly [K in keyof T]: Widen<T[K]> } :
  T;

type SiteCopy = Widen<(typeof siteCopy)[Language]>;

const services = [
  {
    label: "Food Safety Consultancy",
    title: "Certification-grade compliance systems",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=85",
    impact: "Close compliance gaps that create audit pressure, product risk, and unnecessary rework.",
    body: "HACCP design, ISO 22000 checks, facility reviews, verification schedules, staff training, and corrective action planning.",
    bullets: [
      "HACCP system design and implementation",
      "ISO 22000 certification readiness",
      "On-site kitchen and facility audits",
      "Food handler training and verification tools",
    ],
    stat: { value: "98%", label: "Audit pass rate" },
    accent: C.blue,
    icon: Shield,
  },
  {
    label: "Digital Records & Software",
    title: "Real-time HACCP visibility",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    impact: "Replace paper logs with dashboards, alerts, audit trails, and supplier scorecards your team can use every day.",
    body: "A practical data layer for CCP monitoring, hygiene tracking, deviation alerts, supplier performance, and compliance reporting across food operations.",
    bullets: [
      "Live CCP monitoring dashboards",
      "Automated deviation notifications",
      "Digital hygiene logs and sign-offs",
      "Supplier performance analytics",
    ],
    stat: { value: "3.4×", label: "Faster response" },
    accent: C.teal,
    icon: Cpu,
  },
];

const insights = [
  {
    tag: "Case Insight",
    title: "How a Kigali processor cut deviation response time by 68%",
    body: "Automated CCP alerts reduced corrective-action delays by replacing end-of-shift paper log reviews with live deviation notifications.",
    read: "6 min read",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=85",
  },
  {
    tag: "Data Trend",
    title: "Supplier non-compliance patterns from 140+ audit checks",
    body: "Certificate lapses, receiving temperature failures, and incomplete traceability records remain the most common upstream risk signals.",
    read: "5 min read",
    image: "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?auto=format&fit=crop&w=900&q=85",
  },
  {
    tag: "Risk Analysis",
    title: "The hidden cost of paper-based HACCP in high-throughput operations",
    body: "Manual CCP logging creates a time gap between breach, detection, and corrective action — risk that looks compliant on paper but late in practice.",
    read: "7 min read",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=85",
  },
  {
    tag: "Field Notes",
    title: "Inside Vera: how we model forecast confidence",
    body: "A practical look at how we score CCP stability, supplier reliability, and deviation likelihood before they become incidents.",
    read: "6 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=85",
  },
];

const whyCards = [
  { title: "Precision food safety", body: "Recommendations are tied to HACCP control points, ISO clauses, audit evidence, or operating data — not generic templates.", icon: Award, accent: C.blue },
  { title: "Real-time risk visibility", body: "Dashboards replace scattered paper logs so the team can see CCP status, deviation alerts, and corrective action progress from any device.", icon: Activity, accent: C.teal },
  { title: "Compliance-to-data mapping", body: "Every audit finding becomes a measurable system output, making compliance easier to verify and management decisions easier to defend.", icon: BarChart3, accent: C.violet },
  { title: "Built for East Africa", body: "Designed around local supply-chain realities, food-business constraints, and the pace of kitchens, factories, hotels, and processors.", icon: Globe, accent: C.amber },
];

const stackCards = [
  {
    eyebrow: "01", metric: "72h", label: "first-risk snapshot",
    title: "Map the real operating risk",
    body: "We start on the kitchen or factory floor: CCPs, hygiene behavior, supplier risk, documentation gaps, staff routines, and audit pressure points.",
    color: C.teal, colorLight: C.tealLt,
  },
  {
    eyebrow: "02", metric: "4×", label: "faster evidence retrieval",
    title: "Turn compliance into workflow",
    body: "Your procedures become practical checklists, live controls, escalation paths, and evidence trails that your team can use every day.",
    color: C.blue, colorLight: C.blueLt,
  },
  {
    eyebrow: "03", metric: "Live", label: "CCP tracking",
    title: "Visualize performance in real time",
    body: "Dashboards show CCP status, deviations, supplier scores, hygiene logs, and readiness indicators before issues turn into incidents.",
    color: C.violet, colorLight: C.violetLt,
  },
  {
    eyebrow: "04", metric: "ISO", label: "audit-ready reporting",
    title: "Use data to reduce repeat failures",
    body: "Management receives trends, corrective-action loops, supplier patterns, and practical recommendations tied directly to operational outcomes.",
    color: C.amber, colorLight: C.amberLt,
  },
];

const tabs: Array<{ id: DemoTab; label: string }> = [
  { id: "ccp", label: "Live CCP" },
  { id: "deviations", label: "Deviations" },
  { id: "suppliers", label: "Suppliers" },
  { id: "reports", label: "Reports" },
];

const testimonials = [
  { quote: "Vera cut our audit prep from three weeks to two days. The live dashboards changed how our entire team thinks about compliance.", name: "Jean-Pierre M.", role: "Operations Director, Kigali Dairy", initials: "JP", accent: C.blue },
  { quote: "We finally have a system that matches how our kitchen actually runs. Every deviation gets caught, logged, and closed — in real time.", name: "Amara N.", role: "Head Chef, Hotel Serena Rwanda", initials: "AN", accent: C.teal },
  { quote: "The supplier scorecards alone justified the investment. We dropped two chronic non-performers in the first quarter.", name: "David K.", role: "Quality Manager, Akagera Foods", initials: "DK", accent: C.violet },
];

/* ── Chart data ── */
const ccpTrend = [
  { m: "W1", v: 88, p: 90, d: 4 }, { m: "W2", v: 92, p: 91, d: 3 },
  { m: "W3", v: 90, p: 92, d: 5 }, { m: "W4", v: 95, p: 93, d: 2 },
  { m: "W5", v: 96, p: 94, d: 1 }, { m: "W6", v: 97, p: 95, d: 2 }, { m: "W7", v: 98, p: 96, d: 1 },
];
const segmentData = [
  { name: "Processors", v: 86, b: 90 },
  { name: "Restaurants", v: 64, b: 75 },
  { name: "Hotels", v: 47, b: 70 },
  { name: "Cold chain", v: 72, b: 85 },
];
const radarData = [
  { subject: "HACCP", A: 95, B: 68 },
  { subject: "ISO 22000", A: 88, B: 55 },
  { subject: "Supplier", A: 82, B: 60 },
  { subject: "Hygiene", A: 91, B: 72 },
  { subject: "Traceability", A: 78, B: 50 },
  { subject: "Deviations", A: 93, B: 64 },
];
const pieData = [
  { name: "Within range", value: 12, color: C.green },
  { name: "Watch", value: 1, color: C.amber },
  { name: "Resolved", value: 8, color: C.teal },
  { name: "Pending", value: 2, color: C.violet },
];

/* ── Helpers ── */
function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}
function scrollToId(id: string) {
  if (typeof document !== "undefined")
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const u = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    u(); window.addEventListener("scroll", u, { passive: true });
    return () => { window.removeEventListener("scroll", u); };
  }, []);
  return p;
}
function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("vera-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = useCallback(() => {
    const html = document.documentElement;
    html.classList.add("transitioning");
    setTimeout(() => html.classList.remove("transitioning"), 400);
    setDark(d => {
      const next = !d;
      html.classList.toggle("dark", next);
      localStorage.setItem("vera-theme", next ? "dark" : "light");
      return next;
    });
  }, []);
  return { dark, toggle };
}

function useLanguage(): { language: Language; setLanguage: (next: Language) => void; copy: SiteCopy } {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("vera-language") as Language | null;
    if (stored && stored in siteCopy) {
      setLanguageState(stored);
      document.documentElement.lang = stored === "rw" ? "rw" : stored;
    }
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    localStorage.setItem("vera-language", next);
    document.documentElement.lang = next === "rw" ? "rw" : next;
  }, []);

  const copy = siteCopy[language] as SiteCopy;

  return { language, setLanguage, copy };
}

/* ── Atoms ── */
function Logo({ compact = false, subtitle = "Precision food safety" }: { compact?: boolean; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-[hsl(var(--navy-950))] dark:bg-white/10 text-white shadow-lg">
        <span className="font-display text-base font-black tracking-tight">V</span>
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[hsl(var(--success))] ring-2 ring-white dark:ring-[hsl(var(--background))]" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="font-display text-sm font-extrabold tracking-tight text-[hsl(var(--navy-950))] dark:text-white">Vera Systems</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">{subtitle}</p>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ eyebrow, title, body, light = false, centered = false }:
  { eyebrow: string; title: string; body?: string; light?: boolean; centered?: boolean }) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")} data-reveal>
      <p className={cn("inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em]",
        light ? "text-[hsl(var(--teal-light))]" : "text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]")}>
        <span className="h-px w-8 bg-current opacity-60" />
        {eyebrow}
        <span className="h-px w-8 bg-current opacity-60" />
      </p>
      <h2 className={cn("mt-5 text-balance font-display text-3xl font-semibold tracking-tight md:text-5xl",
        light ? "text-white" : "text-[hsl(var(--navy-950))] dark:text-white")}>
        {title}
      </h2>
      {body && (
        <p className={cn("mt-5 max-w-2xl text-base leading-relaxed md:text-lg",
          light ? "text-white/70" : "text-[hsl(var(--muted-foreground))]",
          centered && "mx-auto")}>
          {body}
        </p>
      )}
    </div>
  );
}

/* ── Navbar ── */
function Navbar({ dark, toggleDark, language, onLanguageChange, copy }: { dark: boolean; toggleDark: () => void; language: Language; onLanguageChange: (language: Language) => void; copy: SiteCopy }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const u = () => setScrolled(window.scrollY > 32);
    u(); window.addEventListener("scroll", u, { passive: true });
    return () => window.removeEventListener("scroll", u);
  }, []);

  useEffect(() => {
    const sections = navItems.map(i => document.getElementById(i.href)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      entries => {
        const vis = entries.filter(e => e.isIntersecting);
        if (vis.length) setActiveSection(vis[vis.length - 1].target.id);
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 animate-nav",
        scrolled ? "shadow-[0_18px_45px_-30px_rgba(15,23,42,.45)] border-b border-[hsl(var(--border))] bg-white/95 backdrop-blur-xl dark:bg-[hsl(var(--background))]/95 dark:border-white/8" : "shadow-none"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 transition-all duration-500">
        {/* Logo */}
        <button onClick={() => scrollToId("hero")} className="-ml-1 group" aria-label="Vera Systems home">
          <Logo subtitle={copy.logoSubtitle} />
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((i) => (
            <button key={i.href} onClick={() => scrollToId(i.href)}
              className={cn(
                "relative px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-200",
                activeSection === i.href
                  ? "text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))] bg-[hsl(var(--blue-100))]/60 dark:bg-[hsl(var(--blue-100))]/10"
                  : "text-[hsl(var(--navy-900))]/60 dark:text-white/60 hover:text-[hsl(var(--navy-950))] dark:hover:text-white hover:bg-[hsl(var(--muted))]/60 dark:hover:bg-white/5"
              )}>
              {copy.nav[i.key]}
              {activeSection === i.href && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-[hsl(var(--blue-500))]" />
              )}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <label className="relative hidden sm:block" aria-label={copy.languageLabel}>
            <span className="sr-only">{copy.languageLabel}</span>
            <select
              value={language}
              onChange={(event) => onLanguageChange(event.target.value as Language)}
              className="h-9 appearance-none rounded-xl border border-[hsl(var(--border))] bg-white/80 px-3 pr-8 text-[11px] font-black uppercase tracking-[0.18em] text-[hsl(var(--navy-950))] outline-none transition hover:bg-[hsl(var(--muted))] focus:border-[hsl(var(--blue-400))] dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              {languageOptions.map(option => (
                <option key={option.code} value={option.code}>{option.short}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[hsl(var(--muted-foreground))]">▾</span>
          </label>

          {/* Dark mode toggle */}
          <button onClick={toggleDark} aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-xl border border-[hsl(var(--border))] bg-white/80 dark:bg-white/5 text-[hsl(var(--muted-foreground))] dark:text-white/60 transition hover:bg-[hsl(var(--muted))] dark:hover:bg-white/10 hover:text-[hsl(var(--navy-950))] dark:hover:text-white">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button onClick={() => scrollToId("contact")}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--navy-950))] dark:bg-white/10 dark:border dark:border-white/15 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition hover:bg-[hsl(var(--blue-700))] dark:hover:bg-white/15 active:scale-95">
            {copy.actions.bookDemo} <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button onClick={() => setOpen(v => !v)} aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-xl border border-[hsl(var(--border))] bg-white/80 dark:bg-white/5 lg:hidden transition hover:bg-[hsl(var(--muted))] dark:hover:bg-white/10">
            {open ? <X className="h-4 w-4 dark:text-white" /> : <Menu className="h-4 w-4 dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "mx-4 mt-2 origin-top overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-white/96 dark:bg-[hsl(var(--background))]/96 backdrop-blur-xl transition-all duration-400 lg:hidden",
        open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
      )}>
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map(i => (
            <button key={i.href} onClick={() => { setOpen(false); scrollToId(i.href); }}
              className={cn(
                "rounded-xl px-4 py-3 text-left text-sm font-semibold transition",
                activeSection === i.href
                  ? "bg-[hsl(var(--blue-100))]/60 dark:bg-[hsl(var(--blue-100))]/10 text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]"
                  : "text-[hsl(var(--navy-950))] dark:text-white hover:bg-[hsl(var(--muted))]/60 dark:hover:bg-white/5"
              )}>
              {copy.nav[i.key]}
            </button>
          ))}
          <div className="mt-1 border-t border-[hsl(var(--border))] pt-3">
            <p className="px-4 pb-2 text-[10px] font-black uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">{copy.languageLabel}</p>
            <div className="grid grid-cols-3 gap-2 px-3 pb-3">
              {languageOptions.map(option => (
                <button
                  key={option.code}
                  onClick={() => onLanguageChange(option.code)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-[11px] font-black uppercase tracking-[0.16em] transition",
                    language === option.code
                      ? "border-[hsl(var(--blue-400))] bg-[hsl(var(--blue-100))]/65 text-[hsl(var(--blue-700))] dark:bg-[hsl(var(--blue-100))]/12 dark:text-[hsl(var(--blue-300))]"
                      : "border-[hsl(var(--border))] text-[hsl(var(--navy-950))]/70 hover:bg-[hsl(var(--muted))]/60 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5"
                  )}
                >
                  {option.short}
                </button>
              ))}
            </div>
            <button onClick={toggleDark}
              className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-[hsl(var(--navy-950))] dark:text-white hover:bg-[hsl(var(--muted))]/60 dark:hover:bg-white/5 flex items-center gap-3">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {dark ? copy.actions.lightMode : copy.actions.darkMode}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ── HERO ── */
function Hero({ copy }: { copy: SiteCopy }) {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-28">
      <div className="aurora" />
      <div className="absolute inset-0 grid-bg" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7 animate-fade-up">
            <h1 className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-[hsl(var(--navy-950))] dark:text-white md:text-6xl lg:text-7xl">
              {copy.hero.titleStart}{" "}
              <span className="text-gradient-blue">{copy.hero.highlight}</span>{copy.hero.titleEnd}
            </h1>

            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
              {copy.hero.body}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button onClick={() => scrollToId("contact")}
                className="group inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--navy-950))] dark:bg-[hsl(var(--blue-500))] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:bg-[hsl(var(--blue-700))] active:scale-95">
                {copy.actions.bookConsultation}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
              <button onClick={() => scrollToId("platform")}
                className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] dark:border-white/15 bg-white/80 dark:bg-white/5 px-6 py-3.5 text-sm font-semibold text-[hsl(var(--navy-900))] dark:text-white backdrop-blur transition hover:border-[hsl(var(--blue-400))] hover:text-[hsl(var(--blue-700))] dark:hover:border-white/30 active:scale-95">
                <PlayCircle className="h-4 w-4" />
                {copy.actions.explorePlatform}
              </button>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {copy.hero.stats.map((s, idx) => (
                { ...s, color: [C.blue, C.teal, C.violet][idx] } as { k: string; l: string; color: string }
              )).map((s) => (
                <div key={s.l} className="group rounded-2xl border border-[hsl(var(--border))] dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-3 backdrop-blur transition hover:-translate-y-1 hover:border-[hsl(var(--blue-400))] dark:hover:border-white/25 hover:shadow-md">
                  <div className="font-display text-xl font-semibold text-[hsl(var(--navy-950))] dark:text-white"
                    style={{ color: s.color }}>{s.k}</div>
                  <div className="text-[11px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero card */}
          <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms]">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] gradient-blue-soft dark:opacity-20 opacity-50 blur-2xl" />
              <div className="relative glass-card rounded-3xl p-5 float-soft dark:bg-[hsl(var(--card))]/80">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">CCP compliance · YTD</div>
                    <div className="mt-1 font-display text-3xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">96.4%</div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--success-light))]/80 dark:bg-[hsl(var(--success))]/20 px-2.5 py-1 text-xs font-semibold text-[hsl(var(--success))]">
                    <TrendingUp className="h-3 w-3" /> +18.4%
                  </span>
                </div>
                <div className="mt-4 h-48">
                  <ResponsiveContainer>
                    <ComposedChart data={ccpTrend} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="heroGrad" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor={C.teal} stopOpacity={0.45} />
                          <stop offset="100%" stopColor={C.teal} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(30,58,95,.07)" vertical={false} />
                      <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                      <YAxis hide />
                      <Tooltip cursor={{ stroke: C.teal, strokeDasharray: 4, strokeWidth: 1 }}
                        contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 30px -10px rgba(20,40,80,.2)", fontFamily: "DM Sans, sans-serif" }} />
                      <Area type="monotone" dataKey="v" name="Actual" stroke={C.teal} strokeWidth={2.5} fill="url(#heroGrad)" />
                      <Line type="monotone" dataKey="p" name="Predicted" stroke={C.blue} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { v: "12", l: "CCPs OK", t: "success" as Tone },
                    { v: "1", l: "Watch", t: "warning" as Tone },
                    { v: "0", l: "Critical", t: "danger" as Tone },
                  ].map(s => (
                    <div key={s.l} className="rounded-xl border border-[hsl(var(--border))] dark:border-white/8 bg-white/70 dark:bg-white/5 p-3 text-center">
                      <p className={cn("font-display text-xl font-semibold",
                        s.t === "success" ? "text-[hsl(var(--success))]" : s.t === "warning" ? "text-[hsl(var(--warning))]" : "text-[hsl(var(--danger))]")}>{s.v}</p>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -left-6 top-12 hidden md:block rounded-2xl border border-[hsl(var(--border))] bg-white/90 dark:bg-[hsl(var(--card))]/90 px-4 py-3 text-xs font-semibold shadow-md backdrop-blur float-soft [animation-delay:1s]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--success))]">Alert resolved</p>
                <p className="text-[hsl(var(--navy-950))] dark:text-white">Cold room 02 stabilized</p>
              </div>
              <div className="absolute -right-4 -bottom-4 hidden md:block rounded-2xl border border-[hsl(var(--border))] bg-white/90 dark:bg-[hsl(var(--card))]/90 px-4 py-3 text-xs font-semibold shadow-md backdrop-blur">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">Audit ready</p>
                <p className="text-[hsl(var(--navy-950))] dark:text-white">ISO 22000 — 96%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Clients marquee ── */
function ClientTypes({ copy }: { copy: SiteCopy }) {
  const clients = useMemo(() => [...copy.clients.items], [copy.clients.items]);
  const doubled = [...clients, ...clients];
  return (
    <section className="relative border-y border-[hsl(var(--border))] bg-white dark:bg-[hsl(var(--muted))]/30 py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
          {copy.clients.eyebrow}
        </p>
        <div className="marquee-track mt-8 overflow-hidden">
          <div className="marquee">
            {doubled.map((c, i) => (
              <div key={`${c}-${i}`} className="flex flex-none items-center gap-3 text-[hsl(var(--navy-900))]/45 dark:text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--teal))]" />
                <span className="font-display text-base font-extrabold tracking-tight">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── About ── */
function About({ copy }: { copy: SiteCopy }) {
  return (
    <section id="about" className="relative overflow-hidden bg-[hsl(var(--muted))]/40 dark:bg-[hsl(var(--background))] py-28">
      <div className="absolute inset-0 dot-grid opacity-35 dark:opacity-25" />
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/50 dark:bg-[hsl(var(--blue-700))]/8 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div data-reveal className="reveal-delay-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] shadow-vera">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85"
              alt={copy.about.title} className="h-full w-full object-cover transition duration-1000 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-950))]/65 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/92 dark:bg-[hsl(var(--card))]/92 p-4 backdrop-blur">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--teal))]">{copy.about.established}</p>
              <p className="font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">{copy.about.location}</p>
            </div>
          </div>
        </div>
        <div>
          <SectionHeader
            eyebrow={copy.about.eyebrow}
            title={copy.about.title}
            body={copy.about.body}
          />
          <div className="mt-10 relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white/70 dark:bg-white/5 p-6 backdrop-blur shadow-vera" data-reveal>
            <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-[hsl(var(--teal))] via-[hsl(var(--blue-400))] to-transparent rounded-l-3xl" />
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--teal))]">{copy.about.missionLabel}</p>
            <p className="mt-3 text-lg italic leading-relaxed text-[hsl(var(--navy-950))] dark:text-white text-balance">
              {copy.about.mission}
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {copy.about.pills.map((pill, index) => (
              <InfoPill key={pill.title} title={pill.title} body={pill.body} accent={[C.blue, C.teal][index]} />
            ))}
          </div>
          <div
            className="mt-6 grid gap-4 rounded-2xl border border-[hsl(var(--border))] bg-white/60 px-6 py-5 backdrop-blur dark:border-white/[0.10] dark:bg-white/[0.045] sm:grid-cols-3"
            data-reveal
          >
            {copy.about.stats.map((s, i) => (
              <div
                key={s.l}
                className={cn(
                  "text-center",
                  i !== 0 && "sm:border-l sm:border-[hsl(var(--border))] sm:dark:border-white/[0.08]"
                )}
              >
                <p
                  className="font-display text-3xl font-semibold tracking-tight"
                  style={{ color: [C.blue, C.teal, C.violet][i] }}
                >
                  {s.k}
                </p>

                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] dark:text-white/60">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoPill({ title, body, accent }: { title: string; body: string; accent: string }) {
  return (
    <div className="glass-card hover-lift rounded-2xl p-5 dark:border-white/8" data-reveal>
      <div className="mb-2 h-0.5 w-8 rounded-full" style={{ background: accent }} />
      <p className="text-sm font-extrabold text-[hsl(var(--navy-950))] dark:text-white">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{body}</p>
    </div>
  );
}

/* ── Services — redesigned card layout ── */
function Services({ copy }: { copy: SiteCopy }) {
  const serviceItems = copy.services.items.map((item, index) => ({
    ...services[index],
    ...item,
    stat: { ...services[index].stat, label: item.statLabel },
  }));
  return (
    <section id="services" className="relative bg-white dark:bg-[hsl(var(--muted))]/20 py-28 overflow-hidden">
      <div className="absolute left-0 bottom-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/50 dark:bg-[hsl(var(--teal))]/6 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          centered
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          body={copy.services.body}
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {serviceItems.map((s, idx) => {
            const Icon = s.icon;
            return (
              <article key={s.title} data-reveal
                className={cn("group relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] shadow-vera transition-all duration-500 hover:-translate-y-2 hover:shadow-glow", `reveal-delay-${idx + 1}`)}>

                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
                        style={{ background: s.accent }}>
                        <Icon className="h-3.5 w-3.5" />
                        {s.label}
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white text-balance">{s.title}</h3>
                    </div>
                    {/* Stat badge */}
                    <div className="flex-none rounded-2xl border px-4 py-3 text-center"
                      style={{ borderColor: `${s.accent}40`, background: `${s.accent}0d` }}>
                      <p className="font-display text-2xl font-bold" style={{ color: s.accent }}>{s.stat.value}</p>
                      <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{s.stat.label}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm font-semibold leading-relaxed" style={{ color: s.accent }}>{s.impact}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{s.body}</p>

                  <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {s.bullets.map(b => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-[hsl(var(--navy-900))] dark:text-white/80">
                        <span className="mt-0.5 flex-none h-4 w-4 rounded-full flex items-center justify-center"
                          style={{ background: `${s.accent}20` }}>
                          <CheckCircle2 className="h-3.5 w-3.5" style={{ color: s.accent }} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Divider + CTA */}
                  <div className="mt-6 pt-5 border-t border-[hsl(var(--border))] dark:border-white/8 flex items-center justify-between">
                    <button onClick={() => scrollToId("contact")}
                      className="group/btn inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition active:scale-95"
                      style={{ background: s.accent }}>
                      {copy.actions.learnMore} <ArrowRight className="h-3.5 w-3.5 transition group-hover/btn:translate-x-0.5" />
                    </button>
                    <div className="relative h-8 w-8 overflow-hidden rounded-full opacity-15 group-hover:opacity-30 transition-opacity">
                      <div className="absolute inset-0 rounded-full" style={{ background: s.accent }} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Stack Experience ── */
function StackExperience({ copy }: { copy: SiteCopy }) {
  const [activeStep, setActiveStep] = useState(0);
  const stepItems = copy.stack.cards.map((item, index) => ({
    ...stackCards[index],
    ...item,
  }));
  const step = stepItems[activeStep];

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--navy-950))] py-28 text-white dark:bg-[#061225]">
      <div className="absolute inset-0 grid-bg opacity-15 dark:opacity-10" />
      <div className="aurora opacity-25 dark:opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          light
          eyebrow={copy.stack.eyebrow}
          title={copy.stack.title}
          body={copy.stack.body}
        />

        {/* Step selector */}
        <div className="mt-14 flex flex-wrap gap-3" data-reveal>
          {stepItems.map((c, i) => (
            <button key={c.eyebrow} onClick={() => setActiveStep(i)}
              className={cn(
                "rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 border",
                activeStep === i
                  ? "bg-white text-[#0d1f3c] dark:text-[#0d1f3c] border-white shadow-lg"
                  : "border-white/15 text-white/55 hover:border-white/35 hover:text-white"
              )}>
              <span className="font-mono">{c.eyebrow}</span> / {c.title.split(" ").slice(0, 3).join(" ")}…
            </button>
          ))}
        </div>

        {/* Active step */}
        <div key={activeStep} className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_0.5fr] animate-fade-up">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
            <div className="flex items-start gap-6">
              <div className="flex-none hidden sm:block">
                {/* Big colorful step number — new accent approach */}
                <span className="font-display text-7xl font-black leading-none"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}, ${step.colorLight})`,
                    WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
                  }}>
                  {step.eyebrow}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: step.colorLight }}>Step {step.eyebrow}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">{step.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">{step.body}</p>
              </div>
            </div>
            {/* Progress dots */}
            <div className="mt-8 flex gap-2">
              {stepItems.map((_, i) => (
                <button key={i} onClick={() => setActiveStep(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeStep ? "2rem" : "0.75rem",
                    background: i === activeStep ? step.color : "rgba(255,255,255,.25)"
                  }} />
              ))}
            </div>
          </div>
          {/* Metric card */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.04] p-6 flex flex-col items-center justify-center text-center backdrop-blur-xl">
              <p className="font-display text-5xl font-black" style={{ color: step.color }}>{step.metric}</p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: step.colorLight }}>{step.label}</p>
            </div>
            <button onClick={() => setActiveStep((activeStep + 1) % stepItems.length)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white flex items-center justify-between backdrop-blur-xl">
              {copy.stack.nextStep} <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* All steps grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stepItems.map((c, i) => (
            <button key={c.eyebrow} onClick={() => setActiveStep(i)} data-reveal
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300",
                `reveal-delay-${(i % 4) + 1}`,
                activeStep === i
                  ? "border-white/25 bg-white/[0.08]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/18 hover:bg-white/[0.05]"
              )}>
              {/* Colored top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-all duration-300"
                style={{ background: activeStep === i ? c.color : "transparent" }} />
              <span className="font-display text-3xl font-black"
                style={{
                  background: `linear-gradient(135deg, ${c.color}, ${c.colorLight})`,
                  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
                }}>
                {c.eyebrow}
              </span>
              <p className="mt-1 text-sm font-semibold text-white/80">{c.title}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Platform Demo ── */
function PlatformDemo({ copy }: { copy: SiteCopy }) {
  return (
    <section id="platform" className="relative overflow-hidden bg-[hsl(var(--muted))]/30 dark:bg-[hsl(var(--background))] py-28">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/55 dark:bg-[hsl(var(--blue-700))]/8 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <SectionHeader eyebrow={copy.platform.eyebrow} title={copy.platform.title} />
          <div className="rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white/70 dark:bg-white/5 p-6 backdrop-blur max-w-sm" data-reveal>
            <p className="text-base italic leading-relaxed text-[hsl(var(--navy-950))]/80 dark:text-white/80">
              {copy.platform.quote}
            </p>
            <button onClick={() => scrollToId("contact")}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--navy-950))] dark:bg-[hsl(var(--blue-500))] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[hsl(var(--blue-700))] active:scale-95">
              {copy.actions.requestDemo} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Bar chart + radar side by side */}
          <div className="glass-card hover-lift rounded-3xl p-6 lg:col-span-2 dark:border-white/8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[hsl(var(--navy-950))] dark:text-white">Segment performance</h3>
                  <BarChart3 className="h-4 w-4" style={{ color: C.blue }} />
                </div>
                <div className="h-52">
                  <ResponsiveContainer>
                    <BarChart data={segmentData} barGap={4}>
                      <defs>
                        <linearGradient id="barActual" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor={C.blue} />
                          <stop offset="100%" stopColor={C.teal} />
                        </linearGradient>
                        <linearGradient id="barTarget" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor={C.violet} stopOpacity={0.5} />
                          <stop offset="100%" stopColor={C.violet} stopOpacity={0.15} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(30,58,95,.07)" vertical={false} />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                      <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                      <Tooltip cursor={{ fill: "rgba(30,58,95,.04)" }} contentStyle={{ borderRadius: 12, border: "none", fontFamily: "DM Sans, sans-serif" }} />
                      <Bar dataKey="v" name="Score" fill="url(#barActual)" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="b" name="Target" fill="url(#barTarget)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[hsl(var(--navy-950))] dark:text-white">Compliance radar</h3>
                  <Eye className="h-4 w-4" style={{ color: C.teal }} />
                </div>
                <div className="h-52">
                  <ResponsiveContainer>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(30,58,95,.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 10 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Vera" dataKey="A" stroke={C.teal} fill={C.teal} fillOpacity={0.25} strokeWidth={2} />
                      <Radar name="Industry" dataKey="B" stroke={C.violet} fill={C.violet} fillOpacity={0.12} strokeWidth={1.5} strokeDasharray="4 4" />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontFamily: "DM Sans, sans-serif" }} />
                      <Legend iconSize={8} wrapperStyle={{ fontSize: 11, fontFamily: "DM Sans, sans-serif" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Feature pills */}
          <div className="space-y-4">
            {[
              { i: Shield, t: "ISO 22000 ready", d: "Audit-grade evidence by default.", color: C.blue },
              { i: Zap, t: "Record sync", d: "Updates across active sites.", color: C.teal },
              { i: Clock, t: "Guided setup", d: "Start with your first records.", color: C.violet },
            ].map(({ i: Icon, t, d, color }) => (
              <div key={t} className="glass-card hover-lift flex items-start gap-4 rounded-2xl p-5 dark:border-white/8">
                <div className="grid h-10 w-10 flex-none place-items-center rounded-xl text-white shadow-md"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-[hsl(var(--navy-950))] dark:text-white">{t}</div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DemoTabs />
      </div>
    </section>
  );
}

function DemoTabs() {
  const [active, setActive] = useState<DemoTab>("ccp");
  return (
    <div className="mt-14">
      <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-[hsl(var(--border))] dark:border-white/10 pb-0" data-reveal>
        {tabs.map((t, index) => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={cn(
              "relative whitespace-nowrap pb-4 px-5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-200 rounded-t-lg",
              active === t.id
                ? "text-[hsl(var(--navy-950))] dark:text-white bg-[hsl(var(--muted))]/40 dark:bg-white/5"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--navy-900))] dark:hover:text-white/80"
            )}>
            {t.label}
            {active === t.id && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[hsl(var(--teal))]" />
            )}
          </button>
        ))}
      </div>
      <div key={active} className="mt-6 animate-fade-up">
        {active === "ccp" && <CCPDashboard />}
        {active === "deviations" && <DeviationDashboard />}
        {active === "suppliers" && <SupplierDashboard />}
        {active === "reports" && <ReportsDashboard />}
      </div>
    </div>
  );
}

function HealthStatCard({ value, label, tone }: { value: string; label: string; tone: Tone }) {
  const colors = {
    success: { text: "text-[hsl(var(--success))]", bg: "bg-[hsl(var(--success-light))]/60 dark:bg-[hsl(var(--success))]/15", border: "border-[hsl(var(--success))]/20" },
    warning: { text: "text-[hsl(var(--warning))]", bg: "bg-[hsl(var(--warning-light))]/60 dark:bg-[hsl(var(--warning))]/15", border: "border-[hsl(var(--warning))]/20" },
    danger: { text: "text-[hsl(var(--danger))]", bg: "bg-[hsl(var(--danger-light))]/60 dark:bg-[hsl(var(--danger))]/15", border: "border-[hsl(var(--danger))]/20" },
  }[tone];
  return (
    <div className={cn("rounded-2xl border px-4 py-3 text-center", colors.bg, colors.border)}>
      <p className={cn("font-display text-2xl font-semibold", colors.text)}>{value}</p>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{label}</p>
    </div>
  );
}

function CCPCard({ name, value, unit, range, status, tone }:
  { name: string; value: string; unit: string; range: string; status: string; tone: Tone }) {
  const accentColor = tone === "success" ? C.green : tone === "warning" ? C.amber : C.red;
  const w = tone === "success" ? "78%" : tone === "warning" ? "42%" : "18%";
  return (
    <div className="rounded-2xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      style={{ borderTopColor: accentColor, borderTopWidth: 2 }}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{name}</p>
        <span className="inline-block h-2.5 w-2.5 rounded-full animate-pulse-dot" style={{ background: accentColor }} />
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">
        {value}<span className="ml-1 text-base text-[hsl(var(--muted-foreground))]">{unit}</span>
      </p>
      <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Range {range}</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[hsl(var(--muted))]">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: w, background: accentColor }} />
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
        <span style={{ color: accentColor }}>{status}</span>
        <span className="text-[hsl(var(--muted-foreground))]">2 min ago</span>
      </div>
    </div>
  );
}

function CCPDashboard() {
  return (
    <div className="rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-6 shadow-vera">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: C.green }}>
            <span className="inline-block h-2 w-2 rounded-full animate-pulse-dot" style={{ background: C.green }} /> Live system
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">Critical Control Point Dashboard</h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Auto-refreshing · updated 14 seconds ago</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <HealthStatCard value="12" label="Within range" tone="success" />
          <HealthStatCard value="1" label="Watch" tone="warning" />
          <HealthStatCard value="0" label="Critical" tone="danger" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <CCPCard name="Cold Storage 01" value="3.8" unit="°C" range="0–5°C" status="Within range" tone="success" />
        <CCPCard name="Pasteurization" value="74.2" unit="°C" range="≥72°C" status="Within range" tone="success" />
        <CCPCard name="Receiving Dock" value="9.4" unit="°C" range="0–7°C" status="Watch" tone="warning" />
      </div>

      {/* Two charts side by side */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[hsl(var(--border))] dark:border-white/8 bg-[hsl(var(--muted))]/30 dark:bg-white/3 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">30-day CCP trend</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: C.green }}>+18% in-range</p>
          </div>
          <div className="h-36">
            <ResponsiveContainer>
              <AreaChart data={ccpTrend} margin={{ top: 4, right: 6, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ccpAreaGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={C.teal} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={C.teal} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(30,58,95,.06)" strokeDasharray="3 6" vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontFamily: "DM Sans, sans-serif" }} />
                <Area type="monotone" dataKey="v" name="CCP Score" stroke={C.teal} strokeWidth={2.5} fill="url(#ccpAreaGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Pie chart of CCP status */}
        <div className="rounded-2xl border border-[hsl(var(--border))] dark:border-white/8 bg-[hsl(var(--muted))]/30 dark:bg-white/3 p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3">Status breakdown</p>
          <div className="h-36 flex items-center">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} cx="40%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontFamily: "DM Sans, sans-serif" }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontFamily: "DM Sans, sans-serif" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeviationDashboard() {
  const items: Array<[Tone, string, string, string, string]> = [
    ["danger", "Receiving Dock temperature breach", "Raw milk delivery registered above accepted receiving limit. Corrective action required.", "Now", "Critical"],
    ["warning", "Sanitation verification pending", "Line 2 supervisor sign-off is 18 minutes overdue.", "18m", "Watch"],
    ["success", "Cold room fluctuation resolved", "Automated alert closed after two stable readings within safe range.", "1h", "Resolved"],
  ];
  const toneColor = (t: Tone) => t === "danger" ? C.red : t === "warning" ? C.amber : C.green;
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-6 shadow-vera">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-[hsl(var(--navy-950))] dark:text-white">Deviation response trend</p>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">Open issues by severity and response speed.</p>
        {/* Composed chart: area + bar */}
        <div className="mt-6 h-48">
          <ResponsiveContainer>
            <ComposedChart data={ccpTrend} margin={{ top: 4, right: 6, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="devGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={C.blue} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={C.blue} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(30,58,95,.06)" vertical={false} />
              <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontFamily: "DM Sans, sans-serif" }} />
              <Area type="monotone" dataKey="v" name="Score" stroke={C.blue} strokeWidth={2} fill="url(#devGrad)" />
              <Bar dataKey="d" name="Deviations" fill={C.red} radius={[4, 4, 0, 0]} opacity={0.75} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <HealthStatCard value="68%" label="Faster response" tone="success" />
          <HealthStatCard value="03" label="Open" tone="warning" />
          <HealthStatCard value="01" label="Critical" tone="danger" />
        </div>
      </div>

      <div className="rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-6 shadow-vera">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-[hsl(var(--navy-950))] dark:text-white">Alert timeline</p>
        <ul className="mt-5 space-y-4">
          {items.map(([t, title, body, time, badge]) => (
            <li key={title} className="flex gap-4 rounded-2xl border p-4 transition hover:-translate-y-0.5"
              style={{
                borderColor: `${toneColor(t)}28`,
                background: `${toneColor(t)}08`,
              }}>
              <span className="mt-1.5 inline-block h-2.5 w-2.5 flex-none rounded-full animate-pulse-dot" style={{ background: toneColor(t) }} />
              <div className="flex-1">
                <p className="text-sm font-extrabold text-[hsl(var(--navy-950))] dark:text-white">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">{body}</p>
              </div>
              <div className="flex-none text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{time}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: toneColor(t) }}>{badge}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SupplierDashboard() {
  const suppliers: Array<[string, string, number, string]> = [
    ["Kivu Dairy Co.", "Dairy", 94, "Preferred"],
    ["Akagera Produce", "Fresh produce", 88, "Approved"],
    ["Virunga Cold Chain", "Logistics", 76, "Review"],
    ["Nyungwe Grains", "Dry goods", 91, "Preferred"],
  ];
  const scoreColor = (s: number) => s >= 90 ? C.green : s >= 80 ? C.blue : C.amber;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-6 shadow-vera">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-[hsl(var(--navy-950))] dark:text-white">Supplier risk index</p>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Weighted score: receiving temperature, document completeness, rejection rate, corrective-action closure.</p>
        {/* Line chart for supplier trend */}
        <div className="mt-6 h-52">
          <ResponsiveContainer>
            <LineChart data={ccpTrend} margin={{ top: 4, right: 6, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="supLine" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor={C.green} />
                  <stop offset="100%" stopColor={C.teal} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(30,58,95,.07)" vertical={false} />
              <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis domain={[80, 100]} tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontFamily: "DM Sans, sans-serif" }} />
              <Line type="monotone" dataKey="v" name="Avg Score" stroke="url(#supLine)" strokeWidth={2.5} dot={{ r: 3, fill: C.teal }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-3 content-start">
        {suppliers.map(([name, cat, score, tier]) => (
          <div key={name} className="rounded-2xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md group"
            style={{ borderLeftColor: scoreColor(score), borderLeftWidth: 3 }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-base font-extrabold text-[hsl(var(--navy-950))] dark:text-white">{name}</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{cat}</p>
              </div>
              <p className="font-display text-3xl font-semibold" style={{ color: scoreColor(score) }}>{score}</p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[hsl(var(--muted))]">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, background: scoreColor(score) }} />
            </div>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: scoreColor(score) }}>{tier}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsDashboard() {
  const reports: Array<[string, string, string, string]> = [
    ["PDF", "HACCP Audit Report", "Full CCP audit log with corrective actions, sign-offs, and compliance ratings.", C.blue],
    ["DASH", "Monthly CCP Summary", "Trend analysis across control points, deviation frequency, and response times.", C.teal],
    ["LOG", "Real-Time Hygiene Log", "Timestamped sanitation records replacing paper logs and manual sign-offs.", C.green],
    ["ISO", "ISO 22000 Gap Analysis", "Clause-by-clause readiness report with remediation priorities.", C.violet],
    ["REP", "Supplier Scorecard", "Quarterly supplier performance and corrective-action status.", C.amber],
    ["API", "Custom Dashboard Export", "Structured data export for management reporting or ERP connection.", C.red],
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map(([badge, title, body, color]) => (
        <article key={title} className="group rounded-3xl bg-white dark:bg-[hsl(var(--card))] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-vera overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-0.5" />
          <span className="inline-flex rounded-lg px-2.5 py-1 text-[10px] font-black tracking-[0.22em] text-white"
            style={{ background: color }}>
            {badge}
          </span>
          <p className="mt-4 font-display text-base font-extrabold text-[hsl(var(--navy-950))] dark:text-white text-balance">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{body}</p>
          <button onClick={() => scrollToId("contact")}
            className="mt-5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] transition"
            style={{ color }}>
            View artifact <ArrowRight className="h-3 w-3" />
          </button>
        </article>
      ))}
    </div>
  );
}

/* ── Testimonials ── */
function Testimonials({ copy }: { copy: SiteCopy }) {
  const outcomeItems = copy.outcomes.items.map((item, index) => ({
    ...testimonials[index],
    ...item,
  }));
  return (
    <section className="relative bg-white dark:bg-[hsl(var(--background))] py-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          centered
          eyebrow={copy.outcomes.eyebrow}
          title={copy.outcomes.title}
          body={copy.outcomes.body}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {outcomeItems.map((t, i) => (
            <div key={t.name} data-reveal className={cn("relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-7 shadow-vera transition hover:-translate-y-1 hover:shadow-glow", `reveal-delay-${i + 1}`)}>
              <div className="absolute -right-3 -top-3 font-display text-9xl font-black text-[hsl(var(--blue-100))] dark:text-white/5 leading-none select-none">"</div>
              <div className="relative">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5" style={{ fill: t.accent, color: t.accent }} />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-[hsl(var(--navy-900))] dark:text-white/85 italic">{t.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full text-white text-xs font-bold"
                    style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent}aa)` }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[hsl(var(--navy-950))] dark:text-white">{t.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Insights ── */
function Insights({ copy }: { copy: SiteCopy }) {
  const insightItems = copy.insights.items.map((item, index) => ({
    ...insights[index],
    ...item,
  }));
  const [feature, ...rows] = insightItems;
  return (
    <section id="insights" className="bg-[hsl(var(--muted))]/30 dark:bg-[hsl(var(--muted))]/15 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <SectionHeader eyebrow={copy.insights.eyebrow} title={copy.insights.title} body={copy.insights.body} />
          <a href="#" className="hidden text-sm font-semibold text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))] hover:underline md:inline story-link">All articles →</a>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <InsightFeatured item={feature} />
          <div className="space-y-5 lg:col-span-5">
            {rows.map(it => <InsightRow key={it.title} item={it} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightFeatured({ item }: { item: typeof insights[number] }) {
  return (
    <a href="#" data-reveal className="group relative col-span-12 overflow-hidden rounded-3xl lg:col-span-7">
      <div className="relative h-[520px] w-full overflow-hidden rounded-3xl">
        <img src={item.image} alt="" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-950))]/92 via-[hsl(var(--navy-950))]/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-8 transition-transform duration-500 group-hover:translate-y-0">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white backdrop-blur"
            style={{ background: `${C.teal}88`, border: `1px solid ${C.teal}66` }}>{item.tag}</span>
          <h3 className="mt-4 font-display text-balance text-3xl font-semibold leading-tight text-white md:text-4xl">{item.title}</h3>
          <div className="mt-4 flex items-center gap-3 text-sm text-white/80">
            <span>{item.read}</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span className="inline-flex items-center gap-1" style={{ color: C.tealLt }}>
              Read story <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function InsightRow({ item }: { item: typeof insights[number] }) {
  return (
    <a href="#" data-reveal className="group relative flex items-stretch gap-5 overflow-hidden rounded-2xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-3 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[hsl(var(--blue-400))] dark:hover:border-white/20 hover:shadow-vera">
      <div className="relative h-28 w-32 shrink-0 overflow-hidden rounded-xl">
        <img src={item.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>
      <div className="flex flex-1 flex-col justify-center pr-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: C.teal }}>{item.tag}</span>
        <h4 className="mt-1 text-balance text-base font-semibold leading-snug text-[hsl(var(--navy-950))] dark:text-white transition-colors group-hover:text-[hsl(var(--blue-700))] dark:group-hover:text-[hsl(var(--blue-300))]">{item.title}</h4>
        <span className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{item.read}</span>
      </div>
    </a>
  );
}

/* ── Why Vera ── */
function WhyVera({ copy }: { copy: SiteCopy }) {
  const whyItems = copy.why.cards.map((item, index) => ({
    ...whyCards[index],
    ...item,
  }));
  return (
    <section id="why" className="relative bg-white dark:bg-[hsl(var(--background))] py-28">
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          centered
          eyebrow={copy.why.eyebrow}
          title={copy.why.title}
          body={copy.why.body}
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyItems.map((c, i) => {
            const Icon = c.icon;
            return (
              <article key={c.title} data-reveal
                className={cn("glass-card hover-lift group relative overflow-hidden rounded-3xl p-6 dark:border-white/8", `reveal-delay-${(i % 4) + 1}`)}>
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-opacity"
                  style={{ background: c.accent }} />
                <div className="relative">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl text-white shadow-md"
                    style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent}cc)` }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-[11px] font-mono font-bold tracking-[0.22em]" style={{ color: c.accent }}>0{i + 1}</p>
                  <h3 className="mt-2 font-display text-base font-extrabold text-[hsl(var(--navy-950))] dark:text-white text-balance">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{c.body}</p>
                  <div className="mt-5 h-0.5 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ width: "2rem", background: c.accent }} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ── */
function CTABanner({ copy }: { copy: SiteCopy }) {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--navy-950))] py-20 text-white dark:bg-[#061225]">
      <div className="aurora opacity-35 dark:opacity-15" />
      <div className="absolute inset-0 grid-bg opacity-10 dark:opacity-8" />
      <div className="relative mx-auto max-w-5xl px-6 text-center" data-reveal>
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/50">{copy.cta.eyebrow}</p>
        <h2 className="mt-5 font-display text-4xl font-semibold text-white text-balance md:text-5xl">
          {copy.cta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65">
          {copy.cta.body}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => scrollToId("contact")}
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#0d1f3c] dark:text-[#0d1f3c] transition hover:bg-[hsl(var(--blue-100))] dark:hover:bg-[hsl(var(--blue-100))] active:scale-95">
            {copy.actions.bookConsultation}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
          <button onClick={() => scrollToId("platform")}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-95">
            <PlayCircle className="h-4 w-4" />
            {copy.actions.explorePlatform}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact({ copy }: { copy: SiteCopy }) {
  return (
    <section id="contact" className="relative overflow-hidden bg-[hsl(var(--muted))]/30 dark:bg-[hsl(var(--background))] py-28">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/55 dark:bg-[hsl(var(--teal))]/6 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center" data-reveal>
          <SectionHeader
            centered
            eyebrow={copy.contact.eyebrow}
            title={copy.contact.title}
            body={copy.contact.body}
          />
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-8 shadow-vera" data-reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: C.teal }}>{copy.contact.talk}</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">{copy.contact.cardTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              {copy.contact.cardBody}
            </p>
            <div className="mt-6 mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{ background: `${C.green}18`, border: `1px solid ${C.green}30` }}>
              <span className="h-2 w-2 rounded-full animate-pulse-dot" style={{ background: C.green }} />
              <span className="text-xs font-semibold" style={{ color: C.green }}>{copy.contact.response}</span>
            </div>
            <div className="space-y-3">
              {[
                { icon: <Mail className="h-4 w-4" />, text: "hello@verasystems.rw" },
                { icon: <Phone className="h-4 w-4" />, text: "+250 788 000 000" },
                { icon: <MapPin className="h-4 w-4" />, text: "Kigali, Rwanda" },
                { icon: <Clock className="h-4 w-4" />, text: "Mon–Fri · 08:00–18:00 CAT" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--border))] dark:border-white/8 bg-[hsl(var(--muted))]/50 dark:bg-white/3 px-4 py-3 transition hover:-translate-y-0.5 hover:border-[hsl(var(--blue-300))] dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/6">
                  <span className="grid h-9 w-9 place-items-center rounded-full text-white"
                    style={{ background: `${C.blue}22`, color: C.blue }}>
                    {icon}
                  </span>
                  <span className="text-sm font-semibold text-[hsl(var(--navy-950))]/80 dark:text-white/80">{text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-[hsl(var(--border))] dark:border-white/8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3">{copy.contact.trusted}</p>
              <div className="flex flex-wrap gap-2">
                {["Rwanda", "Uganda", "Kenya", "Tanzania"].map(c => (
                  <span key={c} className="rounded-full border border-[hsl(var(--border))] dark:border-white/10 bg-[hsl(var(--muted))]/50 dark:bg-white/5 px-3 py-1 text-[11px] font-semibold text-[hsl(var(--navy-900))] dark:text-white/80">{c}</span>
                ))}
              </div>
            </div>
          </div>
          <ContactForm copy={copy} />
        </div>
      </div>
    </section>
  );
}

function ContactForm({ copy }: { copy: SiteCopy }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading"); setMessage("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({ ok: res.ok }));
      if (!res.ok || result.ok === false) throw new Error(result.message || "Could not send message.");
      setStatus("success");
      setMessage(copy.contact.success);
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : copy.contact.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} data-reveal className="rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-8 shadow-vera">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: C.blue }}>{copy.contact.formEyebrow}</p>
      <h3 className="mt-2 font-display text-xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">{copy.contact.formTitle}</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <FormField label={copy.contact.fields.name} name="name" placeholder={copy.contact.placeholders.name} required />
        <FormField label={copy.contact.fields.company} name="company" placeholder={copy.contact.placeholders.company} required />
        <FormField label={copy.contact.fields.email} name="email" placeholder={copy.contact.placeholders.email} type="email" required />
        <FormField label={copy.contact.fields.phone} name="phone" placeholder={copy.contact.placeholders.phone} type="tel" />
        <div className="sm:col-span-2">
          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{copy.contact.fields.interest}</label>
          <select name="interest" className="w-full rounded-2xl border border-[hsl(var(--border))] dark:border-white/10 bg-[hsl(var(--muted))]/30 dark:bg-white/5 px-4 py-4 text-sm text-[hsl(var(--foreground))] outline-none transition focus:border-[hsl(var(--blue-400))] focus:bg-white dark:focus:bg-white/8">
            {["consultancy", "platform", "demo", "both"].map((value, index) => (
              <option key={value} value={value}>{copy.contact.interests[index]}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{copy.contact.fields.message}</label>
          <textarea name="message" rows={4} placeholder={copy.contact.placeholders.message}
            className="w-full resize-none rounded-2xl border border-[hsl(var(--border))] dark:border-white/10 bg-[hsl(var(--muted))]/30 dark:bg-white/5 px-4 py-4 text-sm text-[hsl(var(--foreground))] outline-none transition placeholder:text-[hsl(var(--muted-foreground))]/50 focus:border-[hsl(var(--blue-400))] focus:bg-white dark:focus:bg-white/8" />
        </div>
      </div>
      <button type="submit" disabled={status === "loading"}
        className="mt-6 w-full rounded-xl bg-[hsl(var(--navy-950))] dark:bg-[hsl(var(--blue-500))] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[hsl(var(--blue-700))] disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99]">
        {status === "loading" ? copy.actions.sending : copy.actions.sendMessage}
      </button>
      {message && (
        <p className={cn("mt-4 rounded-2xl border px-4 py-3 text-sm",
          status === "success" ? "border-[hsl(var(--success))]/30 bg-[hsl(var(--success-light))]/30 text-[hsl(var(--success))]" : "border-[hsl(var(--danger))]/30 bg-[hsl(var(--danger-light))]/30 text-[hsl(var(--danger))]")}>
          {message}
        </p>
      )}
    </form>
  );
}

function FormField({ label, name, placeholder, type = "text", required = false }:
  { label: string; name: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder}
        className="w-full rounded-2xl border border-[hsl(var(--border))] dark:border-white/10 bg-[hsl(var(--muted))]/30 dark:bg-white/5 px-4 py-4 text-sm text-[hsl(var(--foreground))] outline-none transition placeholder:text-[hsl(var(--muted-foreground))]/50 focus:border-[hsl(var(--blue-400))] focus:bg-white dark:focus:bg-white/8" />
    </div>
  );
}

/* ── Footer ── */
function Footer({ copy }: { copy: SiteCopy }) {
  return (
    <footer className="border-t border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--muted))]/20 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
          <div className="max-w-xs">
            <Logo subtitle={copy.logoSubtitle} />
            <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              {copy.footer.summary}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {copy.footer.columns.map(col => (
              <div key={col.heading}>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: C.teal }}>{col.heading}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" className="story-link text-sm text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--navy-950))] dark:hover:text-white">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[hsl(var(--border))] dark:border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">{copy.footer.copyright}</p>
          <div className="flex gap-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
            <a href="#" className="story-link hover:text-[hsl(var(--navy-950))] dark:hover:text-white">LinkedIn</a>
            <a href="#" className="story-link hover:text-[hsl(var(--navy-950))] dark:hover:text-white">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ── */
export default function Page() {
  const progress = useScrollProgress();
  const { dark, toggle } = useDarkMode();
  const { language, setLanguage, copy } = useLanguage();
  useRevealOnScroll();

  return (
    <main className="relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-0.5">
        <div className="h-full transition-[width] duration-150"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${C.teal}, ${C.blue}, ${C.violet})`,
          }} />
      </div>

      <Navbar dark={dark} toggleDark={toggle} language={language} onLanguageChange={setLanguage} copy={copy} />
      <Hero copy={copy} />
      <ClientTypes copy={copy} />
      <About copy={copy} />
      <Services copy={copy} />
      <StackExperience copy={copy} />
      <PlatformDemo copy={copy} />
      <Testimonials copy={copy} />
      <Insights copy={copy} />
      <WhyVera copy={copy} />
      <CTABanner copy={copy} />
      <Contact copy={copy} />
      <Footer copy={copy} />
    </main>
  );
}