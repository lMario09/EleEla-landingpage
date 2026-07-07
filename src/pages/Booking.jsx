import { useState } from 'react'
import { Icon } from 'lucide-react'
import { soccerBall } from '@lucide/lab'
import { Calendar, Clock, PartyPopper, CheckCircle } from 'lucide-react'
import logoSrc from '../assets/image/Logo sem fundo.png'

const tipos = [
  { value: 'evento', label: 'Espaço para Eventos', icon: PartyPopper, desc: 'Festas, confraternizações e comemorações' },
  { value: 'society', label: 'Campo Society', icon: soccerBall, desc: 'Partidas de futebol society', isLab: true },
]

const horariosSociety = [
  '16:00', '17:00', '18:00', '19:00', '20:00',
]

const today = new Date().toISOString().split('T')[0]

function Booking() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipo: 'evento',
    data: '',
    horario: '09:00',
    mensagem: '',
  })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(async (res) => {
        if (res.status === 409) {
          const data = await res.json()
          setError(data.error)
          return
        }
        if (!res.ok) throw new Error('Erro ao agendar')
        setSent(true)
      })
      .catch(() => setError('Erro ao enviar. Tente novamente.'))
  }

  if (sent) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-navy mb-2">Agendamento solicitado!</h1>
          <p className="text-slate-500 mb-6">
            Recebemos sua solicitação. Entraremos em contato para confirmar o horário.
          </p>
          <a
            href="/"
            className="inline-flex items-center rounded-full bg-gold-light px-6 py-3 text-sm font-semibold text-navy hover:bg-gold transition-colors"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <img src={logoSrc} alt="Ele&Ela" className="h-20 w-auto mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-navy">
            Faça seu <span className="text-gold">Agendamento</span>
          </h1>
          <p className="text-slate-500 mt-2">
            Reserve o espaço para seu evento ou agende uma partida no campo society
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Nome</label>
              <input
                name="nome" value={form.nome} onChange={handleChange} required
                className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Email</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange} required
                className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Telefone</label>
              <input
                name="telefone" value={form.telefone} onChange={handleChange}
                className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
                placeholder="(89) 98812-0088"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Tipo</label>
              <div className="grid grid-cols-2 gap-2">
                {tipos.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setForm({ ...form, tipo: t.value, horario: t.value === 'society' ? '16:00' : '09:00' })}
                    className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 text-center transition-all duration-200 cursor-pointer ${
                      form.tipo === t.value
                        ? 'border-gold bg-gold/5 text-navy'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {t.isLab ? <Icon iconNode={t.icon} className={`w-5 h-5 ${form.tipo === t.value ? 'text-gold' : ''}`} /> : <t.icon className={`w-5 h-5 ${form.tipo === t.value ? 'text-gold' : ''}`} />}
                    <span className="text-xs font-medium leading-tight">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Data</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  name="data" type="date" value={form.data} onChange={handleChange} required
                  min={today}
                  className="block w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
                />
              </div>
            </div>
            {form.tipo === 'society' ? (
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Horário</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <select
                    name="horario" value={form.horario} onChange={handleChange} required
                    className="block w-full rounded-xl border border-slate-200 pl-10 pr-8 py-3 text-sm text-navy appearance-none focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors bg-white"
                  >
                    {horariosSociety.map((h) => {
                      const end = `${String(Number(h.split(':')[0]) + 1).padStart(2, '0')}:${h.split(':')[1]}`
                      return (
                        <option key={h} value={h}>{h} às {end}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Horário</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    name="horario" type="time" value={form.horario} onChange={handleChange} required
                    className="block w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-1">Observações</label>
            <textarea
              name="mensagem" value={form.mensagem} onChange={handleChange} rows={3}
              className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors resize-y"
              placeholder="Informações adicionais (opcional)"
            />
          </div>

          {form.tipo === 'evento' && (
            <div className="rounded-xl bg-gold/5 border border-gold/20 p-4 flex items-start gap-3">
              <PartyPopper className="w-5 h-5 text-gold mt-0.5 shrink-0" />
              <p className="text-sm text-slate-600">
                Para eventos, informaremos a disponibilidade e condições especiais.
                Entraremos em contato para alinhar os detalhes.
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gold-light px-6 py-3 text-sm font-semibold text-navy shadow-sm hover:bg-gold hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            Solicitar agendamento
          </button>
        </form>
      </div>
    </div>
  )
}

export default Booking
