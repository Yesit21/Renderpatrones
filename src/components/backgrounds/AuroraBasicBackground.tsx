import React from "react"

export const AuroraBasicBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Estrellas parpadeantes */}
    {Array.from({ length: 100 }).map((_, i) => (
      <div
        key={`star-${i}`}
        className="star"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 3}s`,
        }}
      />
    ))}

    {/* Aurora Boreal Verde/Azul */}
    <div
      className="aurora-layer"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.4), rgba(6, 182, 212, 0.4), transparent)",
        top: "10%",
      }}
    />
    <div
      className="aurora-layer aurora-layer-2"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), rgba(16, 185, 129, 0.3), transparent)",
        top: "20%",
      }}
    />
    <div
      className="aurora-layer aurora-layer-3"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.2), rgba(20, 184, 166, 0.2), transparent)",
        top: "30%",
      }}
    />

    {/* Nebulosas */}
    <div
      className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
        animation: "nebula-pulse 8s ease-in-out infinite",
        filter: "blur(60px)",
      }}
    />
    <div
      className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
        animation: "nebula-pulse 10s ease-in-out infinite",
        animationDelay: "2s",
        filter: "blur(60px)",
      }}
    />

    {/* Partículas cósmicas */}
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={`cosmic-${i}`}
        className="absolute w-1 h-1 bg-emerald-400 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `cosmic-drift ${10 + Math.random() * 10}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
          boxShadow: "0 0 10px rgba(16, 185, 129, 0.8)",
        }}
      />
    ))}
  </div>
)