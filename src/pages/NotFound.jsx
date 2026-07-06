import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
      <h1 className="text-8xl sm:text-9xl font-extrabold text-gold tracking-tight">
        404
      </h1>
      <p className="mt-4 text-xl text-slate-500">Página não encontrada</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center rounded-full bg-gold-light px-6 py-3 text-sm font-semibold text-navy shadow-sm hover:bg-gold hover:-translate-y-0.5 transition-all duration-200"
      >
        Voltar ao início
      </Link>
    </section>
  )
}

export default NotFound
