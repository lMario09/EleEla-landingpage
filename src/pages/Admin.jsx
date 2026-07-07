import { useState, useEffect } from 'react'
import { Icon } from 'lucide-react'
import { soccerBall } from '@lucide/lab'
import { Mail, Trash2, RefreshCw, Lock, Calendar, Clock, PartyPopper } from 'lucide-react'

const API = '/api'

const tabs = [
  { key: 'messages', label: 'Mensagens', icon: Mail },
  { key: 'bookings', label: 'Agendamentos', icon: Calendar },
]

function Admin() {
  const [messages, setMessages] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [tab, setTab] = useState('messages')

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token')
    if (token) {
      setAuthenticated(true)
      fetchMessages(token)
      fetchBookings(token)
    } else {
      setLoading(false)
    }
  }, [])

  function authHeaders() {
    const token = sessionStorage.getItem('admin_token')
    return token ? { 'X-Admin-Auth': token } : {}
  }

  function handleUnauthorized() {
    sessionStorage.removeItem('admin_token')
    setAuthenticated(false)
    setLoading(false)
  }

  function fetchMessages(token) {
    const t = token || sessionStorage.getItem('admin_token')
    setLoading(true)
    fetch(`${API}/messages`, { headers: t ? { 'X-Admin-Auth': t } : {} })
      .then((res) => {
        if (res.status === 401) { handleUnauthorized(); return Promise.reject(new Error('auth')) }
        if (!res.ok) return Promise.reject(new Error('Erro ao carregar'))
        return res.json()
      })
      .then((data) => { setMessages(data.reverse()); setLoading(false) })
      .catch((e) => { if (e.message !== 'auth') alert(e.message); setLoading(false) })
  }

  function fetchBookings(token) {
    const t = token || sessionStorage.getItem('admin_token')
    fetch(`${API}/bookings`, { headers: t ? { 'X-Admin-Auth': t } : {} })
      .then((res) => {
        if (res.status === 401) { handleUnauthorized(); return Promise.reject(new Error('auth')) }
        if (!res.ok) return Promise.reject(new Error('Erro ao carregar'))
        return res.json()
      })
      .then((data) => setBookings(data))
      .catch((e) => { if (e.message !== 'auth') alert(e.message) })
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
        fetchBookings(password)
      })
      .catch(() => setLoginError('Senha inválida'))
  }

  function deleteMessage(id) {
    const headers = authHeaders()
    fetch(`${API}/messages?id=${id}`, { method: 'DELETE', headers })
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
          {loginError && <p className="text-red-500 text-sm mb-4">{loginError}</p>}
          <input
            type="password" placeholder="Senha de admin" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gold/50" autoFocus
          />
          <button type="submit" className="w-full bg-navy text-white py-2 rounded-lg hover:bg-navy-light transition-colors font-medium cursor-pointer">
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
            Painel Admin
          </h1>
          <button
            onClick={() => { fetchMessages(); fetchBookings() }}
            className="text-sm text-slate-300 hover:text-gold-light flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <nav className="flex gap-1 bg-white rounded-xl border border-slate-100 shadow-sm p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                tab === t.key ? 'bg-navy text-white shadow-sm' : 'text-slate-500 hover:text-navy hover:bg-slate-50'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {tab === 'messages' && (
          loading ? (
            <p className="text-slate-400 text-center py-12">Carregando mensagens...</p>
          ) : messages.length === 0 ? (
            <p className="text-slate-400 text-center py-12">Nenhuma mensagem recebida ainda.</p>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Mensagem #{msg.id}</span>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">Nome</span>
                        <span className="text-navy font-medium">{msg.nome}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">Email</span>
                        <a href={`mailto:${msg.email}`} className="text-gold hover:text-gold-light transition-colors">{msg.email}</a>
                      </div>
                      <div>
                        <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">Telefone</span>
                        <span className="text-slate-600">{msg.telefone || '—'}</span>
                      </div>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">Mensagem</span>
                      <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 leading-relaxed">{msg.mensagem}</p>
                    </div>
                    <div className="text-xs text-slate-400">
                      Recebido em {new Date(msg.created_at).toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {tab === 'bookings' && (
          bookings.length === 0 ? (
            <p className="text-slate-400 text-center py-12">Nenhum agendamento ainda.</p>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${b.tipo === 'evento' ? 'bg-gold/10 text-gold-dark' : 'bg-sky-custom/10 text-sky-custom'}`}>
                        {b.tipo === 'evento' ? <><PartyPopper className="w-3 h-3" /> Evento</> : <><Icon iconNode={soccerBall} className="w-3 h-3" /> Society</>}
                      </span>
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">#{b.id}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-navy font-medium">{new Date(b.data).toLocaleDateString('pt-BR')}</span>
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-navy font-medium">{b.horario?.slice(0, 5)}</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">Nome</span>
                        <span className="text-navy font-medium">{b.nome}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">Email</span>
                        <a href={`mailto:${b.email}`} className="text-gold hover:text-gold-light transition-colors">{b.email}</a>
                      </div>
                      <div>
                        <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">Telefone</span>
                        <span className="text-slate-600">{b.telefone || '—'}</span>
                      </div>
                    </div>
                    {b.mensagem && (
                      <div>
                        <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">Observações</span>
                        <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 leading-relaxed">{b.mensagem}</p>
                      </div>
                    )}
                    <div className="text-xs text-slate-400">
                      Solicitado em {new Date(b.created_at).toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </main>
    </div>
  )
}

export default Admin
