import { Router } from 'express'
import pool from '../db.js'

const router = Router()

router.get('/', async (req, res) => {
  const { tipo, data } = req.query

  if (!tipo || !data) {
    return res.status(400).json({ error: 'tipo e data são obrigatórios' })
  }

  try {
    const result = await pool.query(
      'SELECT horario FROM bookings WHERE tipo = $1 AND data = $2',
      [tipo, data]
    )
    const horarios = result.rows.map((r) => r.horario.slice(0, 5))
    res.json({ horarios })
  } catch (err) {
    console.error('Erro:', err)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

export default router
