import { useState, useEffect } from 'react'
import { Icon } from 'lucide-react'
import { soccerBall } from '@lucide/lab'
import { Trash2, RefreshCw, Lock, Calendar, Clock, PartyPopper } from 'lucide-react'

const API = '/api'

function Admin() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token')
    if (token) {
      setAuthenticated(true)
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

  function fetchBookings(token) {
    const t = token || sessionStorage.getItem('admin_token')
    setLoading(true)
    fetch(`${API}/bookings`, { headers: t ? { 'X-Admin-Auth': t } : {} })
      .then((res) => {
        if (res.status === 401) { handleUnauthorized(); return Promise.reject(new Error('auth')) }
        if (!res.ok) return Promise.reject(new Error('Erro ao carregar'))
        return res.json()
      })
      .then((data) => { setBookings(data); setLoading(false) })
      .catch((e) => { if (e.message !== 'auth') alert(e.message); setLoading(false) })
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
        fetchBookings(password)
      })
      .catch(() => setLoginError('Senha inválida'))
  }

  function isPast(b) {
    const [h, m] = b.horario.split(':').map(Number)
    const bookingDate = new Date(b.data)
    bookingDate.setHours(h, m, 0, 0)
    const now = new Date()
    const diff = (bookingDate - now) / 1000 / 60
    return diff < -60
  }

  const pastBookings = bookings.filter(isPast)
  const currentBookings = bookings.filter((b) => !isPast(b))

  function deleteBooking(id) {
    const headers = authHeaders()
    if (!confirm('Excluir este agendamento?')) return
    fetch(`${API}/bookings?id=${id}`, { method: 'DELETE', headers })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao excluir')
        setBookings((prev) => prev.filter((b) => b.id !== id))
      })
      .catch(() => alert('Não foi possível excluir o agendamento.'))
  }

  function renderCard(b, idx) {
    return (
      <div key={b.id} className="rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${b.tipo === 'evento' ? 'bg-gold/10 text-gold-dark' : 'bg-sky-custom/10 text-sky-custom'}`}>
              {b.tipo === 'evento' ? <><PartyPopper className="w-3 h-3" /> Evento</> : <><Icon iconNode={soccerBall} className="w-3 h-3" /> Society</>}
            </span>
            <span className="text-xs font-medium text-slate-400">#{idx + 1}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 text-sm mr-3">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-navy font-medium">{new Date(b.data).toLocaleDateString('pt-BR')}</span>
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-navy font-medium">{b.horario?.slice(0, 5)}</span>
            </div>
            <button
              onClick={() => deleteBooking(b.id)}
              className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Excluir"
            >
              <Trash2 className="w-4 h-4" />
            </button>
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
    )
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
            <Calendar className="w-5 h-5 text-gold-light" />
            Painel Admin — Agendamentos
          </h1>
          <button
            onClick={() => fetchBookings()}
            className="text-sm text-slate-300 hover:text-gold-light flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {loading ? (
          <p className="text-slate-400 text-center py-12">Carregando agendamentos...</p>
        ) : bookings.length === 0 ? (
          <p className="text-slate-400 text-center py-12">Nenhum agendamento ainda.</p>
        ) : (
          <>
            {currentBookings.length > 0 && (
              <div className="space-y-3 mb-10">
                <h2 className="text-lg font-semibold text-navy flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-gold-light" />
                  Agendamentos ativos
                </h2>
                {currentBookings.map((b, idx) => renderCard(b, idx))}
              </div>
            )}
            {pastBookings.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-400 flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5" />
                  Agendamentos antigos
                </h2>
                {pastBookings.map((b, idx) => renderCard(b, idx))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default Admin
