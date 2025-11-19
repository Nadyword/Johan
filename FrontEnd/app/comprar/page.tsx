"use client"

import { Minus, Plus, ShoppingCart, Sparkles, Tag, Ticket, TrendingUp, CreditCard, Wallet, Check, Upload, X, Calendar, Copy, QrCode, Phone } from "lucide-react"
import { CloverIcon, CloverIconImage } from "@/components/clover-icon"
import { MoonMessagingIcon } from "@/components/moon-messaging-icon"
import { loadMockRafflesActive } from "@/lib/mock-data"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { rafflesApi } from "@/lib/api/raffles"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Raffle } from "@/lib/types"
import confetti from "canvas-confetti"

interface FloatingClover {
  left: number
  top: number
  animationDelay: number
  animationDuration: number
}

export default function BuyTicketsPage() {
  const [quantity, setQuantity] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [floatingClovers, setFloatingClovers] = useState<FloatingClover[]>([])
  const [raffle, setRaffle] = useState<Raffle | undefined>(undefined)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentFile, setPaymentFile] = useState<File | null>(null)
  const [paymentNote, setPaymentNote] = useState("")
  const [paymentDate, setPaymentDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })
  const [fileError, setFileError] = useState("")
  const { user } = useAuth()
  const router = useRouter()

  // Cargar rifa activa desde la API (solo en el cliente)
  useEffect(() => {
    loadMockRafflesActive()
      .then((data) => {
        setRaffle(data[0]) // Tomar la primera rifa activa
      })
      .catch((error) => {
        console.error('Error cargando rifa activa:', error)
      })
  }, [])

  // Generar posiciones aleatorias solo en el cliente para evitar errores de hidratación
  useEffect(() => {
    setFloatingClovers(
      Array.from({ length: 8 }, (_, i) => ({
        left: Math.floor(Math.random() * 100),
        top: Math.floor(Math.random() * 100),
        animationDelay: i * 0.5,
        animationDuration: Math.floor(8 + Math.random() * 4),
      }))
    )
  }, [])

  // Mostrar loading si no hay rifa cargada
  if (!raffle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A8E23] mx-auto mb-4"></div>
          <p className="text-white/70 font-semibold">Cargando...</p>
        </div>
      </div>
    )
  }

  // Precio por boleto según el método de pago
  const pricePerTicket = selectedPaymentMethod === "pago-movil" ? 800 : raffle.price
  const subtotal = pricePerTicket * quantity
  const total = subtotal

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(quantity + delta, 50))
    setQuantity(newQuantity)
  }

  const handlePurchase = async () => {
    if (!user) {
      router.push("/")
      return
    }

    // Mostrar formulario de pago en lugar de procesar directamente
    setShowPaymentForm(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPaymentFile(file)
      setFileError("")
    }
  }

  const handleSubmitPayment = async () => {
    // Validar que el archivo esté presente
    if (!paymentFile) {
      setFileError("El anexo del pago es obligatorio")
      return
    }

    // Validar que haya usuario autenticado
    if (!user) {
      router.push("/")
      return
    }

    // Validar que haya rifa seleccionada
    if (!raffle) {
      setFileError("No hay rifa seleccionada")
      return
    }

    // Validar que haya método de pago seleccionado
    if (!selectedPaymentMethod) {
      setFileError("Debes seleccionar un método de pago")
      return
    }

    setIsProcessing(true)
    setFileError("")

    try {
      // Convertir userId a número
      const userId = parseInt(user.id, 10)
      if (isNaN(userId)) {
        throw new Error("ID de usuario inválido")
      }

      // Precio por boleto según el método de pago
      const finalPricePerTicket = selectedPaymentMethod === "pago-movil" ? 800 : raffle.price

      // Llamar al método buyTickets
      const tickets = await rafflesApi.buyTickets(
        raffle.id,                    // raffleId
        userId,                       // userId
        finalPricePerTicket,          // pricePerTicket
        selectedPaymentMethod,        // modePay
        quantity,                     // ticketQuantity
        paymentFile,                  // imageFile (se convierte a base64 internamente)
        paymentNote || "",            // note
        raffle.image || ""            // PathImage (enviar la ruta de la imagen del sorteo)
      )

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6A8E23", "#F4A622", "#F2F2F2"],
      })

      // Redirigir a mis tickets
      router.push("/mis-tickets")
    } catch (error) {
      console.error("Error al comprar boletos:", error)
      setFileError(error instanceof Error ? error.message : "Error al procesar el pago. Por favor intenta de nuevo.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleBackToPurchase = () => {
    setShowPaymentForm(false)
    setPaymentFile(null)
    setPaymentNote("")
    setFileError("")
  }

  const ticketsRemaining = raffle.stock
  const percentageSold = ((raffle.totalTickets - raffle.stock) / raffle.totalTickets) * 100

  // Si se muestra el formulario de pago, renderizar solo ese formulario
  if (showPaymentForm) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6A8E23]/20 via-background to-[#F4A622]/20 animate-gradient" />
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#6A8E23]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F4A622]/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-up">
              <div className="inline-flex items-center gap-3 mb-4 bg-gradient-to-r from-[#6A8E23] to-[#F4A622] p-1 rounded-2xl">
                <div className="bg-background rounded-xl px-6 py-3 flex items-center gap-3">
                  <CreditCard className="w-10 h-10 text-black" />
                  <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                    Información de Pago
                  </h1>
                </div>
              </div>
              <p className="text-muted-foreground text-lg">Completa los datos de tu pago</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Payment Account Information */}
              <div className="bg-card/80 backdrop-blur-sm border-2 border-[#F4A622]/30 rounded-2xl p-8 space-y-6 animate-fade-up">
                <div className="flex items-center gap-3 mb-4">
                  <QrCode className="w-6 h-6 text-[#F4A622]" />
                  <h2 className="text-2xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                    Información de la Cuenta
                  </h2>
                </div>

                {selectedPaymentMethod ? (
                  <div className="space-y-6">
                    {/* Método seleccionado */}
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#6A8E23]/10 to-[#F4A622]/10 rounded-xl border border-[#6A8E23]/20">
                      {selectedPaymentMethod === "Binance" && (
                        <img src="/Logo-binance.svg" alt="Binance" className="w-12 h-12 object-contain" />
                      )}
                      {selectedPaymentMethod === "paypal" && (
                        <img src="/Logo-paypal.svg" alt="PayPal" className="w-12 h-12 object-contain" />
                      )}
                      {selectedPaymentMethod === "zinli" && (
                        <img src="/Logo-zinli.svg" alt="Zinli" className="w-12 h-12 object-contain" />
                      )}
                      {selectedPaymentMethod === "pago-movil" && (
                        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#6A8E23] to-[#F4A622] rounded-lg">
                          <Phone className="w-6 h-6 text-background" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-foreground capitalize">{selectedPaymentMethod === "pago-movil" ? "Pago Móvil" : selectedPaymentMethod}</p>
                        <p className="text-sm text-muted-foreground">Método seleccionado</p>
                      </div>
                    </div>

                    {/* Información de pago según el método */}
                    {selectedPaymentMethod === "Binance" && (
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-xl border border-[#6A8E23]/20">
                          <Label className="text-sm text-muted-foreground mb-2 block">ID de Binance</Label>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 p-2 bg-background rounded-md text-sm font-mono break-all">
                              451443649
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                navigator.clipboard.writeText("451443649")
                              }}
                              className="border-[#6A8E23]/30 hover:border-[#6A8E23]"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-xl border border-[#6A8E23]/20">
                          <Label className="text-sm text-muted-foreground mb-2 block">Red</Label>
                          <p className="font-semibold text-foreground">Atraves de Binance Pay</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-xl border border-[#6A8E23]/20">
                          <Label className="text-sm text-muted-foreground mb-2 block">Monto a enviar</Label>
                          <p className="text-2xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                            ${(raffle.price * quantity).toLocaleString("es-CO")}
                          </p>
                        </div>
                        <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                          <p className="text-sm text-yellow-600 dark:text-yellow-400">
                            <strong>Importante:</strong>
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === "paypal" && (
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-xl border border-[#6A8E23]/20">
                          <Label className="text-sm text-muted-foreground mb-2 block">Email de PayPal</Label>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 p-2 bg-background rounded-md text-sm font-mono">
                            Chainoflucky@gmail.com
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                navigator.clipboard.writeText("Chainoflucky@gmail.com")
                              }}
                              className="border-[#6A8E23]/30 hover:border-[#6A8E23]"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-xl border border-[#6A8E23]/20">
                          <Label className="text-sm text-muted-foreground mb-2 block">Monto a enviar</Label>
                          <p className="text-2xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                            ${(raffle.price * quantity).toLocaleString("es-CO")}
                          </p>
                        </div>
                        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
                          <p className="text-sm text-blue-600 dark:text-blue-400">
                            <strong>Nota:</strong> Envía el pago como "Pago a familiares y amigos" para evitar comisiones adicionales.
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === "zinli" && (
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-xl border border-[#6A8E23]/20">
                          <Label className="text-sm text-muted-foreground mb-2 block">Usuario Zinli</Label>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 p-2 bg-background rounded-md text-sm font-mono">
                              Chainoflucky@gmail.com
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                navigator.clipboard.writeText("Chainoflucky@gmail.com")
                              }}
                              className="border-[#6A8E23]/30 hover:border-[#6A8E23]"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-xl border border-[#6A8E23]/20">
                          <Label className="text-sm text-muted-foreground mb-2 block">Monto a enviar</Label>
                          <p className="text-2xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                            ${(raffle.price * quantity).toLocaleString("es-CO")}
                          </p>
                        </div>
                        <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                          <p className="text-sm text-green-600 dark:text-green-400">
                            <strong>Instrucciones:</strong> Abre la app Zinli, busca el usuario y envía el monto exacto indicado.
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === "pago-movil" && (
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-xl border border-[#6A8E23]/20">
                          <Label className="text-sm text-muted-foreground mb-2 block">Monto a enviar</Label>
                          <p className="text-2xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                            ${(800 * quantity).toLocaleString("es-CO")} bs
                          </p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-xl border border-[#6A8E23]/20">
                          <Label className="text-sm text-muted-foreground mb-3 block text-center">Escanea el código QR para realizar el pago</Label>
                          <div className="flex justify-center">
                            <img
                              src="/QR.jpg"
                              alt="Código QR Pago Móvil"
                              className="w-64 h-64 object-contain rounded-lg border-2 border-[#6A8E23]/30"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                const parent = target.parentElement
                                if (parent) {
                                  const placeholder = parent.querySelector('.qr-placeholder') as HTMLElement
                                  if (placeholder) placeholder.style.display = 'flex'
                                }
                              }}
                            />
                            <div className="qr-placeholder hidden w-64 h-64 bg-muted rounded-lg border-2 border-[#6A8E23]/30 flex items-center justify-center">
                              <QrCode className="w-24 h-24 text-muted-foreground/30" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">Selecciona un método de pago para ver la información de la cuenta</p>
                  </div>
                )}
              </div>

              {/* Right Column - Payment Form */}
              <div className="bg-card/80 backdrop-blur-sm border-2 border-[#6A8E23]/30 rounded-2xl p-8 space-y-6 animate-fade-up">
                {/* Resumen de compra */}
                <div className="bg-gradient-to-r from-[#6A8E23]/10 to-[#F4A622]/10 rounded-xl p-4 border border-[#6A8E23]/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Cantidad de boletos:</span>
                    <span className="font-bold text-foreground">{quantity}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Método de pago:</span>
                    <span className="font-bold text-foreground capitalize">{selectedPaymentMethod === "pago-movil" ? "Pago Móvil" : selectedPaymentMethod}</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-foreground">Total a pagar:</span>
                    <span className="text-2xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                      ${total.toLocaleString("es-CO")}{selectedPaymentMethod === "pago-movil" ? " bs" : ""}
                    </span>
                  </div>
                </div>

                {/* Anexo del pago (obligatorio) */}
                <div className="space-y-2">
                  <Label htmlFor="payment-file" className="text-foreground font-semibold">
                    Anexo del Pago <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="payment-file"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className={`cursor-pointer ${fileError ? "border-red-500" : ""}`}
                    />
                    {paymentFile && (
                      <div className="mt-2 flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-[#6A8E23]/30">
                        <Upload className="w-4 h-4 text-[#6A8E23]" />
                        <span className="flex-1 text-sm text-foreground truncate">{paymentFile.name}</span>
                        <button
                          onClick={() => {
                            setPaymentFile(null)
                            setFileError("")
                          }}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    )}
                    {fileError && (
                      <p className="text-sm text-red-500 mt-1">{fileError}</p>
                    )}
                  </div>
                </div>

                {/* Nota */}
                <div className="space-y-2">
                  <Label htmlFor="payment-note" className="text-foreground font-semibold">
                    Nota (opcional)
                  </Label>
                  <Textarea
                    id="payment-note"
                    placeholder="Agrega alguna nota o referencia adicional sobre el pago..."
                    value={paymentNote}
                    onChange={(e) => setPaymentNote(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                {/* Fecha del pago */}
                <div className="space-y-2">
                  <Label htmlFor="payment-date" className="text-foreground font-semibold">
                    Fecha del Pago
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="payment-date"
                      type="date"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleBackToPurchase}
                    variant="outline"
                    className="flex-1 border-2 border-[#6A8E23]/30 hover:border-[#6A8E23]"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Volver
                  </Button>
                  <Button
                    onClick={handleSubmitPayment}
                    disabled={isProcessing || !paymentFile}
                    className="flex-1 bg-gradient-to-r from-[#6A8E23] to-[#F4A622] hover:from-[#4F6D1F] hover:to-[#F4A622] text-background gap-3 font-bold shadow-xl shadow-[#6A8E23]/30 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      "Procesando..."
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Confirmar Pago
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
        {floatingClovers.map((clover, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${clover.left}%`,
              top: `${clover.top}%`,
              animationDelay: `${clover.animationDelay}s`,
              animationDuration: `${clover.animationDuration}s`,
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
              <ShoppingCart className="w-10 h-10 text-black" />
              <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                Comprar Boletos
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
                {/* <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Boletos Disponibles</span>
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
                </div> */}

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#6A8E23]/10 to-[#F4A622]/10 rounded-xl border border-[#6A8E23]/20">
                  <span className="text-muted-foreground font-semibold">Precio por boleto</span>
                  <span className="text-2xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                    ${raffle.price.toLocaleString("es-CO")}
                  </span>
                </div>
              </div>
            </div>


            {/* Trust Indicators */}
            <div
              className="bg-gradient-to-br from-[#6A8E23]/10 via-[#F4A622]/10 to-[#6A8E23]/10 border-2 border-[#6A8E23]/30 rounded-2xl p-6 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-start gap-4">
                <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={150} width={150} />
                <div>
                  <h4 className="font-bold text-foreground mb-2 text-lg">Compra Segura</h4>
                  <p className="text-sm text-muted-foreground">
                    Tus boletos son generados instantáneamente y guardados de forma segura. Recibirás confirmación por
                    email.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Purchase Form */}
          <div className="space-y-6">
            {/* Quantity Selector */}
            <div
              className="bg-card/80 backdrop-blur-sm border-2 border-[#6A8E23] rounded-2xl p-6 animate-fade-up hover:border-[#F4A622] transition-all overflow-visible shadow-lg"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="font-display font-bold text-xl text-foreground mb-6">Selecciona Cantidad</h3>

              <div className="flex items-center justify-center gap-6 mb-8 overflow-visible">
                <Button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  size="lg"
                  variant="outline"
                  className="w-14 h-14 rounded-full border-2 border-[#6A8E23] hover:bg-[#6A8E23] hover:text-background transition-all"
                >
                  <Minus className="w-6 h-6" />
                </Button>

                <div className="text-center min-w-[140px] relative overflow-visible flex flex-col items-center">
                  {/* Sombra detrás del número */}
                  <div
                    className="text-6xl font-display font-bold text-[#6A8E23]/40 absolute top-0 left-1/2 -translate-x-1/2"
                    style={{
                      filter: 'blur(12px)',
                      transform: 'translateX(-50%) translateY(2px)',
                      zIndex: 0,
                      lineHeight: '96px',
                      width: '96px',
                      textAlign: 'center'
                    }}
                  >
                    {quantity}
                  </div>
                  {/* Número principal */}
                  <div className="text-6xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent animate-pulse-glow relative z-10 border-2 border-[#6A8E23] rounded-full w-24 h-24 flex items-center justify-center leading-none">
                    <span className="flex items-center justify-center w-full h-full">{quantity}</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-semibold relative z-10 mt-2">boletos</div>
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
                {selectedPaymentMethod === "pago-movil" && (
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      <strong>Nota:</strong> Con Pago Móvil, cada boleto tiene un valor de 800 bs.
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Subtotal ({quantity} boletos @ {pricePerTicket.toLocaleString("es-CO")}{selectedPaymentMethod === "pago-movil" ? " bs" : ""} c/u)</span>
                  <span className="font-semibold">${subtotal.toLocaleString("es-CO")}{selectedPaymentMethod === "pago-movil" ? " bs" : ""}</span>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                <div className="flex items-center justify-between text-3xl font-display font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                    ${total.toLocaleString("es-CO")}{selectedPaymentMethod === "pago-movil" ? " bs" : ""}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-lg text-foreground">Método de Pago</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      id: "Binance",
                      name: "Binance",
                      svg: "/Logo-binance.svg",
                    },
                    {
                      id: "paypal",
                      name: "PayPal",
                      svg: "/Logo-paypal.svg",
                    },
                    {
                      id: "zinli",
                      name: "Zinli",
                      svg: "/Logo-zinli.svg",
                    },
                    {
                      id: "pago-movil",
                      name: "Pago Móvil",
                      svg: "/Logo-pago-movil.svg",
                    },
                  ].map((method) => {
                    const isSelected = selectedPaymentMethod === method.id
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        className={`relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${isSelected
                          ? method.id === "pago-movil"
                            ? "border-[#6A8E23] bg-white shadow-lg shadow-[#6A8E23]/30"
                            : "border-[#6A8E23] bg-gradient-to-r from-[#6A8E23]/20 to-[#F4A622]/20 shadow-lg shadow-[#6A8E23]/30"
                          : "border-[#6A8E23]/30 hover:border-[#6A8E23]/60 bg-card/50 hover:bg-card/80"
                          }`}
                      >
                        <div
                          className={`flex items-center justify-center w-12 h-12 rounded-lg ${isSelected
                            ? "bg-gradient-to-r from-[#6A8E23] to-[#F4A622]"
                            : "bg-muted"
                            }`}
                        >
                          {method.svg ? (
                            <img
                              src={method.svg}
                              alt={`${method.name} logo`}
                              className="w-12 h-12 object-contain rounded-lg"
                            />
                          ) : null}
                        </div>
                        <span
                          className={`flex-1 text-left font-semibold ${
                            isSelected 
                              ? method.id === "pago-movil" 
                                ? "text-[#6A8E23]" 
                                : "text-foreground"
                              : "text-muted-foreground"
                            }`}
                        >
                          {method.name}
                        </span>
                        {isSelected && (
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-[#6A8E23] to-[#F4A622]">
                            <Check className="w-4 h-4 text-background" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              <Button
                onClick={handlePurchase}
                disabled={isProcessing || !selectedPaymentMethod}
                className="w-full bg-gradient-to-r from-[#6A8E23] to-[#F4A622] hover:from-[#4F6D1F] hover:to-[#F4A622] text-background gap-3 h-14 text-lg font-bold shadow-xl shadow-[#6A8E23]/30 border-0 animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
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
          </div>
        </div>

        {/* Icono de WhatsApp/Telegram fijo */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="hover:scale-105 transition-transform duration-300 drop-shadow-2xl">
            <MoonMessagingIcon 
              className="w-16 h-16" 
              whatsappUrl="https://wa.me/584241325210"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
