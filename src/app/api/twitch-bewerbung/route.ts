import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const webhookUrl = "https://discord.com/api/webhooks/1504574542473986250/sMp6ohh6qDTkhX1MhkYmhBQf9gxyPUO0gJXZWIDPaEer-gN_6EP2jr3Wj6VDJuSAxZDo"

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "Neue Twitch Mod Bewerbung",
            color: 0x9146FF,

            fields: [

              {
                name: "BASISDATEN",
                value:
`**Name:** ${body.name || "Keine Angabe"}
**Alter:** ${body.age || "Keine Angabe"}
**Twitch Name:** ${body.twitchName || "Keine Angabe"}
**Discord Name:** ${body.discordName || "Keine Angabe"}`,
                inline: false
              },

              {
                name: "BEWERBUNGSFRAGEN",
                value:
`**Warum möchtest du bei Traum2 ins Mod-Team?**
${body.whyTeam || "Keine Angabe"}

**Warum möchtest du genau Twitch Moderator werden?**
${body.whyTwitchMod || "Keine Angabe"}

**Erfahrungen (welche und bei wem):**
${body.experience || "Keine Angabe"}

**Wie viel Zeit / Aktivität:**
${body.activity || "Keine Angabe"}

**Aktuelle Watchtime auf Twitch:**
${body.watchtime || "Keine Angabe"}`,
                inline: false
              },

              {
                name: "SITUATION 1 (Dauerhaftes fragen nach 1v1s)",
                value: body.situation1 || "Keine Angabe"
              },

              {
                name: "SITUATION 2 (Emote Spam)",
                value: body.situation2 || "Keine Angabe"
              },

              {
                name: "SITUATION 3 (Beleidigungen an den Streamer usw.)",
                value: body.situation3 || "Keine Angabe"
              },

              {
                name: "SITUATION 4 (Diskutieren zweier Viewer im Chat)",
                value: body.situation4 || "Keine Angabe"
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

    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}