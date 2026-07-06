import { useState } from 'react'
import {
  Trees, UtensilsCrossed, Waves, Heart,   Trophy, Camera,
  Wifi, Car, Accessibility, Calendar,
  Fish, Beer, ChefHat, Wallet,
  Droplets, ShieldCheck,
  MessageCircle, MapPin, Clock, Star,
} from 'lucide-react'
import logoSrc from '../assets/image/Logo sem fundo.png'
import img2 from '../assets/image/image2.webp'
import img4 from '../assets/image/image4.webp'
import img5 from '../assets/image/image5.webp'
import img6 from '../assets/image/image6.webp'

const highlights = [
  {
    title: 'O Espaço',
    desc: 'Atmosfera familiar, acolhedora e tranquila, cercada por áreas verdes integradas à natureza.',
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
  { title: 'Segurança', desc: 'Área organizada para que os pais possam monitorar as crianças das mesas e espreguiçadeiras.', icon: ShieldCheck },
  { title: 'Diversão Garantida', desc: 'Brinquedos aquáticos interativos em área segura e de fácil monitoramento.', icon: Heart },
]

const galeria = [
  { id: 2, src: img2, alt: 'Piscina' },
  { id: 4, src: img4, alt: 'Suíte' },
  { id: 5, src: img5, alt: 'Área gourmet' },
  { id: 6, src: img6, alt: 'Sauna' },
]

function Home() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', mensagem: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, createdAt: new Date().toISOString() }),
    })
      .then(() => setSent(true))
      .catch(() => setSent(true))
  }

  return (
    <>
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
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Espaço de Lazer e Parque Aquático
          </p>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#servicos"
              className="inline-flex items-center rounded-full bg-gold-light px-6 py-3 text-sm font-semibold text-navy shadow-sm hover:bg-gold hover:-translate-y-0.5 transition-all duration-200"
            >
              Conheça nossas atrações
            </a>
            <a
              href="#contato"
              className="inline-flex items-center rounded-full border-2 border-gold-light px-6 py-3 text-sm font-semibold text-gold-light hover:bg-gold-light hover:text-navy hover:-translate-y-0.5 transition-all duration-200"
            >
              Entre em contato
            </a>
          </div>
        </div>
      </section>

      {/* ===== DESTAQUES ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
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
      <section id="sobre" className="bg-gradient-to-br from-gold/[0.03] to-sky-custom/[0.03] border-y border-gold/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-navy mb-3">
            Sobre o <span className="text-gold">Ele&amp;Ela</span>
          </h2>
          <p className="text-center text-slate-500 mb-10 max-w-3xl mx-auto">
            Um espaço de lazer pensado para reunir família e amigos em um ambiente acolhedor,
            tranquilo e cercado pela natureza.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {infraItems.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 rounded-xl bg-white p-4 border border-slate-100 shadow-sm"
              >
                <item.icon className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-gradient-to-br from-gold/10 to-sky-custom/10 p-6 text-center border border-gold/20">
              <div className="text-2xl font-bold text-gold-dark">Sáb e Dom</div>
              <div className="text-sm text-slate-500">Funcionamento</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-gold/10 to-sky-custom/10 p-6 text-center border border-gold/20">
              <div className="text-2xl font-bold text-gold-dark">9h às 17h</div>
              <div className="text-sm text-slate-500">Horário</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-gold/10 to-sky-custom/10 p-6 text-center border border-gold/20">
              <div className="text-2xl font-bold text-gold-dark">Família</div>
              <div className="text-sm text-slate-500">Público</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section id="servicos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-navy mb-3">
          Nossas <span className="text-gold">Atrações</span>
        </h2>
        <p className="text-center text-slate-500 mb-12 max-w-2xl mx-auto">
          Tudo que você precisa para um dia inesquecível em família
        </p>

        <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
          <Fish className="w-6 h-6 text-gold" /> Gastronomia
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {gastronomia.map((item) => (
            <div key={item.title} className="group rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start gap-4">
                <item.icon className="w-6 h-6 text-gold mt-1 shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-navy mb-1 group-hover:text-gold transition-colors">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
          <Waves className="w-6 h-6 text-gold" /> Parque Aquático
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {parque.map((item) => (
            <div key={item.title} className="group rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start gap-4">
                <item.icon className="w-6 h-6 text-gold mt-1 shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-navy mb-1 group-hover:text-gold transition-colors">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section id="galeria" className="bg-gradient-to-br from-gold/[0.03] to-sky-custom/[0.03] border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-navy mb-3">
            <span className="text-gold">Galeria</span>
          </h2>
          <p className="text-center text-slate-500 mb-10">Conheça nosso espaço</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {galeria.map((photo) => (
              <div key={photo.id} className="group relative overflow-hidden rounded-2xl shadow-sm border border-slate-100">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTATO ===== */}
      <section id="contato" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-navy mb-3">
          Entre em <span className="text-gold">Contato</span>
        </h2>
        <p className="text-center text-slate-500 mb-10">Reserve eventos ou tire suas dúvidas</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="rounded-xl bg-gradient-to-br from-gold/5 to-sky-custom/5 border border-gold/20 p-4 text-center">
            <Clock className="w-5 h-5 text-gold mx-auto mb-2" />
            <div className="text-sm font-semibold text-navy mb-1">Aberto ao público</div>
            <div className="text-xs text-slate-500">Sáb e Dom • 9h às 17h</div>
          </div>

          <a
            href="https://www.instagram.com/lazer_ele_e_ela_park/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-gradient-to-br from-gold/5 to-sky-custom/5 border border-gold/20 p-4 text-center block hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <Camera className="w-5 h-5 text-gold mx-auto mb-2" />
            <div className="text-sm font-semibold text-navy mb-1">Instagram</div>
            <div className="text-xs text-slate-500">@lazer_ele_e_ela_park</div>
          </a>
          <a
            href="https://wa.me/5589988120088"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-gradient-to-br from-gold/5 to-sky-custom/5 border border-gold/20 p-4 text-center block hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5 text-gold mx-auto mb-2" />
            <div className="text-sm font-semibold text-navy mb-1">WhatsApp</div>
            <div className="text-xs text-slate-500">(89) 98812-0088</div>
          </a>
          <a
            href="https://maps.app.goo.gl/8QS4GsunhAViZYE9A"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-gradient-to-br from-gold/5 to-sky-custom/5 border border-gold/20 p-4 text-center block hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <MapPin className="w-5 h-5 text-gold mx-auto mb-2" />
            <div className="text-sm font-semibold text-navy mb-1">Endereço</div>
            <div className="text-xs text-slate-500">Ver no mapa</div>
          </a>
        </div>

        {sent ? (
          <div className="max-w-lg mx-auto rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center">
            <p className="text-emerald-700 font-medium">Mensagem enviada com sucesso! Entraremos em contato em breve.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
            <input
              name="nome" placeholder="Seu nome" value={form.nome} onChange={handleChange} required
              className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            />
            <input
              name="email" type="email" placeholder="Seu email" value={form.email} onChange={handleChange} required
              className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            />
            <input
              name="telefone" placeholder="Seu telefone" value={form.telefone} onChange={handleChange}
              className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            />
            <textarea
              name="mensagem" placeholder="Sua mensagem" rows={5} value={form.mensagem} onChange={handleChange} required
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

      {/* ===== AVALIAÇÃO GOOGLE ===== */}
      <section className="bg-gradient-to-br from-gold/[0.03] to-sky-custom/[0.03] border-y border-gold/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <Star className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
            Avalie a gente no <span className="text-gold">Google</span>
          </h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">
            Sua opinião é muito importante para nós. Compartilhe sua experiência e ajude outros
            visitantes a conhecer o espaço.
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
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light px-6 sm:px-12 py-12 sm:py-16 text-center border border-gold/20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Venha passar o dia conosco!
          </h2>
          <p className="text-slate-400 mb-6">Aos sábados e domingos, das 9h às 17h</p>
          <a
            href="#contato"
            className="inline-flex items-center rounded-full bg-gold-light px-6 py-3 text-sm font-semibold text-navy shadow-sm hover:bg-gold hover:-translate-y-0.5 transition-all duration-200"
          >
            Agende eventos
          </a>
        </div>
      </section>
    </>
  )
}

export default Home
