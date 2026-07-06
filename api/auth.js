function getJSON(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      try { resolve(JSON.parse(body)) } catch { resolve({}) }
    })
  })
}

export default async function handler(req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (req.method === 'OPTIONS') {
    return res.writeHead(204, headers).end()
  }

  if (req.method !== 'POST') {
    return res.writeHead(405, headers).end(JSON.stringify({ error: 'Método não permitido' }))
  }

  const body = await getJSON(req)
  const { password } = body
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return res.writeHead(500, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Senha de admin não configurada' }))
  }

  if (password !== adminPassword) {
    return res.writeHead(401, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Senha inválida' }))
  }

  return res.writeHead(200, { ...headers, 'Content-Type': 'application/json' }).end(JSON.stringify({ success: true }))
}
