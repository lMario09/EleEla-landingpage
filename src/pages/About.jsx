import { Wifi, Car, Baby, Accessibility, Calendar, TreePine } from 'lucide-react'

const infraItems = [
  { icon: TreePine, label: 'Áreas verdes integradas à natureza' },
  { icon: Baby, label: 'Banheiros adaptados e fraldário' },
  { icon: Wifi, label: 'Conexão Wi-Fi gratuita' },
  { icon: Car, label: 'Estacionamento privativo sem custo' },
  { icon: Accessibility, label: 'Estrutura acessível para cadeirantes' },
  { icon: Calendar, label: 'Reservas para festas e eventos' },
]

function About() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-6">
        Sobre o <span className="text-gold">Ele&amp;Ela</span>
      </h1>

      <div className="space-y-4 text-slate-600 leading-relaxed mb-10">
        <p className="text-lg">
          O <strong>Ele&amp;Ela</strong> é um espaço de lazer pensado para reunir
          família e amigos em um ambiente acolhedor, tranquilo e cercado pela
          natureza.
        </p>
        <p>
          Nossa estrutura conta com amplas áreas verdes, piscinas monitoradas,
          toboáguas, gastronomia regional e tudo que você precisa para um dia
          inesquecível. Trabalhamos para oferecer conforto, segurança e diversão
          para todas as idades.
        </p>
        <p>
          Realizamos festas particulares, aniversários, casamentos,
          confraternizações empresariais e excursões escolares. Entre em contato
          e reserve a sua data!
        </p>
      </div>

      <h2 className="text-xl font-bold text-navy mb-6">Infraestrutura</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {infraItems.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-3 rounded-xl bg-gradient-to-br from-gold/5 to-sky-custom/5 p-4 border border-gold/20"
          >
            <item.icon className="w-5 h-5 text-gold mt-0.5 shrink-0" />
            <span className="text-sm text-slate-600">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
    </section>
  )
}

export default About
