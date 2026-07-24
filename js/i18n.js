/* ============================================================
   Anas Tour — i18n (UZ / RU / EN)
   Usage:
     - data-i18n="key"              -> sets textContent
     - data-i18n-html="key"         -> sets innerHTML (trusted strings only)
     - data-i18n-placeholder="key"  -> sets placeholder attribute
     - data-i18n-aria="key"         -> sets aria-label attribute
   ============================================================ */
window.ANAS_I18N = {
  uz: {
    nav_home: "Asosiy",
    nav_about: "Biz haqimizda",
    nav_tours: "Turlar",
    nav_contact: "Aloqa",
    nav_register: "Ro'yxatdan o'tish",
    nav_telegram: "Telegram",
    brand_sub: "Aviakassa | Turizm | Viza",

    hero_eyebrow: "Aviakassa · Turizm · Viza",
    hero_title_html: "Dunyo Bo'ylab <span class=\"gold-word\">Unutilmas</span> Sayohatlar",
    hero_lead:
      "Aviachiptalar, sayohat turlari va viza xizmatlari — barchasi bir joyda. Anas Tour bilan orzuingizdagi manzillarga qulay va ishonch bilan yeting.",
    hero_btn_tours: "Turlarni ko'rish",
    hero_btn_contact: "Bog'lanish",
    stat_years: "Yillik tajriba",
    stat_dest: "Yo'nalishlar",
    stat_clients: "Mamnun mijozlar",

    services_label: "Xizmatlarimiz",
    services_title: "Sizga Taqdim Etamiz",
    service1_title: "Aviakassa",
    service1_text:
      "Arzon va qulay aviachiptalarni band qilish. Dunyoning istalgan nuqtasiga eng maqbul narxlardagi reyslar.",
    service2_title: "Turizm",
    service2_text:
      "Umra, Yevropa, Osiyo va kurort turlari. Har bir sayohat siz uchun puxta rejalashtiriladi.",
    service3_title: "Viza ko'magi",
    service3_text:
      "Viza hujjatlarini rasmiylashtirishda tezkor va ishonchli yordam. Barcha bosqichlarda maslahat.",

    about_label: "Biz haqimizda",
    about_title: "Anas Tour — Ishonchli Hamrohingiz",
    about_text:
      "Anas Tour — yillar davomida minglab mijozlarning ishonchini qozongan sayohat agentligi. Biz aviachiptalar, turizm paketlari va viza xizmatlarini yagona standart va yuqori sifat bilan taqdim etamiz.",
    trust1_title: "Yillik tajriba",
    trust1_text: "10 yildan ortiq professional sayohat tashkil etish tajribasi.",
    trust2_title: "Ishonchli hamkorlar",
    trust2_text: "Yetakchi aviakompaniyalar va mehmonxonalar bilan bevosita aloqa.",
    trust3_title: "24/7 qo'llab-quvvatlash",
    trust3_text: "Sayohatingiz davomida kuniga 24 soat aloqadamiz.",

    tours_label: "Ommabop yo'nalishlar",
    tours_title: "Tanlangan Sayohat Turlari",
    tours_viewall: "Barcha turlarni ko'rish",
    tour_days_suffix: "kun",
    tour_price_suffix: "narxlar / kishi",
    tour_btn_details: "Batafsil",
    badge_popular: "Ommabop",
    badge_sale: "Chegirma",
    badge_premium: "Premium",

    contact_label: "Aloqa",
    contact_title: "Biz Bilan Bog'laning",
    contact_info_title: "Kontakt ma'lumotlari",
    contact_phone_label: "Telefon",
    contact_address_label: "Manzil",
    contact_address_text: "Toshkent sh., Amir Temur ko'chasi, 12-uy",
    contact_hours_label: "Ish vaqti",
    contact_hours_text: "Dush–Shan: 09:00 – 19:00 · Yak: dam olish",
    contact_btn_telegram: "Telegram orqali yozish",

    form_title: "So'rov qoldiring",
    form_name_label: "Ismingiz",
    form_name_placeholder: "Ism familiya",
    form_name_error: "Iltimos, ismingizni kiriting.",
    form_phone_label: "Telefon raqami",
    form_phone_placeholder: "+998 90 123 45 67",
    form_phone_error: "Iltimos, raqamingizni kiriting.",
    form_service_label: "Xizmat turi",
    form_service_placeholder: "Tanlang...",
    form_service_error: "Iltimos, xizmat turini tanlang.",
    form_service_opt1: "Aviachipta band qilish",
    form_service_opt2: "Umra turi",
    form_service_opt3: "Yevropa / Osiyo turi",
    form_service_opt4: "Plyaj / kurort turi",
    form_service_opt5: "Viza ko'magi",
    form_msg_label: "Qo'shimcha izoh",
    form_msg_placeholder: "Sayohat sanasi, kishilar soni va boshqalar...",
    form_submit: "So'rovni yuborish",

    reg_modal_title: "Ro'yxatdan o'tish",
    reg_modal_text: "Telefon raqamingizni qoldiring, mutaxassisimiz tez orada siz bilan bog'lanadi.",
    reg_name_label: "Ismingiz",
    reg_name_placeholder: "Ism familiya",
    reg_phone_label: "Telefon raqami",
    reg_phone_placeholder: "+998 90 123 45 67",
    reg_submit: "Ro'yxatdan o'tish",
    reg_sending: "Yuborilmoqda...",

    footer_desc:
      "Aviakassa, turizm va viza xizmatlari. Dunyo bo'ylab ishonchli va qulay sayohatlar uchun sizning hamrohingiz.",
    footer_pages: "Sahifalar",
    footer_services: "Xizmatlar",
    footer_social: "Ijtimoiy tarmoqlar",
    footer_rights: "Barcha huquqlar himoyalangan.",
    footer_tagline: "Aviakassa · Turizm · Viza",

    toast_title: "Rahmat!",
    toast_text: "So'rovingiz qabul qilindi. Tez orada bog'lanamiz.",
    toast_error: "Xatolik yuz berdi. Iltimos, birozdan so'ng qayta urinib ko'ring.",
  },

  ru: {
    nav_home: "Главная",
    nav_about: "О нас",
    nav_tours: "Туры",
    nav_contact: "Контакты",
    nav_register: "Регистрация",
    nav_telegram: "Telegram",
    brand_sub: "Авиакасса | Туризм | Виза",

    hero_eyebrow: "Авиакасса · Туризм · Виза",
    hero_title_html: "Незабываемые <span class=\"gold-word\">Путешествия</span> По Всему Миру",
    hero_lead:
      "Авиабилеты, туристические туры и визовые услуги — всё в одном месте. С Anas Tour доберитесь до места мечты удобно и с уверенностью.",
    hero_btn_tours: "Смотреть туры",
    hero_btn_contact: "Связаться",
    stat_years: "Лет опыта",
    stat_dest: "Направлений",
    stat_clients: "Довольных клиентов",

    services_label: "Наши услуги",
    services_title: "Мы Предлагаем Вам",
    service1_title: "Авиакасса",
    service1_text:
      "Бронирование доступных и удобных авиабилетов. Рейсы в любую точку мира по лучшим ценам.",
    service2_title: "Туризм",
    service2_text:
      "Туры в Умру, Европу, Азию и на курорты. Каждое путешествие тщательно планируется для вас.",
    service3_title: "Визовая поддержка",
    service3_text:
      "Быстрая и надёжная помощь в оформлении визовых документов. Консультации на всех этапах.",

    about_label: "О нас",
    about_title: "Anas Tour — Ваш Надёжный Спутник",
    about_text:
      "Anas Tour — туристическое агентство, заслужившее доверие тысяч клиентов за годы работы. Мы предоставляем авиабилеты, туристические пакеты и визовые услуги на едином высоком уровне качества.",
    trust1_title: "Многолетний опыт",
    trust1_text: "Более 10 лет профессионального опыта организации путешествий.",
    trust2_title: "Надёжные партнёры",
    trust2_text: "Прямые связи с ведущими авиакомпаниями и отелями.",
    trust3_title: "Поддержка 24/7",
    trust3_text: "Мы на связи 24 часа в сутки на протяжении всего вашего путешествия.",

    tours_label: "Популярные направления",
    tours_title: "Избранные Туры",
    tours_viewall: "Смотреть все туры",
    tour_days_suffix: "дней",
    tour_price_suffix: "цена / чел.",
    tour_btn_details: "Подробнее",
    badge_popular: "Популярно",
    badge_sale: "Скидка",
    badge_premium: "Премиум",

    contact_label: "Контакты",
    contact_title: "Свяжитесь С Нами",
    contact_info_title: "Контактная информация",
    contact_phone_label: "Телефон",
    contact_address_label: "Адрес",
    contact_address_text: "г. Ташкент, ул. Амира Темура, дом 12",
    contact_hours_label: "Часы работы",
    contact_hours_text: "Пн–Сб: 09:00 – 19:00 · Вс: выходной",
    contact_btn_telegram: "Написать в Telegram",

    form_title: "Оставьте заявку",
    form_name_label: "Ваше имя",
    form_name_placeholder: "Имя и фамилия",
    form_name_error: "Пожалуйста, введите ваше имя.",
    form_phone_label: "Номер телефона",
    form_phone_placeholder: "+998 90 123 45 67",
    form_phone_error: "Пожалуйста, введите ваш номер.",
    form_service_label: "Вид услуги",
    form_service_placeholder: "Выберите...",
    form_service_error: "Пожалуйста, выберите вид услуги.",
    form_service_opt1: "Бронирование авиабилета",
    form_service_opt2: "Тур Умра",
    form_service_opt3: "Тур в Европу / Азию",
    form_service_opt4: "Пляжный / курортный тур",
    form_service_opt5: "Визовая поддержка",
    form_msg_label: "Дополнительный комментарий",
    form_msg_placeholder: "Дата поездки, количество человек и т.д...",
    form_submit: "Отправить заявку",

    reg_modal_title: "Регистрация",
    reg_modal_text: "Оставьте номер телефона, наш специалист свяжется с вами в ближайшее время.",
    reg_name_label: "Ваше имя",
    reg_name_placeholder: "Имя и фамилия",
    reg_phone_label: "Номер телефона",
    reg_phone_placeholder: "+998 90 123 45 67",
    reg_submit: "Зарегистрироваться",
    reg_sending: "Отправка...",

    footer_desc:
      "Авиакасса, туризм и визовые услуги. Ваш надёжный и удобный спутник в путешествиях по всему миру.",
    footer_pages: "Страницы",
    footer_services: "Услуги",
    footer_social: "Социальные сети",
    footer_rights: "Все права защищены.",
    footer_tagline: "Авиакасса · Туризм · Виза",

    toast_title: "Спасибо!",
    toast_text: "Ваша заявка принята. Мы скоро свяжемся с вами.",
    toast_error: "Произошла ошибка. Пожалуйста, попробуйте снова чуть позже.",
  },

  en: {
    nav_home: "Home",
    nav_about: "About Us",
    nav_tours: "Tours",
    nav_contact: "Contact",
    nav_register: "Sign Up",
    nav_telegram: "Telegram",
    brand_sub: "Flights | Tours | Visas",

    hero_eyebrow: "Flights · Tours · Visas",
    hero_title_html: "Unforgettable <span class=\"gold-word\">Journeys</span> Around The World",
    hero_lead:
      "Flight tickets, tour packages and visa services — all in one place. Reach your dream destinations with Anas Tour, comfortably and with confidence.",
    hero_btn_tours: "View tours",
    hero_btn_contact: "Contact us",
    stat_years: "Years of experience",
    stat_dest: "Destinations",
    stat_clients: "Happy clients",

    services_label: "Our services",
    services_title: "What We Offer You",
    service1_title: "Flight tickets",
    service1_text:
      "Booking affordable, convenient flight tickets. Flights to any destination in the world at the best prices.",
    service2_title: "Tours",
    service2_text:
      "Umrah, Europe, Asia and beach resort tours. Every trip is carefully planned around you.",
    service3_title: "Visa support",
    service3_text:
      "Fast and reliable help with visa paperwork. Guidance at every step of the process.",

    about_label: "About us",
    about_title: "Anas Tour — Your Trusted Companion",
    about_text:
      "Anas Tour is a travel agency that has earned the trust of thousands of clients over the years. We provide flight tickets, tour packages and visa services to a single, consistently high standard.",
    trust1_title: "Years of experience",
    trust1_text: "Over 10 years of professional experience organizing travel.",
    trust2_title: "Trusted partners",
    trust2_text: "Direct relationships with leading airlines and hotels.",
    trust3_title: "24/7 support",
    trust3_text: "We're available around the clock throughout your trip.",

    tours_label: "Popular destinations",
    tours_title: "Featured Tour Packages",
    tours_viewall: "View all tours",
    tour_days_suffix: "days",
    tour_price_suffix: "price / person",
    tour_btn_details: "Details",
    badge_popular: "Popular",
    badge_sale: "Sale",
    badge_premium: "Premium",

    contact_label: "Contact",
    contact_title: "Get In Touch",
    contact_info_title: "Contact information",
    contact_phone_label: "Phone",
    contact_address_label: "Address",
    contact_address_text: "12 Amir Temur Street, Tashkent",
    contact_hours_label: "Working hours",
    contact_hours_text: "Mon–Sat: 09:00 – 19:00 · Sun: closed",
    contact_btn_telegram: "Message us on Telegram",

    form_title: "Send a request",
    form_name_label: "Your name",
    form_name_placeholder: "First and last name",
    form_name_error: "Please enter your name.",
    form_phone_label: "Phone number",
    form_phone_placeholder: "+998 90 123 45 67",
    form_phone_error: "Please enter your phone number.",
    form_service_label: "Service type",
    form_service_placeholder: "Select...",
    form_service_error: "Please select a service type.",
    form_service_opt1: "Book a flight ticket",
    form_service_opt2: "Umrah tour",
    form_service_opt3: "Europe / Asia tour",
    form_service_opt4: "Beach / resort tour",
    form_service_opt5: "Visa support",
    form_msg_label: "Additional notes",
    form_msg_placeholder: "Travel dates, number of people, etc...",
    form_submit: "Send request",

    reg_modal_title: "Sign up",
    reg_modal_text: "Leave your phone number and our specialist will contact you shortly.",
    reg_name_label: "Your name",
    reg_name_placeholder: "First and last name",
    reg_phone_label: "Phone number",
    reg_phone_placeholder: "+998 90 123 45 67",
    reg_submit: "Sign up",
    reg_sending: "Sending...",

    footer_desc:
      "Flights, tours and visa services. Your reliable and convenient companion for travel around the world.",
    footer_pages: "Pages",
    footer_services: "Services",
    footer_social: "Social media",
    footer_rights: "All rights reserved.",
    footer_tagline: "Flights · Tours · Visas",

    toast_title: "Thank you!",
    toast_text: "Your request has been received. We'll contact you shortly.",
    toast_error: "Something went wrong. Please try again in a moment.",
  },
};

(function () {
  "use strict";

  var SUPPORTED = ["uz", "ru", "en"];
  var STORAGE_KEY = "anas_lang";

  function detectLang() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    return "uz";
  }

  function t(key, lang) {
    var dict = window.ANAS_I18N[lang] || window.ANAS_I18N.uz;
    return dict[key] != null ? dict[key] : window.ANAS_I18N.uz[key] || "";
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "uz";
    document.documentElement.setAttribute("lang", lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"), lang);
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"), lang);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"), lang));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"), lang));
    });

    var label = document.getElementById("langLabel");
    if (label) label.textContent = lang.toUpperCase();

    document.querySelectorAll(".lang-switch .dropdown-item").forEach(function (item) {
      item.classList.toggle("active", item.dataset.lang.toLowerCase() === lang);
    });

    // Re-render dynamic tour cards (they're built from data.js + main.js)
    if (typeof window.renderFeaturedTours === "function") {
      window.renderFeaturedTours();
    }

    window.ANAS_CURRENT_LANG = lang;
    document.dispatchEvent(new CustomEvent("anas:langchange", { detail: { lang: lang } }));
  }

  window.ANAS_I18N_ENGINE = {
    t: t,
    apply: applyLang,
    current: detectLang,
    supported: SUPPORTED,
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(detectLang());
  });
})();
