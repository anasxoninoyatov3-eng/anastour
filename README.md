# Anas Tour — website update

## What changed

1. **3 languages (UZ / RU / EN)** — real translation, not just a label.
   Switch it with the dropdown in the navbar; the choice is remembered on
   the next visit. Translations live in `js/i18n.js`.
   - Tour package titles/descriptions in `js/data.js` are still in Uzbek
     only — translating all 10 package names/descriptions is a content
     task, not a code one. Say the word and I can add RU/EN versions per
     tour.
2. **Telegram links** — every `t.me/anastour` link across the site now
   points to `https://t.me/ANASTOUR_uz`.
3. **Registration via phone number** — a "Ro'yxatdan o'tish" button in the
   navbar opens a modal that collects just a name + phone number. The
   existing "So'rov qoldiring" contact form still collects the fuller
   inquiry (name, phone, service, message).
4. **Telegram bot notifications** — both forms now POST to a small Python
   backend (`server.py`), which relays the submission to your Telegram bot
   and delivers it straight to chat id `6391897150`.

## Running the backend

```bash
pip install -r requirements.txt
python server.py
```

This starts an API on `http://localhost:5000` with these endpoints:

- `POST /api/send-otp` — body: `{"name", "phone"}` → generates a 6-digit
  code, sends it via Eskiz.uz SMS, valid 5 minutes.
- `POST /api/verify-otp` — body: `{"phone", "code"}` → checks the code;
  on success, forwards the registration to Telegram automatically.
- `POST /api/notify` — body: `{"type": "inquiry", "name", "phone", "service", "message", "lang"}`
  — used by the plain contact form (no SMS step).

The frontend calls these on the same origin by default. If you deploy the
API on a different domain than the static site, set this in `index.html`
before the other scripts load:

```html
<script>window.ANAS_API_BASE = "https://api.yourdomain.com";</script>
```

## Setting up Eskiz.uz SMS (required for the registration modal)

1. Create an account at [eskiz.uz](https://eskiz.uz) if you don't have one.
2. Set your credentials as environment variables before starting the server:
   ```bash
   export ESKIZ_EMAIL="you@example.com"
   export ESKIZ_PASSWORD="your-eskiz-password"
   ```
3. **While your Eskiz account is still in "Тестовый" (test) status** —
   check this under your account name on my.eskiz.uz — the server
   defaults to `ESKIZ_TEST_MODE=true`, which automatically prefixes every
   OTP text with the required phrase `"Bu Eskiz dan test - ..."`. Eskiz
   only delivers messages containing that exact phrase in test mode, but
   it will deliver them to **any real phone number**, not just your own —
   so you can fully test the flow with real SMS right now.
4. Once Eskiz approves your own sender nickname (apply via "Запрос
   договора" in your Eskiz dashboard), switch to production mode:
   ```bash
   export ESKIZ_TEST_MODE="false"
   export ESKIZ_FROM="YourApprovedNickname"
   ```
   This sends clean `"Anas Tour tasdiqlash kodi: 123456"` texts without
   the test phrase.
5. Restart `server.py` after changing any of these.

## Important: protect your credentials

`server.py` currently has the Telegram bot token hardcoded as a fallback
so it works out of the box, but a bot token and an SMS-provider password
are credentials — anyone who has them can send messages as you. Before
you put this on a public server or push it to git:

- Set them as environment variables instead: `ANAS_BOT_TOKEN`,
  `ESKIZ_EMAIL`, `ESKIZ_PASSWORD`.
- Don't commit real values in `server.py` to a public repo.
- If the Telegram token ever leaks, revoke it with `@BotFather` →
  `/revoke` and generate a new one. If the Eskiz password leaks, change
  it in the Eskiz.uz dashboard.
- **Double-check `ANAS_CHAT_ID`.** Message your bot once, then open
  `https://api.telegram.org/bot<token>/getUpdates` in a browser and read
  the `"chat":{"id": ...}` field — use that exact number.

## Deploying

Any small VPS, or a platform like Render/Railway/Fly.io, works for
`server.py` (it's a standard Flask app). Point your existing static
hosting (or the same server) at the `index.html`, `css/`, `js/`, and
`images/` folders as before — nothing about how the site is hosted needs
to change, you're just adding one more small service for the bot
notifications.
