export type Language = "es" | "en"

export const translations = {
  es: {
    // Auth
    welcome: "Bienvenido a Math Cards",
    login: "Iniciar Sesión",
    register: "Registrarse",
    email: "Correo Electrónico",
    password: "Contraseña",
    loginButton: "Entrar",
    registerButton: "Crear Cuenta",
    alreadyHaveAccount: "¿Ya tienes cuenta?",
    dontHaveAccount: "¿No tienes cuenta?",
    logout: "Cerrar Sesión",

    // Game
    mathCards: "Math Cards",
    play: "Jugar",
    shop: "Tienda",
    settings: "Configuración",
    rules: "Reglas",

    // Deck Selection
    selectDeck: "Selecciona un Mazo",
    basic: "Básico",
    advanced: "Avanzado",
    expert: "Experto",
    basicDesc: "Números del 1 al 20",
    advancedDesc: "Números del 1 al 50",
    expertDesc: "Números del 1 al 100",
    back: "Volver",

    // Game Screen
    generateEquation: "Generar Ecuación",
    currentEquation: "Ecuación actual",
    result: "Resultado",
    analyzed: "Analizada",
    pending: "Pendiente",
    term: "Término",
    solvedOver: "Se solió",
    over: "sobre",
    nextEquation: "Siguiente Ecuación",
    answerAllEquations: "Por favor responde todas las ecuaciones",

    // Shop
    coins: "Monedas",
    buyCards: "Comprar Cartas",
    cardPack: "Paquete de Cartas",
    buy: "Comprar",
    notEnoughCoins: "No tienes suficientes monedas",

    // Victory/Defeat
    victory: "¡Victoria!",
    defeat: "Derrota",
    youWon: "¡Ganaste!",
    youLost: "Perdiste esta vez",
    coinsEarned: "Monedas ganadas",
    playAgain: "Jugar de Nuevo",
    mainMenu: "Menú Principal",

    // Settings
    language: "Idioma",
    spanish: "Español",
    english: "English",
    sound: "Sonido",
    music: "Música",
    sfx: "Efectos de Sonido",
    on: "Activado",
    off: "Desactivado",

    // Rules
    howToPlay: "Cómo Jugar",
    rulesText:
      "Resuelve ecuaciones matemáticas usando las cartas disponibles. Cada nivel tiene diferentes rangos de números. Usa las operaciones matemáticas para encontrar la solución correcta.",
    gameOverview: "Descripción del Juego",
    gameOverviewText:
      "Math Cards es un juego educativo donde resuelves ecuaciones matemáticas para ganar puntos. Elige tu nivel de dificultad, resuelve ecuaciones contra el tiempo, y mejora tus habilidades matemáticas.",
    deckTypes: "Tipos de Mazos",
    deckTypesDescription: "Cada mazo tiene diferentes niveles de dificultad y rangos numéricos:",
    basicDeck: "Mazo Básico",
    basicDeckDescription: "Números del 1 al 10 con operaciones simples (+, -, ×, ÷). Perfecto para principiantes.",
    advancedDeck: "Mazo Avanzado",
    advancedDeckDescription: "Números del 5 al 25 con múltiples operaciones combinadas. Para jugadores intermedios.",
    expertDeck: "Mazo Experto",
    expertDeckDescription: "Números del 10 al 60 con operaciones complejas. Para expertos en matemáticas.",
    howToPlayTitle: "Cómo Jugar",
    howToPlaySteps: [
      "1. Selecciona un mazo según tu nivel de habilidad",
      "2. Lee la ecuación que aparece en pantalla",
      "3. Calcula el valor de la variable (x)",
      "4. Ingresa tu respuesta en el campo de texto",
      "5. Presiona 'Verificar' antes de que se acabe el tiempo",
    ],
    scoringSystemTitle: "Sistema de Puntuación",
    scoringSystemDescription: "Gana o pierdes puntos según tus respuestas:",
    correctAnswer: "Respuesta Correcta: +10 puntos",
    incorrectAnswer: "Respuesta Incorrecta: -10 puntos",
    minimumScore: "La puntuación mínima es 0 (no puede ser negativa)",
    scoresSaved: "Tus puntuaciones se guardan automáticamente",
    timerSystemTitle: "Sistema de Tiempo",
    timerSystemDescription: "Cada ecuación tiene un límite de tiempo:",
    timeLimit: "Tienes 30 segundos para resolver cada ecuación",
    timeRunsOut: "Si el tiempo se agota, se cuenta como respuesta incorrecta",
    timerStops: "El temporizador se detiene al enviar tu respuesta",
    hintSystemTitle: "Sistema de Pistas",
    hintSystemDescription: "Usa pistas si necesitas ayuda para resolver:",
    hint1: "Pista 1: Muestra los primeros pasos de la solución",
    hint2: "Pista 2: Revela más pasos del proceso",
    hint3: "Pista 3: Muestra casi toda la solución",
    hint4: "Pista 4: Revela la solución completa paso a paso",
    tipsForSuccessTitle: "Consejos para el Éxito",
    tipsForSuccess: [
      "Comienza con el mazo Básico para familiarizarte con el juego",
      "Lee la ecuación cuidadosamente antes de responder",
      "Usa las pistas si te quedas atascado, no hay penalización",
      "Practica regularmente para mejorar tu velocidad",
      "Avanza a mazos más difíciles cuando te sientas cómodo",
    ],

    // Errors
    invalidEmail: "El formato del correo electrónico no es válido",
    passwordRequirements: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
    emailAlreadyExists: "Este correo electrónico ya está registrado",
    invalidCredentials: "Correo electrónico o contraseña incorrectos",
    encryptionError: "Error al procesar la contraseña",

    // Points and Timer System
    points: "Puntos",
    timeRemaining: "Tiempo Restante",
    yourAnswer: "Tu Respuesta",
    checkAnswer: "Verificar",
    correct: "¡Correcto! +10 puntos",
    incorrect: "Incorrecto. -10 puntos",
    enterAnswer: "Ingresa tu respuesta",
    solve: "Resolver",
    nextEquationButton: "Siguiente Ecuación",

    operations: "Operaciones",
    addition: "Paso 1: Aislar términos",
    subtraction: "Paso 2: Simplificar",
    multiplication: "Paso 3: Despejar x",
    division: "Solución Completa",
    selectOperation: "Selecciona una operación",
    operationSelected: "Operación seleccionada",

    exportData: "Exportar Datos",
    importData: "Importar Datos",
    exportSuccess: "Datos exportados exitosamente",
    importSuccess: "Datos importados exitosamente",
    importError: "Error al importar datos",
    downloadBackup: "Descargar Respaldo",
    uploadBackup: "Cargar Respaldo",
    dataBackup: "Respaldo de Datos",
    backupDescription: "Descarga tus datos para transferirlos a otro dispositivo",
    selectFile: "Seleccionar Archivo",

    registeredEmails: "Correos Registrados",
    totalUsers: "Total de Usuarios",
    emailList: "Lista de Correos",
    exportEmails: "Exportar Emails",
    exportEmailList: "Exportar Lista de Correos",
    emailListExported: "Lista de correos exportada exitosamente",
    noEmailsRegistered: "No hay correos registrados aún",
    viewRegisteredEmails: "Ver Correos Registrados",
    userManagement: "Gestión de Usuarios",
    emailsSavedSuccessfully: "Los correos se guardan automáticamente en localStorage e IndexedDB",

    // OAuth
    continueWith: "Continuar con",
    apple: "Apple",
    facebook: "Facebook",
    orContinueWith: "O continúa con",

    forgotPassword: "¿Olvidaste tu contraseña?",
    resetAccount: "Borrar mi cuenta y registrarme de nuevo",
    resetAccountConfirm: "¿Estás seguro de que quieres borrar tu cuenta? Esta acción no se puede deshacer.",
    resetAccountSuccess: "Cuenta borrada exitosamente. Ahora puedes registrarte de nuevo.",
    cancel: "Cancelar",
    confirm: "Confirmar",
    deleteAccount: "Borrar Cuenta",
  },
  en: {
    // Auth
    welcome: "Welcome to Math Cards",
    login: "Login",
    register: "Sign Up",
    email: "Email",
    password: "Password",
    loginButton: "Sign In",
    registerButton: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    logout: "Logout",

    // Game
    mathCards: "Math Cards",
    play: "Play",
    shop: "Shop",
    settings: "Settings",
    rules: "Rules",

    // Deck Selection
    selectDeck: "Select a Deck",
    basic: "Basic",
    advanced: "Advanced",
    expert: "Expert",
    basicDesc: "Numbers from 1 to 20",
    advancedDesc: "Numbers from 1 to 50",
    expertDesc: "Numbers from 1 to 100",
    back: "Back",

    // Game Screen
    generateEquation: "Generate Equation",
    currentEquation: "Current equation",
    result: "Result",
    analyzed: "Analyzed",
    pending: "Pending",
    term: "Term",
    solvedOver: "Solved",
    over: "over",
    nextEquationButton: "Next Equation",
    answerAllEquations: "Please answer all equations",

    // Shop
    coins: "Coins",
    buyCards: "Buy Cards",
    cardPack: "Card Pack",
    buy: "Buy",
    notEnoughCoins: "You don't have enough coins",

    // Victory/Defeat
    victory: "Victory!",
    defeat: "Defeat",
    youWon: "You Won!",
    youLost: "You Lost This Time",
    coinsEarned: "Coins Earned",
    playAgain: "Play Again",
    mainMenu: "Main Menu",

    // Settings
    language: "Language",
    spanish: "Español",
    english: "English",
    sound: "Sound",
    music: "Music",
    sfx: "Sound Effects",
    on: "On",
    off: "Off",

    // Rules
    howToPlay: "How to Play",
    rulesText:
      "Solve mathematical equations using the available cards. Each level has different number ranges. Use mathematical operations to find the correct solution.",
    gameOverview: "Game Overview",
    gameOverviewText:
      "Math Cards is an educational game where you solve mathematical equations to earn points. Choose your difficulty level, solve equations against the clock, and improve your math skills.",
    deckTypes: "Deck Types",
    deckTypesDescription: "Each deck has different levels of difficulty and numeric ranges:",
    basicDeck: "Basic Deck",
    basicDeckDescription: "Numbers from 1 to 10 with simple operations (+, -, ×, ÷). Perfect for beginners.",
    advancedDeck: "Advanced Deck",
    advancedDeckDescription: "Numbers from 5 to 25 with multiple combined operations. For intermediate players.",
    expertDeck: "Expert Deck",
    expertDeckDescription: "Numbers from 10 to 60 with complex operations. For math experts.",
    howToPlayTitle: "How to Play",
    howToPlaySteps: [
      "1. Select a deck based on your skill level",
      "2. Read the equation that appears on the screen",
      "3. Calculate the value of the variable (x)",
      "4. Enter your answer in the text field",
      "5. Press 'Check' before the time runs out",
    ],
    scoringSystemTitle: "Scoring System",
    scoringSystemDescription: "Earn or lose points based on your answers:",
    correctAnswer: "Correct Answer: +10 points",
    incorrectAnswer: "Incorrect Answer: -10 points",
    minimumScore: "The minimum score is 0 (it cannot be negative)",
    scoresSaved: "Your scores are saved automatically",
    timerSystemTitle: "Timer System",
    timerSystemDescription: "Each equation has a time limit:",
    timeLimit: "You have 30 seconds to solve each equation",
    timeRunsOut: "If the time runs out, it counts as an incorrect answer",
    timerStops: "The timer stops when you submit your answer",
    hintSystemTitle: "Hint System",
    hintSystemDescription: "Use hints if you need help solving:",
    hint1: "Hint 1: Shows the first steps of the solution",
    hint2: "Hint 2: Reveals more steps of the process",
    hint3: "Hint 3: Shows almost the entire solution",
    hint4: "Hint 4: Reveals the complete step-by-step solution",
    tipsForSuccessTitle: "Tips for Success",
    tipsForSuccess: [
      "Start with the Basic deck to familiarize yourself with the game",
      "Read the equation carefully before answering",
      "Use hints if you get stuck, there's no penalty",
      "Practice regularly to improve your speed",
      "Move to harder decks when you feel comfortable",
    ],

    // Errors
    invalidEmail: "Invalid email format",
    passwordRequirements: "Password must be at least 8 characters with one uppercase, one lowercase, and one number",
    emailAlreadyExists: "This email is already registered",
    invalidCredentials: "Invalid email or password",
    encryptionError: "Error processing password",

    // Points and Timer System
    points: "Points",
    timeRemaining: "Time Remaining",
    yourAnswer: "Your Answer",
    checkAnswer: "Check",
    correct: "Correct! +10 points",
    incorrect: "Incorrect. -10 points",
    enterAnswer: "Enter your answer",
    solve: "Solve",
    nextEquation: "Next Equation",

    operations: "Operations",
    addition: "Step 1: Isolate terms",
    subtraction: "Step 2: Simplify",
    multiplication: "Step 3: Solve for x",
    division: "Complete Solution",
    selectOperation: "Select an operation",
    operationSelected: "Operation selected",

    exportData: "Export Data",
    importData: "Import Data",
    exportSuccess: "Data exported successfully",
    importSuccess: "Data imported successfully",
    importError: "Error importing data",
    downloadBackup: "Download Backup",
    uploadBackup: "Upload Backup",
    dataBackup: "Data Backup",
    backupDescription: "Download your data to transfer to another device",
    selectFile: "Select File",

    registeredEmails: "Registered Emails",
    totalUsers: "Total Users",
    emailList: "Email List",
    exportEmailList: "Export Email List",
    emailListExported: "Email list exported successfully",
    noEmailsRegistered: "No emails registered yet",
    viewRegisteredEmails: "View Registered Emails",
    userManagement: "User Management",
    emailsSavedSuccessfully: "Emails are automatically saved in localStorage and IndexedDB",

    // OAuth
    continueWith: "Continue with",
    apple: "Apple",
    facebook: "Facebook",
    orContinueWith: "Or continue with",

    forgotPassword: "Forgot your password?",
    resetAccount: "Delete my account and register again",
    resetAccountConfirm: "Are you sure you want to delete your account? This action cannot be undone.",
    resetAccountSuccess: "Account deleted successfully. You can now register again.",
    cancel: "Cancel",
    confirm: "Confirm",
    deleteAccount: "Delete Account",
  },
}

export function getTranslation(lang: Language, key: keyof typeof translations.es): string {
  const translationsObj = translations[lang] as any
  const value = translationsObj[key] || translations.es[key]
  return typeof value === 'string' ? value : String(value)
}

// Type assertion to handle dynamic keys
export function getTranslationUnsafe(lang: Language, key: string): string {
  const translationsObj = translations[lang] as any
  const value = translationsObj[key] || translations.es[key as keyof typeof translations.es]
  return typeof value === 'string' ? value : String(value)
}
