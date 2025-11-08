type DeckLevel = "Básico" | "Avanzado" | "Experto"

export interface Equation {
  term1: number
  term2: number
  term3?: number
  term4?: number
  op1?: string // Operación entre term1*x y term2
  op2?: string // Operación entre resultado anterior y term3
  result: number
  operation: string
  variable: string
  solution: number
}

// Helper function to generate equation locally
export const generateEquation = (level: DeckLevel): Equation => {
  let term1, term2, term3, term4, result, solution, variable, operation, op1, op2
  const operations = ["+", "-", "*", "/"]
  operation = operations[Math.floor(Math.random() * operations.length)]

  switch (level) {
    case "Básico":
      term1 = Math.floor(Math.random() * 10) + 1
      term2 = Math.floor(Math.random() * 10) + 1
      variable = "x"
      if (operation === "+") {
        solution = term1 + term2
        result = solution
      } else if (operation === "-") {
        if (term1 < term2) [term1, term2] = [term2, term1]
        solution = term1 - term2
        result = solution
      } else if (operation === "*") {
        solution = term1 * term2
        result = solution
      } else if (operation === "/") {
        term1 = Math.floor(Math.random() * 10) + 1
        term2 = Math.floor(Math.random() * 10) + 1
        solution = term1 * term2 // Ensure divisibility
        term1 = solution
        result = term1 / term2
      }
      break
    case "Avanzado":
      term1 = Math.floor(Math.random() * 20) + 5
      term2 = Math.floor(Math.random() * 20) + 5
      term3 = Math.floor(Math.random() * 10) + 1
      term4 = Math.floor(Math.random() * 10) + 1
      variable = "x"
      op1 = operations[Math.floor(Math.random() * operations.length)]
      op2 = operations[Math.floor(Math.random() * operations.length)]
      if (op1 === "/" && (term1 * term2) % term2 !== 0) {
        term1 = Math.floor(Math.random() * 10) + 1
        term2 = Math.floor(Math.random() * 10) + 1
      }
      if (op2 === "/" && (term1 * term2 + term3) % term3 !== 0) {
        term3 = Math.floor(Math.random() * 10) + 1
      }
      solution = eval(`${term1} * ${term2} ${op1} ${term3} ${op2} ${term4}`)
      result = solution
      break
    case "Experto":
      term1 = Math.floor(Math.random() * 50) + 10
      term2 = Math.floor(Math.random() * 50) + 10
      term3 = Math.floor(Math.random() * 20) + 5
      term4 = Math.floor(Math.random() * 20) + 5
      variable = "x"
      op1 = operations[Math.floor(Math.random() * operations.length)]
      op2 = operations[Math.floor(Math.random() * operations.length)]
      if (op1 === "/" && (term1 * term2) % term2 !== 0) {
        term1 = Math.floor(Math.random() * 10) + 1
        term2 = Math.floor(Math.random() * 10) + 1
      }
      if (op2 === "/" && (term1 * term2 + term3) % term3 !== 0) {
        term3 = Math.floor(Math.random() * 10) + 1
      }
      solution = eval(`${term1} * ${term2} ${op1} ${term3} ${op2} ${term4}`)
      result = solution
      break
    default:
      return { term1: 0, term2: 0, result: 0, operation: "+", variable: "x", solution: 0 }
  }

  return { term1, term2, term3, term4, op1, op2, result, operation, variable, solution }
}

export const generateSolutionSteps = (equation: Equation): string[] => {
  const { term1, term2, term3, term4, op1, op2, result, operation, variable } = equation
  const steps: string[] = []

  if (term3 !== undefined && term4 !== undefined && op1 && op2) {
    // Construir la ecuación con las operaciones correctas
    const opSymbol1 = op1 === "*" ? "×" : op1 === "/" ? "÷" : op1
    const opSymbol2 = op2 === "*" ? "×" : op2 === "/" ? "÷" : op2

    steps.push(`Ecuación: ${term1}${variable} ${opSymbol1} ${term2} ${opSymbol2} ${term3} + ${term4} = ${result}`)
    steps.push(`Paso 1: Primero resolvemos las operaciones con ${variable}`)

    // Calcular paso a paso
    let currentValue = `${term1}${variable}`
    steps.push(`Paso 2: Aplicar ${opSymbol1} ${term2}`)

    if (op1 === "+") {
      currentValue = `${term1}${variable} + ${term2}`
    } else if (op1 === "-") {
      currentValue = `${term1}${variable} - ${term2}`
    } else if (op1 === "*") {
      currentValue = `${term1 * term2}${variable}`
    } else if (op1 === "/") {
      currentValue = `${term1 / term2}${variable}`
    }

    steps.push(`Resultado: ${currentValue}`)
    steps.push(`Paso 3: Aplicar ${opSymbol2} ${term3}`)
    steps.push(`Paso 4: Finalmente sumar ${term4}`)
    steps.push(`Paso 5: Despejar ${variable} y resolver`)

    return steps
  }

  // Ecuaciones normales
  if (operation === "+") {
    steps.push(`Ecuación: ${term1}${variable} + ${term2} = ${result}`)
    steps.push(`Paso 1: Resta ${term2} de ambos lados`)
    steps.push(`${term1}${variable} = ${result} - ${term2}`)
    steps.push(`${term1}${variable} = ${result - term2}`)
    steps.push(`Paso 2: Divide ambos lados entre ${term1}`)
    steps.push(`${variable} = ${(result - term2) / term1}`)
  } else if (operation === "-") {
    steps.push(`Ecuación: ${term1}${variable} - ${term2} = ${result}`)
    steps.push(`Paso 1: Suma ${term2} a ambos lados`)
    steps.push(`${term1}${variable} = ${result} + ${term2}`)
    steps.push(`${term1}${variable} = ${result + term2}`)
    steps.push(`Paso 2: Divide ambos lados entre ${term1}`)
    steps.push(`${variable} = ${(result + term2) / term1}`)
  } else if (operation === "*") {
    steps.push(`Ecuación: ${term1}${variable} × ${term2} = ${result}`)
    steps.push(`Paso 1: Multiplica los coeficientes`)
    steps.push(`${term1 * term2}${variable} = ${result}`)
    steps.push(`Paso 2: Divide ambos lados entre ${term1 * term2}`)
    steps.push(`${variable} = ${result / (term1 * term2)}`)
  } else if (operation === "/") {
    steps.push(`Ecuación: ${term1}${variable} ÷ ${term2} = ${result}`)
    steps.push(`Paso 1: Multiplica ambos lados por ${term2}`)
    steps.push(`${term1}${variable} = ${result} × ${term2}`)
    steps.push(`${term1}${variable} = ${result * term2}`)
    steps.push(`Paso 2: Divide ambos lados entre ${term1}`)
    steps.push(`${variable} = ${(result * term2) / term1}`)
  }

  return steps
}

export const getDeckStyles = (deck: DeckLevel) => {
  switch (deck) {
    case "Básico":
      return {
        bgGradient: "from-emerald-950 via-teal-950 to-emerald-950",
        primaryColor: "emerald",
        secondaryColor: "teal",
        accentColor: "cyan",
        glowColor: "rgba(16, 185, 129, 0.5)",
        buttonGradient: "from-emerald-500 to-teal-600",
        buttonHover: "from-emerald-600 to-teal-700",
        shadow: "rgba(16, 185, 129, 0.5)",
        borderColor: "emerald-500/50",
        textGlow: "0 0 20px rgba(16, 185, 129, 0.5)",
      }
    case "Avanzado":
      return {
        bgGradient: "from-orange-950 via-red-950 to-orange-950",
        primaryColor: "orange",
        secondaryColor: "red",
        accentColor: "yellow",
        glowColor: "rgba(249, 115, 22, 0.5)",
        buttonGradient: "from-orange-500 to-red-600",
        buttonHover: "from-orange-600 to-red-700",
        shadow: "rgba(249, 115, 22, 0.5)",
        borderColor: "orange-500/50",
        textGlow: "0 0 20px rgba(249, 115, 22, 0.5)",
      }
    case "Experto":
      return {
        bgGradient: "from-black via-gray-900 to-black",
        primaryColor: "cyan",
        secondaryColor: "magenta",
        accentColor: "yellow",
        glowColor: "rgba(6, 182, 212, 0.5)",
        buttonGradient: "from-cyan-500 to-cyan-600",
        buttonHover: "from-cyan-600 to-cyan-700",
        shadow: "rgba(6, 182, 212, 0.5)",
        borderColor: "cyan-500/50",
        textGlow: "0 0 20px rgba(6, 182, 212, 0.5)",
      }
  }
}

export const getDeckBackground = (deck: DeckLevel) => {
  switch (deck) {
    case "Básico":
      return "AuroraBasicBackground"
    case "Avanzado":
      return "AuroraAdvancedBackground"
    case "Experto":
      return "AuroraExpertBackground"
  }
}