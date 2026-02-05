import os
import httpx
from dotenv import load_dotenv

load_dotenv()

async def send_telegram_alert(message: str):
    """
    Sends a message to the configured Telegram chat.
    """
    bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    
    if not bot_token or not chat_id:
        print("Telegram configuration missing. Skipping alert.")
        return
    
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "HTML"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, json=payload)
            response.raise_for_status()
            print("Telegram alert sent successfully.")
        except Exception as e:
            print(f"Failed to send Telegram alert: {e}")
