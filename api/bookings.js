import getPool from '../api/db.js'

function getJSON(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      try { resolve(JSON.parse(body)) } catch { resolve({}) }
    })
  })
}

function isAuthorized(req) {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  return req.headers['x-admin-auth'] === adminPassword
}

function getCorsOrigin(req) {
  const allowed = [
    process.env.CORS_ORIGIN,
    'http://localhost:5173',
    'http://localhost:3001',
  ].filter(Boolean)
  const origin = req.headers.origin
  return allowed.includes(origin) ? origin : ''
}

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

export default async function handler(req, res) {
  const corsOrigin = getCorsOrigin(req)
  const headers = {
    'Access-Control-Allow-Origin': corsOrigin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Auth',
  }

  if (req.method === 'OPTIONS') {
    return res.writeHead(204, headers).end()
  }

  try {
    const pool = getPool()

    if (req.method === 'GET') {
      if (!isAuthorized(req)) {
        return res.writeHead(401, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Não autorizado' }))
      }
      const result = await pool.query('SELECT * FROM bookings ORDER BY data DESC, horario DESC')
      return res.writeHead(200, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify(result.rows))
    }

    if (req.method === 'POST') {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
      if (!checkRateLimit(ip)) {
        return res.writeHead(429, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Muitas requisições. Tente novamente em 1 minuto.' }))
      }

      const body = await getJSON(req)
      const { nome, email, telefone, tipo, data, horario, mensagem } = body

      if (!nome || !email || !tipo || !data || !horario) {
        return res.writeHead(400, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'nome, email, tipo, data e horário são obrigatórios' }))
      }

      const conflict = await pool.query(
        'SELECT id FROM bookings WHERE tipo = $1 AND data = $2 AND horario = $3',
        [tipo, data, horario]
      )
      if (conflict.rows.length > 0) {
        return res.writeHead(409, { ...headers, 'Content-Type': 'application/json' }).end(
          JSON.stringify({ error: `Já existe um agendamento de ${tipo === 'evento' ? 'evento' : 'society'} para esta data e horário.` })
        )
      }

      const result = await pool.query(
        `INSERT INTO bookings (nome, email, telefone, tipo, data, horario, mensagem, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [nome, email, telefone || null, tipo, data, horario, mensagem || null, new Date().toISOString()]
      )

      return res.writeHead(201, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify(result.rows[0]))
    }

    return res.writeHead(405, headers).end(JSON.stringify({ error: 'Método não permitido' }))
  } catch (err) {
    console.error('Erro:', err)
    return res.writeHead(500, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Erro interno do servidor' }))
  }
}
