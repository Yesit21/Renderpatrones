import React from "react"

export const FuturisticGridBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        animation: "grid-pulse 3s ease-in-out infinite",
      }}
    />
    <div
      className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent"
      style={{
        animation: "grid-scan 4s linear infinite",
      }}
    />
  </div>
)