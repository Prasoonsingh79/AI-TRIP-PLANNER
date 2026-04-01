import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-24 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex flex-col text-center space-y-8 glass p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md bg-white/5">
        <h1 className="text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-fuchsia-400 mb-4">
          AI Trip Planner
        </h1>
        <p className="text-xl max-w-2xl text-slate-300 font-sans">
          Your personal smart travel companion. Generate personalized trip plans, discover unique recommendations, and experience seamless journeys powered by AI.
        </p>

        <div className="flex gap-4 mt-8 flex-col sm:flex-row font-sans">
          <Link href="/planner">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-fuchsia-600 hover:from-blue-500 hover:to-fuchsia-500 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-cyan-500/25 transition-all w-full sm:w-auto">
              Start Planning
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10 text-white rounded-full px-8 py-6 text-lg transition-all w-full sm:w-auto">
              Ask AI Assistant
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full font-sans text-left">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">🌍</div>
            <h3 className="text-xl font-bold mb-2">Smart Itineraries</h3>
            <p className="text-slate-400">Instantly generate day-by-day plans tailored to your budget and interests.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center mb-4">🏨</div>
            <h3 className="text-xl font-bold mb-2">Curated Stays</h3>
            <p className="text-slate-400">Discover the best places to stay and eat, handpicked for your preferences.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">24/7 Assistant</h3>
            <p className="text-slate-400">Have questions on the go? Our AI chat assistant is always ready to help.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
