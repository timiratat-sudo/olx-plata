// app/api/review/route.ts
import { NextResponse } from "next/server";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// GET — проверка
export async function GET() {
  return NextResponse.json({ ok: true, message: "Review API working" });
}

// POST — сюда шлёт форма
export async function POST(req: Request) {
  try {
    if (!TOKEN || !CHAT_ID) {
      console.error("Нет TOKEN или CHAT_ID", { hasToken: !!TOKEN, CHAT_ID });
      return NextResponse.json(
        { ok: false, reason: "missing_env" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as Record<string, unknown>;
    console.log("Получили из формы (весь body):", body);

    // Только path страницы
    const refererHeader = req.headers.get("referer");
    let page = "unknown";

    if (refererHeader) {
      try {
        const url = new URL(refererHeader);
        const parts = url.pathname.split("/").filter(Boolean);
        page = parts[parts.length - 1] || "home";
      } catch {
        page = refererHeader;
      }
    }

    console.log("Page:", page);

    // Формируем текст
    let text = "📩 Новая форма с сайта " + page + "\n";

    for (const [key, value] of Object.entries(body)) {
      if (value == null) continue;

      const stringValue = String(value).trim();
      if (!stringValue) continue;

      text += `${key}: ${stringValue}\n`;
    }


    const tgRes = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text }),
      }
    );

    const data = await tgRes.json();
    console.log("Ответ Telegram:", data);

    if (!data.ok) {
      return NextResponse.json(
        { ok: false, reason: "telegram_error", data },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Server error:", e);
    return NextResponse.json(
      { ok: false, reason: "exception", error: String(e) },
      { status: 500 }
    );
  }
}
