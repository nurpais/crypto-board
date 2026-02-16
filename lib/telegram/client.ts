const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

interface SendMessageOptions {
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
}

interface TelegramResponse {
  ok: boolean;
  description?: string;
}

export async function sendMessage(
  text: string,
  options: SendMessageOptions = {},
): Promise<TelegramResponse> {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: options.disable_web_page_preview ?? true,
      disable_notification: options.disable_notification ?? false,
    }),
  });

  const data: TelegramResponse = await res.json();

  if (!data.ok) {
    throw new Error(`Telegram API error: ${data.description}`);
  }

  return data;
}
