import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#contato', label: 'Contato' },
  { href: '#agendamento', label: 'Agendamento' },
]

function Header() {
  const [open, setOpen] = useState(false)

  function handleClick(href) {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-navy/90 backdrop-blur-sm border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(!open)} className="lg:hidden text-slate-300 hover:text-gold-light transition-colors cursor-pointer">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <a href="#inicio" className="text-gold-light font-bold text-2xl tracking-tight">Ele&amp;Ela</a>
          </div>
          <nav className="hidden lg:flex">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-slate-300 hover:text-gold-light transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute top-0 left-0 bottom-0 w-72 border-r border-gold/20 shadow-2xl overflow-y-auto">
            <div className="pt-16 px-6 pb-6">
              <nav>
                <ul className="space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <button
                        onClick={() => handleClick(link.href)}
                        className="w-full text-left text-base font-medium text-white hover:text-gold-light bg-navy/80 hover:bg-navy-light px-4 py-3.5 rounded-xl transition-all duration-200"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
