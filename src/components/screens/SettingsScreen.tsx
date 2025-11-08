import React from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Volume2, Play, Globe } from "lucide-react"
import { FuturisticGridBackground } from "@/components/backgrounds"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

interface SettingsScreenProps {
  onNavigate: (screen: string) => void
  language: string
  setLanguage: (language: string) => void
  musicVolume: number
  sfxVolume: number
  setMusicVolume: (volume: number) => void
  setSfxVolume: (volume: number) => void
  onExportEmails: () => void
  loadRegisteredEmails: () => void
  showEmailList: boolean
  setShowEmailList: (show: boolean) => void
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigate,
  language,
  setLanguage,
  musicVolume,
  sfxVolume,
  setMusicVolume,
  setSfxVolume,
  onExportEmails,
  loadRegisteredEmails,
  showEmailList,
  setShowEmailList,
}) => {
  const { t } = useLanguage()

  return (
    <motion.div
      className="relative min-h-screen p-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <FuturisticGridBackground />
      <div className="relative z-10 max-w-2xl mx-auto">
        <Button variant="ghost" onClick={() => onNavigate("menu")} className="mb-4">
          <ArrowLeft className="mr-2" /> {t("back")}
        </Button>
        <div className="bg-card/80 backdrop-blur p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6">{t("settings")}</h2>
          <div className="space-y-6">
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  {t("music")}
                </label>
                <Slider
                  value={[musicVolume]}
                  onValueChange={(value) => setMusicVolume(value[0])}
                  max={100}
                  step={1}
                  className="w-64"
                />
              </div>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  {t("sfx")}
                </label>
                <Slider
                  value={[sfxVolume]}
                  onValueChange={(value) => setSfxVolume(value[0])}
                  max={100}
                  step={1}
                  className="w-64"
                />
              </div>
            </motion.div>

            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-medium">
                  <Globe className="w-5 h-5" />
                  {t("language")}
                </label>
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setLanguage("es")}
                    className={`flex-1 relative overflow-hidden rounded-lg p-4 border-2 transition-all duration-300 ${
                      language === "es"
                        ? "border-emerald-500 bg-emerald-500/20 shadow-lg shadow-emerald-500/50"
                        : "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">🇪🇸</span>
                      <span className="font-semibold text-sm">Español</span>
                    </div>
                    {language === "es" && (
                      <motion.div
                        className="absolute top-2 right-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={() => setLanguage("en")}
                    className={`flex-1 relative overflow-hidden rounded-lg p-4 border-2 transition-all duration-300 ${
                      language === "en"
                        ? "border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/50"
                        : "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">🇺🇸</span>
                      <span className="font-semibold text-sm">English</span>
                    </div>
                    {language === "en" && (
                      <motion.div
                        className="absolute top-2 right-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {loadRegisteredEmails && onExportEmails && (
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Button
                  onClick={() => {
                    loadRegisteredEmails()
                    setShowEmailList(true)
                    onExportEmails()
                  }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  {t("exportEmails")}
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}