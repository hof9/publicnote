"use client"

import type React from "react"

import { Star, PlusCircle } from "lucide-react"
import { cn } from "@/components/lib/utils"
import { motion } from "framer-motion"

interface PlaceValueContainerProps {
  type: "hundreds" | "tens" | "ones"
  count: number
  onContainerClick: () => void
  onStarClick: () => void
  color: string
  borderColor: string
  label: string
  isFull: boolean
}

export default function PlaceValueContainer({
  type,
  count,
  onContainerClick,
  onStarClick,
  color,
  borderColor,
  label,
  isFull,
}: PlaceValueContainerProps) {
  const handleContainerClick = (e: React.MouseEvent) => {
    // Only trigger if clicking the container itself, not a star
    if ((e.target as HTMLElement).closest(".star-item") === null) {
      onContainerClick()
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-base sm:text-lg font-bold mb-1 text-black">{label}</h2>
      <div
        className={cn(
          "w-full h-28 sm:h-32 border-3 rounded-lg p-1.5 transition-colors flex flex-wrap content-start gap-1.5 relative",
          color,
          borderColor,
          isFull ? "opacity-70" : "",
          !isFull ? "cursor-pointer hover:bg-gray-50 active:bg-gray-100" : "",
        )}
        style={{ minWidth: "100px", maxWidth: "150px" }}
        onClick={!isFull ? handleContainerClick : undefined}
      >
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center cursor-pointer star-item"
            onClick={(e) => {
              e.stopPropagation()
              onStarClick()
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Star className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-500 fill-yellow-400 drop-shadow-md" />
          </motion.div>
        ))}

        {count === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 pointer-events-none">
            <PlusCircle className="w-8 h-8 mb-1 opacity-70" />
            <p className="text-center text-xs sm:text-sm">Click to add</p>
          </div>
        )}

        {isFull && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black bg-opacity-20 rounded-lg px-3 py-1">
              <p className="text-white font-bold text-xs sm:text-sm">Full!</p>
            </div>
          </div>
        )}
      </div>
      <p className="mt-1 text-sm sm:text-base font-medium text-gray-700">
        {count} × {type === "hundreds" ? "100" : type === "tens" ? "10" : "1"}
      </p>
    </div>
  )
}
