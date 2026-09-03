/* Portfolio behaviour: theme toggle, project filter, footer year. */

(function () {
  "use strict";

  /* ---------- theme toggle (persisted per browser) ---------- */
  var root = document.documentElement;
  var STORE = "rq-theme";

  try {
    var saved = localStorage.getItem(STORE);
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) { /* private mode / blocked storage — fall back to system theme */ }

  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var current = root.getAttribute("data-theme") || (systemDark ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(STORE, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- project filter ---------- */
  var chips = document.querySelectorAll(".chip[data-filter]");
  var cards = document.querySelectorAll("#project-list .card");

  Array.prototype.forEach.call(chips, function (chip) {
    chip.addEventListener("click", function () {
      var filter = chip.getAttribute("data-filter");

      Array.prototype.forEach.call(chips, function (c) {
        c.classList.toggle("is-active", c === chip);
      });

      Array.prototype.forEach.call(cards, function (card) {
        var tags = (card.getAttribute("data-tags") || "").split(/\s+/);
        card.hidden = filter !== "all" && tags.indexOf(filter) === -1;
      });
    });
  });

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
