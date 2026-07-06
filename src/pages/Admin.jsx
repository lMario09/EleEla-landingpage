import { useState, useEffect } from 'react'
import { Mail, Trash2, RefreshCw } from 'lucide-react'

const API = '/api'

function Admin() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  function fetchMessages() {
    setLoading(true)
    fetch(`${API}/messages`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.reverse())
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  function deleteMessage(id) {
    fetch(`${API}/messages/${id}`, { method: 'DELETE' }).then(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id))
    })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-navy border-b border-gold/20 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <h1 className="text-white font-bold flex items-center gap-2">
            <Mail className="w-5 h-5 text-gold-light" />
            Painel Admin — Mensagens
          </h1>
          <button
            onClick={fetchMessages}
            className="text-sm text-slate-300 hover:text-gold-light flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <p className="text-slate-400 text-center py-12">Carregando mensagens...</p>
        ) : messages.length === 0 ? (
          <p className="text-slate-400 text-center py-12">Nenhuma mensagem recebida ainda.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-xl bg-white p-5 shadow-sm border border-slate-100"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      <span className="font-semibold text-navy">{msg.nome}</span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-gold hover:text-gold-light transition-colors"
                      >
                        {msg.email}
                      </a>
                      {msg.telefone && (
                        <span className="text-slate-400">{msg.telefone}</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{msg.mensagem}</p>
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(msg.created_at).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="shrink-0 p-2 text-slate-300 hover:text-red-500 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Admin
