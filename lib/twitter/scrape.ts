/**
 * Fetch Twitter/X profile meta description as a simple social context signal.
 * Returns null on any error — analysis proceeds without Twitter data.
 */
export async function fetchTwitterContent(
  url: string,
): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const html = await res.text();

    // Extract og:description or meta description
    const ogMatch = html.match(
      /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i,
    );
    if (ogMatch?.[1]) return ogMatch[1].slice(0, 500);

    const metaMatch = html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
    );
    if (metaMatch?.[1]) return metaMatch[1].slice(0, 500);

    return null;
  } catch {
    return null;
  }
}
