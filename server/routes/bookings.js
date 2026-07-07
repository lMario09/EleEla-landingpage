import { Router } from 'express'
import pool from '../db.js'

const router = Router()

const rateLimitMap = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const windowMs = 60000
  const maxRequests = 5
  const entry = rateLimitMap.get(ip)
  if (!entry || now - entry.windowStart > windowMs) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 })
    return true
  }
  if (entry.count >= maxRequests) return false
  entry.count++
  return true
}

function isAuthorized(req) {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  return req.headers['x-admin-auth'] === adminPassword
}

router.get('/', async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Não autorizado' })
  }
  try {
    const result = await pool.query('SELECT * FROM bookings ORDER BY data DESC, horario DESC')
    res.json(result.rows)
  } catch (err) {
    console.error('Erro ao buscar agendamentos:', err)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

router.post('/', async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown'
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Muitas requisições. Tente novamente em 1 minuto.' })
  }

  const { nome, email, telefone, tipo, data, horario, mensagem } = req.body

  if (!nome || !email || !tipo || !data || !horario) {
    return res.status(400).json({ error: 'nome, email, tipo, data e horário são obrigatórios' })
  }

  try {
    const conflict = await pool.query(
      'SELECT id FROM bookings WHERE tipo = $1 AND data = $2 AND horario = $3',
      [tipo, data, horario]
    )
    if (conflict.rows.length > 0) {
      return res.status(409).json({ error: `Já existe um agendamento de ${tipo === 'evento' ? 'evento' : 'society'} para esta data e horário.` })
    }

    const result = await pool.query(
      `INSERT INTO bookings (nome, email, telefone, tipo, data, horario, mensagem, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [nome, email, telefone || null, tipo, data, horario, mensagem || null, new Date().toISOString()]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Erro ao criar agendamento:', err)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

router.delete('/', async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Não autorizado' })
  }

  const id = req.query.id
  if (!id) {
    return res.status(400).json({ error: 'ID não informado' })
  }

  try {
    const result = await pool.query(
      'DELETE FROM bookings WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado' })
    }

    res.json({ message: 'Agendamento excluído com sucesso' })
  } catch (err) {
    console.error('Erro ao excluir agendamento:', err)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

export default router
