"use client"

import { signIn } from "next-auth/react"

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden text-white">

      {/* Background Glow */}
      <div className="absolute w-[700px] h-[700px] bg-indigo-600 rounded-full blur-[200px] opacity-10 top-[-250px] left-[-250px]" />
      <div className="absolute w-[600px] h-[600px] bg-fuchsia-600 rounded-full blur-[200px] opacity-10 bottom-[-250px] right-[-250px]" />

      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* LOGIN CARD */}
      <div className="w-[460px] rounded-3xl border border-zinc-800 bg-zinc-950/70 backdrop-blur-2xl p-12 shadow-2xl relative z-10">

        {/* Badge */}
        <div className="inline-flex px-3 py-1 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs mb-6">
          COMMUNITY ACCESS PORTAL
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold leading-tight">
          🚀 TRAUM2
          <br />
          <span className="text-indigo-400">DASHBOARD</span>
        </h1>

        {/* Description */}
        <p className="text-zinc-400 mt-5 text-base leading-relaxed">
          Melde dich mit deinem Discord Account an, um Zugriff auf die Community,
          Staff-Systeme, Social Links und Live Statistiken zu erhalten.
        </p>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        {/* Login Button */}
        <button
          onClick={() =>
            signIn("discord", { callbackUrl: "/dashboard" })
          }
          className="w-full py-4 rounded-2xl bg-[#5865F2] hover:bg-[#4752c4] transition-all duration-300 font-semibold flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
        >
          <span className="text-lg">🔐</span>
          Mit Discord anmelden
        </button>

        {/* Footer */}
        <p className="text-xs text-zinc-600 text-center mt-6">
          Secure login via Discord OAuth2 • TRAUM2 Community System
        </p>

      </div>
    </main>
  )
}