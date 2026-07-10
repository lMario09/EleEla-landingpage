import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import messagesRouter from './routes/messages.js'
import authRouter from './routes/auth.js'
import bookingsRouter from './routes/bookings.js'
import availabilityRouter from './routes/availability.js'

const app = express()
const PORT = Number(process.env.PORT) || 3001

app.use(cors())
app.use(express.json())

app.use('/api/messages', messagesRouter)
app.use('/api/auth', authRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api/availability', availabilityRouter)

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'API Ele&Ela rodando' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
