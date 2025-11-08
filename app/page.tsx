"use client"

import { AuthScreen } from "@/components/auth/auth-screen"
import { MenuScreen, DeckSelectScreen, GameScreen, SettingsScreen } from "@/components/screens"
import { useGameState } from "@/hooks/useGameState"
import { useGameLogic } from "@/hooks/useGameLogic"
import { AnimatePresence } from "framer-motion"

export default function GameInterface() {
  const gameState = useGameState()
  const gameLogic = useGameLogic(gameState.selectedDeck, gameState.saveUserPoints)

  const {
    isAuthenticated,
    currentScreen,
    score,
    round,
    setScore,
    setRound,
    handleLogout,
    loadRegisteredEmails,
    handleExportEmails,
    t,
  } = gameState

  const {
    currentEquation,
    userAnswer,
    isAnalyzed,
    feedback,
    timeRemaining,
    isTimerActive,
    showHint,
    hintStep,
    setUserAnswer,
    handleGenerateEquation,
    checkAnswer,
    handleIncorrectAnswer,
    handleNextEquation,
    handleHintClick,
  } = gameLogic

  if (!isAuthenticated) {
    return <AuthScreen onAuthSuccess={() => gameState.setIsAuthenticated(true)} />
  }

  const handleNavigate = (screen: string) => {
    gameState.setCurrentScreen(screen as any)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "menu":
        return <MenuScreen onNavigate={handleNavigate} onLogout={handleLogout} />
      case "deck-select":
        return <DeckSelectScreen onNavigate={handleNavigate} onSelectDeck={gameState.setSelectedDeck} onGenerateEquation={handleGenerateEquation} />
      case "game":
        return <GameScreen
          currentEquation={currentEquation}
          userAnswer={userAnswer}
          isAnalyzed={isAnalyzed}
          feedback={feedback}
          timeRemaining={timeRemaining}
          isTimerActive={isTimerActive}
          showHint={showHint}
          hintStep={hintStep}
          score={score}
          round={round}
          selectedDeck={gameState.selectedDeck}
          onUserAnswerChange={setUserAnswer}
          onCheckAnswer={() => checkAnswer(score, setScore, setRound, round)}
          onHintClick={handleHintClick}
          onNextEquation={() => handleNextEquation(score, setScore, setRound, round)}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      case "settings":
        return <SettingsScreen
          onNavigate={handleNavigate}
          language={gameState.language}
          setLanguage={(lang: string) => gameState.setLanguage(lang as any)}
          musicVolume={gameState.musicVolume}
          sfxVolume={gameState.sfxVolume}
          setMusicVolume={gameState.setMusicVolume}
          setSfxVolume={gameState.setSfxVolume}
          onExportEmails={handleExportEmails}
          loadRegisteredEmails={loadRegisteredEmails}
          showEmailList={gameState.showEmailList}
          setShowEmailList={gameState.setShowEmailList}
        />
      default:
        return <MenuScreen onNavigate={handleNavigate} onLogout={handleLogout} />
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-hidden">
      <AnimatePresence mode="wait">{renderScreen()}</AnimatePresence>
    </main>
  )
}
