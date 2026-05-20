const CONTACTS = {
  telegramHandle: "@crypto_recon",
  telegramUrl: "https://t.me/crypto_recon"
};

const contactBindings = {
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

function setupHeaderState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

function setupYear() {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

function setupMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const bar1 = document.getElementById("bar1");
  const bar2 = document.getElementById("bar2");
  const bar3 = document.getElementById("bar3");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden", isOpen);
    menu.classList.toggle("flex", !isOpen);
    bar1.style.transform = isOpen ? "" : "rotate(45deg) translate(4px, 4px)";
    bar2.style.opacity = isOpen ? "" : "0";
    bar3.style.transform = isOpen ? "" : "rotate(-45deg) translate(4px, -4px)";
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      menu.classList.remove("flex");
      bar1.style.transform = "";
      bar2.style.opacity = "";
      bar3.style.transform = "";
    });
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
  setupHeaderState();
  setupYear();
  setupMobileMenu();
});
