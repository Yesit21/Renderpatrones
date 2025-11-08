import React from "react"

export const FlameVortexBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Niebla en vórtice */}
    <div
      className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(88, 28, 135, 0.4) 0%, rgba(59, 7, 100, 0.2) 50%, transparent 70%)",
        animation: "fog-vortex 25s linear infinite",
        filter: "blur(40px)",
      }}
    />
    <div
      className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(109, 40, 217, 0.3) 0%, transparent 70%)",
        animation: "fog-vortex 20s linear infinite reverse",
        filter: "blur(30px)",
      }}
    />
    {/* Llamas púrpura */}
    {Array.from({ length: 15 }).map((_, i) => (
      <div
        key={i}
        className="absolute bottom-0 w-16 h-32 rounded-full"
        style={{
          left: `${i * 5}%`,
          background: "linear-gradient(to top, rgba(139, 92, 246, 0.8), rgba(109, 40, 217, 0.4), transparent)",
          animation: `flame-flicker ${1 + Math.random()}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`,
          filter: "blur(8px)",
        }}
      />
    ))}
    {/* Partículas de fuego ascendentes */}
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={`fire-${i}`}
        className="absolute bottom-0 w-3 h-3 bg-purple-400 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          animation: `flame-rise ${3 + Math.random() * 2}s ease-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
          filter: "blur(2px)",
        }}
      />
    ))}
  </div>
)