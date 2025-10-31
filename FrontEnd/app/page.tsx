"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { mockRaffles, mockPreviousRaffles } from "@/lib/mock-data"
import { Sparkles, Trophy, Users, Clock } from "lucide-react"
import { CloverIcon, CloverIconImage } from "@/components/clover-icon"
import { AuthModal } from "@/components/auth-modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const { user } = useAuth()

  // Generar posiciones y animaciones aleatorias una sola vez
  const [floatingClovers] = useState(() =>
    Array.from({ length: 15 }, () => ({
      width: Math.floor(Math.random() * 61) + 20,
      height: Math.floor(Math.random() * 61) + 20,
      left: Math.floor(Math.random() * 101),
      top: Math.floor(Math.random() * 101),
      animationDelay: Math.floor(Math.random() * 4),
      animationDuration: Math.floor(Math.random() * 3) + 3,
    }))
  )

  useEffect(() => {
    setRevealed(true)
  }, [])

  const handleBuyTicket = () => {
    if (!user) {
      setShowAuthModal(true)
    } else {
      window.location.href = "/comprar"
    }
  }

  const activeRaffle = mockRaffles[0]

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#6A8E23] via-[#4F6D1F] to-[#F4A622]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingClovers.map((clover, i) => (
            <CloverIconImage
              src="/CHAIN OF LUCKY_CURVAS-03.svg"
              height={clover.height}
              width={clover.width}
              key={i}
              className="absolute text-white/10 animate-float"
              style={{
                width: `${clover.width}px`,
                height: `${clover.height}px`,
                left: `${clover.left}%`,
                top: `${clover.top}%`,
                animationDelay: `${clover.animationDelay}s`,
                animationDuration: `${clover.animationDuration}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className={`text-white space-y-6 ${revealed ? "animate-fade-up" : "opacity-0"}`}>

              <div className="flex justify-center relative">
                <div
                  className="absolute inset-0 flex justify-center items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: 520,
                      height: 520,
                      filter: "blur(60px)",
                      background: "radial-gradient(circle, #F4A62299 0%, #6A8E2333 80%, transparent 100%)",
                    }}
                  ></div>
                </div>
                <CloverIconImage
                  src="/CHAIN OF LUCKY_CURVAS-02.png"
                  height={500}
                  width={500}
                  className="relative animate-float"
                  style={{
                    marginLeft: "0px",
                  }}
                />
              </div>

              <p className="text-xl md:text-2xl font-semibold text-white/90">Participa hoy. Gana en grande.</p>

              <p className="text-lg text-white/80 max-w-xl">
                Tu oportunidad está a un clic de distancia. Compra tus tickets y participa en rifas increíbles con
                premios que cambiarán tu vida.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={handleBuyTicket}
                  className="bg-gradient-to-r from-[#F4A622] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#F4A622] text-black font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-[#F4A622]/50 transition-all duration-300 hover:scale-105 border-2 border-white/20"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Comprar Ticket Ahora
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold text-lg px-8 py-6"
                >
                  <Link href="/rifas-anteriores">
                    <Trophy className="w-5 h-5 mr-2" />
                    Ver Ganadores
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 pt-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#F4A622]" />
                  <span className="text-sm font-semibold">+5,000 Participantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#F4A622]" />
                  <span className="text-sm font-semibold">+100 Ganadores</span>
                </div>
              </div>
            </div>

            {/* Right content - Featured raffle */}
            <div className={`${revealed ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
              <Card className="bg-white/95 backdrop-blur-sm border-4 border-white shadow-2xl hover:shadow-[#F4A622]/30 transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="relative h-80">
                  <Image
                    src={activeRaffle.image || "/placeholder.svg"}
                    alt={activeRaffle.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-[#F4A622] to-[#ff8c00] text-black border-0 font-bold px-3 py-1">
                      <Clock className="w-4 h-4 mr-1" />
                      Activa
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-display font-bold text-[#121212]">{activeRaffle.title}</CardTitle>
                  <p className="text-muted-foreground">{activeRaffle.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Precio por ticket</p>
                      <p className="text-3xl font-bold text-[#6A8E23]">${activeRaffle.ticketPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Tickets disponibles</p>
                      <p className="text-2xl font-bold text-[#F4A622]">
                        {activeRaffle.totalTickets - activeRaffle.soldTickets}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleBuyTicket}
                    className="w-full bg-gradient-to-r from-[#6A8E23] to-[#4F6D1F] hover:from-[#4F6D1F] hover:to-[#6A8E23] text-white font-bold py-6 shadow-lg hover:shadow-[#6A8E23]/50 transition-all duration-300"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Participar Ahora
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Active Raffles Section */}
      <section className="py-20 bg-gradient-to-b from-[#121212] to-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Rifas Activas</h2>
            <p className="text-xl text-white/70">Elige tu premio favorito y participa</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockRaffles.map((raffle, index) => (
              <Card
                key={raffle.id}
                className={`bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#6A8E23]/30 hover:border-[#F4A622] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#F4A622]/20 overflow-hidden ${revealed ? "animate-fade-up" : "opacity-0"
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-56">
                  <Image src={raffle.image || "/placeholder.svg"} alt={raffle.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#F4A622] to-[#ff8c00] text-black border-0 font-bold">
                    {raffle.status === "active" ? "Activa" : "Próximamente"}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-display font-bold text-white">{raffle.title}</CardTitle>
                  <p className="text-white/60 text-sm">{raffle.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Precio</span>
                      <span className="text-[#F4A622] font-bold text-lg">${raffle.ticketPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Disponibles</span>
                      <span className="text-[#6A8E23] font-bold">{raffle.totalTickets - raffle.soldTickets}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleBuyTicket}
                    className="w-full bg-gradient-to-r from-[#6A8E23] to-[#4F6D1F] hover:from-[#4F6D1F] hover:to-[#6A8E23] text-white font-semibold shadow-lg hover:shadow-[#6A8E23]/50 transition-all duration-300"
                  >
                    Ver Detalles
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Previous Raffles Section */}
      <section className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#121212]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Rifas Anteriores</h2>
            <p className="text-xl text-white/70">Conoce a nuestros ganadores</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockPreviousRaffles.slice(0, 4).map((raffle, index) => (
              <Card
                key={raffle.id}
                className={`bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border-2 border-[#F4A622]/30 hover:border-[#F4A622] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#F4A622]/30 overflow-hidden ${revealed ? "animate-fade-up" : "opacity-0"
                  }`}
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              >
                <div className="relative h-48">
                  <Image src={raffle.image || "/placeholder.svg"} alt={raffle.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <Trophy className="absolute top-4 right-4 w-8 h-8 text-[#F4A622]" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-display font-bold text-white">{raffle.title}</CardTitle>
                  <p className="text-white/60 text-sm">Ganador: {raffle.winner}</p>
                </CardHeader>
                <CardFooter>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#F4A622] text-[#F4A622] hover:bg-[#F4A622] hover:text-black transition-all duration-300 bg-transparent"
                  >
                    <Link href="/rifas-anteriores">Ver Resultado</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#F4A622] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#F4A622] text-black font-bold shadow-xl hover:shadow-[#F4A622]/50 transition-all duration-300"
            >
              <Link href="/rifas-anteriores">Ver Todas las Rifas Anteriores</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  )
}
