import getPool from './db.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  try {
    const pool = getPool()
    await pool.query('SELECT 1')
    res.status(200).json({ ok: true, timestamp: new Date().toISOString() })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
}
