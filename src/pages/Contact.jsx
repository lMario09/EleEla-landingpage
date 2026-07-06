import { useState } from 'react'
import { Clock, Phone, Mail, MapPin } from 'lucide-react'

function Contact() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">
          Entre em <span className="text-gold">Contato</span>
        </h1>
        <p className="text-lg text-slate-500">Reserve sua data ou tire suas dúvidas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="rounded-xl bg-gradient-to-br from-gold/5 to-sky-custom/5 border border-gold/20 p-4 text-center">
          <Clock className="w-5 h-5 text-gold mx-auto mb-2" />
          <div className="text-sm font-semibold text-navy mb-1">Funcionamento</div>
          <div className="text-xs text-slate-500">Sáb e Dom • 9h às 17h</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-gold/5 to-sky-custom/5 border border-gold/20 p-4 text-center">
          <Phone className="w-5 h-5 text-gold mx-auto mb-2" />
          <div className="text-sm font-semibold text-navy mb-1">Telefone</div>
          <div className="text-xs text-slate-500">(11) 99999-9999</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-gold/5 to-sky-custom/5 border border-gold/20 p-4 text-center">
          <Mail className="w-5 h-5 text-gold mx-auto mb-2" />
          <div className="text-sm font-semibold text-navy mb-1">Email</div>
          <div className="text-xs text-slate-500">contato@eleeela.com.br</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-gold/5 to-sky-custom/5 border border-gold/20 p-4 text-center">
          <MapPin className="w-5 h-5 text-gold mx-auto mb-2" />
          <div className="text-sm font-semibold text-navy mb-1">Endereço</div>
          <div className="text-xs text-slate-500">Rua Exemplo, 123 - SP</div>
        </div>
      </div>

      {sent ? (
        <div className="max-w-lg mx-auto rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center">
          <p className="text-emerald-700 font-medium">
            Mensagem enviada com sucesso! Entraremos em contato em breve.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
          <input
            name="nome"
            placeholder="Seu nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
          />
          <input
            name="email"
            type="email"
            placeholder="Seu email"
            value={form.email}
            onChange={handleChange}
            required
            className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
          />
          <input
            name="telefone"
            placeholder="Seu telefone"
            value={form.telefone}
            onChange={handleChange}
            className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
          />
          <textarea
            name="mensagem"
            placeholder="Sua mensagem"
            rows={5}
            value={form.mensagem}
            onChange={handleChange}
            required
            className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors resize-y"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-gold-light px-6 py-3 text-sm font-semibold text-navy shadow-sm hover:bg-gold hover:-translate-y-0.5 transition-all duration-200"
          >
            Enviar mensagem
          </button>
        </form>
      )}
    </section>
  )
}

export default Contact
