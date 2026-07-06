import { Fish, Beer, ChefHat, Wallet, Waves, Droplets, Baby, ShieldCheck } from 'lucide-react'

const gastronomia = [
  {
    title: 'Cardápio Regional',
    desc: 'Focado na culinária regional, com destaque para pratos de peixe fresco como a tradicional tilápia frita, além de petiscos de boteco.',
    icon: Fish,
  },
  {
    title: 'Bar Completo',
    desc: 'Cervejas geladas, drinks, refrigerantes, sucos naturais e opções de doses.',
    icon: Beer,
  },
  {
    title: 'Serviço de Mesa',
    desc: 'Atendimento nas áreas cobertas e próximas às piscinas, além de serviço de balcão.',
    icon: ChefHat,
  },
  {
    title: 'Custo-Benefício',
    desc: 'Avaliado pelos frequentadores como altamente acessível e com excelente custo-benefício.',
    icon: Wallet,
  },
]

const parque = [
  {
    title: 'Piscinas',
    desc: 'Complexo de piscinas limpas e monitoradas, com áreas profundas para adultos e rasas para o público infantil.',
    icon: Waves,
  },
  {
    title: 'Toboáguas',
    desc: 'Equipado com toboáguas de diferentes tamanhos e escorregadores integrados para todas as idades.',
    icon: Droplets,
  },
  {
    title: 'Área Infantil',
    desc: 'Brinquedos aquáticos interativos em área segura e de fácil monitoramento.',
    icon: Baby,
  },
  {
    title: 'Segurança',
    desc: 'Área organizada para que os pais possam monitorar as crianças das mesas e espreguiçadeiras.',
    icon: ShieldCheck,
  },
]

function Services() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">
          Nossas <span className="text-gold">Atrações</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Tudo que você precisa para um dia inesquecível em família
        </p>
      </div>

      <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
        <Fish className="w-6 h-6 text-gold" /> Gastronomia
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {gastronomia.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <item.icon className="w-6 h-6 text-gold mt-1 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-navy mb-1 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
        <Waves className="w-6 h-6 text-gold" /> Parque Aquático
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {parque.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <item.icon className="w-6 h-6 text-gold mt-1 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-navy mb-1 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
