import { NextResponse } from "next/server"

const TOKEN = process.env.DISCORD_TOKEN!
const GUILD_ID = process.env.DISCORD_GUILD_ID!

const ROLE_MAP = {
  admin: "1443978740009930892",
  dev: "1488168427926327377",
  headmod: "1461739216269480122",
  mod: "1495462076565557431",
  twitchmod: "1443978421272051853"
}

export async function GET() {
  try {
    const res = await fetch(
      `https://discord.com/api/guilds/${GUILD_ID}/members?limit=1000`,
      {
        headers: {
          Authorization: `Bot ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: "Discord API Error" },
        { status: res.status }
      )
    }

    const members = await res.json()

    const staff = members
      .filter((member: any) =>
        member.roles?.some((role: string) =>
          Object.values(ROLE_MAP).includes(role)
        )
      )
      .map((member: any) => {
        const roles = member.roles.filter((r: string) =>
          Object.values(ROLE_MAP).includes(r)
        )

        const mappedRoles = roles.map((r: string) =>
          Object.entries(ROLE_MAP).find(([, id]) => id === r)?.[0]
        )

        return {
          id: member.user.id,
          name: member.user.username,
          avatar: member.user.avatar
            ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`
            : null,
          roles: mappedRoles
        }
      })

    return NextResponse.json({ staff })

  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    )
  }
}