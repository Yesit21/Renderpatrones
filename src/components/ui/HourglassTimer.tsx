import React from "react"
import { motion } from "framer-motion"

interface HourglassTimerProps {
  timeRemaining: number
}

export const HourglassTimer: React.FC<HourglassTimerProps> = ({ timeRemaining }) => (
  <motion.div
    className="flex flex-col items-center gap-2"
    animate={{ rotate: timeRemaining % 2 === 0 ? 0 : 180 }}
    transition={{ duration: 1 }}
  >
    <div className="relative w-16 h-20">
      <div
        className="absolute inset-0 border-4 border-cyan-400 rounded-t-full"
        style={{ clipPath: "polygon(20% 0%, 80% 0%, 50% 50%)" }}
      />
      <div
        className="absolute inset-0 border-4 border-cyan-400 rounded-b-full"
        style={{ clipPath: "polygon(50% 50%, 20% 100%, 80% 100%)" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 bg-yellow-400 rounded-full"
        style={{ height: `${(timeRemaining / 30) * 100}%` }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
    <div className="text-2xl font-bold text-cyan-400">{timeRemaining}s</div>
  </motion.div>
)