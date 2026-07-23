import { useState, useEffect } from 'react'
import { Icon } from 'lucide-react'
import { soccerBall } from '@lucide/lab'
import {
  Trees, UtensilsCrossed, Waves, Heart,   Trophy, Camera,
  Wifi, Car, Accessibility, Calendar,
  Fish, Beer, ChefHat, Wallet,
  Droplets, ShieldCheck,
  MessageCircle, MapPin, Clock, Star, CalendarArrowUp, PartyPopper, CheckCircle, DollarSign, X, ZoomIn,
} from 'lucide-react'
import logoSrc from '../assets/image/Logo sem fundo.png'
import img2 from '../assets/image/image2.webp'
import img4 from '../assets/image/image4.webp'
import img5 from '../assets/image/image5.webp'
import img6 from '../assets/image/image6.webp'
import cardapioRefeicoes from '../assets/image/cardapio/Refeições.jpeg'
import cardapioPorcoes from '../assets/image/cardapio/Porções.jpeg'
import cardapioCervejas from '../assets/image/cardapio/Cervejas.jpeg'
import cardapioBebidas from '../assets/image/cardapio/Bebidas.jpeg'

const highlights = [
  {
    title: 'Ambiente',
    desc: 'Ambiente agradável e aconchegante para reunir a família e aproveitar momentos especiais.',
    icon: Trees,
  },
  {
    title: 'Gastronomia',
    desc: 'Culinária regional com peixe fresco, petiscos e bar completo. Preço acessível e excelente custo-benefício.',
    icon: UtensilsCrossed,
  },
  {
    title: 'Parque Aquático',
    desc: 'Complexo de piscinas limpas e monitoradas, toboáguas, escorregadores e brinquedos aquáticos interativos.',
    icon: Waves,
  },
]

const infraItems = [
  { icon: Trees, label: 'Áreas verdes integradas à natureza' },
  { icon: Trophy, label: 'Campo society disponível para reserva de partidas' },
  { icon: Wifi, label: 'Conexão Wi-Fi gratuita' },
  { icon: Car, label: 'Estacionamento privativo sem custo' },
  { icon: Accessibility, label: 'Estrutura acessível para cadeirantes' },
  { icon: Calendar, label: 'Reservas para festas e eventos' },
]

const gastronomia = [
  { title: 'Cardápio Regional', desc: 'Focado na culinária regional, com destaque para pratos de peixe fresco como a tradicional tilápia frita, além de petiscos.', icon: Fish },
  { title: 'Bar Completo', desc: 'Cervejas geladas, drinks, refrigerantes, sucos naturais e opções de doses.', icon: Beer },
  { title: 'Serviço de Mesa', desc: 'Atendimento nas áreas cobertas e próximas às piscinas, além de serviço de balcão.', icon: ChefHat },
  { title: 'Custo-Benefício', desc: 'Avaliado pelos frequentadores como altamente acessível e com excelente custo-benefício.', icon: Wallet },
]

const parque = [
  { title: 'Piscinas', desc: 'Complexo de piscinas limpas e monitoradas, com áreas profundas para adultos e rasas para o público infantil.', icon: Waves },
  { title: 'Toboáguas', desc: 'Equipado com toboáguas de diferentes tamanhos e escorregadores integrados para todas as idades.', icon: Droplets },
  { title: 'Segurança', desc: 'Bombeiro civil presente durante todo o funcionamento.', icon: ShieldCheck },
  { title: 'Diversão Garantida', desc: 'Brinquedos aquáticos interativos em área segura e de fácil monitoramento.', icon: Heart },
]

const galeria = [
  { id: 2, src: img2, alt: 'Piscina' },
  { id: 4, src: img4, alt: 'Suíte' },
  { id: 5, src: img5, alt: 'Área gourmet' },
  { id: 6, src: img6, alt: 'Sauna' },
]

const cardapioItems = [
  { src: cardapioRefeicoes, label: 'Refeições' },
  { src: cardapioPorcoes, label: 'Porções' },
  { src: cardapioCervejas, label: 'Cervejas' },
  { src: cardapioBebidas, label: 'Bebidas' },
]

const tipos = [
  { value: 'evento', label: 'Espaço para Eventos', icon: PartyPopper, desc: 'Festas, confraternizações e comemorações' },
  { value: 'society', label: 'Campo Society', icon: soccerBall, desc: 'Partidas de futebol society', isLab: true },
]

const horariosSociety = [
  '16:00', '17:00', '18:00', '19:00', '20:00',
]

const today = new Date().toISOString().split('T')[0]

function Home() {
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '',
    tipo: 'evento', data: '', horario: '09:00', mensagem: '',
  })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [bookedSlots, setBookedSlots] = useState([])
  const [menuOpen, setMenuOpen] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (form.data && form.tipo) {
      fetch(`/api/availability?tipo=${form.tipo}&data=${form.data}`)
        .then((res) => res.json())
        .then((data) => setBookedSlots(data.horarios || []))
        .catch(() => {})
    } else {
      setBookedSlots([])
    }
  }, [form.data, form.tipo])

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

  return (
    <div className={`transition-opacity duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* ===== HERO ===== */}
      <section id="inicio" className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0">
          <img src={img2} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 text-center">
          <img src={logoSrc} alt="Ele&Ela" className="h-36 sm:h-52 w-auto mx-auto mb-8" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Bem-vindo ao{' '}
            <span className="text-gold-light">Ele&amp;Ela</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Espaço de Lazer e Parque Aquático
          </p>
          <p className="mt-2 text-sm text-white/70 max-w-xl mx-auto">
            Aberto ao público todos os sábados e domingos, das 9h às 17h
          </p>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#servicos"
              className="inline-flex items-center justify-center rounded-full border-2 border-gold-light px-8 py-3 text-sm font-semibold text-gold-light hover:bg-gold-light hover:text-navy hover:-translate-y-0.5 transition-all duration-200 min-w-[220px]"
            >
              Conheça nossas atrações
            </a>
            <a
              href="#agendamento"
              className="btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-gold-light px-8 py-3 text-sm font-semibold text-navy shadow-lg shadow-gold-light/40 hover:bg-gold hover:shadow-gold/60 hover:-translate-y-0.5 transition-all duration-200 min-w-[220px]"
            >
              <CalendarArrowUp className="w-4 h-4" />
              Agendar evento ou campo society
            </a>
          </div>

        </div>
        <div className="hero-wave absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== DESTAQUES ===== */}
      <section className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-navy mb-10">
          Por que escolher o <span className="text-gold">Ele&amp;Ela</span>?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <item.icon className="w-8 h-8 text-gold mb-4" />
              <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SOBRE ===== */}
      <section id="sobre" className="reveal bg-gradient-to-br from-gold/[0.03] to-sky-custom/[0.03] border-y border-gold/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-2">Sobre</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              <span className="text-gold">Ele&amp;Ela</span>
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
              Um espaço de lazer pensado para reunir família e amigos em um ambiente acolhedor,
              tranquilo e cercado pela natureza.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
                <Trees className="w-5 h-5 text-gold" />
                Infraestrutura
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {infraItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold" />
                Regulamento
              </h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center justify-between py-2 px-4 rounded-xl bg-slate-50/80 border border-slate-100">
                  <span className="text-sm font-semibold text-navy">Sábados</span>
                  <span className="text-gold font-bold text-xl">R$ 10,00</span>
                </div>
                <div className="flex items-center justify-between py-2 px-4 rounded-xl bg-slate-50/80 border border-slate-100">
                  <span className="text-sm font-semibold text-navy">Domingos</span>
                  <span className="text-gold font-bold text-xl">R$ 15,00</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500 bg-gold/5 rounded-xl px-4 py-3 border border-gold/10">
                  <Clock className="w-4 h-4 text-gold" />
                  Sáb e Dom • 9h às 17h
                </div>
              </div>

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Gratuidades</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-gold/5 border border-gold/20 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-navy">Aniversariante do dia</span>
                    <span className="text-xs text-gold-dark">Apresentar documento</span>
                  </div>
                  <span className="text-gold-dark font-bold text-xs bg-gold/10 px-3 py-1.5 rounded-full shrink-0 border border-gold/20">GRÁTIS</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-gold/5 border border-gold/20 px-4 py-3">
                  <div className="flex-1">
                    <span className="block text-sm font-semibold text-navy">Crianças até 5 anos</span>
                  </div>
                  <span className="text-gold-dark font-bold text-xs bg-gold/10 px-3 py-1.5 rounded-full shrink-0 border border-gold/20">GRÁTIS</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-gold/5 border border-gold/20 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-navy">Idosos a partir de 60 anos</span>
                    <span className="text-xs text-gold-dark">Apresentar documento</span>
                  </div>
                  <span className="text-gold-dark font-bold text-xs bg-gold/10 px-3 py-1.5 rounded-full shrink-0 border border-gold/20">GRÁTIS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section id="servicos" className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-2">Atrações</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">
            Nossas <span className="text-gold">Atrações</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            Tudo que você precisa para um dia inesquecível em família
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
              <Fish className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-navy">Gastronomia</h3>
              <p className="text-sm text-slate-400">Sabores que encantam</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {gastronomia.map((item) => (
              <div key={item.title} className="group rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/10 to-sky-custom/5 flex items-center justify-center shrink-0 group-hover:from-gold/20 group-hover:to-sky-custom/10 transition-all">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-navy mb-1 group-hover:text-gold transition-colors">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
              <Waves className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-navy">Parque Aquático</h3>
              <p className="text-sm text-slate-400">Diversão para toda a família</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {parque.map((item) => (
              <div key={item.title} className="group rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/10 to-sky-custom/5 flex items-center justify-center shrink-0 group-hover:from-gold/20 group-hover:to-sky-custom/10 transition-all">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-navy mb-1 group-hover:text-gold transition-colors">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CARDÁPIO ===== */}
      <section id="cardapio" className="reveal max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-2">Cardápio</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">
            Nosso <span className="text-gold">Cardápio</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            Confira nossas opções de refeições, porções e bebidas
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cardapioItems.map((item) => (
            <button key={item.label} onClick={() => setMenuOpen(item)}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img src={item.src} alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                <span className="text-white font-semibold text-sm drop-shadow-md">{item.label}</span>
                <ZoomIn className="w-4 h-4 text-white/80 drop-shadow-md" />
              </div>
            </button>
          ))}
        </div>

        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-transparent backdrop-blur-sm" onClick={() => setMenuOpen(null)}>
            <button onClick={() => setMenuOpen(null)}
              className="fixed top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors cursor-pointer z-20"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}>
              <img src={menuOpen.src} alt={menuOpen.label}
                className="max-h-[85vh] max-w-[85vw] w-auto h-auto object-contain" />
            </div>
          </div>
        )}
      </section>

      {/* ===== GALERIA ===== */}
      <section id="galeria" className="reveal bg-gradient-to-br from-gold/[0.03] to-sky-custom/[0.03] border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-2">Galeria</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Conheça nosso <span className="text-gold">Espaço</span>
            </h2>
          </div>
          <div className="columns-1 sm:columns-2 gap-4 space-y-4">
            {galeria.map((photo, i) => (
              <div key={photo.id} className="group relative overflow-hidden rounded-2xl shadow-sm border border-slate-100 break-inside-avoid hover:shadow-lg transition-shadow duration-300">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${i % 2 === 0 ? 'h-72 sm:h-96' : 'h-56 sm:h-72'}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AGENDAMENTO ===== */}
      <section id="agendamento" className="reveal bg-gradient-to-br from-gold/[0.03] to-sky-custom/[0.03] border-y border-gold/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-2">Agendamento</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Faça seu <span className="text-gold">Agendamento</span>
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
              Reserve o espaço para seu evento ou agende uma partida no campo society
            </p>
          </div>

          {sent ? (
            <div className="max-w-lg mx-auto text-center py-12">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-navy mb-2">Agendamento solicitado!</h3>
              <p className="text-slate-500 mb-6">
                Recebemos sua solicitação. Entraremos em contato para confirmar o horário.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ nome: '', email: '', telefone: '', tipo: 'evento', data: '', horario: '09:00', mensagem: '' }) }}
                className="inline-flex items-center rounded-full bg-gold-light px-6 py-3 text-sm font-semibold text-navy hover:bg-gold transition-colors cursor-pointer"
              >
                Novo agendamento
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Nome</label>
                  <input name="nome" value={form.nome} onChange={handleChange} required placeholder="Seu nome"
                    className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="seu@email.com"
                    className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Telefone</label>
                  <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="(89) 98812-0088"
                    className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Tipo</label>
                  <div className="grid grid-cols-2 gap-2">
                    {tipos.map((t) => (
                      <button key={t.value} type="button"
                        onClick={() => setForm({ ...form, tipo: t.value, horario: t.value === 'society' ? '16:00' : '09:00' })}
                        className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 text-center transition-all duration-200 cursor-pointer ${
                          form.tipo === t.value ? 'border-gold bg-gold/5 text-navy' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
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
                    <input name="data" type="date" value={form.data} onChange={handleChange} required min={today}
                      className="block w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors" />
                  </div>
                </div>
                {form.tipo === 'society' ? (
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Horário</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select name="horario" value={form.horario} onChange={handleChange} required
                        className="block w-full rounded-xl border border-slate-200 pl-10 pr-8 py-3 text-sm text-navy appearance-none focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors bg-white"
                      >
                        {horariosSociety.map((h) => {
                          const end = `${String(Number(h.split(':')[0]) + 1).padStart(2, '0')}:${h.split(':')[1]}`
                          const booked = bookedSlots.includes(h)
                          return <option key={h} value={h} disabled={booked} className={booked ? 'text-slate-300' : ''}>
                            {h} às {end}{booked ? ' (indisponível)' : ''}
                          </option>
                        })}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Horário</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input name="horario" type="time" value={form.horario} onChange={handleChange} required
                        className="block w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors" />
                    </div>
                  </div>
                )}
              </div>

              {form.tipo === 'society' && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-emerald-800"><strong>R$ 100,00</strong> por hora de uso do campo society.</p>
                </div>
              )}

              {form.tipo === 'society' && form.data && bookedSlots.length > 0 && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                  <p className="text-xs font-medium text-amber-800 mb-2">Horários já reservados nesta data:</p>
                  <div className="flex flex-wrap gap-2">
                    {horariosSociety.map((h) => {
                      const booked = bookedSlots.includes(h)
                      return (
                        <span key={h}
                          className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${
                            booked
                              ? 'bg-red-100 text-red-700 border-red-200 line-through'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {h} às {String(Number(h.split(':')[0]) + 1).padStart(2, '0')}:{h.split(':')[1]}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              {form.tipo === 'evento' && form.data && bookedSlots.includes(form.horario) && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                  Este horário já está reservado para um evento nesta data. Escolha outro horário ou data.
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-navy mb-1">Observações</label>
                <textarea name="mensagem" value={form.mensagem} onChange={handleChange} rows={3} placeholder="Informações adicionais (opcional)"
                  className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors resize-y" />
              </div>

              {form.tipo === 'evento' && (
                <div className="rounded-xl bg-gold/5 border border-gold/20 p-4 flex items-start gap-3">
                  <PartyPopper className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">Para eventos, entraremos em contato para negociar o valor e alinhar os detalhes.</p>
                </div>
              )}

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>
              )}

              <button type="submit"
                className="w-full rounded-xl bg-gold-light px-6 py-3 text-sm font-semibold text-navy shadow-sm hover:bg-gold hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                Solicitar agendamento
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ===== CONTATO ===== */}
      <section id="contato" className="reveal bg-gradient-to-br from-gold/[0.03] to-sky-custom/[0.03] border-y border-gold/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-2">Contato</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Entre em <span className="text-gold">Contato</span>
            </h2>
            <p className="text-slate-500 mt-4">Reserve eventos ou tire suas dúvidas</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="group rounded-xl bg-white p-5 text-center shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                <Clock className="w-5 h-5 text-gold" />
              </div>
              <div className="text-sm font-semibold text-navy mb-1">Aberto ao público</div>
              <div className="text-xs text-slate-500">Sáb e Dom • 9h às 17h</div>
            </div>

            <a href="https://www.instagram.com/lazer_ele_e_ela_park/" target="_blank" rel="noopener noreferrer"
              className="group rounded-xl bg-white p-5 text-center block shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                <Camera className="w-5 h-5 text-gold" />
              </div>
              <div className="text-sm font-semibold text-navy mb-1">Instagram</div>
              <div className="text-xs text-slate-500">@lazer_ele_e_ela_park</div>
            </a>

            <a href="https://wa.me/5589988120088" target="_blank" rel="noopener noreferrer"
              className="group rounded-xl bg-white p-5 text-center block shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                <MessageCircle className="w-5 h-5 text-gold" />
              </div>
              <div className="text-sm font-semibold text-navy mb-1">WhatsApp</div>
              <div className="text-xs text-slate-500">(89) 98812-0088</div>
            </a>

            <a href="https://maps.app.goo.gl/8QS4GsunhAViZYE9A" target="_blank" rel="noopener noreferrer"
              className="group rounded-xl bg-white p-5 text-center block shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div className="text-sm font-semibold text-navy mb-1">Endereço</div>
              <div className="text-xs text-slate-500">Ver no mapa</div>
            </a>
          </div>

          <div className="rounded-xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100 text-center max-w-lg mx-auto">
            <div className="inline-flex items-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">Avalie a gente no Google</h3>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">
              Sua opinião é muito importante para nós. Compartilhe sua experiência.
            </p>
            <a
              href="https://www.google.com/maps/place//data=!4m3!3m2!1s0x79c0593c3d1196b:0x3e63c45ca69508a1!12e1?source=g.page.m._&laa=merchant-review-solicitation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-navy-light hover:-translate-y-0.5 transition-all duration-200"
            >
              <Star className="w-4 h-4 fill-gold-light text-gold-light" />
              Avaliar no Google
            </a>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light px-6 sm:px-12 py-12 sm:py-16 text-center border border-gold/20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Venha passar o dia conosco!
          </h2>
          <p className="text-slate-400 mb-2">Aos sábados e domingos, das 9h às 17h</p>
          <p className="text-sm text-slate-500 mb-8 max-w-lg mx-auto">
            O espaço é aberto a todos — o agendamento é apenas para reservar o espaço de eventos ou partidas no campo society
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#agendamento"
              className="btn-glow inline-flex items-center gap-2 rounded-full bg-gold-light px-8 py-4 text-base font-bold text-navy shadow-lg shadow-gold-light/40 hover:bg-gold hover:shadow-gold/60 hover:-translate-y-1 hover:scale-105 transition-all duration-300"
            >
              <CalendarArrowUp className="w-5 h-5" />
              Reservar evento ou campo
            </a>
            <a
              href="https://wa.me/5589988120088"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-gold-light px-6 py-3 text-sm font-semibold text-gold-light hover:bg-gold-light hover:text-navy transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Tire dúvidas no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home