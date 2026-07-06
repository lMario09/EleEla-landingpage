import getPool from '../../api/db.js'

export default async function handler(req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (req.method === 'OPTIONS') {
    return res.writeHead(204, headers).end()
  }

  if (req.method !== 'DELETE') {
    return res.writeHead(405, headers).end(JSON.stringify({ error: 'Método não permitido' }))
  }

  try {
    const { id } = req.query
    const pool = getPool()

    const result = await pool.query('DELETE FROM messages WHERE id = $1 RETURNING *', [id])

    if (result.rows.length === 0) {
      return res.writeHead(404, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Mensagem não encontrada' }))
    }

    return res.writeHead(200, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ message: 'Mensagem excluída com sucesso' }))
  } catch (err) {
    console.error('Erro:', err)
    return res.writeHead(500, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Erro interno do servidor' }))
  }
}
