import { NextResponse } from "next/server"

const TOKEN = process.env.DISCORD_TOKEN!
const GUILD_ID = process.env.DISCORD_GUILD_ID!

const ROLE_MAP: Record<string, string> = {
  admin: "1443978740009930892",
  dev: "1488168427926327377",
  headmod: "1461739216269480122",
  mod: "1495462076565557431",
  twitchmod: "1443978421272051853",
}

// 👇 hier trägst du deine STAFF USER IDS ein (WICHTIG!)
const STAFF_USER_IDS = [
  // "123456789012345678",
]

async function fetchMember(userId: string) {
  const res = await fetch(
    `https://discord.com/api/v10/guilds/${GUILD_ID}/members/${userId}`,
    {
      headers: {
        Authorization: `Bot ${TOKEN}`,
      },
      cache: "no-store",
    }
  )

  if (!res.ok) return null
  return res.json()
}

export async function GET() {
  try {
    const results = await Promise.all(
      STAFF_USER_IDS.map(fetchMember)
    )

    const members = results.filter(Boolean)

    const staff = members.map((member: any) => {
      const roles = (member.roles || [])
        .filter((r: string) =>
          Object.values(ROLE_MAP).includes(r)
        )
        .map((r: string) =>
          Object.entries(ROLE_MAP).find(([, id]) => id === r)?.[0]
        )
        .filter(Boolean)

      return {
        id: member.user.id,
        name: member.user.global_name || member.user.username,
        avatar: member.user.avatar
          ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`
          : null,
        roles,
      }
    })

    return NextResponse.json({ staff })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}