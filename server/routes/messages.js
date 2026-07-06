import { Router } from 'express'
import pool from '../db.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM messages ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Erro ao buscar mensagens:', err)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

router.post('/', async (req, res) => {
  const { nome, email, telefone, mensagem, createdAt } = req.body

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: 'nome, email e mensagem são obrigatórios' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO messages (nome, email, telefone, mensagem, created_at)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nome, email, telefone || null, mensagem, createdAt || new Date().toISOString()]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Erro ao criar mensagem:', err)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

router.delete('/', async (req, res) => {
  const id = req.query.id

  try {
    const result = await pool.query(
      'DELETE FROM messages WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mensagem não encontrada' })
    }

    res.json({ message: 'Mensagem excluída com sucesso' })
  } catch (err) {
    console.error('Erro ao excluir mensagem:', err)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

export default router
