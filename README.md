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

This starts an API on `http://localhost:5000` with one endpoint:

- `POST /api/notify` — body: `{"type": "registration"|"inquiry", "name", "phone", "service"?, "message"?, "lang"}`

The frontend calls `/api/notify` on the same origin by default. If you
deploy the API on a different domain than the static site, set this in
`index.html` before the other scripts load:

```html
<script>window.ANAS_API_BASE = "https://api.yourdomain.com";</script>
```

## Important: protect the bot token

`server.py` currently has the bot token hardcoded as a fallback so it
works out of the box, but a bot token is a credential — anyone who has it
can send messages as your bot. Before you put this on a public server or
push it to git:

- Set it as an environment variable instead: `export ANAS_BOT_TOKEN=...`
- Add `server.py`'s hardcoded token to `.gitignore`-style handling, or
  just delete the fallback value once your env var is confirmed working.
- If the token ever leaks (e.g. pasted somewhere public), revoke it with
  `@BotFather` → `/revoke` and generate a new one, then update the env
  var.

## Deploying

Any small VPS, or a platform like Render/Railway/Fly.io, works for
`server.py` (it's a standard Flask app). Point your existing static
hosting (or the same server) at the `index.html`, `css/`, `js/`, and
`images/` folders as before — nothing about how the site is hosted needs
to change, you're just adding one more small service for the bot
notifications.
