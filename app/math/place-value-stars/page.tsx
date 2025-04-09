import PlaceValueGame from "@/components/place-value-game"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black mb-2 sm:mb-4">
          Place Value Stars
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-center text-gray-700 max-w-2xl mb-4">
          Click directly on the hundreds, tens, and ones boxes to add stars!
        </p>
        <PlaceValueGame />
      </div>
    </div>
  )
}
