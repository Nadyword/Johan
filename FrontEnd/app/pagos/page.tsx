"use client"

import { CreditCard, Calendar, CheckCircle2, Clock, ShieldX, Ticket, X, Image as ImageIcon, RefreshCw } from "lucide-react"
import { CloverIcon, CloverIconImage } from "@/components/clover-icon"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { rafflesApi } from "@/lib/api/raffles"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { TicketResponse } from "@/lib/api/types"

export default function PaymentsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [tickets, setTickets] = useState<TicketResponse[]>([])
  const [isTicketsLoading, setIsTicketsLoading] = useState(false)
  const [ticketsError, setTicketsError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Función para cargar historial de pagos
  const loadPayments = async (showLoading = true) => {
    if (!user) {
      setIsLoading(false)
      return
    }

    try {
      if (showLoading) {
        setIsLoading(true)
      } else {
        setIsRefreshing(true)
      }
      setError(null)

      // Obtener el ID del usuario desde localStorage (mismo formato que auth-modal.tsx)
      const storedUser = localStorage.getItem("user")
      if (!storedUser) {
        throw new Error("Usuario no encontrado en localStorage")
      }

      const userData = JSON.parse(storedUser)
      // El formato es: { id: userId, email: email }
      const token = userData.id
      
      if (!token) {
        throw new Error("ID de usuario no disponible en localStorage")
      }

      const result = await rafflesApi.gethistorial_tickets(token)
      console.log("Historial de pagos recibido:", result)

      // Parsear la respuesta JSON
      const rawPayments = JSON.parse(result) as any[]
      console.log("Pagos parseados:", rawPayments)

      // Mapear los datos de la API al formato Payment
      const mappedPayments: Payment[] = rawPayments.map((p) => ({
        idSorteo: p.idSorteo || p.IdSorteo || "",
        idUsuario: p.idUsuario || p.IdUsuario || "",
        idTicket: p.idTicket || p.IdTicket || "",
        title: p.title || p.Title || p.tituloSorteo || p.TituloSorteo || "Sin título",
        estadoPago: p.estadoPago || p.EstadoPago || "pendiente",
        montoTotal: p.montoTotal || p.MontoTotal || p.amount || p.Amount || 0,
        metodoPago: p.metodoPago || p.MetodoPago || p.metodo || p.Metodo || "N/A",
        fechaCompra: p.fechaCompra || p.FechaCompra || p.fecha || p.Fecha || new Date().toISOString(),
        comprobante: p.comprobante  || p.Comprobante || "",
      }))

      setPayments(mappedPayments)
    } catch (err) {
      console.error("Error cargando historial de pagos:", err)
      setError(err instanceof Error ? err.message : "Error al cargar el historial de pagos")
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  // Verificar si el usuario es admin y cargar pagos
  useEffect(() => {
    if (user && user.name?.toLowerCase() !== "admin") {
      // Si el usuario no es admin, redirigir a la página principal
      router.push("/")
      return
    }

    // Cargar historial de pagos si el usuario es admin
    loadPayments()
  }, [user, router])

  // Si el usuario no es admin, mostrar mensaje de acceso denegado
  if (user && user.name?.toLowerCase() !== "admin") {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-card/80 backdrop-blur-sm border-2 border-red-500/30 rounded-2xl p-8 animate-fade-up">
              <ShieldX className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                Acceso Denegado
              </h2>
              <p className="text-muted-foreground mb-6">
                Esta sección está disponible solo para administradores.
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-gradient-to-r from-[#6A8E23] to-[#F4A622] text-background px-6 py-3 rounded-xl font-bold hover:from-[#4F6D1F] hover:to-[#F4A622] transition-all"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  type Payment = {
    idSorteo: string
    idUsuario: string
    idTicket: string
    title: string
    estadoPago: string
    montoTotal: number
    metodoPago: string
    fechaCompra: string
    comprobante: string
  }

  const handleViewTickets = async (payment: Payment) => {
    setSelectedPayment(payment)
    setIsModalOpen(true)
    setIsTicketsLoading(true)
    setTicketsError(null)
    setTickets([])

    try {
      // Convertir idTicket de string a number
      const codigo = parseInt(payment.idTicket, 10)
      if (isNaN(codigo)) {
        throw new Error("Código de ticket inválido")
      }

      const ticketData = await rafflesApi.getTicketsByCodigo(codigo)
      console.log("Tickets obtenidos:", ticketData)
      setTickets(ticketData)
    } catch (err) {
      console.error("Error cargando tickets:", err)
      setTicketsError(err instanceof Error ? err.message : "Error al cargar los tickets")
    } finally {
      setIsTicketsLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative overflow-hidden">

        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F4A622]/20 via-background to-[#6A8E23]/20 animate-gradient" />
          <div className="absolute top-20 left-10 w-80 h-80 bg-[#F4A622]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#6A8E23]/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-10"
              style={{
                left: `${Math.floor(Math.random() * 100)}%`,
                top: `${Math.floor(Math.random() * 100)}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${Math.floor(8 + Math.random() * 4)}s`,
              }}
            >
              <CloverIcon className="w-14 h-14 text-[#F4A622]" />
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12 animate-fade-up">
            <div className="inline-flex items-center gap-3 mb-4 bg-gradient-to-r from-[#F4A622] to-[#6A8E23] p-1 rounded-2xl">
              <div className="bg-background rounded-xl px-6 py-3 flex items-center gap-3">
                <CreditCard className="w-10 h-10 text-[#F4A622]" />
                <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-[#F4A622] to-[#6A8E23] bg-clip-text text-transparent">
                  Historial de Pagos
                </h1>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <p className="text-muted-foreground text-lg">
                Gestiona tus transacciones, <span className="text-[#F4A622] font-bold">{user?.name}</span>
              </p>
              <Button
                onClick={() => loadPayments(false)}
                disabled={isRefreshing || isLoading}
                variant="outline"
                size="sm"
                className="border-2 border-[#6A8E23]/30 hover:border-[#6A8E23] bg-card/50 hover:bg-card/80 gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Actualizando..." : "Actualizar"}
              </Button>
            </div>
          </div>

          {/* Payments List */}
          {isLoading ? (
            <div className="text-center py-16 animate-fade-up">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F4A622] mx-auto mb-4"></div>
              <p className="text-muted-foreground text-lg">Cargando historial de pagos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 animate-fade-up">
              <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-red-500 font-semibold mb-4">Error al cargar pagos</p>
                <p className="text-muted-foreground text-sm">{error}</p>
              </div>
            </div>
          ) : payments.length > 0 ? (
            <div className="space-y-4">
              {payments.map((payment, index) => (
                <div
                  key={`${payment.idSorteo}-${payment.idTicket}-${index}`}
                  className="bg-card/80 backdrop-blur-sm border-2 border-[#F4A622]/30 rounded-2xl p-6 hover:border-[#F4A622] transition-all hover:shadow-xl hover:shadow-[#F4A622]/20 animate-fade-up"
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Payment Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-display font-bold text-xl bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                            {payment.title}
                          </h3>
                          <p className="text-sm text-muted-foreground font-semibold">Compra #{payment.idTicket}</p>
                        </div>
                        <div
                          className={`px-4 py-2 rounded-full text-xs font-bold shadow-lg ${
                            payment.estadoPago === "completed" || payment.estadoPago === "pagado"
                              ? "bg-gradient-to-r from-[#6A8E23] to-[#4F6D1F] text-background"
                              : "bg-gradient-to-r from-[#F4A622] to-[#F4A622]/80 text-background"
                          }`}
                        >
                          {payment.estadoPago === "completed" || payment.estadoPago === "pagado" ? (
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              COMPLETADO
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              PENDIENTE
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
                          <Calendar className="w-4 h-4 text-[#6A8E23]" />
                          <span className="text-muted-foreground font-medium">
                            {new Date(payment.fechaCompra).toLocaleDateString("es-ES")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
                          <CreditCard className="w-4 h-4 text-[#F4A622]" />
                          <span className="text-muted-foreground font-medium">{payment.metodoPago}</span>
                        </div>
                        {payment.comprobante && (
                          <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
                            <ImageIcon className="w-4 h-4 text-[#6A8E23]" />
                            <span className="text-muted-foreground font-medium">Comprobante disponible</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right space-y-3">
                      <p className="text-3xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                        ${payment.montoTotal.toLocaleString("es-CO")}
                      </p>
                      <Button
                        onClick={() => handleViewTickets(payment)}
                        className="bg-gradient-to-r from-[#6A8E23] to-[#F4A622] hover:from-[#4F6D1F] hover:to-[#F4A622] text-background gap-2 font-semibold"
                      >
                        <Ticket className="w-4 h-4" />
                        Ver Tickets
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-up">
              <CreditCard className="w-24 h-24 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No hay pagos registrados</h3>
              <p className="text-muted-foreground">Tus transacciones aparecerán aquí</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Tickets */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#6A8E23]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
              Tickets del Pago
            </DialogTitle>
            {selectedPayment && (
              <p className="text-muted-foreground text-sm mt-2">
                {selectedPayment.title} - Compra #{selectedPayment.idTicket}
              </p>
            )}
          </DialogHeader>

          {/* Comprobante de Pago */}
          {selectedPayment && selectedPayment.comprobante && (
            <div className="mt-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="w-5 h-5 text-[#F4A622]" />
                <h3 className="font-semibold text-white">Comprobante de Pago</h3>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 border border-[#6A8E23]/30">
                <img
                  src={
                    selectedPayment.comprobante.startsWith("data:")
                      ? selectedPayment.comprobante
                      : `data:image/png;base64,${selectedPayment.comprobante}`
                  }
                  alt="Comprobante de pago"
                  className="w-full h-auto max-h-96 object-contain rounded-lg border border-[#6A8E23]/20"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const parent = target.parentElement
                    if (parent) {
                      const errorMsg = parent.querySelector(".comprobante-error")
                      if (errorMsg) {
                        (errorMsg as HTMLElement).style.display = "block"
                      }
                    }
                  }}
                />
                <p className="comprobante-error hidden text-sm text-red-400 mt-2 text-center">
                  No se pudo cargar el comprobante
                </p>
              </div>
            </div>
          )}

          {isTicketsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A8E23] mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando tickets...</p>
            </div>
          ) : ticketsError ? (
            <div className="text-center py-12">
              <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8">
                <p className="text-red-500 font-semibold mb-2">Error al cargar tickets</p>
                <p className="text-muted-foreground text-sm">{ticketsError}</p>
              </div>
            </div>
          ) : tickets.length > 0 ? (
            <div className="space-y-4 mt-4">
              {tickets.map((ticket, index) => (
                <div
                  key={`${ticket.idSorteo}-${ticket.codigoTicket}-${index}`}
                  className="bg-card/80 backdrop-blur-sm border-2 border-[#6A8E23]/30 rounded-xl p-4 hover:border-[#6A8E23] transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-[#F4A622]" />
                        <span className="font-semibold text-foreground">Código: {ticket.codigoTicket}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Sorteo:</span> {ticket.tituloSorteo}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4 text-[#6A8E23]" />
                          <span>Comprado: {new Date(ticket.fechaCompra).toLocaleDateString("es-ES")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4 text-[#F4A622]" />
                          <span>Finaliza: {new Date(ticket.fechaFinalizacion).toLocaleDateString("es-ES")}</span>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                        ticket.estadoPago === "pagado"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : ticket.estadoPago === "pendiente"
                          ? "bg-[#1a1a1a] text-yellow-400 border border-yellow-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}>
                        <span className="capitalize">Estado: {ticket.estadoPago}</span>
                      </div>
                      {ticket.sorteoActivo !== undefined && (
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ml-2 ${
                          ticket.sorteoActivo
                            ? "bg-[#6A8E23]/20 text-[#6A8E23] border border-[#6A8E23]/30"
                            : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                        }`}>
                          {ticket.sorteoActivo ? "Sorteo Activo" : "Sorteo Finalizado"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Ticket className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No se encontraron tickets para este pago</p>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              className="border-[#6A8E23]/30 hover:border-[#6A8E23]"
            >
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  )
}
