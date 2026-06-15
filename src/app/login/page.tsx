"use client"

import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white">

      <button
        onClick={() =>
          signIn("discord", {
            callbackUrl: "/dashboard",
          })
        }
        className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition"
      >
        Mit Discord anmelden
      </button>

    </main>
  )
}