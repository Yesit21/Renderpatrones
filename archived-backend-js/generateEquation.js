// Port of the Next.js generateEquation logic to a standalone module (archived)
function generateEquation(level, selectedOperation) {
  let term1, term2, term3, term4, result, x
  const variable = 'x'

  switch (level) {
    case 'Básico':
      x = Math.floor(Math.random() * 10) + 1

      if (selectedOperation === '+') {
        term1 = Math.floor(Math.random() * 5) + 1
        term2 = Math.floor(Math.random() * 15) + 1
        result = term1 * x + term2
      } else if (selectedOperation === '-') {
        term1 = Math.floor(Math.random() * 5) + 1
        term2 = Math.floor(Math.random() * 10) + 1
        result = term1 * x + term2
      } else if (selectedOperation === '*') {
        term1 = Math.floor(Math.random() * 3) + 1
        term2 = Math.floor(Math.random() * 5) + 1
        result = term1 * x * term2
      } else {
        term2 = Math.floor(Math.random() * 3) + 1
        term1 = term2 * (Math.floor(Math.random() * 5) + 1)
        result = (term1 * x) / term2
      }
      return { term1, term2, result, operation: selectedOperation, variable, solution: x }

    case 'Avanzado':
      x = Math.floor(Math.random() * 15) + 5
      term1 = Math.floor(Math.random() * 10) + 5
      term2 = Math.floor(Math.random() * 20) + 10
      term3 = Math.floor(Math.random() * 15) + 5
      term4 = Math.floor(Math.random() * 10) + 5

      const operations = ['+', '-', '*', '/']
      const op1 = operations[Math.floor(Math.random() * operations.length)]
      const op2 = operations[Math.floor(Math.random() * operations.length)]

      let intermediateResult = term1 * x

      if (op1 === '+') {
        intermediateResult += term2
      } else if (op1 === '-') {
        intermediateResult -= term2
      } else if (op1 === '*') {
        intermediateResult *= term2
      } else {
        intermediateResult /= term2
      }

      if (op2 === '+') {
        intermediateResult += term3
      } else if (op2 === '-') {
        intermediateResult -= term3
      } else if (op2 === '*') {
        intermediateResult *= term3
      } else {
        intermediateResult /= term3
      }

      result = Math.round(intermediateResult + term4)

      return { term1, term2, term3, term4, op1, op2, result, operation: '+', variable, solution: x }

    case 'Experto':
      x = Math.floor(Math.random() * 20) + 10

      if (selectedOperation === '+') {
        term1 = Math.floor(Math.random() * 30) + 10
        term2 = Math.floor(Math.random() * 50) + 20
        result = term1 * x + term2
      } else if (selectedOperation === '-') {
        term1 = Math.floor(Math.random() * 30) + 10
        term2 = Math.floor(Math.random() * 40) + 20
        result = term1 * x + term2
      } else if (selectedOperation === '*') {
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
      return { term1: 1, term2: 1, result: 2, operation: '+', variable: 'x', solution: 1 }
  }
}

module.exports = { generateEquation }
