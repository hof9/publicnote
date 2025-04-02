import LotteryGame from "@/components/lottery-game"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">Lucky Draw Lottery</h1>
        <p className="text-gray-600 text-center mb-8">Select your lucky numbers and try your luck!</p>
        <LotteryGame />
      </div>
    </main>
  )
}

