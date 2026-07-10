import getPool from '../api/db.js'

function getCorsOrigin(req) {
  const allowed = [
    process.env.CORS_ORIGIN,
    'http://localhost:5173',
    'http://localhost:3001',
  ].filter(Boolean)
  const origin = req.headers.origin
  return allowed.includes(origin) ? origin : ''
}

export default async function handler(req, res) {
  const corsOrigin = getCorsOrigin(req)
  const headers = {
    'Access-Control-Allow-Origin': corsOrigin || '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (req.method === 'OPTIONS') {
    return res.writeHead(204, headers).end()
  }

  if (req.method !== 'GET') {
    return res.writeHead(405, headers).end(JSON.stringify({ error: 'Método não permitido' }))
  }

  const { tipo, data } = req.query

  if (!tipo || !data) {
    return res.writeHead(400, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'tipo e data são obrigatórios' }))
  }

  try {
    const pool = getPool()
    const result = await pool.query(
      'SELECT horario FROM bookings WHERE tipo = $1 AND data = $2',
      [tipo, data]
    )
    const horarios = result.rows.map((r) => r.horario.slice(0, 5))
    return res.writeHead(200, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ horarios }))
  } catch (err) {
    console.error('Erro:', err)
    return res.writeHead(500, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Erro interno do servidor' }))
  }
}
