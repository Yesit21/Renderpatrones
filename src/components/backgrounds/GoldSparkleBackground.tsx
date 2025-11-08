import React from "react"

export const GoldSparkleBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.1) 0%, transparent 70%)",
      }}
    />
    {Array.from({ length: 40 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-yellow-400 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `gold-sparkle ${2 + Math.random() * 3}s ease-out infinite`,
          animationDelay: `${Math.random() * 2}s`,
          boxShadow: "0 0 4px rgba(234, 179, 8, 0.8)",
        }}
      />
    ))}
  </div>
)