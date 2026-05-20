const CONTACTS = {
  telegramHandle: "@tracepoint_advisory",
  telegramUrl: "https://t.me/tracepoint_advisory"
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
});
