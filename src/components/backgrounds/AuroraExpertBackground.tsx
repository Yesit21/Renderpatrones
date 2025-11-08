import React from "react"

export const AuroraExpertBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Estrellas parpadeantes */}
    {Array.from({ length: 150 }).map((_, i) => (
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

    {/* Aurora Boreal Multicolor */}
    <div
      className="aurora-layer"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), rgba(236, 72, 153, 0.5), rgba(234, 179, 8, 0.5), transparent)",
        top: "10%",
        animation: "aurora-wave 15s ease-in-out infinite, aurora-shimmer 10s ease-in-out infinite",
      }}
    />
    <div
      className="aurora-layer aurora-layer-2"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.4), rgba(234, 179, 8, 0.4), rgba(6, 182, 212, 0.4), transparent)",
        top: "20%",
        animation: "aurora-wave 20s ease-in-out infinite, aurora-shimmer 12s ease-in-out infinite",
      }}
    />
    <div
      className="aurora-layer aurora-layer-3"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(0.3), rgba(6, 182, 212, 0.3), rgba(236, 72, 153, 0.3), transparent)",
        top: "30%",
        animation: "aurora-wave 25s ease-in-out infinite, aurora-shimmer 15s ease-in-out infinite",
      }}
    />

    {/* Órbitas de luz */}
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={`orbit-${i}`}
        className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full"
        style={{
          background: ["cyan", "magenta", "yellow"][i % 3],
          animation: `glow-orbit ${8 + i * 2}s linear infinite`,
          animationDelay: `${i * 1.5}s`,
          boxShadow: `0 0 20px ${["cyan", "magenta", "yellow"][i % 3]}`,
        }}
      />
    ))}

    {/* Plasma multicolor */}
    <div
      className="plasma-blob"
      style={{
        top: "30%",
        left: "30%",
        background:
          "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)",
      }}
    />
    <div
      className="plasma-blob"
      style={{
        bottom: "30%",
        right: "30%",
        background:
          "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(234, 179, 8, 0.2) 50%, transparent 70%)",
        animationDelay: "7s",
      }}
    />

    {/* Flujo de aurora */}
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={`flow-${i}`}
        className="absolute w-full h-32"
        style={{
          top: `${20 + i * 15}%`,
          background: `linear-gradient(90deg, transparent, ${["rgba(6, 182, 212, 0.2)", "rgba(236, 72, 153, 0.2)", "rgba(234, 179, 8, 0.2)"][i % 3]}, transparent)`,
          animation: `aurora-flow ${10 + i * 2}s linear infinite`,
          animationDelay: `${i * 2}s`,
          filter: "blur(40px)",
        }}
      />
    ))}
  </div>
)