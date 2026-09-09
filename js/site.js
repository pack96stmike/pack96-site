// Pack 96 site: shared behavior for the public page. P96 helpers are defined first; init() runs at the bottom.
function p96Init() {
  "use strict";

  // Year in footer
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Den tabs
  var tabs = document.querySelectorAll(".tab[data-den]");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.setAttribute("aria-selected", "false"); });
      tab.setAttribute("aria-selected", "true");
      document.querySelectorAll(".den-panel").forEach(function (p) { p.classList.remove("show"); });
      var panel = document.getElementById("den-" + tab.dataset.den);
      if (panel) panel.classList.add("show");
    });
  });
  // Deep link: index.html#den-bears opens that den
  if (location.hash.indexOf("#den-") === 0) {
    var t = document.querySelector('.tab[data-den="' + location.hash.slice(5) + '"]');
    if (t) { t.click(); document.getElementById("dens").scrollIntoView(); }
  }

  // Highlight nav link for the section in view
  var links = document.querySelectorAll(".nav-links a[href^='#']");
  var sections = Array.prototype.map.call(links, function (a) { return document.querySelector(a.getAttribute("href")); });
  function onScroll() {
    var pos = window.scrollY + 90, current = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= pos) current = i; });
    links.forEach(function (a, i) { a.classList.toggle("active", i === current); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Leadership: from the published Google Sheet if configured, else the fallback list in config.js
  var cfg = window.PACK96 || {};
  P96.loadPeople(cfg.leadersCsvUrl, cfg.fallbackLeaders || []).then(function (people) {
    P96.renderLeaders(document.getElementById("leaders"), people.filter(function (p) { return !p.den; }), false);
    P96.fillDenLeaders(people);
  });

  // Helpful Links: from the Links tab if configured; otherwise the links written in index.html stay.
  P96.loadLinks(cfg.linksCsvUrl, "public").then(function (links) {
    if (links.length) P96.renderLinks(document.getElementById("public-links"), links);
  });
}

// Small shared helpers, also used by members.js
window.P96 = {
  // Minimal CSV parser: handles quoted fields with commas and newlines.
  parseCsv: function (text) {
    var rows = [], row = [], field = "", inQ = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (inQ) {
        if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
        else field += c;
      } else if (c === '"') inQ = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field); rows.push(row); row = []; field = "";
      } else field += c;
    }
    if (field.length || row.length) { row.push(field); rows.push(row); }
    if (!rows.length) return [];
    var head = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    return rows.slice(1).filter(function (r) { return r.join("").trim(); }).map(function (r) {
      var o = {}; head.forEach(function (h, i) { o[h] = (r[i] || "").trim(); }); return o;
    });
  },

  // Returns [{name, role, den, email, phone}]
  loadPeople: function (csvUrl, fallback) {
    if (!csvUrl) return Promise.resolve(fallback);
    return fetch(csvUrl, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    }).then(function (t) {
      var rows = P96.parseCsv(t).filter(function (r) { return r.name; });
      return rows.length ? rows : fallback;
    }).catch(function (e) { console.warn("Leaders sheet unavailable, using fallback:", e.message); return fallback; });
  },

  renderLeaders: function (el, people, withContact) {
    if (!el) return;
    el.innerHTML = "";
    people.forEach(function (p) {
      var isOpen = /^open/i.test(p.name);
      var d = document.createElement("div");
      d.className = "person" + (isOpen ? " open" : "");
      var role = p.role + (p.den ? " · " + p.den : "");
      var html = '<div class="name">' + P96.esc(isOpen ? "Open position" : p.name) + '</div><div class="role">' + P96.esc(role) + "</div>";
      if (withContact) {
        var c = [];
        if (p.email) c.push('<a href="mailto:' + P96.esc(p.email) + '">' + P96.esc(p.email) + "</a>");
        if (p.phone) c.push('<a href="tel:' + P96.esc(p.phone.replace(/[^\d+]/g, "")) + '">' + P96.esc(p.phone) + "</a>");
        if (c.length) html += '<div class="contact">' + c.join("<br>") + "</div>";
      }
      d.innerHTML = html;
      el.appendChild(d);
    });
  },

  // Returns [{title, url, note, show}] filtered to rows whose Show column is `where` or "both"
  loadLinks: function (csvUrl, where) {
    if (!csvUrl) return Promise.resolve([]);
    return fetch(csvUrl, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    }).then(function (t) {
      return P96.parseCsv(t).filter(function (r) {
        var show = (r.show || "both").toLowerCase();
        return r.title && r.url && (show === where || show === "both");
      });
    }).catch(function (e) { console.warn("Links sheet unavailable:", e.message); return []; });
  },

  renderLinks: function (el, links) {
    if (!el) return;
    el.innerHTML = "";
    links.forEach(function (l) {
      var a = document.createElement("a");
      a.href = l.url; a.target = "_blank"; a.rel = "noopener";
      a.innerHTML = P96.esc(l.title) + (l.note ? "<small>" + P96.esc(l.note) + "</small>" : "");
      el.appendChild(a);
    });
  },

  fillDenLeaders: function (people) {
    document.querySelectorAll(".den-leader[data-den]").forEach(function (el) {
      var den = el.dataset.den;
      var leaders = people.filter(function (p) { return p.den && p.den.toLowerCase() === den.toLowerCase(); });
      if (!leaders.length) return;
      var names = leaders.map(function (p) { return /^open/i.test(p.name) ? "Open position — volunteer needed" : p.name; });
      el.innerHTML = (leaders.length > 1 ? "Den leaders: " : "Den leader: ") + "<strong>" + P96.esc(names.join(", ")) + "</strong>";
    });
  },

  esc: function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
};

p96Init();
