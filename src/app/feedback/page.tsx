"use client"

import { useState } from "react"
import Link from "next/link"

type Mode = "menu" | "bug" | "idea" | "anon"

export default function FeedbackPage() {
  const [mode, setMode] = useState<Mode>("menu")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const isValid =
    mode === "anon"
      ? message.trim().length > 0
      : name.trim().length > 0 && message.trim().length > 0

  /* =========================
     MENU = UNCHANGED (IMPORTANT)
     ========================= */

  const card =
    "p-7 rounded-3xl border border-zinc-800 bg-zinc-900/70 transition-all duration-300 cursor-pointer hover:scale-[1.01] hover:-translate-y-[2px] hover:border-purple-500/70 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]"

  const button =
    "px-6 py-3 rounded-2xl border border-zinc-700 bg-zinc-900 text-zinc-200 font-semibold transition-all duration-300 hover:scale-[1.02] hover:-translate-y-[2px] hover:border-purple-500/60 hover:bg-zinc-800/70"

  /* =========================
     ONLY FORM SCALING (FIX)
     ========================= */

  const input =
    "w-full mt-5 px-6 py-4 text-lg rounded-2xl bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-500 outline-none transition-all focus:border-purple-500"

  const formBox =
    "rounded-3xl border border-zinc-800 bg-zinc-900/50 p-12 space-y-10 transition-all duration-300 hover:border-purple-500/40 hover:bg-zinc-900/70"

  const label =
    "text-base font-semibold text-purple-400 tracking-wide"

  const handleSubmit = async () => {
    if (!isValid) return

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: mode,
          name: mode === "anon" ? name || "Anonym" : name,
          message,
        }),
      })

      setSent(true)
      setName("")
      setMessage("")

      setTimeout(() => {
        setSent(false)
        setMode("menu")
      }, 1500)

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6 py-14">

      <div className="w-full max-w-4xl rounded-[36px] border border-zinc-800 bg-zinc-900/60 backdrop-blur-md p-10">

        {/* SUCCESS */}
        {sent && (
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-green-400">
              ✅ Erfolgreich versendet
            </h2>
            <p className="text-zinc-300 mt-3 text-lg font-semibold">
              Du wirst automatisch zurück ins Menü gebracht...
            </p>
          </div>
        )}

        {/* MENU (UNCHANGED) */}
        {!sent && mode === "menu" && (
          <>
            <div className="flex justify-center mb-10">
              <Link href="/dashboard">
                <button className={button}>
                  ⟵ Zurück zum Dashboard
                </button>
              </Link>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-5xl font-extrabold">
                Community-Feedback
              </h1>

              <p className="text-zinc-400 mt-4 text-lg">
                Wähle eine Kategorie aus
              </p>
            </div>

            <div className="grid gap-6">

              <button onClick={() => setMode("bug")} className={card}>
                <div className="text-xl font-bold">
                  ⚠️ Bug & Fehlerreport
                </div>
                <p className="text-zinc-400 mt-2 text-sm">
                  Melde Fehler oder Probleme im System
                </p>
              </button>

              <button onClick={() => setMode("idea")} className={card}>
                <div className="text-xl font-bold">
                  💡 Verbesserungen & Ideen
                </div>
                <p className="text-zinc-400 mt-2 text-sm">
                  Teile deine Vorschläge und Ideen
                </p>
              </button>

              <button onClick={() => setMode("anon")} className={card}>
                <div className="text-xl font-bold">
                  🕶️ Anonyme Beschwerde
                </div>
                <p className="text-zinc-400 mt-2 text-sm">
                  Sende Feedback anonym
                </p>
              </button>

            </div>
          </>
        )}

        {/* FORM (ONLY HERE CHANGED SIZE) */}
        {!sent && mode !== "menu" && (
          <div className="space-y-10">

            <div className="flex justify-center">
              <button onClick={() => setMode("menu")} className={button}>
                ⟵ Zurück zur Auswahl
              </button>
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-bold">
                Willkommen bei{" "}
                {mode === "bug" && "Bug & Fehlerreport"}
                {mode === "idea" && "Verbesserungen & Ideen"}
                {mode === "anon" && "Anonyme Beschwerde"}
              </h2>

              <p className="text-zinc-400 mt-4 text-xl">
                Bitte fülle das Formular vollständig und so ausführlich wie möglich aus
              </p>
            </div>

            <div className={formBox}>

              <div>
                <label className={label}>
                  NAME {mode === "anon" ? "(freiwillig)" : "*"}
                </label>
                <input
                  className={input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={
                    mode === "anon"
                      ? "Dein Name"
                      : "Dein Name"
                  }
                />
              </div>

              <div>
                <label className={label}>NACHRICHT *</label>
                <textarea
                  className={input + " min-h-[180px]"}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Beschreibe es so ausführlich wie möglich..."
                />
              </div>

            </div>

            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={
                isValid
                  ? button
                  : "px-6 py-3 rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-500 opacity-50 cursor-not-allowed"
              }
            >
              Feedback absenden
            </button>

          </div>
        )}

      </div>
    </main>
  )
}