import React from "react"

export const VortexBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Vórtice principal */}
    <div
      className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
        animation: "vortex-spin 20s linear infinite",
      }}
    />
    <div
      className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(109, 40, 217, 0.4) 0%, transparent 70%)",
        animation: "vortex-spin 15s linear infinite reverse",
      }}
    />
    {/* Partículas flotantes */}
    {Array.from({ length: 30 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-purple-500 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float-gentle ${5 + Math.random() * 5}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
          opacity: 0.6,
        }}
      />
    ))}
  </div>
)