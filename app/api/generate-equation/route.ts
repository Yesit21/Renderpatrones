import { type NextRequest, NextResponse } from "next/server"

type DeckLevel = "Básico" | "Avanzado" | "Experto"
type Operation = "+" | "-" | "*" | "/"

interface Equation {
  term1: number
  term2: number
  term3?: number
  term4?: number
  op1?: string // Operación entre term2 y term3
  op2?: string // Operación entre term3 y term4
  result: number
  operation: string
  variable: string
  solution: number
}

export async function POST(request: NextRequest) {
  try {
    const { level, operation } = await request.json()

    if (!level || !operation) {
      return NextResponse.json({ error: "Nivel y operación son requeridos" }, { status: 400 })
    }

    const equation = generateEquation(level as DeckLevel, operation as Operation)

    return NextResponse.json(equation)
  } catch (error) {
    console.error("[v0] Error generando ecuación:", error)
    return NextResponse.json({ error: "Error al generar ecuación" }, { status: 500 })
  }
}

function generateEquation(level: DeckLevel, selectedOperation: Operation): Equation {
  let term1: number, term2: number, term3: number, term4: number, result: number, x: number
  const variable = "x"

  switch (level) {
    case "Básico":
      x = Math.floor(Math.random() * 10) + 1

      if (selectedOperation === "+") {
        term1 = Math.floor(Math.random() * 5) + 1
        term2 = Math.floor(Math.random() * 15) + 1
        result = term1 * x + term2
      } else if (selectedOperation === "-") {
        term1 = Math.floor(Math.random() * 5) + 1
        term2 = Math.floor(Math.random() * 10) + 1
        result = term1 * x + term2
      } else if (selectedOperation === "*") {
        term1 = Math.floor(Math.random() * 3) + 1
        term2 = Math.floor(Math.random() * 5) + 1
        result = term1 * x * term2
      } else {
        term2 = Math.floor(Math.random() * 3) + 1
        term1 = term2 * (Math.floor(Math.random() * 5) + 1)
        result = (term1 * x) / term2
      }
      return { term1, term2, result, operation: selectedOperation, variable, solution: x }

    case "Avanzado":
      x = Math.floor(Math.random() * 15) + 5
      term1 = Math.floor(Math.random() * 10) + 5
      term2 = Math.floor(Math.random() * 20) + 10
      term3 = Math.floor(Math.random() * 15) + 5
      term4 = Math.floor(Math.random() * 10) + 5

      // Generar operaciones aleatorias para los términos
      const operations = ["+", "-", "*", "/"]
      const op1 = operations[Math.floor(Math.random() * operations.length)]
      const op2 = operations[Math.floor(Math.random() * operations.length)]

      // Calcular el resultado basado en las operaciones
      let intermediateResult = term1 * x

      // Aplicar op1 (operación entre term1*x y term2)
      if (op1 === "+") {
        intermediateResult += term2
      } else if (op1 === "-") {
        intermediateResult -= term2
      } else if (op1 === "*") {
        intermediateResult *= term2
      } else {
        intermediateResult /= term2
      }

      // Aplicar op2 (operación entre resultado anterior y term3)
      if (op2 === "+") {
        intermediateResult += term3
      } else if (op2 === "-") {
        intermediateResult -= term3
      } else if (op2 === "*") {
        intermediateResult *= term3
      } else {
        intermediateResult /= term3
      }

      // Sumar term4 al final
      result = Math.round(intermediateResult + term4)

      return { term1, term2, term3, term4, op1, op2, result, operation: "+", variable, solution: x }

    case "Experto":
      x = Math.floor(Math.random() * 20) + 10

      if (selectedOperation === "+") {
        term1 = Math.floor(Math.random() * 30) + 10
        term2 = Math.floor(Math.random() * 50) + 20
        result = term1 * x + term2
      } else if (selectedOperation === "-") {
        term1 = Math.floor(Math.random() * 30) + 10
        term2 = Math.floor(Math.random() * 40) + 20
        result = term1 * x + term2
      } else if (selectedOperation === "*") {
        term1 = Math.floor(Math.random() * 15) + 5
        term2 = Math.floor(Math.random() * 15) + 5
        result = term1 * x * term2
      } else {
        term2 = Math.floor(Math.random() * 10) + 5
        term1 = term2 * (Math.floor(Math.random() * 15) + 5)
        result = (term1 * x) / term2
      }
      return { term1, term2, result, operation: selectedOperation, variable, solution: x }

    default:
      return { term1: 1, term2: 1, result: 2, operation: "+", variable: "x", solution: 1 }
  }
}
