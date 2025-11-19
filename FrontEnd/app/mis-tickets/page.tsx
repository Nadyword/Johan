"use client"

import { CloverIcon, CloverIconImage } from "@/components/clover-icon"
import { MoonMessagingIcon } from "@/components/moon-messaging-icon"
import { ProtectedRoute } from "@/components/protected-route"
import { Ticket, Calendar, Trophy } from "lucide-react"
import type { TicketResponse } from "@/lib/api/types"
import { useAuth } from "@/lib/auth-context"
import { rafflesApi } from "@/lib/api/raffles"
import { useState, useEffect } from "react"

export default function MyTicketsPage() {
  const { user } = useAuth()
  const [tickets, setTickets] = useState<TicketResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar tickets del usuario desde la API
  useEffect(() => {
    const loadTickets = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        
        // Convertir userId a número
        const userId = parseInt(user.id, 10)
        if (isNaN(userId)) {
          throw new Error("ID de usuario inválido")
        }

        const userTickets = await rafflesApi.getTickets(userId)
        setTickets(userTickets)
      } catch (err) {
        console.error("Error cargando tickets:", err)
        setError(err instanceof Error ? err.message : "Error al cargar los boletos")
      } finally {
        setIsLoading(false)
      }
    }

    loadTickets()
  }, [user])

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6A8E23]/20 via-background to-[#F4A622]/20 animate-gradient" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#6A8E23]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#F4A622]/10 rounded-full blur-3xl animate-float-delayed" />
        </div>
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-10"
              style={{
              left: `${Math.floor(Math.random() * 100)}%`,
              top: `${Math.floor(Math.random() * 100)}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${Math.floor(8 + Math.random() * 5)}s`,
              }}
            >
              <CloverIcon className="w-16 h-16 text-secondary" />
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12 animate-fade-up">
            <div className="inline-flex items-center gap-3 mb-4 bg-gradient-to-r from-[#6A8E23] to-[#F4A622] p-1 rounded-2xl">
              <div className="bg-background rounded-xl px-6 py-3 flex items-center gap-3">
                <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} />
                <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                  Mis Boletos
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              Bienvenido, <span className="text-[#F4A622] font-bold">{user?.name}</span>
            </p>
          </div>
          {isLoading ? (
            <div className="text-center py-16 animate-fade-up">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A8E23] mx-auto mb-4"></div>
              <p className="text-muted-foreground text-lg">Cargando tus boletos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 animate-fade-up">
              <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-red-500 font-semibold mb-4">Error al cargar boletos</p>
                <p className="text-muted-foreground text-sm">{error}</p>
              </div>
            </div>
          ) : tickets.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.map((ticket, index) => (
                <div
                  key={`${ticket.idSorteo}-${ticket.codigoTicket}-${index}`}
                  className="bg-card/80 backdrop-blur-sm border-2 border-[#6A8E23]/30 rounded-2xl overflow-hidden hover:border-[#6A8E23] transition-all hover:shadow-2xl hover:shadow-[#6A8E23]/20 hover:scale-105 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 bg-muted overflow-hidden group">
                    {ticket.imagenSorteo ? (
                      <img
                        src={ticket.imagenSorteo}
                        alt={ticket.tituloSorteo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          console.error("Error cargando imagen:", ticket.imagenSorteo);
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            const placeholder = parent.querySelector('.image-placeholder') as HTMLElement
                            if (placeholder) placeholder.style.display = 'flex'
                          }
                        }}
                        onLoad={() => {
                          console.log("Imagen cargada exitosamente:", ticket.imagenSorteo);
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full bg-gradient-to-br from-[#6A8E23]/20 to-[#F4A622]/20 flex items-center justify-center image-placeholder ${ticket.imagenSorteo ? 'hidden' : ''}`}>
                      <CloverIcon className="w-24 h-24 text-[#6A8E23]/30" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className={`absolute top-3 right-3 text-background px-4 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                      ticket.sorteoActivo 
                        ? "bg-gradient-to-r from-[#6A8E23] to-[#4F6D1F] animate-pulse-glow"
                        : "bg-gradient-to-r from-gray-600 to-gray-700"
                    }`}>
                      {ticket.sorteoActivo ? "ACTIVO" : "FINALIZADO"}
                    </div>
                    {ticket.estadoPago === "pendiente" && (
                      <div className="absolute top-3 left-3 bg-yellow-500 text-background px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        PENDIENTE
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="font-display font-bold text-xl bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent mb-2">
                        {ticket.tituloSorteo}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Ticket className="w-4 h-4 text-[#F4A622]" />
                        <span className="font-semibold">Compra #{ticket.codigoTicket}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 p-2 rounded-lg">
                        <Calendar className="w-4 h-4 text-[#6A8E23]" />
                        <span>Comprado: {new Date(ticket.fechaCompra).toLocaleDateString("es-ES")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground font-semibold bg-gradient-to-r from-[#6A8E23]/10 to-[#F4A622]/10 p-2 rounded-lg border border-[#F4A622]/30">
                        <Trophy className="w-4 h-4 text-[#F4A622]" />
                        <span>Sorteo: {new Date(ticket.fechaFinalizacion).toLocaleDateString("es-ES")}</span>
                      </div>
                      <div className={`flex items-center gap-2 text-sm p-2 rounded-lg ${
                        ticket.estadoPago === "pagado" 
                          ? "bg-green-500/10 text-green-600 border border-green-500/30"
                          : ticket.estadoPago === "pendiente"
                          ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/30"
                          : "bg-red-500/10 text-red-600 border border-red-500/30"
                      }`}>
                        <span className="font-semibold capitalize">Estado: {ticket.estadoPago}</span>
                      </div>
                      {ticket.estadoPago === "pagado" && ticket.numerosTicket && (
                        <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-gradient-to-r from-[#6A8E23]/20 to-[#F4A622]/20 border border-[#6A8E23]/30">
                          <Ticket className="w-4 h-4 text-[#6A8E23] mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <span className="font-semibold text-[#6A8E23] block mb-1">Números asignados:</span>
                            <span className="text-foreground font-mono text-xs break-words">{ticket.numerosTicket}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-up">
              <CloverIcon className="w-24 h-24 text-muted-foreground/30 mx-auto mb-4 animate-float" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No tienes boletos aún</h3>
              <p className="text-muted-foreground mb-6">Compra tu primer boleto y comienza a ganar</p>
              <a
                href="/comprar"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6A8E23] to-[#F4A622] text-background px-8 py-4 rounded-xl font-bold hover:from-[#4F6D1F] hover:to-[#F4A622] transition-all shadow-xl shadow-[#6A8E23]/30"
              >
                <Ticket className="w-5 h-5" />
                Comprar Boletos
              </a>
            </div>
          )}
        </div>

        {/* Icono de WhatsApp/Telegram fijo */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="hover:scale-105 transition-transform duration-300 drop-shadow-2xl">
            <MoonMessagingIcon 
              className="w-16 h-16" 
              whatsappUrl="https://wa.me/34643907132"
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
