import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Sparkles, Flame, Zap } from "lucide-react"
import { EnergyWaveBackground } from "@/components/backgrounds"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

type DeckLevel = "Básico" | "Avanzado" | "Experto"

interface DeckSelectScreenProps {
  onNavigate: (screen: string) => void
  onSelectDeck: (deck: DeckLevel) => void
  onGenerateEquation: (score: number, setScore: (score: number) => void, setRound: (round: number) => void, round: number) => void
}

export const DeckSelectScreen: React.FC<DeckSelectScreenProps> = ({
  onNavigate,
  onSelectDeck,
  onGenerateEquation,
}) => {
  const { t } = useLanguage()

  const decks = [
    {
      level: "Básico" as DeckLevel,
      icon: Sparkles,
      title: t("basic"),
      description: t("basicDesc"),
      difficulty: "Nivel 1",
      gradient: "from-emerald-950/90 via-teal-950/90 to-emerald-950/90",
      borderColor: "emerald-500/30",
      hoverBorder: "emerald-400/60",
      glow: "rgba(16,185,129,0.5)",
      textColor: "emerald-300",
      levelIndicator: [1],
    },
    {
      level: "Avanzado" as DeckLevel,
      icon: Flame,
      title: t("advanced"),
      description: t("advancedDesc"),
      difficulty: "Nivel 2",
      gradient: "from-orange-950/90 via-red-950/90 to-orange-950/90",
      borderColor: "orange-500/30",
      hoverBorder: "orange-400/60",
      glow: "rgba(249,115,22,0.5)",
      textColor: "orange-300",
      levelIndicator: [1, 2],
    },
    {
      level: "Experto" as DeckLevel,
      icon: Zap,
      title: t("expert"),
      description: t("expertDesc"),
      difficulty: "Nivel 3",
      gradient: "from-black/90 via-gray-900/90 to-black/90",
      borderColor: "cyan-500/30",
      hoverBorder: "cyan-400/60",
      glow: "rgba(6,182,212,0.5)",
      textColor: "cyan-300",
      levelIndicator: [1, 2, 3],
    },
  ]

  return (
    <motion.div
      className="relative min-h-screen p-8"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      <EnergyWaveBackground />
      <div className="relative z-10">
        <Button variant="ghost" onClick={() => onNavigate("menu")} className="mb-4">
          <ArrowLeft className="mr-2" /> {t("back")}
        </Button>
        <motion.h2
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t("selectDeck")}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {decks.map((deck, index) => {
            const Icon = deck.icon
            return (
              <motion.div
                key={deck.level}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.08,
                  rotateY: 5,
                  z: 50,
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
                className="cursor-pointer group"
                onClick={() => {
                  onSelectDeck(deck.level)
                  onNavigate("game")
                  onGenerateEquation(50, () => {}, () => {}, 1)
                }}
              >
                <Card className={`relative overflow-hidden bg-gradient-to-br ${deck.gradient} backdrop-blur-xl border-2 border-${deck.borderColor} hover:border-${deck.hoverBorder} transition-all duration-300 p-8 h-full`}>
                  {/* Animated glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${deck.textColor.replace('300', '500')}/10 via-transparent to-${deck.textColor.replace('300', '500')}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-current rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [-20, -40, -20],
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                    {/* Icon with glow */}
                    <motion.div
                      className="relative"
                      animate={{
                        rotate: deck.level === "Experto" ? [0, 360] : deck.level === "Avanzado" ? [1, 1.1, 1] : [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: deck.level === "Experto" ? 4 : 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <div className={`absolute inset-0 bg-current/30 blur-xl rounded-full animate-pulse`} />
                      <Icon className={`w-16 h-16 text-${deck.textColor} relative z-10`} />
                    </motion.div>

                    {/* Title */}
                    <h3 className={`text-3xl font-bold text-${deck.textColor} drop-shadow-[0_0_10px_${deck.glow}]`}>
                      {deck.title}
                    </h3>

                    {/* Level indicator */}
                    <div className="flex gap-2">
                      {deck.levelIndicator.map((level) => (
                        <div
                          key={level}
                          className={`w-3 h-3 rounded-full bg-${deck.textColor.replace('300', '400')} shadow-[0_0_10px_${deck.glow.replace('0.5', '0.8')}]`}
                        />
                      ))}
                      {deck.level === "Básico" && [2, 3].map((level) => (
                        <div
                          key={level}
                          className={`w-3 h-3 rounded-full bg-${deck.textColor.replace('300', '900')}/50 border border-${deck.textColor.replace('300', '700')}/50`}
                        />
                      ))}
                      {deck.level === "Avanzado" && [3].map((level) => (
                        <div
                          key={level}
                          className={`w-3 h-3 rounded-full bg-${deck.textColor.replace('300', '900')}/50 border border-${deck.textColor.replace('300', '700')}/50`}
                        />
                      ))}
                    </div>

                    {/* Description */}
                    <p className={`text-${deck.textColor}/80 text-sm leading-relaxed`}>{deck.description}</p>

                    {/* Difficulty badge */}
                    <div className={`px-4 py-1.5 bg-current/20 border border-current/40 rounded-full text-xs font-semibold text-${deck.textColor}`}>
                      {deck.difficulty}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}