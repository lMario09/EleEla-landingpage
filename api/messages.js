import getPool from '../api/db.js'

export default async function handler(req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (req.method === 'OPTIONS') {
    return res.writeHead(204, headers).end()
  }

  try {
    const pool = getPool()

    if (req.method === 'GET') {
      const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC')
      return res.writeHead(200, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify(result.rows))
    }

    if (req.method === 'POST') {
      const { nome, email, telefone, mensagem } = req.body || {}

      if (!nome || !email || !mensagem) {
        return res.writeHead(400, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'nome, email e mensagem são obrigatórios' }))
      }

      const result = await pool.query(
        `INSERT INTO messages (nome, email, telefone, mensagem, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nome, email, telefone || null, mensagem, new Date().toISOString()]
      )

      return res.writeHead(201, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify(result.rows[0]))
    }

    return res.writeHead(405, headers).end(JSON.stringify({ error: 'Método não permitido' }))
  } catch (err) {
    console.error('Erro:', err)
    return res.writeHead(500, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Erro interno do servidor' }))
  }
}
