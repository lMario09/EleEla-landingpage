import { useState, useEffect } from 'react'
import { Mail, Trash2, RefreshCw, Lock } from 'lucide-react'

const API = '/api'

function Admin() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token')
    if (token) {
      setAuthenticated(true)
      fetchMessages(token)
    } else {
      setLoading(false)
    }
  }, [])

  function fetchMessages(token) {
    const t = token || sessionStorage.getItem('admin_token')
    setLoading(true)
    fetch(`${API}/messages`, {
      headers: t ? { 'X-Admin-Auth': t } : {},
    })
      .then((res) => {
        if (res.status === 401) {
          sessionStorage.removeItem('admin_token')
          setAuthenticated(false)
          setLoading(false)
          return Promise.reject(new Error('auth'))
        }
        if (!res.ok) return Promise.reject(new Error('Erro ao carregar'))
        return res.json()
      })
      .then((data) => {
        setMessages(data.reverse())
        setLoading(false)
      })
      .catch((e) => {
        if (e.message !== 'auth') alert(e.message)
        setLoading(false)
      })
  }

  function handleLogin(e) {
    e.preventDefault()
    setLoginError('')
    fetch(`${API}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Senha inválida')
        sessionStorage.setItem('admin_token', password)
        setAuthenticated(true)
        fetchMessages(password)
      })
      .catch(() => setLoginError('Senha inválida'))
  }

  function deleteMessage(id) {
    const token = sessionStorage.getItem('admin_token')
    fetch(`${API}/messages?id=${id}`, {
      method: 'DELETE',
      headers: token ? { 'X-Admin-Auth': token } : {},
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao excluir')
        setMessages((prev) => prev.filter((msg) => msg.id !== id))
      })
      .catch(() => alert('Não foi possível excluir a mensagem.'))
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 w-full max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-gold-light" />
            <h1 className="text-xl font-bold text-navy">Acesso Restrito</h1>
          </div>
          {loginError && (
            <p className="text-red-500 text-sm mb-4">{loginError}</p>
          )}
          <input
            type="password"
            placeholder="Senha de admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gold/50"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-navy text-white py-2 rounded-lg hover:bg-navy-light transition-colors font-medium cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-navy border-b border-gold/20 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <h1 className="text-white font-bold flex items-center gap-2">
            <Mail className="w-5 h-5 text-gold-light" />
            Painel Admin — Mensagens
          </h1>
          <button
            onClick={() => fetchMessages()}
            className="text-sm text-slate-300 hover:text-gold-light flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <p className="text-slate-400 text-center py-12">Carregando mensagens...</p>
        ) : messages.length === 0 ? (
          <p className="text-slate-400 text-center py-12">Nenhuma mensagem recebida ainda.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-xl bg-white p-5 shadow-sm border border-slate-100"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      <span className="font-semibold text-navy">{msg.nome}</span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-gold hover:text-gold-light transition-colors"
                      >
                        {msg.email}
                      </a>
                      {msg.telefone && (
                        <span className="text-slate-400">{msg.telefone}</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{msg.mensagem}</p>
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(msg.created_at).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="shrink-0 p-2 text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Admin
