"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type StaffUser = {
  id: string
  name: string
  avatar: string
  roles: string[]
}

const ROLES = [
  {
    key: "admin",
    title: "➥ Admin 🛡️",
    desc: "Server Leitung & Entscheidungen",
  },

  {
    key: "dev",
    title: "➥ Developer ⚙️",
    desc: "Technische Entwicklung & Systeme",
  },

  {
    key: "headmod",
    title: "➥ HeadModerator 🔰",
    desc: "Leitung des Moderator Teams",
  },

  {
    key: "mod",
    title: "➥ Discord Moderator 💬",
    desc: "Moderation im Discord",
  },

  {
    key: "twitchmod",
    title: "➥ Twitch Moderator ⚔️",
    desc: "Moderation im Twitch Chat",
  },
]

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffUser[]>([])

  async function load() {
    try {
      const res = await fetch("/api/staff")

      const data = await res.json()

      setStaff(data.staff || [])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    load()

    const interval = setInterval(load, 60000)

    return () => clearInterval(interval)
  }, [])

  const getUsers = (role: string) =>
    staff.filter((user) =>
      user.roles.includes(role)
    )

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-16">

      {/* BACKGROUND */}
      <div className="fixed top-[-250px] left-[-250px] w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="fixed bottom-[-250px] right-[-250px] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />

      {/* BACK BUTTON */}
      <div className="flex justify-center mb-14 relative z-10">

        <Link href="/dashboard">

          <button className="px-6 py-3 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-purple-500/40 transition-all duration-200 font-bold">

            ⟵ Zurück zum Dashboard

          </button>

        </Link>

      </div>

      {/* TITLE */}
      <div className="text-center mb-16 relative z-10">

        <div className="text-6xl mb-6">
          👥
        </div>

        <h1 className="text-5xl font-extrabold">
          Unser Staff-Team
        </h1>

        <p className="text-zinc-400 mt-4 text-lg">
          Rollenübersicht des gesamten Teams
        </p>

      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">

        {ROLES.map((role) => {
          const users = getUsers(role.key)

          return (
            <div
              key={role.key}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition-all duration-200 hover:border-purple-500/40"
            >

              {/* HEADER */}
              <div className="mb-8">

                <h2 className="text-2xl font-bold text-zinc-100">
                  {role.title}
                </h2>

                <p className="text-zinc-500 mt-2">
                  {role.desc}
                </p>

              </div>

              {/* USERS */}
              {users.length > 0 ? (

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

                  {users.map((user) => (

                    <div
                      key={user.id}
                      className="flex items-center gap-4 p-5 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-purple-500/30 transition-all duration-200"
                    >

                      <img
                        src={user.avatar}
                        className="w-14 h-14 rounded-2xl border border-zinc-700"
                      />

                      <div>

                        <p className="text-lg font-semibold text-zinc-100">
                          {user.name}
                        </p>

                        <p className="text-sm text-zinc-500">
                          Discord Member
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-zinc-500">

                  Keine Mitglieder in dieser Rolle

                </div>

              )}

            </div>
          )
        })}

      </div>

    </main>
  )
}