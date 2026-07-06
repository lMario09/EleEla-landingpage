import { Router } from 'express'

const router = Router()

router.post('/', (req, res) => {
  const { password } = req.body || {}
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return res.status(500).json({ error: 'Senha de admin não configurada' })
  }

  if (password !== adminPassword) {
    return res.status(401).json({ error: 'Senha inválida' })
  }

  res.json({ success: true })
})

export default router
