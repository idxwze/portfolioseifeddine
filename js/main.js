// ===== Footer year =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Theme (dark/light) =====
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "light";
        setTheme(current === "dark" ? "light" : "dark");
    });
}

// ===== i18n (EN/FR) =====
const langToggle = document.getElementById("langToggle");

// EN is default (as requested)
const translations = {
    en: {
        "brand.name": "Seifeddine",

        "nav.about": "About",
        "nav.process": "How I Work",
        "nav.projects": "Projects",
        "nav.experience": "Experience",
        "nav.contact": "Contact",

        "hero.kicker": "Computer Science • Systems • Web",
        "hero.name": "Seifeddine Reguige",
        "hero.subtitle":
            "Computer Science student focused on building reliable, clean web and systems solutions — from backend logic and databases to troubleshooting and performance debugging.",
        "hero.cta.projects": "View Projects",
        "hero.cta.contact": "Contact",
        "hero.tag.backend": "Backend",
        "hero.tag.ml": "Data/ML",
        "hero.tag.cyber": "Cybersecurity",
        "hero.tag.net": "Networking",

        "about.title": "About",
        "about.p1":
            "I’m a Computer Science student at the University of Ottawa, focused on backend and systems work: Linux troubleshooting, database engineering, and building maintainable web solutions.",
        "about.p2":
            "I enjoy debugging complex issues using logs, system metrics, and structured workflows — then turning fixes into clean documentation and repeatable processes.",

        "process.title": "How I Work",
        "process.s1.title": "1) Understand",
        "process.s1.desc": "Clarify goals, users, constraints, and success criteria.",
        "process.s2.title": "2) Design",
        "process.s2.desc": "Sketch structure, define UI flow, and plan data/models if needed.",
        "process.s3.title": "3) Build",
        "process.s3.desc": "Implement in small, testable components with clean code.",
        "process.s4.title": "4) Validate",
        "process.s4.desc": "Test edge cases, responsiveness, performance, and accessibility.",
        "process.s5.title": "5) Iterate",
        "process.s5.desc": "Refine based on feedback, document decisions, and polish.",

        "projects.title": "Projects",
        "projects.subtitle": "4 case studies",
        "projects.p1.title": "Movie Recommendation System",
        "projects.p1.desc":
            "Built data-processing pipelines, implemented similarity algorithms, and handled large dataset parsing across multi-language components.",
        "projects.p2.title": "e-Hotels Reservation Platform",
        "projects.p2.desc":
            "Engineered a multi-hotel backend with normalized schemas, SQL triggers, indexing strategies, secure transactions, and end-to-end reservation logic.",
        "projects.p3.title": "Secure PC Service App (Android)",
        "projects.p3.desc":
            "Designed schemas and CRUD workflows, implemented validation and UI/data integration backed by a local database engine.",
        "projects.p4.title": "C++ Card Game",
        "projects.p4.desc":
            "Built a C++ object-oriented card game using core OOP principles (classes, inheritance, polymorphism), with clean game logic, input handling, and structured design.",
        "projects.view": "View case study",

        "experience.title": "Experience",
        "experience.ta.title": "Technical Assistant — Adapted Exams Centre (uOttawa)",
        "experience.ta.meta": "Ottawa, ON • Sep 2025 – Apr 2026",
        "experience.ta.b1":
            "Diagnosed and resolved 95% of incidents across 100+ Linux/Windows workstations (OS crashes, driver faults, network stack issues, configuration errors).",
        "experience.ta.b2":
            "Performed low-level troubleshooting through logs, system metrics, process monitoring, and resource utilization analysis.",
        "experience.ta.b3":
            "Automated environment preparation and validation checks to ensure stability during high-load exam sessions.",
        "experience.ta.b4":
            "Maintained documented workflows, system procedures, and debug playbooks for operational reliability.",

        "experience.wa.title": "Web Administrator — Faculty of Health Sciences (uOttawa)",
        "experience.wa.meta": "Ottawa, ON • Oct 2024 – Apr 2025",
        "experience.wa.b1":
            "Used GA4/Siteimprove analytics to monitor user behavior, optimize traffic flow, and improve key engagement metrics by 15%.",
        "experience.wa.b2":
            "Cleaned and restructured data-driven pages, improving SEO consistency, content health, and accessibility compliance.",
        "experience.wa.b3":
            "Managed structured content updates, metadata, and user permissions within Drupal/WordPress environments.",

        "contact.title": "Contact",
        "contact.lead": "Want to collaborate or discuss an internship? Send me a message.",
        "contact.emailLabel": "Email:",
        "contact.phoneLabel": "Phone:",
        "contact.githubNote": "(replace with your real link)",
        "contact.noteTitle": "Quick note",
        "contact.noteBody":
            "This portfolio is built for SEG3525 and will evolve into a long-term professional site with detailed case studies, screenshots, and design rationale."
    },

    fr: {
        "brand.name": "Seifeddine",

        "nav.about": "À propos",
        "nav.process": "Ma méthode",
        "nav.projects": "Projets",
        "nav.experience": "Expérience",
        "nav.contact": "Contact",

        "hero.kicker": "Informatique • Systèmes • Web",
        "hero.name": "Seifeddine Reguige",
        "hero.subtitle":
            "Étudiant en informatique, orienté vers des solutions web et systèmes fiables — du backend et des bases de données jusqu’au diagnostic et à l’optimisation des performances.",
        "hero.cta.projects": "Voir les projets",
        "hero.cta.contact": "Me contacter",
        "hero.tag.backend": "Backend",
        "hero.tag.ml": "Data/ML",
        "hero.tag.cyber": "Cybersécurité",
        "hero.tag.net": "Réseaux",

        "about.title": "À propos",
        "about.p1":
            "Je suis étudiant en informatique à l’Université d’Ottawa, avec un focus sur le backend et les systèmes : troubleshooting Linux, ingénierie des bases de données et développement de solutions web maintenables.",
        "about.p2":
            "J’aime résoudre des problèmes complexes via les logs, les métriques système et une méthode structurée — puis transformer les correctifs en documentation claire et procédures reproductibles.",

        "process.title": "Ma méthode",
        "process.s1.title": "1) Comprendre",
        "process.s1.desc": "Clarifier objectifs, utilisateurs, contraintes et critères de réussite.",
        "process.s2.title": "2) Concevoir",
        "process.s2.desc": "Esquisser la structure, définir le flow UI, et planifier les données/modèles si nécessaire.",
        "process.s3.title": "3) Construire",
        "process.s3.desc": "Implémenter par petites étapes testables, avec du code propre et modulaire.",
        "process.s4.title": "4) Valider",
        "process.s4.desc": "Tester les cas limites, le responsive, la performance et l’accessibilité.",
        "process.s5.title": "5) Améliorer",
        "process.s5.desc": "Itérer, documenter les décisions, et polir le rendu final.",

        "projects.title": "Projets",
        "projects.subtitle": "4 études de cas",
        "projects.p1.title": "Système de recommandation de films",
        "projects.p1.desc":
            "Création de pipelines de traitement de données, implémentation d’algorithmes de similarité et gestion d’un dataset volumineux dans un projet multi-langage.",
        "projects.p2.title": "Plateforme de réservation e-Hotels",
        "projects.p2.desc":
            "Conception d’un backend multi-hôtels avec schémas normalisés, triggers SQL, indexation, transactions et logique complète de réservation.",
        "projects.p3.title": "Application Android (Service PC sécurisé)",
        "projects.p3.desc":
            "Conception de schémas et workflows CRUD, validation des entrées, et intégration UI/données avec une base locale.",
        "projects.p4.title": "Jeu de cartes en C++",
        "projects.p4.desc":
            "Développement d’un jeu de cartes en C++ orienté objet (classes, héritage, polymorphisme), avec une logique de jeu propre, gestion des entrées, et une conception structurée.",
        "projects.view": "Voir l’étude de cas",

        "experience.title": "Expérience",
        "experience.ta.title": "Assistant technique — Adapted Exams Centre (uOttawa)",
        "experience.ta.meta": "Ottawa, ON • Sep 2025 – Avr 2026",
        "experience.ta.b1":
            "Diagnostic et résolution de 95% des incidents sur 100+ postes Linux/Windows (crash OS, drivers, réseau, erreurs de configuration).",
        "experience.ta.b2":
            "Troubleshooting bas niveau via logs, métriques système, monitoring de processus et analyse d’utilisation des ressources.",
        "experience.ta.b3":
            "Automatisation de checks de préparation/validation pour assurer la stabilité pendant les sessions d’examens à forte charge.",
        "experience.ta.b4":
            "Maintien de procédures documentées, workflows et playbooks de debug pour la fiabilité opérationnelle.",

        "experience.wa.title": "Administrateur Web — Faculté des sciences de la santé (uOttawa)",
        "experience.wa.meta": "Ottawa, ON • Oct 2024 – Avr 2025",
        "experience.wa.b1":
            "Utilisation de GA4/Siteimprove pour analyser le comportement utilisateur, optimiser le trafic et améliorer des métriques d’engagement de 15%.",
        "experience.wa.b2":
            "Nettoyage et restructuration de pages data-driven : meilleure cohérence SEO, santé du contenu et conformité accessibilité.",
        "experience.wa.b3":
            "Gestion des mises à jour de contenu, métadonnées et permissions utilisateurs dans des environnements Drupal/WordPress.",

        "contact.title": "Contact",
        "contact.lead": "Tu veux collaborer ou discuter d’un stage ? Envoie-moi un message.",
        "contact.emailLabel": "Email :",
        "contact.phoneLabel": "Téléphone :",
        "contact.githubNote": "(remplace par ton vrai lien)",
        "contact.noteTitle": "Note rapide",
        "contact.noteBody":
            "Ce portfolio est réalisé pour SEG3525 et deviendra un site professionnel long terme (études de cas détaillées, captures, justification de design)."
    }
};

function applyLang(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        const value = translations[lang]?.[key];
        if (value) el.textContent = value;
    });

    localStorage.setItem("lang", lang);
    if (langToggle) langToggle.textContent = lang === "fr" ? "EN" : "FR";
}

// Default language = English
const savedLang = localStorage.getItem("lang") || "en";
applyLang(savedLang);

if (langToggle) {
    langToggle.addEventListener("click", () => {
        const current = localStorage.getItem("lang") || "en";
        applyLang(current === "fr" ? "en" : "fr");
    });
}