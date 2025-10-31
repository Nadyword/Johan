"use client"

import { mockPreviousRaffles } from "@/lib/mock-data"
import { CloverIcon, CloverIconImage } from "@/components/clover-icon"
import { Trophy, Calendar, User, Ticket } from "lucide-react"

export default function PreviousRafflesPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4A622]/20 via-background to-[#6A8E23]/20 animate-gradient" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#F4A622]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#6A8E23]/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#F4A622]/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          >
            <Trophy className="w-12 h-12 text-[#F4A622]" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-3 mb-4 bg-gradient-to-r from-[#F4A622] to-[#6A8E23] p-1 rounded-2xl">
            <div className="bg-background rounded-xl px-6 py-3 flex items-center gap-3">
              <Trophy className="w-10 h-10 text-[#F4A622] animate-float" />
              <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-[#F4A622] to-[#6A8E23] bg-clip-text text-transparent">
                Rifas Anteriores
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground text-lg">Conoce a nuestros ganadores y sus increíbles premios</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {mockPreviousRaffles.map((raffle, index) => (
            <div
              key={raffle.id}
              className="bg-card/80 backdrop-blur-sm border-2 border-[#F4A622]/30 rounded-2xl overflow-hidden hover:border-[#F4A622] transition-all hover:shadow-2xl hover:shadow-[#F4A622]/20 hover:scale-105 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-56 bg-muted overflow-hidden group">
                <img
                  src={raffle.image || "/placeholder.svg"}
                  alt={raffle.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute top-3 right-3 bg-gradient-to-r from-[#F4A622] to-[#F4A622]/80 text-background px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <Trophy className="w-3.5 h-3.5" />
                  FINALIZADO
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-display font-bold text-xl bg-gradient-to-r from-[#F4A622] to-[#6A8E23] bg-clip-text text-transparent mb-2">
                    {raffle.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{raffle.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-lg">
                    <Ticket className="w-4 h-4 text-[#6A8E23]" />
                    <span className="text-muted-foreground font-medium">
                      {raffle.totalTickets.toLocaleString()} tickets
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-lg">
                    <Calendar className="w-4 h-4 text-[#F4A622]" />
                    <span className="text-muted-foreground font-medium">
                      {new Date(raffle.endsAt).toLocaleDateString("es-ES", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>

                {raffle.winner && (
                  <div className="bg-gradient-to-br from-[#F4A622]/10 via-[#6A8E23]/10 to-[#F4A622]/10 border-2 border-[#F4A622]/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F4A622] to-[#6A8E23] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <User className="w-6 h-6 text-background" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wide">
                          Ganador
                        </p>
                        <p className="font-bold text-foreground truncate text-lg">{raffle.winner}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="bg-card/80 backdrop-blur-sm border-2 border-[#6A8E23]/30 rounded-2xl p-8">
            <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={150} width={150} className="mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent mb-3">
              Transparencia Total
            </h2>
            <p className="text-muted-foreground">
              Todos nuestros sorteos son verificables y transparentes. Los ganadores son seleccionados aleatoriamente y
              contactados inmediatamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
