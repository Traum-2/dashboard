/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server"

const TOKEN = process.env.DISCORD_TOKEN
const GUILD_ID = process.env.DISCORD_GUILD_ID

const ROLE_MAP = {
  admin: "1443978740009930892",
  dev: "1488168427926327377",
  headmod: "1461739216269480122",
  mod: "1495462076565557431",
  twitchmod: "1443978421272051853",
}

export async function GET() {
  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${GUILD_ID}/members?limit=1000`,
      {
        headers: {
          Authorization: `Bot ${TOKEN}`,
        },
        cache: "no-store",
      }
    )

    if (!response.ok) {
      const errorText = await response.text()

      console.log(errorText)

      return NextResponse.json(
        {
          error: "Discord API Error",
          details: errorText,
        },
        { status: response.status }
      )
    }

    const members = await response.json()

    const staff = members
      .filter((member: any) =>
        member.roles?.some((role: any) =>
          Object.values(ROLE_MAP).includes(role)
        )
      )
      .map((member: any) => {
        const mappedRoles = member.roles
          .filter((role: any) =>
            Object.values(ROLE_MAP).includes(role)
          )
          .map((role: any) => {
            return Object.entries(ROLE_MAP).find(
              ([, id]) => id === role
            )?.[0]
          })
          .filter(Boolean)

        return {
          id: member.user.id,

          name:
            member.user.global_name ||
            member.user.username,

          avatar: member.user.avatar
            ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`
            : `https://cdn.discordapp.com/embed/avatars/0.png`,

          roles: mappedRoles,
        }
      })

    return NextResponse.json({ staff })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Server Error",
      },
      { status: 500 }
    )
  }
}