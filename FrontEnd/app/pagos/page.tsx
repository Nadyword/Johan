"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth-context"
import { CreditCard, Calendar, CheckCircle2, Clock } from "lucide-react"
import { CloverIcon } from "@/components/clover-icon"

export default function PaymentsPage() {
  const { user } = useAuth()

  // Mock payments data
  const payments = [
    {
      id: "1",
      raffleTitle: "iPhone 15 Pro Max",
      amount: 50000,
      date: "2025-01-15",
      status: "completed",
      method: "Tarjeta de Crédito",
      ticketNumber: "00042",
    },
    {
      id: "2",
      raffleTitle: "PlayStation 5",
      amount: 30000,
      date: "2025-01-10",
      status: "completed",
      method: "Transferencia",
      ticketNumber: "00156",
    },
    {
      id: "3",
      raffleTitle: "MacBook Pro",
      amount: 75000,
      date: "2025-01-05",
      status: "pending",
      method: "Tarjeta de Débito",
      ticketNumber: "00089",
    },
  ]

  const totalSpent = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F4A622]/20 via-background to-[#6A8E23]/20 animate-gradient" />
          <div className="absolute top-20 left-10 w-80 h-80 bg-[#F4A622]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#6A8E23]/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        {/* Floating Clovers */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${9 + Math.random() * 4}s`,
              }}
            >
              <CloverIcon className="w-14 h-14 text-[#F4A622]" />
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <div className="inline-flex items-center gap-3 mb-4 bg-gradient-to-r from-[#F4A622] to-[#6A8E23] p-1 rounded-2xl">
              <div className="bg-background rounded-xl px-6 py-3 flex items-center gap-3">
                <CreditCard className="w-10 h-10 text-[#F4A622]" />
                <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-[#F4A622] to-[#6A8E23] bg-clip-text text-transparent">
                  Historial de Pagos
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              Gestiona tus transacciones, <span className="text-[#F4A622] font-bold">{user?.name}</span>
            </p>
          </div>

          {/* Summary Card */}
          <div
            className="bg-gradient-to-br from-[#6A8E23] via-[#4F6D1F] to-[#F4A622] rounded-2xl p-8 mb-8 animate-fade-up shadow-2xl shadow-[#6A8E23]/30 border-2 border-[#F4A622]/30"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-background/80 text-sm font-semibold mb-2 uppercase tracking-wide">Total Invertido</p>
                <p className="text-4xl font-display font-bold text-background">${totalSpent.toLocaleString("es-CO")}</p>
                <p className="text-background/70 text-sm mt-1">En {payments.length} transacciones</p>
              </div>
              <CloverIcon className="w-20 h-20 text-background/20 animate-float" />
            </div>
          </div>

          {/* Payments List */}
          {payments.length > 0 ? (
            <div className="space-y-4">
              {payments.map((payment, index) => (
                <div
                  key={payment.id}
                  className="bg-card/80 backdrop-blur-sm border-2 border-[#F4A622]/30 rounded-2xl p-6 hover:border-[#F4A622] transition-all hover:shadow-xl hover:shadow-[#F4A622]/20 animate-fade-up"
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Payment Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-display font-bold text-xl bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                            {payment.raffleTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground font-semibold">Ticket #{payment.ticketNumber}</p>
                        </div>
                        <div
                          className={`px-4 py-2 rounded-full text-xs font-bold shadow-lg ${
                            payment.status === "completed"
                              ? "bg-gradient-to-r from-[#6A8E23] to-[#4F6D1F] text-background"
                              : "bg-gradient-to-r from-[#F4A622] to-[#F4A622]/80 text-background"
                          }`}
                        >
                          {payment.status === "completed" ? (
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
                            {new Date(payment.date).toLocaleDateString("es-ES")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
                          <CreditCard className="w-4 h-4 text-[#F4A622]" />
                          <span className="text-muted-foreground font-medium">{payment.method}</span>
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <p className="text-3xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                        ${payment.amount.toLocaleString("es-CO")}
                      </p>
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
    </ProtectedRoute>
  )
}
