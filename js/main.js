// ===== Helpers =====
const root = document.documentElement;

function setStored(key, value) {
    try { localStorage.setItem(key, value); } catch {}
}
function getStored(key) {
    try { return localStorage.getItem(key); } catch { return null; }
}

// ===== Footer year =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Page open animation =====
function markPageLoaded() {
    document.body.classList.add("page-loaded");
}
document.addEventListener("DOMContentLoaded", markPageLoaded);
window.addEventListener("load", markPageLoaded);

// ===== Theme (dark/light) =====
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    setStored("theme", theme);

    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
        themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
        themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    }
}

const savedTheme = getStored("theme");
const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
setTheme(initialTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || initialTheme;
        setTheme(current === "dark" ? "light" : "dark");
    });
}

if (!savedTheme && window.matchMedia) {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onThemeChange = (event) => {
        setTheme(event.matches ? "dark" : "light");
    };

    if (media.addEventListener) media.addEventListener("change", onThemeChange);
    else if (media.addListener) media.addListener(onThemeChange);
}

// ===== i18n (EN/FR) =====
const langToggle = document.getElementById("langToggle");

// EN is default (as requested)
const translations = {
    en: {
        "a11y.skip": "Skip to content",
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
        "hero.cta.cv": "Download CV",
        "hero.tag.backend": "Backend",
        "hero.tag.ml": "Data/ML",
        "hero.tag.cyber": "Cybersecurity",
        "hero.tag.net": "Networking",

        "about.title": "About",
        // 👇 Keep as HTML if you want paragraphs & bullets
        "about.p1":
            "I’m a Computer Science student at the University of Ottawa specializing in backend development, systems programming, networking, and applied machine learning. I enjoy breaking down complex technical problems, building reliable systems, and understanding how software and networks behave under real-world constraints.<br><br>" +
            "My experience spans Linux systems, backend engineering (Java/C++/Python), database design, network protocols (TCP/IP, DNS, DHCP, VLANs), packet analysis, and basic cybersecurity tooling (Suricata, Wireshark, pfSense, Splunk). I’ve built projects in C++, Java, Go, SQL, and Python, including recommender systems, reservation platforms, and secure Android applications.<br><br>" +
            "Alongside my studies, I work as a Technical Assistant at the Adapted Exams Centre, where I diagnose and resolve OS, networking, and configuration issues across 100+ workstations. This role has strengthened my debugging ability, problem-solving skills, and confidence in analyzing systems under pressure.<br><br>" +
            "I am actively seeking Winter 2026 internships in:<br>• Software Engineering / Backend<br>• Network Engineering / Infrastructure<br>• Cybersecurity (SOC, Blue Team, Security Engineering)<br>• Data / Machine Learning",

        "process.title": "How I Work",
        "process.s1.title": "Understand",
        "process.s1.desc": "Clarify goals, users, constraints, and success criteria.",
        "process.s2.title": "Design",
        "process.s2.desc": "Sketch structure, define UI flow, and plan data/models if needed.",
        "process.s3.title": "Build",
        "process.s3.desc": "Implement in small, testable components with clean code.",
        "process.s4.title": "Validate",
        "process.s4.desc": "Test edge cases, responsiveness, performance, and accessibility.",
        "process.s5.title": "Iterate",
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

        "case.movie.ui.soon": "Screenshots will be added soon.",
        "case.movie.ui.ph1": "Dataset / preprocessing (coming soon)",
        "case.movie.ui.ph2": "Similarity / ranking results (coming soon)",

        "contact.title": "Contact",
        "contact.lead": "Want to collaborate or discuss an internship? Send me a message.",
        "contact.emailLabel": "Email:",
        "contact.phoneLabel": "Phone:",
        "contact.phoneValue": "On demand",
        "contact.githubNote": "",
        "contact.noteTitle": "Quick note",


        "case.ui.title": "Screenshots / Demo",
        "case.ui.note": "Screenshots and a short demo walkthrough will be added soon.",
        "case.summary.ctaRepo": "View code (soon)",


        "contact.noteBody":
            "This portfolio is built for SEG3525 and will evolve into a long-term professional site with detailed case studies, screenshots, and design rationale."
    },


    fr: {
        "a11y.skip": "Aller au contenu",
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
        "hero.cta.cv": "Télécharger le CV",
        "hero.tag.backend": "Backend",
        "hero.tag.ml": "Data/ML",
        "hero.tag.cyber": "Cybersécurité",
        "hero.tag.net": "Réseaux",

        "about.title": "À propos",
        "about.p1":
            "Je suis étudiant en informatique à l’Université d’Ottawa, spécialisé en développement backend, programmation système, réseaux et apprentissage automatique appliqué. J’aime décomposer des problèmes techniques complexes, construire des systèmes fiables et comprendre comment les logiciels et les réseaux se comportent sous des contraintes réelles.<br><br>" +
            "Mon expérience couvre les systèmes Linux, l’ingénierie backend (Java/C++/Python), la conception de bases de données, les protocoles réseau (TCP/IP, DNS, DHCP, VLAN), l’analyse de paquets et des outils de cybersécurité de base (Suricata, Wireshark, pfSense, Splunk). J’ai réalisé des projets en C++, Java, Go, SQL et Python, notamment des systèmes de recommandation, des plateformes de réservation et des applications Android sécurisées.<br><br>" +
            "En parallèle de mes études, je travaille comme assistant technique au Adapted Exams Centre, où je diagnostique et résous des problèmes liés au système d’exploitation, au réseau et aux configurations sur plus de 100 postes de travail. Ce poste a renforcé mes capacités de débogage, mes compétences en résolution de problèmes et ma confiance dans l’analyse de systèmes sous pression.<br><br>" +
            "Je recherche activement des stages pour l’hiver 2026 dans :<br>• Génie logiciel / Backend<br>• Ingénierie réseau / Infrastructure<br>• Cybersécurité (SOC, Blue Team, ingénierie sécurité)<br>• Données / Apprentissage automatique",

        "process.title": "Ma méthode",
        "process.s1.title": "Comprendre",
        "process.s1.desc": "Clarifier objectifs, utilisateurs, contraintes et critères de réussite.",
        "process.s2.title": "Concevoir",
        "process.s2.desc": "Esquisser la structure, définir le flow UI, et planifier les données/modèles si nécessaire.",
        "process.s3.title": "Construire",
        "process.s3.desc": "Implémenter par petites étapes testables, avec du code propre et modulaire.",
        "process.s4.title": "Valider",
        "process.s4.desc": "Tester les cas limites, le responsive, la performance et l’accessibilité.",
        "process.s5.title": "Améliorer",
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

        "case.ui.title": "Captures / Démo",
        "case.ui.note": "Des captures et une courte démo seront ajoutées bientôt.",
        "case.summary.ctaRepo": "Voir le code (bientôt)",

        "case.movie.ui.soon": "Des captures seront ajoutées bientôt.",
        "case.movie.ui.ph1": "Dataset / prétraitement (à ajouter bientôt)",
        "case.movie.ui.ph2": "Similarité / résultats de ranking (à ajouter bientôt)",

        "contact.lead": "Tu veux collaborer ou discuter d’un stage ? Envoie-moi un message.",
        "contact.emailLabel": "Email :",
        "contact.phoneLabel": "Téléphone :",
        "contact.phoneValue": "Sur demande",
        "contact.githubNote": "",
        "contact.noteTitle": "Note rapide",
        "contact.noteBody":
            "Ce portfolio est réalisé pour SEG3525 et deviendra un site professionnel long terme (études de cas détaillées, captures, justification de design)."
    }
};

function applyLang(lang) {
    root.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        const value = translations[lang]?.[key];
        if (!value) return;

        // Allow safe HTML only if explicitly enabled on the element
        const allowHTML = el.getAttribute("data-i18n-html") === "true";
        if (allowHTML) el.innerHTML = value;
        else el.textContent = value;
    });

    setStored("lang", lang);
    if (langToggle) {
        langToggle.textContent = lang === "fr" ? "EN" : "FR";
        langToggle.setAttribute("aria-label", lang === "fr" ? "Switch language to English" : "Passer la langue en francais");
    }
}

const allI18nKeysAreMapped = [...document.querySelectorAll("[data-i18n]")]
    .every((el) => {
        const key = el.getAttribute("data-i18n");
        return Boolean(translations.en[key] && translations.fr[key]);
    });

if (!allI18nKeysAreMapped && langToggle) {
    langToggle.hidden = true;
}

const savedLang = getStored("lang");
const initialLang = allI18nKeysAreMapped && savedLang ? savedLang : "en";
applyLang(initialLang);

if (langToggle && allI18nKeysAreMapped) {
    langToggle.addEventListener("click", () => {
        const current = getStored("lang") || "en";
        applyLang(current === "fr" ? "en" : "fr");
    });
}

// ===== Scroll Reveal (IntersectionObserver) =====
(function initScrollReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
        els.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("is-visible");
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

    els.forEach(el => obs.observe(el));
})();

// ===== Collapse mobile nav after selection =====
(function initMobileNavClose() {
    const nav = document.getElementById("nav");
    if (!nav || !window.bootstrap?.Collapse) return;

    const collapse = new window.bootstrap.Collapse(nav, { toggle: false });
    nav.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 992) collapse.hide();
        });
    });
})();

// ===== Intro animation (first visit) =====
(function initIntro() {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const intro = document.getElementById("intro");
    if (!intro) return;

    const seen = getStored("introSeen");
    if (seen === "1") return;

    // Activate intro + blur site
    document.body.classList.add("is-intro");
    intro.classList.add("is-active");

    const endIntro = () => {
        intro.classList.remove("is-active");
        document.body.classList.remove("is-intro");
        setStored("introSeen", "1");
    };

    // Auto end after ~1.8s
    const t = setTimeout(endIntro, 2800);

    // Allow skip
    intro.addEventListener("click", () => {
        clearTimeout(t);
        endIntro();
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            clearTimeout(t);
            endIntro();
        }
    }, { once: true });
})();

// ===== Navbar micro-behavior on scroll =====
(function navScrollFX(){
    const nav = document.querySelector(".navbar");
    if (!nav) return;

    const onScroll = () => {
        if (window.scrollY > 10) nav.classList.add("is-scrolled");
        else nav.classList.remove("is-scrolled");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
})();
