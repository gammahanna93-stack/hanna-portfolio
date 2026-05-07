const defaultPortfolioData = window.PORTFOLIO_DATA || { categories: [] };
const STORAGE_KEY = "hannaPortfolioAdminState";

const defaultSiteContent = {
  brand: {
    initials: "HO",
    name: "Hanna Ostroverkh"
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" }
  ],
  hero: {
    eyebrow: "AI creative studio portfolio",
    name: "Hanna Ostroverkh",
    title: "AI Visual Content Specialist | Prompt Design | Canva",
    intro: "I create AI-generated visuals, prompt systems, social media concepts, branding moodboards, and digital aesthetic content for brands, creators, and online projects.",
    primaryCta: "View Portfolio",
    secondaryCta: "Contact Me",
    panelLines: ["Prompt Systems", "AI Visual Concepts", "Canva Content"],
    panelText: "Premium visuals for editorial brands, social media campaigns, beauty and fashion concepts, and elegant digital storytelling."
  },
  about: {
    eyebrow: "About",
    heading: "Strategic visual thinking meets AI direction.",
    paragraphs: [
      "Hanna combines an analytical background in economics, finance work in the NGO sector, and experience across communications and PR with a modern AI creative practice. Her work connects structured thinking with refined aesthetics, helping brands and creators translate ideas into clear, stylish visual systems.",
      "Today she focuses on AI content creation, prompt design, Canva workflows, social media visuals, and creative direction for digital projects that need to feel polished, international, and easy to use across platforms."
    ]
  },
  servicesSection: {
    eyebrow: "Services",
    heading: "Creative AI support for visual brands."
  },
  services: [
    { title: "AI Visual Content", description: "Premium AI-generated visuals for launches, social platforms, digital brands, fashion, beauty, and lifestyle communication.", icon: "image" },
    { title: "Prompt Design Systems", description: "Structured prompt systems that support consistent style, repeatable aesthetics, and scalable AI content creation.", icon: "spark" },
    { title: "Editorial Creative Direction", description: "Fashion-inspired and beauty-focused visual direction shaped through mood, lighting, composition, and storytelling.", icon: "compass" },
    { title: "Canva Presentations", description: "Elegant Canva decks, visual proposals, brand presentations, and content layouts for online communication.", icon: "layout" },
    { title: "Social Media Visual Concepts", description: "Instagram, Threads, Pinterest, and creator-ready visual concepts with a polished, recognizable brand mood.", icon: "grid" },
    { title: "Brand Moodboards", description: "Refined moodboards that define color, texture, references, styling direction, and digital aesthetic positioning.", icon: "palette" }
  ],
  directionsSection: {
    eyebrow: "Portfolio value",
    heading: "Selected Visual Directions",
    subtitle: "Concept-based AI portfolio projects designed to show aesthetic direction, prompt thinking, and scalable visual systems.",
    note: "Note: These are independent AI portfolio concepts created to demonstrate visual direction, prompt design, and content system thinking.",
    cta: "Discuss a Visual Project"
  },
  directions: [
    {
      title: "AI Visuals for Social Media",
      label: "AI-візуали для соцмереж",
      description: "AI-generated visual content for Instagram, Threads, Pinterest, launches, personal brands, fashion, beauty, and lifestyle projects. These concepts show how a brand can build a consistent, premium visual presence across platforms."
    },
    {
      title: "Prompt Systems for Scalable Content",
      label: "Prompt-системи для масштабованого контенту",
      description: "Structured prompt concepts that help create multiple visuals in one recognizable aesthetic. The focus is on consistency, repeatable style, brand mood, and scalable AI content workflows."
    },
    {
      title: "Editorial Concepts for Brands",
      label: "Editorial-концепти для брендів",
      description: "Fashion-inspired and beauty-focused AI editorials built around mood, composition, lighting, styling, and storytelling. These visuals demonstrate creative direction for campaigns, lookbooks, and premium brand communication."
    },
    {
      title: "Luxury Digital Storytelling",
      label: "Luxury digital storytelling",
      description: "Premium visual narratives that create atmosphere, emotion, and identity for digital brands and creators. The focus is not only on beautiful images, but on building a recognizable visual world."
    }
  ],
  portfolioSection: {
    eyebrow: "Portfolio",
    heading: "AI visuals organized by concept and aesthetic."
  },
  skillsSection: {
    eyebrow: "Skills",
    heading: "Tools and creative strengths."
  },
  skills: [
    "AI Content Creation",
    "Prompt Engineering",
    "Canva",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Branding",
    "Creative Direction",
    "Social Media Strategy",
    "Digital Aesthetics",
    "Visual Storytelling",
    "AI Visual Workflows",
    "Pinterest Marketing"
  ],
  contact: {
    eyebrow: "Contact",
    heading: "Let's create visuals with a premium digital presence.",
    email: "osthanna91@gmail.com",
    threadsLabel: "Threads",
    threadsUrl: "https://www.threads.com/@hanna__ostroverkh",
    linkedinLabel: "LinkedIn",
    linkedinUrl: "https://www.linkedin.com/in/hanna-ostroverkh-b8003a1a1/",
    formLabels: {
      name: "Name",
      email: "Email",
      projectType: "Project type",
      message: "Message",
      submit: "Send Inquiry"
    },
    projectTypes: [
      "AI visual content",
      "Prompt design",
      "Canva presentation",
      "Social media visuals",
      "Branding moodboard"
    ]
  },
  footer: {
    name: "Hanna Ostroverkh",
    tagline: "AI Visual Content Specialist | Prompt Design | Canva"
  }
};

let siteContent = structuredClone(defaultSiteContent);
let portfolioData = structuredClone(defaultPortfolioData);
let heroShowcaseIndex = 0;
let heroShowcaseTimer;

const iconPaths = {
  spark: '<path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z"/><path d="M5 17l.8 2.2L8 20l-2.2.8L5 23l-.8-2.2L2 20l2.2-.8L5 17z"/>',
  image: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15l3-3 3 3 2-2 3 3"/><circle cx="8" cy="9" r="1.5"/>',
  layout: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10"/>',
  grid: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
  palette: '<path d="M12 3a9 9 0 0 0 0 18h1.2a1.8 1.8 0 0 0 .7-3.5 1.5 1.5 0 0 1 .6-2.9H16a5 5 0 0 0 0-10.1A9.2 9.2 0 0 0 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="14" cy="7.5" r="1"/>',
  pin: '<path d="M12 21s7-5.1 7-11a7 7 0 0 0-14 0c0 5.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  diamond: '<path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M2 9h20M8 3l-2 6 6 12 6-12-2-6"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/>',
  flow: '<path d="M5 7h6M13 7h6M7 17h10"/><circle cx="4" cy="7" r="2"/><circle cx="12" cy="7" r="2"/><circle cx="20" cy="7" r="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>'
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] || iconPaths.spark}</svg>`;
}

function setText(selector, value) {
  const target = document.querySelector(selector);
  if (target) target.textContent = value;
}

function setHref(selector, value) {
  const target = document.querySelector(selector);
  if (target) target.href = value;
}

function loadAdminState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    portfolioData = normalizePortfolioData(portfolioData);
    return;
  }

  try {
    const parsed = JSON.parse(saved);
    if (parsed.siteContent) siteContent = parsed.siteContent;
    if (parsed.portfolioData) portfolioData = parsed.portfolioData;
    if (!siteContent.directionsSection) {
      siteContent.directionsSection = defaultSiteContent.directionsSection;
      siteContent.directions = defaultSiteContent.directions;
    }
    portfolioData = normalizePortfolioData(portfolioData);
    if (!siteContent.contact.threadsUrl) {
      siteContent.contact.threadsLabel = defaultSiteContent.contact.threadsLabel;
      siteContent.contact.threadsUrl = defaultSiteContent.contact.threadsUrl;
    }
    if (!siteContent.contact.linkedinUrl || siteContent.contact.linkedinUrl === "#") {
      siteContent.contact.linkedinUrl = defaultSiteContent.contact.linkedinUrl;
    }
  } catch (error) {
    console.warn("Saved admin data could not be loaded.", error);
  }
}

function saveAdminState() {
  portfolioData = normalizePortfolioData(portfolioData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ siteContent, portfolioData }));
}

function normalizePortfolioData(data) {
  const duplicateFiles = new Set([
    "promti_1777295376750.png"
  ]);

  return {
    ...data,
    categories: (data.categories || []).map((category) => ({
      ...category,
      projects: (category.projects || []).filter((project) => !duplicateFiles.has(project.fileName))
    }))
  };
}

function renderStaticContent() {
  setText("[data-brand-initials]", siteContent.brand.initials);
  setText("[data-brand-name]", siteContent.brand.name);

  const nav = document.querySelector("[data-nav]");
  nav.innerHTML = siteContent.nav.map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`).join("");

  setText("[data-hero-eyebrow]", siteContent.hero.eyebrow);
  setText("[data-hero-name]", siteContent.hero.name);
  setText("[data-hero-title]", siteContent.hero.title);
  setText("[data-hero-intro]", siteContent.hero.intro);
  setText("[data-hero-primary]", siteContent.hero.primaryCta);
  setText("[data-hero-secondary]", siteContent.hero.secondaryCta);
  setText("[data-hero-panel-text]", siteContent.hero.panelText);
  renderHeroShowcase();
  document.querySelector("[data-hero-panel-lines]").innerHTML = siteContent.hero.panelLines.map((line, index) => `
    <div class="panel-line">
      <span>${escapeHtml(line)}</span>
      <strong>${String(index + 1).padStart(2, "0")}</strong>
    </div>
  `).join("");

  setText("[data-about-eyebrow]", siteContent.about.eyebrow);
  setText("[data-about-heading]", siteContent.about.heading);
  document.querySelector("[data-about-copy]").innerHTML = siteContent.about.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");

  setText("[data-services-eyebrow]", siteContent.servicesSection.eyebrow);
  setText("[data-services-heading]", siteContent.servicesSection.heading);
  if (!siteContent.directionsSection) {
    siteContent.directionsSection = defaultSiteContent.directionsSection;
    siteContent.directions = defaultSiteContent.directions;
  }
  setText("[data-directions-eyebrow]", siteContent.directionsSection.eyebrow);
  setText("[data-directions-heading]", siteContent.directionsSection.heading);
  setText("[data-directions-subtitle]", siteContent.directionsSection.subtitle);
  setText("[data-directions-note]", siteContent.directionsSection.note);
  setText("[data-directions-cta]", siteContent.directionsSection.cta);
  setText("[data-portfolio-eyebrow]", siteContent.portfolioSection.eyebrow);
  setText("[data-portfolio-heading]", siteContent.portfolioSection.heading);
  setText("[data-skills-eyebrow]", siteContent.skillsSection.eyebrow);
  setText("[data-skills-heading]", siteContent.skillsSection.heading);

  setText("[data-contact-eyebrow]", siteContent.contact.eyebrow);
  setText("[data-contact-heading]", siteContent.contact.heading);
  setText("[data-contact-email]", siteContent.contact.email);
  setHref("[data-contact-email]", `mailto:${siteContent.contact.email}`);
  setText("[data-contact-threads]", siteContent.contact.threadsLabel);
  setHref("[data-contact-threads]", siteContent.contact.threadsUrl);
  setText("[data-contact-linkedin]", siteContent.contact.linkedinLabel);
  setHref("[data-contact-linkedin]", siteContent.contact.linkedinUrl);
  setText("[data-form-name]", siteContent.contact.formLabels.name);
  setText("[data-form-email]", siteContent.contact.formLabels.email);
  setText("[data-form-project]", siteContent.contact.formLabels.projectType);
  setText("[data-form-message]", siteContent.contact.formLabels.message);
  setText("[data-form-submit]", siteContent.contact.formLabels.submit);
  document.querySelector("[data-project-types]").innerHTML = siteContent.contact.projectTypes.map((type) => `<option>${escapeHtml(type)}</option>`).join("");

  const form = document.querySelector("[data-contact-form]");
  form.action = `mailto:${siteContent.contact.email}`;
  setText("[data-footer-name]", siteContent.footer.name);
  setText("[data-footer-tagline]", siteContent.footer.tagline);
}

function renderHeroShowcase() {
  const target = document.querySelector("[data-hero-showcase]");
  const projects = getHeroShowcaseProjects();

  clearInterval(heroShowcaseTimer);

  if (!projects.length) {
    target.innerHTML = "";
    return;
  }

  heroShowcaseIndex = heroShowcaseIndex % projects.length;
  updateHeroShowcase(target, projects[heroShowcaseIndex], projects);

  if (projects.length > 1) {
    heroShowcaseTimer = setInterval(() => {
      heroShowcaseIndex = (heroShowcaseIndex + 1) % projects.length;
      target.classList.add("is-changing");

      setTimeout(() => {
        updateHeroShowcase(target, projects[heroShowcaseIndex], projects);
        target.classList.remove("is-changing");
      }, 420);
    }, 5200);
  }
}

function getHeroShowcaseProjects() {
  return (portfolioData.categories || [])
    .flatMap((category) => (category.projects || []).map((project) => ({ ...project, category: category.title })))
    .filter((project) => project.src && project.title)
    .slice(0, 8);
}

function updateHeroShowcase(target, project, projects) {
  target.innerHTML = `
    <div class="hero-showcase-image">
      <img src="${escapeHtml(project.src)}" alt="${escapeHtml(project.title)}" loading="eager">
    </div>
    <div class="hero-showcase-caption">
      <span>${escapeHtml(project.category)}</span>
      <strong>${escapeHtml(project.title)}</strong>
      <p>${escapeHtml(project.description || "")}</p>
      <div class="hero-showcase-dots" aria-label="Featured project position">
        ${projects.map((item, index) => `<i class="${item.src === project.src ? "is-active" : ""}"></i>`).join("")}
      </div>
    </div>
  `;
}

function renderServices() {
  const target = document.querySelector("[data-services]");
  target.innerHTML = siteContent.services.map((service) => `
    <article class="service-card reveal">
      <span class="service-icon">${icon(service.icon)}</span>
      <h3>${escapeHtml(service.title)}</h3>
      <p>${escapeHtml(service.description)}</p>
    </article>
  `).join("");
}

function renderDirections() {
  const target = document.querySelector("[data-directions]");
  target.innerHTML = (siteContent.directions || []).map((item, index) => `
    <article class="direction-card reveal">
      <span class="direction-number">${String(index + 1).padStart(2, "0")}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p class="direction-label">${escapeHtml(item.label)}</p>
      <p>${escapeHtml(item.description)}</p>
    </article>
  `).join("");
}

function renderSkills() {
  document.querySelector("[data-skills]").innerHTML = siteContent.skills.map((skill, index) => (
    `<span class="skill-pill" style="animation-delay:${index * 80}ms">${escapeHtml(skill)}</span>`
  )).join("");
}

function renderFilters(categories) {
  const target = document.querySelector("[data-filters]");
  const buttons = ["All", ...categories.map((category) => category.title)];
  target.innerHTML = buttons.map((label, index) => (
    `<button class="filter-btn ${index === 0 ? "is-active" : ""}" type="button" data-filter="${escapeHtml(label)}">${escapeHtml(label)}</button>`
  )).join("");

  target.onclick = (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    const filter = button.dataset.filter;
    document.querySelectorAll("[data-category]").forEach((block) => {
      block.hidden = filter !== "All" && block.dataset.category !== filter;
    });
  };
}

function projectCard(project) {
  return `
    <article class="project-card reveal">
      <button class="project-open" type="button" data-project-open="${escapeHtml(project.src)}">
      <div class="project-image">
        <img src="${escapeHtml(project.src)}" alt="${escapeHtml(project.title)}" loading="lazy">
      </div>
      <div class="project-body">
        <p class="eyebrow">${escapeHtml((project.tags || [])[0] || "AI Visuals")}</p>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="tag-list">${(project.tags || []).slice(0, 3).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      </div>
      </button>
    </article>
  `;
}

function renderPortfolio() {
  const categories = portfolioData.categories || [];
  const categoryTarget = document.querySelector("[data-categories]");

  if (!categories.length) {
    const message = `
      <div class="empty-state reveal">
        <p class="eyebrow">Portfolio assets pending</p>
        <h3>Add image folders inside the assets directory, then run <code>node tools/generate-portfolio-data.js</code>.</h3>
        <p>The site will create categories from folder names, preserve original image filenames, and generate elegant project titles, descriptions, and skill tags automatically.</p>
      </div>
    `;
    categoryTarget.innerHTML = message;
    renderFilters([]);
    return;
  }

  renderFilters(categories);
  categoryTarget.innerHTML = categories.map((category) => `
    <section class="category-block reveal" data-category="${escapeHtml(category.title)}">
      <div class="category-header">
        <h3>${escapeHtml(category.title)}</h3>
        <p class="category-copy">${escapeHtml(category.description)}</p>
      </div>
      <div class="masonry-grid">
        ${(category.projects || []).map(projectCard).join("")}
      </div>
    </section>
  `).join("");
  initProjectModal();
}

function initProjectModal() {
  const modal = document.querySelector("[data-project-modal]");
  const media = document.querySelector("[data-project-modal-media]");
  const content = document.querySelector("[data-project-modal-content]");
  const projects = (portfolioData.categories || [])
    .flatMap((category) => (category.projects || []).map((project) => ({ ...project, category: category.title })));

  document.querySelectorAll("[data-project-open]").forEach((button) => {
    button.onclick = () => {
      const project = projects.find((item) => item.src === button.dataset.projectOpen);
      if (!project) return;

      media.innerHTML = `<img src="${escapeHtml(project.src)}" alt="${escapeHtml(project.title)}">`;
      content.innerHTML = `
        <p class="eyebrow">${escapeHtml(project.category)}</p>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="tag-list">${(project.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      `;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    };
  });
}

function closeProjectModal() {
  const modal = document.querySelector("[data-project-modal]");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function populateAdminPanel() {
  document.querySelector("[data-site-json]").value = JSON.stringify(siteContent, null, 2);
  document.querySelector("[data-portfolio-json]").value = JSON.stringify(portfolioData, null, 2);
}

function renderAll() {
  renderStaticContent();
  renderServices();
  renderDirections();
  renderSkills();
  renderPortfolio();
  initReveal();
  populateAdminPanel();
}

function initAdminPanel() {
  const panel = document.querySelector("[data-admin-panel]");
  const status = document.querySelector("[data-admin-status]");
  const adminRequested = window.location.hash === "#admin" || window.location.search.includes("admin=1");

  if (adminRequested) {
    document.body.classList.add("admin-mode");
  }

  document.querySelector("[data-admin-toggle]").addEventListener("click", () => {
    panel.classList.toggle("is-open");
    populateAdminPanel();
  });

  document.querySelector("[data-admin-close]").addEventListener("click", () => {
    panel.classList.remove("is-open");
  });

  document.querySelector("[data-admin-save]").addEventListener("click", () => {
    try {
      siteContent = JSON.parse(document.querySelector("[data-site-json]").value);
      portfolioData = JSON.parse(document.querySelector("[data-portfolio-json]").value);
      saveAdminState();
      renderAll();
      status.textContent = "Saved. Changes are stored in this browser.";
    } catch (error) {
      status.textContent = `JSON error: ${error.message}`;
    }
  });

  document.querySelector("[data-admin-reset]").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    siteContent = structuredClone(defaultSiteContent);
    portfolioData = structuredClone(defaultPortfolioData);
    renderAll();
    status.textContent = "Reset to original content.";
  });

  document.querySelector("[data-admin-export]").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify({ siteContent, portfolioData }, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "hanna-portfolio-content.json";
    link.click();
    URL.revokeObjectURL(link.href);
    status.textContent = "Exported content JSON.";
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "e") {
      event.preventDefault();
      document.body.classList.toggle("admin-mode");
      panel.classList.toggle("is-open", document.body.classList.contains("admin-mode"));
      populateAdminPanel();
    }
  });
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => observer.observe(element));
}

function initNav() {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  });

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const projectType = data.get("project_type") || "";
    const message = data.get("message") || "";
    const subject = `Portfolio inquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${projectType}`,
      "",
      "Message:",
      message
    ].join("\n");

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteContent.contact.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const opened = window.open(gmailUrl, "_blank", "noopener,noreferrer");

    if (opened) {
      status.textContent = "Gmail draft opened in a new tab.";
    } else {
      status.innerHTML = `<a href="${gmailUrl}" target="_blank" rel="noopener noreferrer">Open Gmail draft</a>`;
    }
  });
}

document.querySelectorAll("[data-project-modal-close]").forEach((button) => {
  button.addEventListener("click", closeProjectModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
  }
});

loadAdminState();
renderAll();
initAdminPanel();
initNav();
initContactForm();
