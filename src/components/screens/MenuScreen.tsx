import React from "react"
import { Button } from "@/components/ui/button"
import { LogOut, Play, Settings, BookOpen } from "lucide-react"
import { VortexBackground } from "@/components/backgrounds"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { authService } from "@/lib/auth-decorator"

interface MenuScreenProps {
  onNavigate: (screen: string) => void
  onLogout: () => void
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  onNavigate,
  onLogout,
}) => {
  const { t } = useLanguage()

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VortexBackground />
      <Button variant="ghost" onClick={onLogout} className="absolute top-4 right-4 z-20">
        <LogOut className="mr-2 h-4 w-4" /> {t("logout")}
      </Button>
      <div className="relative z-10 text-center space-y-8">
        <motion.h1
          className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400 bg-clip-text text-transparent"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {t("mathCards").toUpperCase()}
        </motion.h1>
        <motion.p
          className="text-purple-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("welcome")}, {authService.getCurrentUser()?.email}
        </motion.p>
        <motion.div
          className="flex flex-col gap-4 max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="w-full text-xl py-6 bg-purple-600 hover:bg-purple-700 transition-all duration-200"
              onClick={() => onNavigate("deck-select")}
            >
              <Play className="mr-2" /> {t("play")}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="w-full text-xl py-6 bg-transparent transition-all duration-200"
              onClick={() => onNavigate("settings")}
            >
              <Settings className="mr-2" /> {t("settings")}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="w-full text-xl py-6 bg-transparent transition-all duration-200"
              onClick={() => onNavigate("rules")}
            >
              <BookOpen className="mr-2" /> {t("rules")}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}