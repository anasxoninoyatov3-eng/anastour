/* ============================================================
   Anas Tour — shared interactions
   ============================================================ */
(function () {
  "use strict";

  var TG = window.ANAS_TELEGRAM || "https://t.me/ANASTOUR_uz";
  // Backend endpoint that forwards form submissions to the Telegram bot.
  // Same-origin by default; change if the API is hosted elsewhere.
  var API_BASE = window.ANAS_API_BASE || "";

  function currentLang() {
    return (window.ANAS_I18N_ENGINE && window.ANAS_I18N_ENGINE.current()) || "uz";
  }
  function t(key) {
    if (window.ANAS_I18N_ENGINE) return window.ANAS_I18N_ENGINE.t(key, currentLang());
    return key;
  }

  /* ---- SVG icon helpers ---- */
  function iconClock() {
    return '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  }

  /* ---- Build a single tour card (localized) ---- */
  window.buildTourCard = function (tour) {
    var badgeKey =
      tour.badgeType === "sale"
        ? "badge_sale"
        : tour.badge === "Premium"
        ? "badge_premium"
        : tour.badge
        ? "badge_popular"
        : null;
    var badgeText = badgeKey ? t(badgeKey) : "";
    var badgeClass = tour.badgeType === "sale" ? "tour-badge sale" : "tour-badge";

    var col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";
    col.innerHTML =
      '<article class="tour-card">' +
      '<div class="tour-media">' +
      '<img src="' +
      tour.image +
      '" alt="' +
      tour.title +
      '" loading="lazy">' +
      (badgeText ? '<span class="' + badgeClass + '">' + badgeText + "</span>" : "") +
      "</div>" +
      '<div class="tour-body">' +
      '<span class="tour-region">' +
      tour.region +
      "</span>" +
      "<h3>" +
      tour.title +
      "</h3>" +
      '<div class="tour-meta">' +
      iconClock() +
      "<span>" +
      tour.duration +
      "</span></div>" +
      '<div class="tour-footer">' +
      '<div class="tour-price">' +
      tour.price +
      "<small>" +
      t("tour_price_suffix") +
      "</small></div>" +
      '<a href="' +
      TG +
      '" target="_blank" rel="noopener" class="btn btn-outline-navy btn-sm">' +
      t("tour_btn_details") +
      "</a>" +
      "</div>" +
      "</div>" +
      "</article>";
    return col;
  };

  /* ---- Render featured tours (called on load + on language change) ---- */
  window.renderFeaturedTours = function () {
    var featuredWrap = document.getElementById("featuredTours");
    if (!featuredWrap || !window.ANAS_TOURS) return;
    featuredWrap.innerHTML = "";
    window.ANAS_TOURS.filter(function (tr) {
      return tr.featured;
    }).forEach(function (tr) {
      featuredWrap.appendChild(window.buildTourCard(tr));
    });
  };

  /* ---- Reveal on scroll ---- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach(function (el) {
      obs.observe(el);
    });
  }

  /* ---- Navbar active link on scroll (single-page) ---- */
  function initScrollSpy() {
    var sections = document.querySelectorAll("section[id]");
    var links = document.querySelectorAll(".navbar-anas .nav-link[data-spy]");
    if (!sections.length || !links.length) return;

    window.addEventListener("scroll", function () {
      var pos = window.scrollY + 120;
      sections.forEach(function (sec) {
        var top = sec.offsetTop;
        var bottom = top + sec.offsetHeight;
        var id = sec.getAttribute("id");
        var link = document.querySelector('.nav-link[href="#' + id + '"]');
        if (!link) return;
        if (pos >= top && pos < bottom) {
          links.forEach(function (l) {
            l.classList.remove("active");
          });
          link.classList.add("active");
        }
      });
    });
  }

  /* ---- Language switcher — 3 languages (UZ / RU / EN) ---- */
  function initLang() {
    var items = document.querySelectorAll(".lang-switch .dropdown-item");
    items.forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        var lang = (item.dataset.lang || "uz").toLowerCase();
        if (window.ANAS_I18N_ENGINE) window.ANAS_I18N_ENGINE.apply(lang);
      });
    });
  }

  /* ---- Generic helper: send captured lead data to our backend,
          which relays it to the Telegram bot. ---- */
  function sendLead(payload) {
    return fetch(API_BASE + "/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(function (res) {
      if (!res.ok) throw new Error("Request failed: " + res.status);
      return res.json().catch(function () {
        return {};
      });
    });
  }

  function showToast(id) {
    var toastEl = document.getElementById(id);
    if (toastEl && window.bootstrap) {
      window.bootstrap.Toast.getOrCreateInstance(toastEl).show();
    }
  }

  /* ---- Contact / inquiry form ---- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = t("reg_sending");
      }

      var payload = {
        type: "inquiry",
        lang: currentLang(),
        name: document.getElementById("cName").value.trim(),
        phone: document.getElementById("cPhone").value.trim(),
        service: document.getElementById("cService").value,
        message: document.getElementById("cMsg").value.trim(),
      };

      sendLead(payload)
        .then(function () {
          showToast("successToast");
          form.reset();
          form.classList.remove("was-validated");
        })
        .catch(function () {
          showToast("errorToast");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        });
    });
  }

  /* ---- Registration modal (phone-number sign up) ---- */
  function initRegisterForm() {
    var form = document.getElementById("registerForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = t("reg_sending");
      }

      var payload = {
        type: "registration",
        lang: currentLang(),
        name: document.getElementById("rName").value.trim(),
        phone: document.getElementById("rPhone").value.trim(),
      };

      sendLead(payload)
        .then(function () {
          form.reset();
          form.classList.remove("was-validated");
          var modalEl = document.getElementById("registerModal");
          if (modalEl && window.bootstrap) {
            window.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
          }
          showToast("successToast");
        })
        .catch(function () {
          showToast("errorToast");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        });
    });
  }

  /* ---- Collapse mobile navbar after clicking a link ---- */
  function initNavCollapse() {
    var links = document.querySelectorAll(".navbar-anas .nav-link");
    var collapseEl = document.getElementById("mainNav");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        if (
          collapseEl &&
          collapseEl.classList.contains("show") &&
          window.bootstrap
        ) {
          window.bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initReveal();
    initScrollSpy();
    initLang();
    initContactForm();
    initRegisterForm();
    initNavCollapse();

    /* Populate featured tours on the home page */
    window.renderFeaturedTours();

    /* Footer year */
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
