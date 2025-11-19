"use client"

import { User, ShieldX, RefreshCw, Mail, Phone, IdCard, Users, Ticket, Loader2, X, Search } from "lucide-react"
import { usersApi, type UserResponse } from "@/lib/api/users"
import { GenerarTicket } from "@/lib/api/tickets"
import { ProtectedRoute } from "@/components/protected-route"
import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { loadMockRafflesActive } from "@/lib/mock-data"
import type { Raffle } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function UsuarioPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [users, setUsers] = useState<UserResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeRaffles, setActiveRaffles] = useState<Raffle[]>([])
  const [generatingTicketFor, setGeneratingTicketFor] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null)
  const [selectedRaffle, setSelectedRaffle] = useState<Raffle | null>(null)
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [notes, setNotes] = useState("")
  const [fileError, setFileError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Función para cargar usuarios
  const loadUsers = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setIsLoading(true)
      } else {
        setIsRefreshing(true)
      }
      setError(null)

      const usersData = await usersApi.getUsers()
      setUsers(usersData)
    } catch (err) {
      console.error("Error cargando usuarios:", err)
      setError(err instanceof Error ? err.message : "Error al cargar la lista de usuarios")
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  // Cargar rifas activas
  useEffect(() => {
    loadMockRafflesActive()
      .then((data) => {
        if (data && data.length > 0) {
          setActiveRaffles(data)
        }
      })
      .catch((error) => {
        console.error('Error cargando rifas activas:', error)
      })
  }, [])

  // Verificar si el usuario es admin y cargar usuarios
  useEffect(() => {
    if (user && user.name?.toLowerCase() !== "admin") {
      // Si el usuario no es admin, redirigir a la página principal
      router.push("/")
      return
    }

    // Cargar usuarios si el usuario es admin
    if (user && user.name?.toLowerCase() === "admin") {
      loadUsers()
    }
  }, [user, router, loadUsers])

  // Función para abrir el modal
  const handleOpenModal = useCallback((userItem: UserResponse) => {
    if (!activeRaffles || activeRaffles.length === 0) {
      toast({
        title: "❌ Error",
        description: "No hay sorteos activos disponibles",
        variant: "destructive",
      })
      return
    }
    setSelectedUser(userItem)
    setTicketQuantity(1)
    setSelectedRaffle(activeRaffles[0]) // Seleccionar el primer sorteo por defecto
    setNotes("")
    setFileError("")
    setIsModalOpen(true)
  }, [activeRaffles, toast])

  // Función para generar ticket
  const handleGenerateTicket = useCallback(async () => {
    if (!selectedUser) return

    if (!selectedRaffle) {
      setFileError("Debes seleccionar un sorteo activo")
      return
    }

    if (ticketQuantity < 1 || ticketQuantity > 50) {
      setFileError("La cantidad de tickets debe estar entre 1 y 50")
      return
    }

    if (!user) {
      toast({
        title: "❌ Error",
        description: "Usuario no autenticado",
        variant: "destructive",
      })
      return
    }

    // Obtener el token del admin desde localStorage
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      toast({
        title: "❌ Error",
        description: "Token de administrador no encontrado",
        variant: "destructive",
      })
      return
    }

    const userData = JSON.parse(storedUser)
    const adminToken = userData.id

    try {
      setGeneratingTicketFor(selectedUser.id)
      setFileError("")
      
      const result = await GenerarTicket({
        RaffleId: selectedRaffle.id,
        UserId: selectedUser.id,
        PricevoTicket: selectedRaffle.price,
        TicketQuantity: ticketQuantity,
        Image: "Sin foto",
        Note: notes && notes.trim() ? notes.trim() : "nada",
        ImagenSorteo: selectedRaffle.image,
        tokken: adminToken
      })

      toast({
        title: "✅ Ticket Generado",
        description: `${ticketQuantity} ticket(s) generado(s) exitosamente para ${selectedUser.nombre} ${selectedUser.apellido}`,
        variant: "default",
      })

      // Cerrar el modal y limpiar
      setIsModalOpen(false)
      setSelectedUser(null)
      setSelectedRaffle(null)
      setTicketQuantity(1)
      setNotes("")
    } catch (err) {
      console.error("Error generando ticket:", err)
      toast({
        title: "❌ Error al Generar Ticket",
        description: err instanceof Error ? err.message : "Error al generar el ticket",
        variant: "destructive",
      })
    } finally {
      setGeneratingTicketFor(null)
    }
  }, [selectedUser, selectedRaffle, ticketQuantity, notes, user, toast])

  // Filtrar usuarios por término de búsqueda
  const filteredUsers = users.filter((userItem) => {
    if (!searchTerm.trim()) return true
    
    const searchLower = searchTerm.toLowerCase().trim()
    const nombre = (userItem.nombre || "").toLowerCase()
    const apellido = (userItem.apellido || "").toLowerCase()
    const email = (userItem.email || "").toLowerCase()
    
    return (
      nombre.includes(searchLower) ||
      apellido.includes(searchLower) ||
      email.includes(searchLower) ||
      `${nombre} ${apellido}`.includes(searchLower)
    )
  })

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
              <p className="text-muted-foreground">
                Solo los administradores pueden acceder a esta página.
              </p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
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
            <div className="text-center mb-12 animate-fade-up">
              <div className="inline-flex items-center gap-3 mb-4 bg-gradient-to-r from-[#6A8E23] to-[#F4A622] p-1 rounded-2xl">
                <div className="bg-background rounded-xl px-6 py-3 flex items-center gap-3">
                  <Users className="w-10 h-10 text-black" />
                  <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                    Usuarios
                  </h1>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <p className="text-muted-foreground text-lg">
                  Gestión de usuarios del sistema, <span className="text-[#6A8E23] font-bold">{user?.name}</span>
                </p>
                <Button
                  onClick={() => loadUsers(false)}
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

            {/* Search Bar */}
            <div className="mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre, apellido o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-[#6A8E23]/30 focus:border-[#6A8E23] bg-card/80 backdrop-blur-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {searchTerm && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  {filteredUsers.length} {filteredUsers.length === 1 ? "usuario encontrado" : "usuarios encontrados"}
                </p>
              )}
            </div>

            {/* Users List */}
            {isLoading ? (
              <div className="text-center py-16 animate-fade-up">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A8E23] mx-auto mb-4"></div>
                <p className="text-muted-foreground text-lg">Cargando usuarios...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16 animate-fade-up">
                <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 max-w-md mx-auto">
                  <p className="text-red-500 font-semibold mb-4">Error al cargar usuarios</p>
                  <p className="text-muted-foreground text-sm">{error}</p>
                </div>
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="space-y-4">
                {filteredUsers.map((userItem, index) => (
                  <div
                    key={userItem.id}
                    className="bg-card/80 backdrop-blur-sm border-2 border-[#6A8E23]/30 rounded-2xl p-6 hover:border-[#F4A622] transition-all hover:shadow-xl hover:shadow-[#6A8E23]/20 animate-fade-up"
                    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-display font-bold text-xl bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                              {userItem.nombre} {userItem.apellido}
                            </h3>
                            <p className="text-sm text-muted-foreground font-semibold">ID: {userItem.id}</p>
                          </div>
                          {/* Generate Ticket Button - Lado opuesto del nombre */}
                          <Button
                            onClick={() => handleOpenModal(userItem)}
                            disabled={generatingTicketFor === userItem.id || activeRaffles.length === 0}
                            className="bg-gradient-to-r from-[#6A8E23] to-[#F4A622] hover:from-[#4F6D1F] hover:to-[#F4A622] text-background gap-2 font-bold shadow-lg shadow-[#6A8E23]/30 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Ticket className="w-4 h-4" />
                            Generar Ticket
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
                            <IdCard className="w-4 h-4 text-[#6A8E23]" />
                            <span className="text-muted-foreground font-medium">
                              <span className="text-foreground font-semibold">Identificación:</span> {userItem.identifi || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
                            <Mail className="w-4 h-4 text-[#6A8E23]" />
                            <span className="text-muted-foreground font-medium truncate">
                              <span className="text-foreground font-semibold">Email:</span> {userItem.email || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
                            <Phone className="w-4 h-4 text-[#6A8E23]" />
                            <span className="text-muted-foreground font-medium">
                              <span className="text-foreground font-semibold">Teléfono:</span> {userItem.telefono || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchTerm ? (
              <div className="text-center py-16 animate-fade-up">
                <Search className="w-24 h-24 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No se encontraron usuarios</p>
                <p className="text-muted-foreground text-sm mt-2">Intenta con otro término de búsqueda</p>
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-up">
                <User className="w-24 h-24 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No hay usuarios registrados</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal para generar ticket */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border-2 border-[#6A8E23]/30">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                Generar Ticket
              </DialogTitle>
            </DialogHeader>
            
            {selectedUser && (
              <div className="space-y-4">
                {/* Información del usuario */}
                <div className="p-4 bg-muted/50 rounded-lg border border-[#6A8E23]/20">
                  <p className="text-sm text-muted-foreground mb-1">Usuario:</p>
                  <p className="font-semibold text-foreground">
                    {selectedUser.nombre} {selectedUser.apellido}
                  </p>
                </div>

                {/* Cantidad de tickets */}
                <div className="space-y-2">
                  <Label htmlFor="ticket-quantity" className="text-foreground font-semibold">
                    Cantidad de Tickets <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ticket-quantity"
                    type="number"
                    min="1"
                    max="50"
                    value={ticketQuantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1
                      setTicketQuantity(Math.max(1, Math.min(50, value)))
                    }}
                    className="border-2 border-[#6A8E23]/30 focus:border-[#6A8E23]"
                  />
                  <p className="text-xs text-muted-foreground">Mínimo: 1, Máximo: 50</p>
                </div>

                {/* Sorteos Activos */}
                <div className="space-y-2">
                  <Label htmlFor="active-raffle" className="text-foreground font-semibold">
                    Sorteos Activos <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={selectedRaffle?.id || ""}
                    onValueChange={(value) => {
                      const raffle = activeRaffles.find(r => r.id === value)
                      setSelectedRaffle(raffle || null)
                      setFileError("")
                    }}
                  >
                    <SelectTrigger
                      id="active-raffle"
                      className={`w-full border-2 ${fileError ? "border-red-500" : "border-[#6A8E23]/30 focus:border-[#6A8E23]"}`}
                    >
                      <SelectValue placeholder="Selecciona un sorteo activo" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeRaffles.map((raffle) => (
                        <SelectItem key={raffle.id} value={raffle.id}>
                          {raffle.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fileError && (
                    <p className="text-sm text-red-500 mt-1">{fileError}</p>
                  )}
                </div>

                {/* Notas */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-foreground font-semibold">
                    Notas
                  </Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Agregar notas adicionales (opcional)..."
                    className="border-2 border-[#6A8E23]/30 focus:border-[#6A8E23] min-h-[100px] resize-y"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">Puedes agregar información adicional sobre este ticket</p>
                </div>

                {/* Resumen */}
                {selectedRaffle && (
                  <div className="p-4 bg-gradient-to-r from-[#6A8E23]/10 to-[#F4A622]/10 rounded-lg border border-[#6A8E23]/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-muted-foreground">Precio por ticket:</span>
                      <span className="font-bold text-foreground">
                        ${selectedRaffle.price.toLocaleString("es-CO")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-foreground">Total:</span>
                      <span className="text-xl font-display font-bold bg-gradient-to-r from-[#6A8E23] to-[#F4A622] bg-clip-text text-transparent">
                        ${(selectedRaffle.price * ticketQuantity).toLocaleString("es-CO")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button
                onClick={() => {
                  setIsModalOpen(false)
                  setSelectedUser(null)
                  setSelectedRaffle(null)
                  setTicketQuantity(1)
                  setNotes("")
                  setFileError("")
                }}
                variant="outline"
                className="border-2 border-[#6A8E23]/30 hover:border-[#6A8E23]"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleGenerateTicket}
                disabled={generatingTicketFor !== null || !selectedRaffle || ticketQuantity < 1}
                className="bg-gradient-to-r from-[#6A8E23] to-[#F4A622] hover:from-[#4F6D1F] hover:to-[#F4A622] text-background gap-2 font-bold shadow-lg shadow-[#6A8E23]/30 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generatingTicketFor !== null ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Ticket className="w-4 h-4" />
                    Generar Ticket
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  )
}

