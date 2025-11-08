import { useState, useEffect } from "react"
import { authService } from "@/lib/auth-decorator"
import { useLanguage } from "@/lib/language-context"

type Screen = "menu" | "deck-select" | "game" | "shop" | "results" | "victory" | "defeat" | "settings" | "rules"
type DeckLevel = "Básico" | "Avanzado" | "Experto"

export const useGameState = () => {
  const { t, language, setLanguage } = useLanguage()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<Screen>("menu")
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [score, setScore] = useState(50)
  const [money, setMoney] = useState(100)
  const [round, setRound] = useState(1)
  const [hands, setHands] = useState(3)
  const [discards, setDiscards] = useState(3)
  const [selectedDeck, setSelectedDeck] = useState<DeckLevel>("Básico")
  const [userPoints, setUserPoints] = useState(50)
  const [registeredEmails, setRegisteredEmails] = useState<string[]>([])
  const [showEmailList, setShowEmailList] = useState(false)
  const [musicVolume, setMusicVolume] = useState<number>(50)
  const [sfxVolume, setSfxVolume] = useState<number>(50)
  const [showLanguageSelector, setShowLanguageSelector] = useState<boolean>(false)

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (user) {
      setIsAuthenticated(true)
      loadUserPoints(user.email)
    }
  }, [])

  const loadUserPoints = async (email: string) => {
    try {
      const { dbManager } = await import("@/lib/dbManager")
      const userData = await dbManager.getUser(email)
      if (userData) {
        setScore(userData.points)
        setUserPoints(userData.points)
      }
    } catch (error) {
      console.error("Error al cargar puntos:", error)
    }
  }

  const saveUserPoints = async (newScore: number) => {
    const user = authService.getCurrentUser()
    if (!user) return

    try {
      const { dbManager } = await import("@/lib/dbManager")
      const userData = await dbManager.getUser(user.email)
      if (userData) {
        await dbManager.saveUser({
          ...userData,
          points: newScore,
          gamesPlayed: userData.gamesPlayed + 1,
          lastPlayed: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error("Error al guardar puntos:", error)
    }
  }

  const handleLogout = () => {
    authService.logout()
    setIsAuthenticated(false)
    setCurrentScreen("menu")
  }

  const loadRegisteredEmails = async () => {
    try {
      const { dbManager } = await import("@/lib/dbManager")
      const users = await dbManager.getAllUsers()
      setRegisteredEmails(users.map((user) => user.email))
    } catch (error) {
      console.error("Error loading registered emails:", error)
    }
  }

  const handleExportEmails = () => {
    if (registeredEmails.length === 0) {
      alert("No hay correos electrónicos para exportar.")
      return
    }

    const csvContent = "data:text/csv;charset=utf-8," + registeredEmails.join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "registered_emails.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    // State
    isAuthenticated,
    currentScreen,
    selectedCards,
    score,
    money,
    round,
    hands,
    discards,
    selectedDeck,
    userPoints,
    registeredEmails,
    showEmailList,
    musicVolume,
    sfxVolume,
    showLanguageSelector,
    language,

    // Setters
    setIsAuthenticated,
    setCurrentScreen,
    setSelectedCards,
    setScore,
    setMoney,
    setRound,
    setHands,
    setDiscards,
    setSelectedDeck,
    setUserPoints,
    setRegisteredEmails,
    setShowEmailList,
    setMusicVolume,
    setSfxVolume,
    setShowLanguageSelector,
    setLanguage,

    // Functions
    loadUserPoints,
    saveUserPoints,
    handleLogout,
    loadRegisteredEmails,
    handleExportEmails,

    // Translation
    t,
  }
}