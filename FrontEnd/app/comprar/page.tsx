"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { mockActiveRaffle } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { CloverIcon, CloverIconImage } from "@/components/clover-icon"
import { Minus, Plus, ShoppingCart, Sparkles, Tag, Ticket, TrendingUp } from "lucide-react"
import confetti from "canvas-confetti"

export default function BuyTicketsPage() {
  const [quantity, setQuantity] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const raffle = mockActiveRaffle

  // Calculate discount
  const getDiscount = (qty: number) => {
    const applicableDiscount = raffle.discounts
      .filter((d) => qty >= d.quantity)
      .sort((a, b) => b.percentage - a.percentage)[0]
    return applicableDiscount || null
  }

  const discount = getDiscount(quantity)
  const subtotal = raffle.price * quantity
  const discountAmount = discount ? (subtotal * discount.percentage) / 100 : 0
  const total = subtotal - discountAmount

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(quantity + delta, 50))
    setQuantity(newQuantity)
  }

  const handlePurchase = async () => {
    if (!user) {
      router.push("/")
      return
    }

    setIsProcessing(true)

    // Simulate purchase process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#6A8E23", "#F4A622", "#F2F2F2"],
    })

    setIsProcessing(false)
    router.push("/mis-tickets")
  }

  const ticketsRemaining = raffle.stock
  const percentageSold = ((raffle.totalTickets - raffle.stock) / raffle.totalTickets) * 100

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6A8E23]/20 via-background to-[#F4A622]/20 animate-gradient" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#6A8E23]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F4A622]/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#6A8E23]/5 to-[#F4A622]/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Floating Clovers */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <CloverIcon className="w-12 h-12 text-secondary" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-3 mb-4 bg-gradient-to-r from-[#6A8E23] to-[#F4A622] p-1 rounded-2xl">
            <div className="bg-background rounded-xl px-6 py-3 flex items-center gap-3">
              <ShoppingCart className="w-10 h-10 text-secondary" />
              <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                Comprar Tickets
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground text-lg">Selecciona la cantidad y asegura tu oportunidad</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Raffle Details */}
          <div className="space-y-6">
            {/* Raffle Card */}
            <div className="bg-card/80 backdrop-blur-sm border-2 border-[#6A8E23]/30 rounded-2xl overflow-hidden animate-fade-up hover:border-[#6A8E23] transition-all hover:shadow-2xl hover:shadow-[#6A8E23]/20">
              <div className="relative h-80 bg-muted overflow-hidden group">
                <img
                  src={raffle.image || "/placeholder.svg"}
                  alt={raffle.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#6A8E23] to-[#4F6D1F] text-background px-5 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse-glow">
                  ACTIVO
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent mb-2">
                    {raffle.title}
                  </h2>
                  <p className="text-muted-foreground">{raffle.description}</p>
                </div>

                {/* Stock Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tickets Disponibles</span>
                    <span className="font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                      {ticketsRemaining.toLocaleString()} / {raffle.totalTickets.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-[#6A8E23] via-[#F4A622] to-[#6A8E23] transition-all duration-500 animate-gradient-x"
                      style={{ width: `${percentageSold}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {percentageSold.toFixed(1)}% vendidos - ¡Apresúrate!
                  </p>
                </div>

                {/* Price per ticket */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#6A8E23]/10 to-[#F4A622]/10 rounded-xl border border-[#6A8E23]/20">
                  <span className="text-muted-foreground font-semibold">Precio por ticket</span>
                  <span className="text-2xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                    ${raffle.price.toLocaleString("es-CO")}
                  </span>
                </div>
              </div>
            </div>

            {/* Discount Tiers */}
            <div
              className="bg-card/80 backdrop-blur-sm border-2 border-[#F4A622]/30 rounded-2xl p-6 animate-fade-up hover:border-[#F4A622] transition-all"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-6 h-6 text-[#F4A622]" />
                <h3 className="font-display font-bold text-xl bg-gradient-to-r from-[#F4A622] to-[#6A8E23] bg-clip-text text-transparent">
                  Descuentos por Cantidad
                </h3>
              </div>
              <div className="space-y-3">
                {raffle.discounts.map((disc, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                      quantity >= disc.quantity
                        ? "bg-gradient-to-r from-[#6A8E23]/20 to-[#F4A622]/20 border-2 border-[#6A8E23] shadow-lg shadow-[#6A8E23]/20 scale-105"
                        : "bg-muted/50 border-2 border-transparent hover:border-[#6A8E23]/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Ticket className="w-5 h-5 text-[#6A8E23]" />
                      <span className="font-semibold">{disc.quantity}+ tickets</span>
                    </div>
                    <span className="font-bold text-[#F4A622] text-lg">{disc.percentage}% OFF</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Form */}
          <div className="space-y-6">
            {/* Quantity Selector */}
            <div
              className="bg-card/80 backdrop-blur-sm border-2 border-[#6A8E23]/30 rounded-2xl p-6 animate-fade-up hover:border-[#6A8E23] transition-all"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="font-display font-bold text-xl text-foreground mb-6">Selecciona Cantidad</h3>

              <div className="flex items-center justify-center gap-6 mb-8">
                <Button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  size="lg"
                  variant="outline"
                  className="w-14 h-14 rounded-full border-2 border-[#6A8E23] hover:bg-[#6A8E23] hover:text-background transition-all"
                >
                  <Minus className="w-6 h-6" />
                </Button>

                <div className="text-center min-w-[140px]">
                  <div className="text-6xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent animate-pulse-glow">
                    {quantity}
                  </div>
                  <div className="text-sm text-muted-foreground font-semibold">tickets</div>
                </div>

                <Button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 50}
                  size="lg"
                  variant="outline"
                  className="w-14 h-14 rounded-full border-2 border-[#F4A622] hover:bg-[#F4A622] hover:text-background transition-all"
                >
                  <Plus className="w-6 h-6" />
                </Button>
              </div>

              {/* Quick Select */}
              <div className="grid grid-cols-4 gap-3">
                {[5, 10, 20, 50].map((num) => (
                  <Button
                    key={num}
                    onClick={() => setQuantity(num)}
                    variant={quantity === num ? "default" : "outline"}
                    size="lg"
                    className={
                      quantity === num
                        ? "bg-gradient-to-r from-[#6A8E23] to-[#F4A622] hover:from-[#4F6D1F] hover:to-[#F4A622] border-0 shadow-lg shadow-[#6A8E23]/30"
                        : "border-2 border-[#6A8E23]/30 hover:border-[#6A8E23]"
                    }
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div
              className="bg-card/80 backdrop-blur-sm border-2 border-[#F4A622]/30 rounded-2xl p-6 space-y-4 animate-fade-up hover:border-[#F4A622] transition-all"
              style={{ animationDelay: "0.3s" }}
            >
              <h3 className="font-display font-bold text-xl text-foreground mb-4">Resumen de Compra</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Subtotal ({quantity} tickets)</span>
                  <span className="font-semibold">${subtotal.toLocaleString("es-CO")}</span>
                </div>

                {discount && (
                  <div className="flex items-center justify-between text-[#6A8E23] font-semibold bg-[#6A8E23]/10 p-3 rounded-lg">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Descuento ({discount.percentage}%)
                    </span>
                    <span className="text-lg">-${discountAmount.toLocaleString("es-CO")}</span>
                  </div>
                )}

                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                <div className="flex items-center justify-between text-3xl font-display font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                    ${total.toLocaleString("es-CO")}
                  </span>
                </div>
              </div>

              {discount && (
                <div className="bg-gradient-to-r from-[#6A8E23]/10 to-[#F4A622]/10 border-2 border-[#6A8E23]/30 rounded-xl p-4 flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-[#F4A622] flex-shrink-0 mt-0.5 animate-pulse" />
                  <p className="text-sm text-foreground font-semibold">
                    ¡Ahorraste ${discountAmount.toLocaleString("es-CO")} con este descuento!
                  </p>
                </div>
              )}

              <Button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-[#6A8E23] to-[#F4A622] hover:from-[#4F6D1F] hover:to-[#F4A622] text-background gap-3 h-14 text-lg font-bold shadow-xl shadow-[#6A8E23]/30 border-0 animate-pulse-glow"
              >
                {isProcessing ? (
                  "Procesando..."
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    Comprar Ahora
                  </>
                )}
              </Button>

              {!user && (
                <p className="text-xs text-center text-muted-foreground">
                  Serás redirigido a iniciar sesión para completar la compra
                </p>
              )}
            </div>

            {/* Trust Indicators */}
            <div
              className="bg-gradient-to-br from-[#6A8E23]/10 via-[#F4A622]/10 to-[#6A8E23]/10 border-2 border-[#6A8E23]/30 rounded-2xl p-6 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-start gap-4">
                <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={150} width={150}/>
                <div>
                  <h4 className="font-bold text-foreground mb-2 text-lg">Compra Segura</h4>
                  <p className="text-sm text-muted-foreground">
                    Tus tickets son generados instantáneamente y guardados de forma segura. Recibirás confirmación por
                    email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
