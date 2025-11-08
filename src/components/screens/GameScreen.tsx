import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Minus, X, Divide, BookOpen, CheckCircle2, XCircle, LogOut } from "lucide-react"
import { HourglassTimer } from "@/components/ui/HourglassTimer"
import { AuroraBasicBackground, AuroraAdvancedBackground, AuroraExpertBackground } from "@/components/backgrounds"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { generateSolutionSteps, getDeckStyles, type Equation } from "@/lib/gameUtils"

type DeckLevel = "Básico" | "Avanzado" | "Experto"

interface GameScreenProps {
  currentEquation: Equation | null
  userAnswer: string
  isAnalyzed: boolean
  feedback: "correct" | "incorrect" | null
  timeRemaining: number
  isTimerActive: boolean
  showHint: string | null
  hintStep: 1 | 2 | 3 | 4 | null
  score: number
  round: number
  selectedDeck: DeckLevel
  onUserAnswerChange: (answer: string) => void
  onCheckAnswer: () => void
  onHintClick: (step: 1 | 2 | 3 | 4) => void
  onNextEquation: () => void
  onNavigate: (screen: string) => void
  onLogout: () => void
}

export const GameScreen: React.FC<GameScreenProps> = ({
  currentEquation,
  userAnswer,
  isAnalyzed,
  feedback,
  timeRemaining,
  isTimerActive,
  showHint,
  hintStep,
  score,
  round,
  selectedDeck,
  onUserAnswerChange,
  onCheckAnswer,
  onHintClick,
  onNextEquation,
  onNavigate,
  onLogout,
}) => {
  const { t } = useLanguage()
  const styles = getDeckStyles(selectedDeck)

  const getDeckBackground = () => {
    switch (selectedDeck) {
      case "Básico":
        return <AuroraBasicBackground />
      case "Avanzado":
        return <AuroraAdvancedBackground />
      case "Experto":
        return <AuroraExpertBackground />
    }
  }

  return (
    <motion.div
      className={`relative min-h-screen p-4 bg-gradient-to-br ${styles.bgGradient}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {getDeckBackground()}

      <div className="relative z-10">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="absolute top-4 right-4 z-20 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 hover:text-red-300"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Salir
        </Button>

        <motion.div
          className={`flex justify-between items-center mb-6 bg-gradient-to-r from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-xl p-6 rounded-2xl border-2 border-${styles.borderColor} shadow-[0_0_30px_${styles.glowColor}]`}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex gap-8">
            <div className="text-center">
              <p className={`text-sm text-${styles.primaryColor}-400 uppercase tracking-wider`}>Nivel</p>
              <p className="text-3xl font-bold text-white">{selectedDeck}</p>
            </div>
            <motion.div
              className="text-center"
              key={score}
              initial={{ scale: 1.5, color: "#fbbf24" }}
              animate={{ scale: 1, color: "#ffffff" }}
              transition={{ duration: 0.3 }}
            >
              <p className={`text-sm text-${styles.accentColor}-400 uppercase tracking-wider`}>{t("points")}</p>
              <p className="text-3xl font-bold text-white">{score}</p>
            </motion.div>
            <div className="text-center">
              <p className={`text-sm text-${styles.secondaryColor}-400 uppercase tracking-wider`}>Ronda</p>
              <p className="text-3xl font-bold text-white">{round}</p>
            </div>
          </div>
          {timeRemaining > 0 && <HourglassTimer timeRemaining={timeRemaining} />}
        </motion.div>

        <AnimatePresence mode="wait">
          {currentEquation && (
            <motion.div
              key={currentEquation.result}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className={`p-8 mb-6 max-w-2xl mx-auto bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl border-2 border-${styles.borderColor} shadow-[0_0_40px_${styles.glowColor}]`}
              >
                <div className="text-center space-y-6">
                  <div
                    className={`text-4xl font-bold text-white`}
                    style={{
                      textShadow: `0 0 20px ${styles.glowColor}`,
                      fontFamily: 'monospace'
                    }}
                  >
                    {currentEquation.term3 !== undefined &&
                    currentEquation.term4 !== undefined &&
                    currentEquation.op1 &&
                    currentEquation.op2 ? (
                      // Ecuación híbrida avanzada: ax op1 b op2 c + d = e
                      <>
                        {currentEquation.term1}
                        {currentEquation.variable}{" "}
                        {currentEquation.op1 === "*"
                          ? "×"
                          : currentEquation.op1 === "/"
                            ? "÷"
                            : currentEquation.op1}{" "}
                        {currentEquation.term2}{" "}
                        {currentEquation.op2 === "*"
                          ? "×"
                          : currentEquation.op2 === "/"
                            ? "÷"
                            : currentEquation.op2}{" "}
                        {currentEquation.term3} + {currentEquation.term4} = {currentEquation.result}
                      </>
                    ) : (
                      // Ecuación normal: ax op b = c
                      <>
                        {currentEquation.term1}
                        {currentEquation.variable}{" "}
                        {currentEquation.operation === "*"
                          ? "×"
                          : currentEquation.operation === "/"
                            ? "÷"
                            : currentEquation.operation}{" "}
                        {currentEquation.term2} = {currentEquation.result}
                      </>
                    )}
                  </div>

                  {!isAnalyzed && (
                    <Input
                      type="number"
                      placeholder="x = ?"
                      value={userAnswer}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserAnswerChange(e.target.value)}
                      className={`text-2xl text-center bg-black/50 border-2 border-${styles.borderColor} text-white placeholder:text-gray-500 focus:border-${styles.primaryColor}-400`}
                    />
                  )}

                  {isAnalyzed && (
                    <div className={`text-2xl text-${styles.accentColor}-400 font-bold`}>
                      x = {currentEquation.solution.toFixed(2)}
                    </div>
                  )}
                </div>
              </Card>

              {!isAnalyzed && (
                <div className="flex justify-center mb-6">
                  <Button
                    onClick={onCheckAnswer}
                    className={`bg-gradient-to-r ${styles.buttonGradient} hover:${styles.buttonHover} text-white font-bold text-xl px-12 py-6 rounded-xl shadow-[0_0_20px_${styles.shadow}] transition-all duration-200 hover:scale-105`}
                  >
                    {t("checkAnswer")}
                  </Button>
                </div>
              )}

              <AnimatePresence>
                {isAnalyzed && (
                  <motion.div
                    className="max-w-2xl mx-auto mb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {feedback === "correct" && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="bg-green-500/20 border-2 border-green-500 rounded-xl p-6"
                      >
                        <p className="text-3xl font-bold text-green-400 mb-2">¡Correcto! +10 puntos</p>
                        <p className="text-green-300">¡Excelente trabajo!</p>
                      </motion.div>
                    )}
                    {feedback === "incorrect" && (
                      <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="bg-red-500/20 border-2 border-red-500 rounded-xl p-6"
                      >
                        <p className="text-3xl font-bold text-red-400 mb-2">Incorrecto -10 puntos</p>
                        <p className="text-red-300">Intenta de nuevo en la siguiente</p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="flex justify-center gap-6 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { Icon: Plus, step: 1 as const, label: t("addition"), index: 0 },
            { Icon: Minus, step: 2 as const, label: t("subtraction"), index: 1 },
            { Icon: X, step: 3 as const, label: t("multiplication"), index: 2 },
            { Icon: Divide, step: 4 as const, label: t("division"), index: 3 },
          ].map(({ Icon, step, label, index }, idx) => {
            const colors = [
              styles.buttonGradient,
              `from-${styles.secondaryColor}-500 to-${styles.secondaryColor}-600`,
              `from-${styles.accentColor}-500 to-${styles.accentColor}-600`,
              `from-green-500 to-green-600`,
            ]
            const isSelected = hintStep === step
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.9, rotate: -10 }}
                className="relative"
              >
                <Button
                  onClick={() => onHintClick(step)}
                  disabled={!currentEquation || isAnalyzed}
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${colors[index]} hover:opacity-90 text-white font-bold transition-all duration-200 border-2 ${
                    isSelected ? "border-white scale-110" : "border-white/20"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={{
                    boxShadow: isSelected
                      ? `0 0 35px ${styles.shadow}, 0 0 15px white`
                      : `0 0 25px ${styles.shadow}`,
                  }}
                >
                  <Icon className="w-10 h-10" />
                </Button>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-white whitespace-nowrap"
                >
                  {label}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="mb-6"
            >
              <Card
                className={`p-6 bg-gradient-to-br from-blue-900/95 via-blue-950/95 to-blue-900/95 backdrop-blur-xl border-2 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.5)]`}
              >
                <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Pasos de Resolución
                </h3>
                <pre className="text-blue-100 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {showHint}
                </pre>
                <Button
                  onClick={() => {}}
                  variant="outline"
                  className="mt-4 border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
                >
                  Cerrar
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center gap-4">
          {isAnalyzed && (
            <Button
              size="lg"
              onClick={onNextEquation}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-6 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            >
              {t("nextEquation")}
            </Button>
          )}
          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate("deck-select")}
            className={`border-2 border-${styles.borderColor} text-${styles.primaryColor}-400 hover:bg-${styles.primaryColor}-500/10 px-8 py-6 rounded-xl`}
          >
            Cambiar Mazo
          </Button>
        </div>
      </div>
    </motion.div>
  )
}