import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import Topbar from "@/components/Topbar"

export default async function Dashboard() {
  const session = await getServerSession()

  // 🔒 HARTE AUTH ABSICHERUNG (KEIN WHITE SCREEN / KEIN HÄNGEN)
  if (!session) {
  redirect("/")
}

  const hoverEffect =
    "transition duration-200 " +
    "hover:scale-[1.03] " +
    "hover:bg-zinc-800/60 " +
    "hover:border-purple-500/60 " +
    "hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] " +
    "cursor-pointer"

  const panelHover =
    "transition duration-200 " +
    "hover:scale-[1.01] " +
    "hover:border-purple-500/50 " +
    "hover:shadow-[0_0_40px_rgba(168,85,247,0.20)]"

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute top-[-200px] left-[-200px] w-[450px] h-[450px] bg-indigo-500/10 blur-[60px] rounded-full" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[450px] h-[450px] bg-purple-500/10 blur-[60px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-10 py-12">

        {/* TOPBAR */}
        <Topbar session={session} />

        {/* HERO */}
        <div className="mt-28 text-center">

          <div className="text-7xl mb-6">🏠</div>

          <div className="inline-flex px-5 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-sm mb-6">
            🚀 TRAUM2 COMMUNITY HUB
          </div>

          <h2 className="text-7xl font-extrabold tracking-tight">
            Alles an einem Ort,
          </h2>

          <p className="text-purple-400 mt-4 text-2xl font-semibold">
            im Traum2 Dashboard
          </p>

          <p className="text-zinc-400 mt-6 text-xl max-w-3xl mx-auto">
            Community, Bewerbungen, Staff-Team, Socials und Live-Daten.
          </p>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-24 items-stretch">

          {/* COMMUNITY PANEL */}
          <div className={`lg:col-span-2 rounded-[36px] border border-zinc-800 bg-zinc-900 p-10 ${panelHover}`}>

            <div className="flex items-center justify-between mb-12">

              <div>
                <p className="text-zinc-400 text-base">Verwaltung</p>
                <h3 className="text-4xl font-bold">Community Tools</h3>
              </div>

              <div className="text-5xl">⚡</div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <Link href="/staff">
                <div className={`rounded-3xl border border-zinc-800 bg-zinc-800 p-8 ${hoverEffect}`}>
                  <div className="text-4xl">👥</div>
                  <h4 className="text-2xl font-semibold mt-6">Staff-Team</h4>
                  <p className="text-zinc-400 text-base mt-2">
                    Übersicht aller Teammitglieder
                  </p>
                </div>
              </Link>

              <Link href="/feedback">
                <div className={`rounded-3xl border border-zinc-800 bg-zinc-800 p-8 ${hoverEffect}`}>
                  <div className="text-4xl">💡</div>
                  <h4 className="text-2xl font-semibold mt-6">Community-Feedback</h4>
                  <p className="text-zinc-400 text-base mt-2">
                    Bugs, Vorschläge & Beschwerden
                  </p>
                </div>
              </Link>

            </div>

          </div>

          {/* SOCIALS */}
          <Link href="/socials" className="h-full">
            <div className={`rounded-[36px] border border-zinc-800 bg-zinc-900 p-8 h-full flex flex-col justify-between ${hoverEffect}`}>

              <div>
                <div className="text-5xl mb-6">🌐</div>

                <h3 className="text-2xl font-bold mb-6">
                  Socials
                </h3>

                <div className="space-y-3 text-zinc-300 text-lg">
                  <p>• Twitch</p>
                  <p>• Discord</p>
                  <p>• YouTube</p>
                </div>

              </div>

            </div>
          </Link>

        </div>

        {/* SECOND ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

          <Link href="/twitch-bewerbung">
            <div className={`rounded-[32px] border border-zinc-800 bg-zinc-900 p-8 ${hoverEffect}`}>
              <div className="text-4xl">🎮</div>
              <h3 className="text-2xl font-bold mt-6">Twitch Bewerbung</h3>
              <p className="text-zinc-400 mt-2 text-base">
                Moderator Bewerbung für Twitch
              </p>
            </div>
          </Link>

          <Link href="/discord-bewerbung">
            <div className={`rounded-[32px] border border-zinc-800 bg-zinc-900 p-8 ${hoverEffect}`}>
              <div className="text-4xl">💬</div>
              <h3 className="text-2xl font-bold mt-6">Discord Bewerbung</h3>
              <p className="text-zinc-400 mt-2 text-base">
                Werde Teil des Discord Teams
              </p>
            </div>
          </Link>

        </div>

      </div>
    </main>
  )
}