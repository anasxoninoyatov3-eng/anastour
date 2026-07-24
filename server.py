"""
Anas Tour — lead-capture backend
=================================
Receives submissions from the website's "Ro'yxatdan o'tish" (registration)
modal and the "So'rov qoldiring" (inquiry) contact form, then forwards them
as a Telegram message to the agency's own chat via the Bot API.

Run:
    pip install flask requests
    python server.py

The site's JS (js/main.js) POSTs JSON to /api/notify on the same origin.
If you host the frontend and this API on different domains, set
window.ANAS_API_BASE in index.html to this server's URL, and make sure
CORS_ORIGINS below includes the frontend's domain.

SECURITY NOTE
-------------
The bot token below grants full control of the Telegram bot. Treat it like
a password:
  - Don't commit it to a public git repo.
  - Prefer setting it via the ANAS_BOT_TOKEN environment variable in
    production (this script falls back to the hardcoded value only if the
    env var isn't set).
  - If it is ever exposed publicly, regenerate it immediately with
    @BotFather (/revoke) and update it here.
"""

import os
import re
import logging
from datetime import datetime

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("anastour")

# ---- Config -----------------------------------------------------------
BOT_TOKEN = os.environ.get(
    "ANAS_BOT_TOKEN", "8677445645:AAHdHkbaV8fKss0MmANg2NoeqPrxhMdAJ9A"
)
CHAT_ID = os.environ.get("ANAS_CHAT_ID", "8283401187")
TELEGRAM_API = f"https://api.telegram.org/bot{BOT_TOKEN}/getUpdates"

# Allow the site's own domain(s) to call this API from the browser.
CORS_ORIGINS = os.environ.get("ANAS_CORS_ORIGINS", "*")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": CORS_ORIGINS}})

PHONE_RE = re.compile(r"^[+\d][\d\s\-()]{6,20}$")


def escape_md(text: str) -> str:
    """Escape Telegram MarkdownV2 special characters."""
    if not text:
        return ""
    specials = r"_*[]()~`>#+-=|{}.!"
    return "".join("\\" + c if c in specials else c for c in str(text))


def build_message(data: dict) -> str:
    lead_type = data.get("type", "inquiry")
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    name = escape_md(data.get("name", "—"))
    phone = escape_md(data.get("phone", "—"))
    lang = escape_md((data.get("lang") or "uz").upper())

    if lead_type == "registration":
        lines = [
            "🆕 *Yangi ro'yxatdan o'tish* \\(Anas Tour\\)",
            f"👤 Ism: *{name}*",
            f"📞 Telefon: `{phone}`",
            f"🌐 Til: {lang}",
            f"🕒 {escape_md(now)}",
        ]
    else:
        service = escape_md(data.get("service", "—"))
        message = escape_md(data.get("message", "—"))
        lines = [
            "📩 *Yangi so'rov* \\(Anas Tour\\)",
            f"👤 Ism: *{name}*",
            f"📞 Telefon: `{phone}`",
            f"🧳 Xizmat: {service}",
            f"💬 Izoh: {message}",
            f"🌐 Til: {lang}",
            f"🕒 {escape_md(now)}",
        ]
    return "\n".join(lines)


@app.post("/api/notify")
def notify():
    data = request.get_json(silent=True) or {}

    name = (data.get("name") or "").strip()
    phone = (data.get("phone") or "").strip()

    if not name or not phone:
        return jsonify({"ok": False, "error": "name and phone are required"}), 400
    if not PHONE_RE.match(phone):
        return jsonify({"ok": False, "error": "invalid phone number"}), 400

    text = build_message(data)

    try:
        resp = requests.post(
            TELEGRAM_API,
            json={
                "chat_id": CHAT_ID,
                "text": text,
                "parse_mode": "MarkdownV2",
            },
            timeout=10,
        )
        resp.raise_for_status()
        payload = resp.json()
        if not payload.get("ok"):
            log.error("Telegram API error: %s", payload)
            return jsonify({"ok": False, "error": "telegram_error"}), 502
    except requests.RequestException as exc:
        log.error("Failed to reach Telegram API: %s", exc)
        return jsonify({"ok": False, "error": "network_error"}), 502

    log.info(
        "Lead forwarded to Telegram: type=%s name=%s phone=%s",
        data.get("type"),
        name,
        phone,
    )
    return jsonify({"ok": True})


@app.get("/api/health")
def health():
    return jsonify({"ok": True, "service": "anastour-notify"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
