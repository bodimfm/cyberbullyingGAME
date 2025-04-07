import { Suspense } from "react"
import GameContainer from "@/components/game-container"
import LoadingScreen from "@/components/loading-screen"
import Header from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4 pt-24 pb-12">
        <Suspense fallback={<LoadingScreen />}>
          <GameContainer />
        </Suspense>
      </div>
    </main>
  )
}

