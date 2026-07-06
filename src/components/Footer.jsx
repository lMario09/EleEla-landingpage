import logoSrc from '../assets/image/Logo sem fundo.png'

function Footer() {
  return (
    <footer className="bg-navy text-slate-400 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <img src={logoSrc} alt="Ele&Ela" className="h-16 w-auto mb-2" />
            <p className="text-sm text-slate-500">Espaço de lazer para toda a família</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gold-light uppercase tracking-wider mb-3">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#inicio" className="hover:text-gold-light transition-colors duration-200">Início</a></li>
              <li><a href="#sobre" className="hover:text-gold-light transition-colors duration-200">Sobre</a></li>
              <li><a href="#servicos" className="hover:text-gold-light transition-colors duration-200">Serviços</a></li>
              <li><a href="#galeria" className="hover:text-gold-light transition-colors duration-200">Galeria</a></li>
              <li><a href="#contato" className="hover:text-gold-light transition-colors duration-200">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gold-light uppercase tracking-wider mb-3">
              Contato
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://wa.me/5589988120088" target="_blank" rel="noopener noreferrer" className="hover:text-gold-light transition-colors">
                  WhatsApp: (89) 98812-0088
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/lazer_ele_e_ela_park/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-light transition-colors">
                  Instagram: @lazer_ele_e_ela_park
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/8QS4GsunhAViZYE9A" target="_blank" rel="noopener noreferrer" className="hover:text-gold-light transition-colors">
                  Ver no mapa
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Ele&amp;Ela. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}

export default Footer
