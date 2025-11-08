"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, translations } from "./i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof translations.es) => string
  tUnsafe: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "es" || saved === "en")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: keyof typeof translations.es): string => {
    const translationsObj = translations[language] as any
    const value = translationsObj[key] || translations.es[key]
    return typeof value === 'string' ? value : String(value)
  }

  const tUnsafe = (key: string): string => {
    const translationsObj = translations[language] as any
    const value = translationsObj[key] || translations.es[key as keyof typeof translations.es]
    return typeof value === 'string' ? value : String(value)
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t, tUnsafe }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
