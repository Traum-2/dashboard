import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { type, name, message } = await req.json()

    const webhookUrl = process.env.DISCORD_WEBHOOK_FEEDBACK

    if (!webhookUrl) {
      return NextResponse.json({ error: "no webhook" }, { status: 500 })
    }

    const title =
      type === "bug"
        ? "⚠️ Bug & Fehlerreport"
        : type === "idea"
        ? "💡 Verbesserungen & Ideen"
        : "🕶️ Anonyme Beschwerde"

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: title,

            color: 0x8b5cf6,

            description:
              `**👤 Name**\n${name || "Unbekannt"}\n\n` +
              `**📝 Nachricht**\n${message || "-"}`,

            timestamp: new Date().toISOString(),
          },
        ],
      }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    )
  }
}