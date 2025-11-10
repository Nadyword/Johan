"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth-context"
import { Ticket, Calendar, Trophy } from "lucide-react"
import { CloverIcon, CloverIconImage } from "@/components/clover-icon"

export default function MyTicketsPage() {
  const { user } = useAuth()

  // Mock tickets data
  const tickets = [
    {
      id: "1",
      raffleTitle: "iPhone 15 Pro Max",
      ticketNumber: "00042",
      purchaseDate: "2025-01-15",
      drawDate: "2025-02-01",
      status: "active",
      image: "/sorteo-1.jpg",
    },
    {
      id: "2",
      raffleTitle: "PlayStation 5",
      ticketNumber: "00156",
      purchaseDate: "2025-01-10",
      drawDate: "2025-01-25",
      status: "active",
      image: "/playstation-5-console.png",
    },
  ]

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
          {tickets.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.map((ticket, index) => (
                <div
                  key={ticket.id}
                  className="bg-card/80 backdrop-blur-sm border-2 border-[#6A8E23]/30 rounded-2xl overflow-hidden hover:border-[#6A8E23] transition-all hover:shadow-2xl hover:shadow-[#6A8E23]/20 hover:scale-105 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 bg-muted overflow-hidden group">
                    <img
                      src={ticket.image || "/placeholder.svg"}
                      alt={ticket.raffleTitle}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-[#6A8E23] to-[#4F6D1F] text-background px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse-glow">
                      ACTIVO
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="font-display font-bold text-xl bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent mb-2">
                        {ticket.raffleTitle}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Ticket className="w-4 h-4 text-[#F4A622]" />
                        <span className="font-semibold">Boleto #{ticket.ticketNumber}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 p-2 rounded-lg">
                        <Calendar className="w-4 h-4 text-[#6A8E23]" />
                        <span>Comprado: {new Date(ticket.purchaseDate).toLocaleDateString("es-ES")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground font-semibold bg-gradient-to-r from-[#6A8E23]/10 to-[#F4A622]/10 p-2 rounded-lg border border-[#F4A622]/30">
                        <Trophy className="w-4 h-4 text-[#F4A622]" />
                        <span>Sorteo: {new Date(ticket.drawDate).toLocaleDateString("es-ES")}</span>
                      </div>
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
      </div>
    </ProtectedRoute>
  )
}
