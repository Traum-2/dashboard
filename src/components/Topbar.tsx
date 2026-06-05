"use client"

import { signOut } from "next-auth/react"

export default function Topbar({ session }: any) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-zinc-800 bg-zinc-900 px-8 py-6">

      <div className="flex items-center gap-5">
        <img
          src={session?.user?.image || ""}
          alt="Discord Avatar"
          className="w-16 h-16 rounded-2xl border border-zinc-700"
        />

        <div>
          <p className="text-zinc-400 text-base">
            Eingeloggt als
          </p>

          <h1 className="text-2xl font-bold">
            {session?.user?.name || "Unknown"}
          </h1>
        </div>
      </div>

      <button
        onClick={() =>
          signOut({
            callbackUrl: "/",
            redirect: true,
          })
        }
        className="
          px-6 py-3 rounded-2xl
          bg-black border border-zinc-800
          hover:border-purple-500/40
          hover:shadow-[0_0_25px_rgba(168,85,247,0.20)]
          transition duration-200
        "
      >
        Logout
      </button>

    </div>
  )
}