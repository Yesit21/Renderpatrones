import React from "react"

export const EnergyWaveBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-500"
        style={{
          animation: `energy-wave ${3 + i}s ease-out infinite`,
          animationDelay: `${i * 0.6}s`,
        }}
      />
    ))}
  </div>
)