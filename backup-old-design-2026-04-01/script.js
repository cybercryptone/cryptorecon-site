const CONTACTS = {
  email: "hello@tracepoint.demo",
  telegramHandle: "@tracepoint_advisory",
  telegramUrl: "https://t.me/tracepoint_advisory"
};

const contactBindings = {
  "email-text": CONTACTS.email,
  "email-link": `mailto:${CONTACTS.email}`,
  "telegram-handle": CONTACTS.telegramHandle,
  "telegram-link": CONTACTS.telegramUrl
};

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function syncMotionPreference() {
  document.documentElement.classList.toggle("reduce-motion", reducedMotionQuery.matches);
}

function setupInitialScroll() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const resetScroll = () => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  };

  resetScroll();
  window.addEventListener("pageshow", resetScroll);
  window.addEventListener("load", resetScroll);
}

function applyContactBindings() {
  Object.entries(contactBindings).forEach(([key, value]) => {
    document.querySelectorAll(`[data-contact="${key}"]`).forEach((node) => {
      if (key.endsWith("-link")) {
        node.setAttribute("href", value);
      } else {
        node.textContent = value;
      }
    });
  });
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeNav();
    }
  });
}

function setupHeaderState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

function setupHeroMotion() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const revealHero = () => {
    hero.classList.add("is-ready");
  };

  if (reducedMotionQuery.matches) {
    revealHero();
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(revealHero);
  });
}

function setupAccordion() {
  const triggers = Array.from(document.querySelectorAll(".faq-trigger"));
  if (!triggers.length) return;

  const setState = (trigger, expanded) => {
    const panel = document.getElementById(trigger.getAttribute("aria-controls"));
    trigger.setAttribute("aria-expanded", String(expanded));
    panel.hidden = !expanded;
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const shouldOpen = trigger.getAttribute("aria-expanded") !== "true";
      triggers.forEach((item) => setState(item, false));
      setState(trigger, shouldOpen);
    });
  });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (reducedMotionQuery.matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -30px 0px"
  });

  items.forEach((item, index) => {
    item.style.transitionDelay = item.closest(".hero") ? "0s" : `${Math.min(index % 4, 3) * 0.08}s`;
    observer.observe(item);
  });
}

function setupYear() {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

function setupForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const fields = {
    name: {
      input: form.querySelector("#name"),
      error: form.querySelector("#name-error"),
      validate: (value) => value.trim().length >= 2 ? "" : "Укажите имя, чтобы мы понимали, как к вам обращаться."
    },
    email: {
      input: form.querySelector("#email"),
      error: form.querySelector("#email-error"),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Введите корректный email для обратной связи."
    },
    message: {
      input: form.querySelector("#message"),
      error: form.querySelector("#message-error"),
      validate: (value) => value.trim().length >= 20 ? "" : "Добавьте чуть больше деталей, чтобы первичный разбор был осмысленным."
    },
    consent: {
      input: form.querySelector("#consent"),
      error: form.querySelector("#consent-error"),
      validate: (checked) => checked ? "" : "Нужно подтвердить ознакомление с политикой конфиденциальности."
    }
  };

  const statusNode = form.querySelector(".form-status");

  const setFieldState = (field, message) => {
    const { input, error } = fields[field];
    const isInvalid = Boolean(message);
    input.setAttribute("aria-invalid", String(isInvalid));
    if (error) error.textContent = message;
    if (field !== "consent") {
      if (isInvalid) {
        input.setAttribute("aria-describedby", error.id);
      } else {
        input.removeAttribute("aria-describedby");
      }
    }
  };

  Object.entries(fields).forEach(([key, field]) => {
    const eventName = key === "consent" ? "change" : "input";
    field.input.addEventListener(eventName, () => {
      const value = key === "consent" ? field.input.checked : field.input.value;
      setFieldState(key, field.validate(value));
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let firstInvalid = null;

    Object.entries(fields).forEach(([key, field]) => {
      const value = key === "consent" ? field.input.checked : field.input.value;
      const message = field.validate(value);
      setFieldState(key, message);
      if (message && !firstInvalid) {
        firstInvalid = field.input;
      }
    });

    if (firstInvalid) {
      statusNode.innerHTML = "";
      firstInvalid.focus();
      return;
    }

    const name = fields.name.input.value.trim();
    statusNode.innerHTML = `
      <div class="form-success">
        <strong>Демо-подтверждение отправки</strong>
        <p>Спасибо, ${name}. В реальном проекте здесь будет интеграция с почтой или CRM. Для презентационной версии рекомендуемый следующий шаг — написать в Telegram ${CONTACTS.telegramHandle} или на ${CONTACTS.email}.</p>
      </div>
    `;

    form.reset();
    Object.keys(fields).forEach((key) => setFieldState(key, ""));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  syncMotionPreference();
  if (typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", syncMotionPreference);
  } else if (typeof reducedMotionQuery.addListener === "function") {
    reducedMotionQuery.addListener(syncMotionPreference);
  }

  setupInitialScroll();
  applyContactBindings();
  setupNav();
  setupHeaderState();
  setupHeroMotion();
  setupAccordion();
  setupReveal();
  setupYear();
  setupForm();
});
