"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type StaffUser = {
  id: string
  name: string
  avatar: string | null
  roles: string[]
}

const ROLES = [
  { key: "admin", title: "➥ Admin🛡️", desc: "Server Leitung & Entscheidungen" },
  { key: "dev", title: "➥ Developer ⚙️", desc: "Technische Entwicklung & Systeme" },
  { key: "headmod", title: "➥ HeadModerator🔰", desc: "Leitung des Moderator Teams" },
  { key: "mod", title: "➥ Discord Moderator 💬", desc: "Moderation im Discord" },
  { key: "twitchmod", title: "➥ Twitch Moderator⚔️", desc: "Moderation im Twitch Chat" }
]

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffUser[]>([])

  async function load() {
    const res = await fetch("/api/staff")
    const data = await res.json()
    setStaff(data.staff || [])
  }

  useEffect(() => {
    load()
    const interval = setInterval(load, 60000)
    return () => clearInterval(interval)
  }, [])

  const getUsers = (role: string) =>
    staff.filter((u) => u.roles.includes(role))

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-16">

      {/* BACK BUTTON */}
      <div className="flex justify-center mb-14">
        <Link href="/dashboard">
          <button className="px-6 py-3 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-zinc-600 transition font-bold">
            ⟵ Zurück zum Dashboard
          </button>
        </Link>
      </div>

      {/* TITLE */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold">
          👥 Unser Staff-team
        </h1>
        <p className="text-zinc-400 mt-3">
          Rollenübersicht des gesamten Teams
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto space-y-10">

        {ROLES.map((role) => {
          const users = getUsers(role.key)

          return (
            <div
              key={role.key}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition duration-300 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.20)]"
            >

              {/* HEADER */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-zinc-100">
                  {role.title}
                </h2>

                <p className="text-sm text-zinc-500 mt-1">
                  {role.desc}
                </p>
              </div>

              {/* USERS GRID */}
              {users.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-950"
                    >

                      <img
                        src={user.avatar || ""}
                        className="w-12 h-12 rounded-xl"
                      />

                      <div>
                        <p className="text-base font-semibold text-zinc-100">
                          {user.name}
                        </p>

                        <p className="text-xs text-zinc-500">
                          Discord Member
                        </p>
                      </div>

                    </div>
                  ))}

                </div>
              ) : (
                <p className="text-zinc-500 text-sm">
                  Keine Mitglieder in dieser Rolle
                </p>
              )}

            </div>
          )
        })}

      </div>
    </main>
  )
}