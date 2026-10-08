/* TigerHacks — site interactions. No dependencies. */
(function () {
  "use strict";

  var doc = document.documentElement;
  var body = document.body;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- Page loaded (hero intro) ---------- */
  requestAnimationFrame(function () { body.classList.add("is-loaded"); });

  /* ---------- Header state ---------- */
  var header = $(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 24); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  var toggle = $(".menu-toggle");
  var menu = $("#mobile-menu");
  if (toggle && menu) {
    var setMenu = function (open) {
      body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.setAttribute("aria-hidden", String(!open));
      if (open) { var first = $("a", menu); if (first) first.focus({ preventScroll: true }); }
    };
    toggle.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && body.classList.contains("menu-open")) { setMenu(false); toggle.focus(); }
    });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    window.addEventListener("resize", function () { if (window.innerWidth >= 960) setMenu(false); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Hero flashlight + case-card tilt ---------- */
  var hero = $(".hero");
  if (hero && finePointer && !reduceMotion) {
    var card = $(".case-card", hero);
    var raf = 0;
    hero.addEventListener("pointermove", function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var r = hero.getBoundingClientRect();
        var x = e.clientX - r.left, y = e.clientY - r.top;
        hero.style.setProperty("--mx", x + "px");
        hero.style.setProperty("--my", y + "px");
        if (card) {
          var cr = card.getBoundingClientRect();
          var dx = (e.clientX - (cr.left + cr.width / 2)) / r.width;
          var dy = (e.clientY - (cr.top + cr.height / 2)) / r.height;
          card.style.setProperty("--ry", (dx * 8).toFixed(2) + "deg");
          card.style.setProperty("--rx", (-dy * 8).toFixed(2) + "deg");
        }
      });
    });
    hero.addEventListener("pointerleave", function () {
      if (card) { card.style.setProperty("--ry", "0deg"); card.style.setProperty("--rx", "0deg"); }
    });
  }

  /* ---------- Card spotlight ---------- */
  if (finePointer) {
    $$(".card").forEach(function (c) {
      c.addEventListener("pointermove", function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty("--cx", (e.clientX - r.left) + "px");
        c.style.setProperty("--cy", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- Terminal typing ---------- */
  var term = $("[data-terminal]");
  if (term) {
    var lines;
    try { lines = JSON.parse(term.getAttribute("data-terminal")); } catch (err) { lines = []; }
    if (reduceMotion || !lines.length) {
      // Static content already rendered in HTML.
    } else {
      var out = document.createElement("div");
      var cursor = document.createElement("span");
      cursor.className = "cursor";
      cursor.setAttribute("aria-hidden", "true");
      var staticCopy = term.innerHTML;
      term.innerHTML = "";
      term.appendChild(out);
      term.appendChild(cursor);
      var li = 0;
      var typeLine = function () {
        if (li >= lines.length) return;
        var line = lines[li++];
        var row = document.createElement("div");
        if (line.cls) row.className = line.cls;
        if (line.prompt) { var p = document.createElement("span"); p.className = "prompt"; p.textContent = "$ "; row.appendChild(p); }
        var text = document.createTextNode("");
        row.appendChild(text);
        out.appendChild(row);
        var i = 0;
        var speed = line.prompt ? 34 : 10;
        var tick = function () {
          text.data = line.text.slice(0, ++i);
          if (i < line.text.length) setTimeout(tick, speed + Math.random() * 30);
          else setTimeout(typeLine, line.prompt ? 280 : 140);
        };
        tick();
      };
      setTimeout(typeLine, 900);
      term.setAttribute("aria-label", term.getAttribute("aria-label") || staticCopy.replace(/<[^>]+>/g, " "));
    }
  }

  /* ---------- Scramble text (eyebrows) ---------- */
  var glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*/<>";
  function scramble(el) {
    var final = el.getAttribute("data-scramble") || el.textContent;
    var frame = 0, total = 22;
    var run = function () {
      var progress = frame / total;
      var outText = "";
      for (var i = 0; i < final.length; i++) {
        var ch = final[i];
        if (ch === " " || i / final.length < progress) outText += ch;
        else outText += glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      el.textContent = outText;
      if (++frame <= total) requestAnimationFrame(run);
      else el.textContent = final;
    };
    run();
  }
  if (!reduceMotion && "IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { scramble(entry.target); so.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    $$("[data-scramble]").forEach(function (el) {
      if (!el.getAttribute("data-scramble")) el.setAttribute("data-scramble", el.textContent);
      so.observe(el);
    });
  }

  /* ---------- Count-up numbers ---------- */
  var counters = $$("[data-count]");
  if (counters.length && "IntersectionObserver" in window && !reduceMotion) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        co.unobserve(el);
        var target = parseInt(el.getAttribute("data-count"), 10);
        var start = performance.now(), dur = 1400;
        var step = function (now) {
          var t = Math.min(1, (now - start) / dur);
          var eased = 1 - Math.pow(1 - t, 4);
          el.textContent = Math.round(target * eased);
          if (t < 1) requestAnimationFrame(step);
        };
        el.textContent = "0";
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---------- Marquees: duplicate track for seamless loop ---------- */
  $$("[data-marquee]").forEach(function (track) {
    var kids = Array.prototype.slice.call(track.children);
    kids.forEach(function (k) {
      var c = k.cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      track.appendChild(c);
    });
  });

  /* ---------- Timeline progress ---------- */
  var timeline = $(".timeline");
  if (timeline) {
    var bar = $(".timeline__progress", timeline);
    var items = $$("li", timeline);
    var updateTimeline = function () {
      var r = timeline.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      if (bar) bar.style.setProperty("--p", p.toFixed(3));
      items.forEach(function (item) {
        var ir = item.getBoundingClientRect();
        item.classList.toggle("is-active", ir.top < vh * 0.6);
      });
    };
    updateTimeline();
    window.addEventListener("scroll", updateTimeline, { passive: true });
    window.addEventListener("resize", updateTimeline);
  }

  /* ---------- Lightbox ---------- */
  var gallery = $(".gallery");
  var box = $("#lightbox");
  if (gallery && box && typeof box.showModal === "function") {
    var links = $$("a.exhibit", gallery);
    var img = $("img", box);
    var cap = $("figcaption", box);
    var index = 0;
    var show = function (i) {
      index = (i + links.length) % links.length;
      var a = links[index];
      img.src = a.getAttribute("href");
      img.alt = $("img", a).alt;
      cap.textContent = (a.getAttribute("data-label") || "") + "  —  " + (index + 1) + " / " + links.length;
    };
    links.forEach(function (a, i) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        show(i);
        box.showModal();
      });
    });
    $(".lightbox__close", box).addEventListener("click", function () { box.close(); });
    $(".lightbox__prev", box).addEventListener("click", function () { show(index - 1); });
    $(".lightbox__next", box).addEventListener("click", function () { show(index + 1); });
    box.addEventListener("click", function (e) { if (e.target === box || e.target.tagName === "FIGURE") box.close(); });
    box.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
    var touchX = null;
    box.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
      touchX = null;
    });
  }

  /* ---------- Results: year tabs ---------- */
  var tablist = $("[role=tablist]");
  if (tablist) {
    var tabs = $$("[role=tab]", tablist);
    var pill = $(".tabs__pill", tablist);
    var movePill = function (tab) {
      if (!pill) return;
      pill.style.width = tab.offsetWidth + "px";
      pill.style.transform = "translateX(" + tab.offsetLeft + "px)";
    };
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      movePill(tab);
      if (focus) tab.focus();
      if (history.replaceState) history.replaceState(null, "", "#" + tab.getAttribute("data-year"));
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") n = tabs[0];
        if (e.key === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    var initial = tabs.filter(function (t) { return "#" + t.getAttribute("data-year") === location.hash; })[0] || tabs[0];
    select(initial);
    window.addEventListener("resize", function () { movePill(tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0]); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { movePill(tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0]); });
  }

  /* ---------- Results: search ---------- */
  var search = $("#results-search");
  if (search) {
    var rows = $$(".results-table tbody tr");
    rows.forEach(function (row) {
      $$("td", row).forEach(function (td) { td.setAttribute("data-text", td.textContent); });
    });
    var escapeHtml = function (s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    var status = $("#results-status");
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      var counts = {};
      rows.forEach(function (row) {
        var panel = row.closest(".year-panel").id;
        var hit = !q || row.textContent.toLowerCase().indexOf(q) !== -1;
        row.hidden = !hit;
        if (hit) counts[panel] = (counts[panel] || 0) + 1;
        $$("td", row).forEach(function (td) {
          var t = td.getAttribute("data-text");
          if (!q) { td.textContent = t; return; }
          var idx = t.toLowerCase().indexOf(q);
          td.innerHTML = idx === -1 ? escapeHtml(t) : escapeHtml(t.slice(0, idx)) + "<mark>" + escapeHtml(t.slice(idx, idx + q.length)) + "</mark>" + escapeHtml(t.slice(idx + q.length));
        });
      });
      $$(".year-panel").forEach(function (panel) {
        var empty = $(".no-match", panel);
        if (empty) empty.hidden = !q || !!counts[panel.id];
      });
      if (status) {
        if (!q) status.textContent = "";
        else {
          var parts = $$("[role=tab]").map(function (t) { return t.getAttribute("data-year") + ": " + (counts["year-" + t.getAttribute("data-year")] || 0); });
          status.textContent = "Matches by year — " + parts.join(" · ");
        }
      }
    });
  }

  /* ---------- Problems: lazy-load PDF previews ---------- */
  $$("details[data-pdf]").forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (!d.open || $("iframe", d)) return;
      var wrap = document.createElement("div");
      wrap.className = "pdf-frame";
      var frame = document.createElement("iframe");
      frame.src = d.getAttribute("data-pdf");
      frame.title = d.getAttribute("data-title") || "Problem set preview";
      frame.loading = "lazy";
      wrap.appendChild(frame);
      d.appendChild(wrap);
    });
  });

  /* ---------- Footer year ---------- */
  $$("[data-year-now]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
