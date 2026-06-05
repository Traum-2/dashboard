import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const webhookUrl = "https://discord.com/api/webhooks/1507452802010451998/TwG3oykDQY8J9WJaGsBJWG2nWqjPpQS9eHf4aLlNJyhyYdTkwkzHPWX0PqbgOeENXRyJ"

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "Neue Discord Mod Bewerbung",
            color: 0x9146FF,

            fields: [

              {
                name: "BASISDATEN",
                value:
`**Name:** ${body.name || "Keine Angabe"}
**Alter:** ${body.age || "Keine Angabe"}
**Discord Name:** ${body.discordName || "Keine Angabe"}`
              },

              {
                name: "BEWERBUNGSFRAGEN",
                value:
`**Warum ins Traum Mod-Team?**
${body.whyTeam || "Keine Angabe"}

**Warum genau Discord Mod?**
${body.whyDiscordMod || "Keine Angabe"}

**Watchtime Twitch:**
${body.experience || "Keine Angabe"}

**Aktivität:**
${body.activity || "Keine Angabe"}

**Discord-Mod Erfahrung:**
${body.botKnowledge || "Keine Angabe"}

**Wie gehst du mit Konflikten zwischen Usern um?**
${body.conflictHandling || "Keine Angabe"}`   // 🔥 NEU (falls du das Feld im Frontend hast)

              },

              {
                name: "Situation 1 (Spam / Ping Spam)",
                value: body.situation1 || "Keine Angabe"
              },

              {
                name: "Situation 2 (Beleidigungen / Toxic)",
                value: body.situation2 || "Keine Angabe"
              },

              {
                name: "Situation 3 (Werbung / Regelbruch)",
                value: body.situation3 || "Keine Angabe"
              },

              {
                name: "Situation 4 (Ticket Provokation)",
                value: body.situation4 || "Keine Angabe"
              },

              {
                name: "Situation 5 (Falscher Channel benutzt)",
                value: body.situation5 || "Keine Angabe"
              }

            ],

            footer: {
              text: "Traum2 Community System"
            },

            timestamp: new Date().toISOString()
          }
        ]
      })
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}