/**
 * Tipos e interfaces para las respuestas de la API
 */

// Respuestas de autenticación
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    name: string
    email: string
  }
  token: string
  refreshToken?: string
}

// Respuestas de contacto
export interface ContactMessageRequest {
  nombre: string
  email: string
  asunto: string
  mensaje: string
}

export interface ContactMessageResponse {
  id: string
  nombre: string
  email: string
  asunto: string
  mensaje: string
  createdAt: string
  status: 'pending' | 'read' | 'replied'
}

// Respuestas de rifas
export interface RaffleResponse {
  id: string
  title: string
  description: string
  image: string
  ticketPrice: number
  soldTickets: number
  price: number
  stock: number
  totalTickets: number
  endsAt: string
  status: 'active' | 'ended'
  winner?: string
  discounts: {
    quantity: number
    percentage: number
  }[]
}

// Respuestas de tickets
export interface TicketResponse {
  id: string
  raffleId: string
  number: string
  qr: string
  status: 'pending' | 'drawn' | 'winner'
  purchasedAt: string
  raffleName: string
}

export interface BuyTicketsRequest {
  raffleId: string
  quantity: number
}

export interface BuyTicketsResponse {
  tickets: TicketResponse[]
  payment: {
    id: string
    amount: number
    method: string
    status: 'approved' | 'failed' | 'refunded'
    reference: string
    createdAt: string
  }
}

// Respuestas de pagos
export interface PaymentResponse {
  id: string
  amount: number
  method: string
  status: 'approved' | 'failed' | 'refunded'
  reference: string
  createdAt: string
  tickets: number
}

// Respuestas genéricas
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

