import React from "react"

export const AuroraAdvancedBackground: React.FC = () => (
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

    {/* Aurora Boreal Naranja/Roja */}
    <div
      className="aurora-layer"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.5), rgba(239, 68, 68, 0.5), transparent)",
        top: "10%",
      }}
    />
    <div
      className="aurora-layer aurora-layer-2"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.4), rgba(234, 179, 8, 0.4), transparent)",
        top: "20%",
      }}
    />
    <div
      className="aurora-layer aurora-layer-3"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.3), rgba(249, 115, 22, 0.3), transparent)",
        top: "30%",
      }}
    />

    {/* Rayos de luz */}
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={`beam-${i}`}
        className="light-beam"
        style={{
          left: `${i * 12}%`,
          background: "linear-gradient(to bottom, transparent, rgba(249, 115, 22, 0.6), transparent)",
          animationDelay: `${i * 1}s`,
        }}
      />
    ))}

    {/* Plasma blobs */}
    <div
      className="plasma-blob"
      style={{
        top: "20%",
        left: "20%",
        background: "radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%)",
      }}
    />
    <div
      className="plasma-blob"
      style={{
        bottom: "20%",
        right: "20%",
        background: "radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)",
        animationDelay: "5s",
      }}
    />

    {/* Ondas de energía */}
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={`ripple-${i}`}
        className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange-500/30"
        style={{
          animation: `ripple-expand ${3 + i * 0.5}s ease-out infinite`,
          animationDelay: `${i * 0.6}s`,
        }}
      />
    ))}
  </div>
)