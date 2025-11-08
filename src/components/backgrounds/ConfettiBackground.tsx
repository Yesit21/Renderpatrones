import React from "react"

export const ConfettiBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 50 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-3 h-3 rounded-sm"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          backgroundColor: ["#8b5cf6", "#a78bfa", "#c4b5fd", "#fbbf24", "#34d399"][Math.floor(Math.random() * 5)],
          animation: `confetti-fall ${3 + Math.random() * 2}s linear infinite`,
          animationDelay: `${Math.random() * 3}s`,
        }}
      />
    ))}
  </div>
)