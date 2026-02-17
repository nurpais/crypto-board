function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

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
  const botToken = getEnvVar("TELEGRAM_BOT_TOKEN");
  const chatId = getEnvVar("TELEGRAM_CHAT_ID");
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
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
