import Link from "next/link"

export default function SocialsPage() {

  const card =
    "rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition duration-300 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.20)] hover:-translate-y-1"

  const button =
    "mt-5 px-5 py-3 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition"

  const iconWrap = "w-14 h-14"

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-20 flex items-center justify-center">

      {/* OUTER BIG CONTAINER */}
      <div className="w-full max-w-6xl rounded-[40px] border border-zinc-800 bg-zinc-900/40 p-10 shadow-[0_0_60px_rgba(168,85,247,0.08)]">

        {/* BACK BUTTON */}
        <div className="mb-10 flex justify-center">
          <Link href="/dashboard">
            <button className="px-6 py-3 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-purple-500/60 transition font-bold">
              ⟵ Zurück zum Dashboard
            </button>
          </Link>
        </div>

        {/* TITLE */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold">
            Überblick über meine sozialen Kanäle
          </h1>
          <p className="text-zinc-400 mt-4">
            Alle Plattformen an einem Ort
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* YOUTUBE */}
          <div className={card}>
            <img
              className={iconWrap}
              src="https://cdn.simpleicons.org/youtube/FF0000"
              alt="YouTube"
            />

            <h2 className="text-2xl font-bold mt-5">YouTube</h2>
            <p className="text-zinc-400 mt-2">
              Videos, Streams & Highlights
            </p>

            <a href="https://www.youtube.com/@Traum_2" target="_blank">
              <button className={button}>
                Ansehen
              </button>
            </a>
          </div>

          {/* TWITCH */}
          <div className={card}>
            <img
              className={iconWrap}
              src="https://cdn.simpleicons.org/twitch/9146FF"
              alt="Twitch"
            />

            <h2 className="text-2xl font-bold mt-5">Twitch</h2>
            <p className="text-zinc-400 mt-2">
              Live Streams & Community
            </p>

            <a href="https://www.twitch.tv/traum2" target="_blank">
              <button className={button}>
                Ansehen
              </button>
            </a>
          </div>

          {/* DISCORD */}
          <div className={card}>
            <img
              className={iconWrap}
              src="https://cdn.simpleicons.org/discord/5865F2"
              alt="Discord"
            />

            <h2 className="text-2xl font-bold mt-5">Discord</h2>
            <p className="text-zinc-400 mt-2">
              Community Server & Chat
            </p>

            <a href="https://discord.gg/9yaA4JhFkd" target="_blank">
              <button className={button}>
                Ansehen
              </button>
            </a>
          </div>

        </div>

      </div>
    </main>
  )
}