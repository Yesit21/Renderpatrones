import React from "react"

export const SmokeBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="absolute bottom-0 w-64 h-64 rounded-full"
        style={{
          left: `${i * 15}%`,
          background: "radial-gradient(circle, rgba(88, 28, 135, 0.4) 0%, transparent 70%)",
          animation: `smoke-rise ${8 + Math.random() * 4}s ease-out infinite`,
          animationDelay: `${Math.random() * 4}s`,
          filter: "blur(30px)",
        }}
      />
    ))}
  </div>
)