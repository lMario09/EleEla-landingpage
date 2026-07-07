import 'dotenv/config'
import pg from 'pg'

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD?.replace(/^"|"$/g, ''),
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
})

const sql = `
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(50),
  tipo VARCHAR(50) NOT NULL,
  data DATE NOT NULL,
  horario TIME NOT NULL,
  mensagem TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`

pool.query(sql)
  .then(() => {
    console.log('Tabela bookings criada com sucesso')
    pool.end()
  })
  .catch((err) => {
    console.error('Erro:', err)
    pool.end()
  })
