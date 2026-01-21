// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Theme (dark/light) ---
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme || "light");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "light";
        setTheme(current === "dark" ? "light" : "dark");
    });
}

// --- i18n (EN/FR) ---
const langToggle = document.getElementById("langToggle");

const translations = {
    en: {
        "nav.about": "About",
        "nav.process": "How I Work",
        "nav.projects": "Projects",
        "nav.experience": "Experience",
        "nav.contact": "Contact",
    },
    fr: {
        "nav.about": "À propos",
        "nav.process": "Ma méthode",
        "nav.projects": "Projets",
        "nav.experience": "Expérience",
        "nav.contact": "Contact",
    }
};

function applyLang(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    localStorage.setItem("lang", lang);
    if (langToggle) langToggle.textContent = lang === "fr" ? "EN" : "FR";
}

const savedLang = localStorage.getItem("lang");
applyLang(savedLang || "en");

if (langToggle) {
    langToggle.addEventListener("click", () => {
        const current = localStorage.getItem("lang") || "en";
        applyLang(current === "fr" ? "en" : "fr");
    });
}