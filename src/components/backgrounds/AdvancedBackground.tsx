import React from "react"

export const AdvancedBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
    <div
      className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: "1s" }}
    />
    <div
      className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-500/15 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: "2s" }}
    />
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="absolute bottom-0 w-16 h-32 rounded-full"
        style={{
          left: `${i * 5}%`,
          background: "linear-gradient(to top, rgba(249, 115, 22, 0.8), rgba(239, 68, 68, 0.4), transparent)",
          animation: `flame-flicker ${1 + Math.random()}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`,
          filter: "blur(8px)",
        }}
      />
    ))}
    {Array.from({ length: 25 }).map((_, i) => (
      <div
        key={`spark-${i}`}
        className="absolute bottom-0 w-3 h-3 bg-orange-400 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          animation: `flame-rise ${3 + Math.random() * 2}s ease-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
          filter: "blur(1px)",
        }}
      />
    ))}
  </div>
)