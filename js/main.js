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
    return (
      (window.ANAS_I18N_ENGINE && window.ANAS_I18N_ENGINE.current()) || "uz"
    );
  }
  function t(key) {
    if (window.ANAS_I18N_ENGINE)
      return window.ANAS_I18N_ENGINE.t(key, currentLang());
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
    var badgeClass =
      tour.badgeType === "sale" ? "tour-badge sale" : "tour-badge";

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
      (badgeText
        ? '<span class="' + badgeClass + '">' + badgeText + "</span>"
        : "") +
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

  /* ---- Registration modal — Step 1: send SMS code, Step 2: verify ---- */
  function initRegisterFlow() {
    var step1 = document.getElementById("regStep1");
    var step2 = document.getElementById("regStep2");
    var formStep1 = document.getElementById("registerFormStep1");
    var formStep2 = document.getElementById("registerFormStep2");
    if (!step1 || !step2 || !formStep1 || !formStep2) return;

    var sendBtn = document.getElementById("regSendCodeBtn");
    var verifyBtn = document.getElementById("regVerifyBtn");
    var resendBtn = document.getElementById("regResendBtn");
    var step1Err = document.getElementById("regStep1Error");
    var step2Err = document.getElementById("regStep2Error");
    var phoneDisplay = document.getElementById("regPhoneDisplay");
    var changePhoneLink = document.getElementById("regChangePhone");
    var modalEl = document.getElementById("registerModal");

    var pendingName = "";
    var pendingPhone = "";
    var resendTimer = null;

    function showErr(el, msg) {
      el.textContent = msg;
      el.classList.remove("d-none");
    }
    function hideErr(el) {
      el.classList.add("d-none");
    }

    function resetToStep1() {
      clearInterval(resendTimer);
      step2.classList.add("d-none");
      step1.classList.remove("d-none");
      hideErr(step1Err);
      hideErr(step2Err);
      formStep2.reset();
      formStep2.classList.remove("was-validated");
    }

    function startResendCooldown(seconds) {
      var remaining = seconds;
      resendBtn.disabled = true;
      function tick() {
        var template = t("reg_resend_wait") || "Resend ({s}s)";
        resendBtn.textContent = template.replace("{s}", remaining);
        remaining -= 1;
        if (remaining < 0) {
          clearInterval(resendTimer);
          resendBtn.disabled = false;
          resendBtn.textContent = t("reg_resend");
        }
      }
      clearInterval(resendTimer);
      tick();
      resendTimer = setInterval(tick, 1000);
    }

    function requestCode() {
      hideErr(step1Err);
      var originalText = sendBtn.textContent;
      sendBtn.disabled = true;
      sendBtn.textContent = t("reg_sending_code");

      return fetch(API_BASE + "/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pendingName,
          phone: pendingPhone,
          lang: currentLang(),
        }),
      })
        .then(function (res) {
          return res.json().then(function (body) {
            if (!res.ok || !body.ok) throw body;
            return body;
          });
        })
        .then(function () {
          phoneDisplay.textContent = pendingPhone;
          step1.classList.add("d-none");
          step2.classList.remove("d-none");
          document.getElementById("rCode").focus();
          startResendCooldown(60);
        })
        .catch(function (err) {
          if (err && err.error === "cooldown" && err.wait_seconds) {
            showErr(step1Err, t("reg_otp_send_error"));
          } else {
            showErr(step1Err, t("reg_otp_send_error"));
          }
        })
        .finally(function () {
          sendBtn.disabled = false;
          sendBtn.textContent = originalText;
        });
    }

    formStep1.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!formStep1.checkValidity()) {
        formStep1.classList.add("was-validated");
        return;
      }
      pendingName = document.getElementById("rName").value.trim();
      pendingPhone = document.getElementById("rPhone").value.trim();
      requestCode();
    });

    formStep2.addEventListener("submit", function (e) {
      e.preventDefault();
      hideErr(step2Err);
      var code = document.getElementById("rCode").value.trim();
      if (!code) return;

      var originalText = verifyBtn.textContent;
      verifyBtn.disabled = true;
      verifyBtn.textContent = t("reg_sending");

      fetch(API_BASE + "/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: pendingPhone,
          code: code,
          lang: currentLang(),
        }),
      })
        .then(function (res) {
          return res.json().then(function (body) {
            if (!res.ok || !body.ok) throw body;
            return body;
          });
        })
        .then(function () {
          resetToStep1();
          formStep1.reset();
          if (modalEl && window.bootstrap) {
            window.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
          }
          showToast("successToast");
        })
        .catch(function () {
          showErr(step2Err, t("reg_code_error"));
        })
        .finally(function () {
          verifyBtn.disabled = false;
          verifyBtn.textContent = originalText;
        });
    });

    resendBtn.addEventListener("click", function () {
      requestCode();
    });

    changePhoneLink.addEventListener("click", function (e) {
      e.preventDefault();
      resetToStep1();
    });

    if (modalEl) {
      modalEl.addEventListener("hidden.bs.modal", resetToStep1);
    }
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
    initRegisterFlow();
    initNavCollapse();

    /* Populate featured tours on the home page */
    window.renderFeaturedTours();

    /* Footer year */
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
