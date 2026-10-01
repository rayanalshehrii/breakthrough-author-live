(function () {
  "use strict";

  var STORAGE_KEY = "bal-theme";
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  function getPreferredTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* localStorage may be unavailable (private mode) — fall back silently */
    }
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      var isLight = theme === "light";
      toggle.setAttribute("aria-pressed", String(isLight));
      toggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
      );
    }
  }

  function setTheme(theme) {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* ignore persistence failures */
    }
  }

  // Apply the stored/preferred theme on load (head script already set it
  // early to avoid a flash; this keeps the toggle's ARIA state in sync).
  applyTheme(root.getAttribute("data-theme") || getPreferredTheme());

  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      setTheme(current === "light" ? "dark" : "light");
    });
  }
})();
