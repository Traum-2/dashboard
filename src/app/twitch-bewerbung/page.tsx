"use client"

import { useState } from "react"
import Link from "next/link"

export default function TwitchBewerbungPage() {

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [twitchName, setTwitchName] = useState("")
  const [discordName, setDiscordName] = useState("")

  const [whyTeam, setWhyTeam] = useState("")
  const [whyTwitchMod, setWhyTwitchMod] = useState("")
  const [experience, setExperience] = useState("")
  const [activity, setActivity] = useState("")
  const [watchtime, setWatchtime] = useState("")

  const [situation1, setSituation1] = useState("")
  const [situation2, setSituation2] = useState("")
  const [situation3, setSituation3] = useState("")
  const [situation4, setSituation4] = useState("")

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const isValid =
    name.trim() &&
    age.trim() &&
    twitchName.trim() &&
    discordName.trim() &&
    whyTeam.trim() &&
    whyTwitchMod.trim() &&
    experience.trim() &&
    activity.trim() &&
    watchtime.trim() &&
    situation1.trim() &&
    situation2.trim() &&
    situation3.trim() &&
    situation4.trim()

  const outerContainer =
    "w-full max-w-6xl rounded-[40px] border border-zinc-800 bg-zinc-900/40 p-10 shadow-[0_0_60px_rgba(168,85,247,0.08)] transition duration-300 hover:border-purple-500/50 hover:shadow-[0_0_80px_rgba(168,85,247,0.18)]"

  const formContainer =
    "rounded-[32px] border border-zinc-800 bg-zinc-900 p-10 transition duration-300 hover:border-purple-500/50 hover:shadow-[0_0_45px_rgba(168,85,247,0.18)]"

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

      await fetch("/api/twitch-bewerbung", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          age,
          twitchName,
          discordName,
          whyTeam,
          whyTwitchMod,
          experience,
          activity,
          watchtime,
          situation1,
          situation2,
          situation3,
          situation4
        })
      })

      setSent(true)

      setTimeout(() => {

        setSent(false)

        setName("")
        setAge("")
        setTwitchName("")
        setDiscordName("")

        setWhyTeam("")
        setWhyTwitchMod("")
        setExperience("")
        setActivity("")
        setWatchtime("")

        setSituation1("")
        setSituation2("")
        setSituation3("")
        setSituation4("")

      }, 2500)

    } catch (error) {
      console.error(error)
    }

    setSending(false)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-24 flex items-center justify-center">

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
            Twitch Mod Bewerbung
          </h1>

          <p className="text-zinc-400 mt-5 text-xl">
            Fülle das Formular vollständig und ehrlich aus.
          </p>

        </div>

        {/* SUCCESS */}
        {sent && (
          <div className="text-center mb-10">

            <div className="text-4xl font-extrabold text-green-400">
              ✅ Bewerbung erfolgreich versendet
            </div>

            <p className="text-zinc-400 mt-4 text-lg">
              Deine Bewerbung wurde erfolgreich übermittelt.
            </p>

          </div>
        )}

        {!sent && (
          <div className={formContainer}>

            {/* BASISDATEN */}
            <div className="mb-14">

              <h2 className={sectionTitle}>
                Basisdaten
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label className={label}>
                    NAME *
                  </label>

                  <input
                    className={input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dein Name"
                  />
                </div>

                <div>
                  <label className={label}>
                    ALTER *
                  </label>

                  <input
                    className={input}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Dein Alter"
                  />
                </div>

                <div>
                  <label className={label}>
                    TWITCH NAME *
                  </label>

                  <input
                    className={input}
                    value={twitchName}
                    onChange={(e) => setTwitchName(e.target.value)}
                    placeholder="Dein Twitch Name"
                  />
                </div>

                <div>
                  <label className={label}>
                    DISCORD NAME *
                  </label>

                  <input
                    className={input}
                    value={discordName}
                    onChange={(e) => setDiscordName(e.target.value)}
                    placeholder="Dein Discord Name"
                  />
                </div>

              </div>

            </div>

            {/* FRAGEN */}
            <div className="mb-14">

              <h2 className={sectionTitle}>
                Bewerbungsfragen
              </h2>

              <div className="space-y-8">

                <div>
                  <label className={label}>
                    WARUM MÖCHTEST DU BEI TRAUM2 INS MOD-TEAM? *
                  </label>

                  <textarea
                    className={`${input} min-h-[150px]`}
                    value={whyTeam}
                    onChange={(e) => setWhyTeam(e.target.value)}
                    placeholder="Erzähle etwas über deine Motivation..."
                  />
                </div>

                <div>
                  <label className={label}>
                    WARUM MÖCHTEST DU GENAU TWITCH-MODERATOR WERDEN? *
                  </label>

                  <textarea
                    className={`${input} min-h-[150px]`}
                    value={whyTwitchMod}
                    onChange={(e) => setWhyTwitchMod(e.target.value)}
                    placeholder="Warum passt die Rolle zu dir?"
                  />
                </div>

                <div>
                  <label className={label}>
                    HAST DU BEREITS ERFAHRUNGEN? WENN JA, BEI WEM UND WELCHE? *
                  </label>

                  <textarea
                    className={`${input} min-h-[150px]`}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Beschreibe deine bisherigen Erfahrungen..."
                  />
                </div>

                <div>
                  <label className={label}>
                    WIE AKTIV BIST DU IM STREAM BZW. WIE OFT HAST DU ZEIT? *
                  </label>

                  <textarea
                    className={`${input} min-h-[140px]`}
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    placeholder="Beschreibe deine Aktivität..."
                  />
                </div>

                <div>
                  <label className={label}>
                    WIE HOCH IST DEINE AKTUELLE WATCHTIME BEI TRAUM2? ( !WT IM TWITCH CHAT ) *
                  </label>

                  <input
                    className={input}
                    value={watchtime}
                    onChange={(e) => setWatchtime(e.target.value)}
                    placeholder="Zum Beispiel: 350 Stunden"
                  />
                </div>

              </div>

            </div>

            {/* SITUATIONEN */}
            <div>

              <h2 className={sectionTitle}>
                Wie würdest du reagieren?
              </h2>

              <div className="space-y-5">

                {/* SITUATION 1 */}
                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]">

                  <h3 className="text-2xl font-bold mb-4">
                    🚨 Situation 1
                  </h3>

                  <div className="mb-4 rounded-2xl border border-zinc-800 bg-[#18181b] p-4 space-y-1.5">

                    <div className="flex gap-2">
                      <span className="text-purple-400 font-bold">
                        traum2fan123:
                      </span>

                      <span className="text-white">
                        Traum2 komm 1v1
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-purple-400 font-bold">
                        traum2fan123:
                      </span>

                      <span className="text-white">
                        @Traum2 bitte 1v1
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-purple-400 font-bold">
                        traum2fan123:
                      </span>

                      <span className="text-white">
                        Traum komm jz 1v1 los
                      </span>
                    </div>

                  </div>

                  <textarea
                    className={`${input} min-h-[120px]`}
                    value={situation1}
                    onChange={(e) => setSituation1(e.target.value)}
                    placeholder="Wie würdest du reagieren?"
                  />

                </div>

                {/* SITUATION 2 */}
                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]">

                  <h3 className="text-2xl font-bold mb-4">
                    🚨 Situation 2
                  </h3>

                  <div className="mb-4 rounded-2xl border border-zinc-800 bg-[#18181b] p-4 space-y-1.5">

                    <div className="flex gap-2">
                      <span className="text-green-400 font-bold">
                        xXFlashGamerXx:
                      </span>

                      <span className="text-white text-xl">
                        😂 😂 😂 😂 😂 😂 😂 😂
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-green-400 font-bold">
                        xXFlashGamerXx:
                      </span>

                      <span className="text-white text-xl">
                        😂 😂 😂 😂 😂 😂 😂 😂
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-green-400 font-bold">
                        xXFlashGamerXx:
                      </span>

                      <span className="text-white text-xl">
                        😂 😂 😂 😂 😂 😂 😂 😂
                      </span>
                    </div>

                  </div>

                  <textarea
                    className={`${input} min-h-[120px]`}
                    value={situation2}
                    onChange={(e) => setSituation2(e.target.value)}
                    placeholder="Wie würdest du reagieren?"
                  />

                </div>

                {/* SITUATION 3 */}
                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]">

                  <h3 className="text-2xl font-bold mb-4">
                    🚨 Situation 3
                  </h3>

                  <div className="mb-4 rounded-2xl border border-zinc-800 bg-[#18181b] p-4 space-y-1.5">

                    <div className="flex gap-2">
                      <span className="text-red-400 font-bold">
                        toxicviewer999:
                      </span>

                      <span className="text-white">
                        dein stream ist langweilig
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-red-400 font-bold">
                        toxicviewer999:
                      </span>

                      <span className="text-white">
                        geh lieber offline
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-red-400 font-bold">
                        toxicviewer999:
                      </span>

                      <span className="text-white">
                        dich mag eh keiner
                      </span>
                    </div>

                  </div>

                  <textarea
                    className={`${input} min-h-[120px]`}
                    value={situation3}
                    onChange={(e) => setSituation3(e.target.value)}
                    placeholder="Wie würdest du reagieren?"
                  />

                </div>

                {/* SITUATION 4 */}
                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]">

                  <h3 className="text-2xl font-bold mb-4">
                    🚨 Situation 4
                  </h3>

                  <div className="mb-4 rounded-2xl border border-zinc-800 bg-[#18181b] p-4 space-y-1.5">

                    <div className="flex gap-2">
                      <span className="text-yellow-400 font-bold">
                        viewerone:
                      </span>

                      <span className="text-white">
                        @viewertwo du hast doch keine Ahnung
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-blue-400 font-bold">
                        viewertwo:
                      </span>

                      <span className="text-white">
                        @viewerone sei halt einfach ruhig
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-yellow-400 font-bold">
                        viewerone:
                      </span>

                      <span className="text-white">
                        @viewertwo heul halt hä
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-blue-400 font-bold">
                        viewertwo:
                      </span>

                      <span className="text-white">
                        @viewerone keiner redet mit dir
                      </span>
                    </div>

                  </div>

                  <textarea
                    className={`${input} min-h-[120px]`}
                    value={situation4}
                    onChange={(e) => setSituation4(e.target.value)}
                    placeholder="Wie würdest du reagieren?"
                  />

                </div>

              </div>

            </div>

            {/* SUBMIT */}
            <button
              onClick={submitApplication}
              disabled={!isValid || sending}
              className={submitButton}
            >
              {sending
                ? "Wird versendet..."
                : "Bewerbung absenden"}
            </button>

          </div>
        )}

      </div>

    </main>
  )
}