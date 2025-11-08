const express = require('express')
const cors = require('cors')
const { generateEquation } = require('./generateEquation')

const app = express()
const PORT = process.env.PORT || 4000

// Allow frontend on localhost:3000 to call this API
app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] }))
app.use(express.json())

app.post('/api/generate-equation', (req, res) => {
  try {
    const { level, operation } = req.body
    if (!level || !operation) {
      return res.status(400).json({ error: 'Nivel y operación son requeridos' })
    }

    const equation = generateEquation(level, operation)
    return res.json(equation)
  } catch (error) {
    console.error('Error generando ecuación:', error)
    return res.status(500).json({ error: 'Error al generar ecuación' })
  }
})

app.get('/healthz', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`Math Cards backend listening on http://localhost:${PORT}`)
})
