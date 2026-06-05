"use client"

import { useState } from "react"
import Link from "next/link"

export default function DiscordBewerbungPage() {

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [discordName, setDiscordName] = useState("")

  const [whyTeam, setWhyTeam] = useState("")
  const [whyDiscordMod, setWhyDiscordMod] = useState("")
  const [experience, setExperience] = useState("")
  const [activity, setActivity] = useState("")
  const [botKnowledge, setBotKnowledge] = useState("")
  const [serverTime, setServerTime] = useState("")

  const [situation1, setSituation1] = useState("")
  const [situation2, setSituation2] = useState("")
  const [situation3, setSituation3] = useState("")
  const [situation4, setSituation4] = useState("")
  const [situation5, setSituation5] = useState("")

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const isValid =
    name.trim() &&
    age.trim() &&
    discordName.trim() &&
    whyTeam.trim() &&
    whyDiscordMod.trim() &&
    experience.trim() &&
    activity.trim() &&
    botKnowledge.trim() &&
    serverTime.trim() &&
    situation1.trim() &&
    situation2.trim() &&
    situation3.trim() &&
    situation4.trim() &&
    situation5.trim()

  const outerContainer =
    "w-full max-w-6xl rounded-[40px] border border-zinc-800 bg-zinc-900/40 p-10 shadow-[0_0_60px_rgba(168,85,247,0.08)] transition duration-300 hover:border-purple-500/50 hover:shadow-[0_0_80px_rgba(168,85,247,0.18)]"

  const formContainer =
    "rounded-[32px] border border-zinc-800 bg-zinc-900 p-10"

  const input =
    "w-full mt-3 rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-white outline-none transition duration-300 focus:border-purple-500 hover:border-purple-500/50"

  const label =
    "text-purple-400 font-bold text-sm tracking-wide"

  const sectionTitle =
    "text-3xl font-extrabold mb-8"

  const actionButton =
    "px-6 py-3 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.20)] transition font-bold"

  const submitButton =
    isValid
      ? "mt-10 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-5 text-xl font-bold transition duration-300 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
      : "mt-10 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-5 text-xl font-bold opacity-40 cursor-not-allowed"

  async function submitApplication() {

    if (!isValid || sending) return

    setSending(true)

    try {
      await fetch("/api/discord-bewerbung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          age,
          discordName,
          whyTeam,
          whyDiscordMod,
          experience,
          activity,
          botKnowledge,
          serverTime,
          situation1,
          situation2,
          situation3,
          situation4,
          situation5
        })
      })

      setSent(true)

      setTimeout(() => {
        setSent(false)

        setName("")
        setAge("")
        setDiscordName("")
        setWhyTeam("")
        setWhyDiscordMod("")
        setExperience("")
        setActivity("")
        setBotKnowledge("")
        setServerTime("")
        setSituation1("")
        setSituation2("")
        setSituation3("")
        setSituation4("")
        setSituation5("")
      }, 2500)

    } catch (error) {
      console.error(error)
    }

    setSending(false)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-24 flex justify-center">

      <div className={outerContainer}>

        {/* BACK BUTTON */}
        <div className="flex justify-center mb-12">
          <Link href="/dashboard">
            <button className={actionButton}>
              ⟵ Zurück zum Dashboard
            </button>
          </Link>
        </div>

        {/* TITLE */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold">
            Discord Mod Bewerbung
          </h1>
          <p className="text-zinc-400 mt-5 text-xl">
            Fülle das Formular vollständig und ehrlich aus.
          </p>
        </div>

        {sent && (
          <div className="text-center mb-10 text-green-400 text-3xl font-extrabold">
            Bewerbung erfolgreich versendet
          </div>
        )}

        {!sent && (
          <div className={formContainer}>

            {/* BASISDATEN */}
            <div className="mb-14">
              <h2 className={sectionTitle}>Basisdaten</h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label className={label}>NAME *</label>
                  <input
                    className={input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dein vollständiger Name"
                  />
                </div>

                <div>
                  <label className={label}>ALTER *</label>
                  <input
                    className={input}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Dein Alter"
                  />
                </div>

                <div>
                  <label className={label}>DISCORD NAME *</label>
                  <input
                    className={input}
                    value={discordName}
                    onChange={(e) => setDiscordName(e.target.value)}
                    placeholder="z.B. Dein vollständiger Discord Name (Nicht Anzeigename!)"
                  />
                </div>

              </div>
            </div>

            {/* BEWERBUNGSFRAGEN */}
            <div className="mb-14">
              <h2 className={sectionTitle}>Bewerbungsfragen</h2>

              <div className="space-y-8">

                <div>
                  <label className={label}>
                    WARUM MÖCHTEST DU BEI TRAUM2 INS DISCORD MOD-TEAM?
                  </label>
                  <textarea
                    className={`${input} min-h-[150px]`}
                    value={whyTeam}
                    onChange={(e) => setWhyTeam(e.target.value)}
                    placeholder="Erkläre deine Motivation AUSFÜHRLICH..."
                  />
                </div>

                <div>
                  <label className={label}>
                    WARUM MÖCHTEST DU GENAU DISCORD-MODERATOR WERDEN?
                  </label>
                  <textarea
                    className={`${input} min-h-[150px]`}
                    value={whyDiscordMod}
                    onChange={(e) => setWhyDiscordMod(e.target.value)}
                    placeholder="Warum möchtest du genau Discord Mod werden?"
                  />
                </div>

                <div>
                  <label className={label}>
                    WAS IST DEINE WATCHTIME BEI TRAUM2 AUF TWITCH?
                  </label>
                  <textarea
                    className={`${input} min-h-[150px]`}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="!wt im Twitch Chat von Traum2"
                  />
                </div>

                <div>
                  <label className={label}>
                    WIE AKTIV BIST DU AUF DEM DISCORD?
                  </label>
                  <textarea
                    className={`${input} min-h-[150px]`}
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    placeholder="Wie aktiv wärst du auf Discord (Wie viel zeit hast du?)"
                  />
                </div>

                <div>
                  <label className={label}>
                    HAST DU ERFAHRUNGEN ALS DISCORD MOD?
                  </label>
                  <textarea
                    className={`${input} min-h-[150px]`}
                    value={botKnowledge}
                    onChange={(e) => setBotKnowledge(e.target.value)}
                    placeholder="Wenn ja, welche Erfahrungen konntest du sammeln und bei wem?"
                  />
                </div>

                <div>
                  <label className={label}>
                    HAST DU ERFAHRUNGEN MIT DISCORD BOTS?
                  </label>
                  <input
                    className={input}
                    value={serverTime}
                    onChange={(e) => setServerTime(e.target.value)}
                    placeholder="Falls ja, was weißt du darüber und welche Erfahrungen hattest du bis jetzt damit?"
                  />
                </div>

              </div>
            </div>

            {/* SITUATIONEN (NEU OPTIMIERT UI) */}
            <div>
              <h2 className={sectionTitle}>Situationsfragen</h2>

              {[
                {
                  title: "Situation 1 – Spam / Ping Spam",
                  desc: "Ein User spammt dauerhaft Nachrichten und pingt Mods oder Mitglieder."
                },
                {
                  title: "Situation 2 – Beleidigungen",
                  desc: "Zwei User beleidigen sich gegenseitig im Chat."
                },
                {
                  title: "Situation 3 – Werbung",
                  desc: "Ein User postet invites zu fremden Discord-Servern oder postet Werbung."
                },
                {
                  title: "Situation 4 – Ticket Provokation",
                  desc: "Ein User beleidigt Staff im Ticket und provoziert."
                },
                {
                  title: "Situation 5 – Falscher Channel",
                  desc: "Ein User nutzt den falschen Channel für sein Anliegen."
                }
              ].map((s, i) => {
                const state =
                  i === 0 ? situation1 :
                  i === 1 ? situation2 :
                  i === 2 ? situation3 :
                  i === 3 ? situation4 :
                  situation5

                const setter =
                  i === 0 ? setSituation1 :
                  i === 1 ? setSituation2 :
                  i === 2 ? setSituation3 :
                  i === 3 ? setSituation4 :
                  setSituation5

                return (
                  <div key={i} className="mb-10">

                    <div className="mb-4 rounded-2xl border border-purple-500/20 bg-zinc-950 p-6">

                      <div className="inline-block px-4 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 mb-3">
                        <span className="text-purple-300 font-extrabold text-sm uppercase tracking-widest">
                          {s.title}
                        </span>
                      </div>

                      <p className="text-zinc-400 text-sm border-l border-zinc-800 pl-3">
                        {s.desc}
                      </p>

                    </div>

                    <textarea
                      className={`${input} min-h-[150px]`}
                      value={state}
                      onChange={(e) => setter(e.target.value)}
                      placeholder="Beschreibe hier ausführlich deine Reaktion als Moderator..."
                    />

                  </div>
                )
              })}
            </div>

            {/* SUBMIT */}
            <button
              onClick={submitApplication}
              disabled={!isValid || sending}
              className={submitButton}
            >
              {sending ? "Wird versendet..." : "Bewerbung absenden"}
            </button>

          </div>
        )}

      </div>
    </main>
  )
}