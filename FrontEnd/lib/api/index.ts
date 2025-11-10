/**
 * Exportación centralizada de todas las APIs
 * 
 * Uso:
 * import { authApi, rafflesApi, ticketsApi, paymentsApi, contactApi } from '@/lib/api'
 * 
 * O importar módulos específicos:
 * import { authApi } from '@/lib/api/auth'
 */

// Cliente base
export { apiClient, type ApiError } from './client'

// API de Autenticación
export {
  authApi,
  default as authApiDefault,
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
  type RegisterResponse,
} from './auth'

// API de Rifas
export {
  rafflesApi,
  default as rafflesApiDefault,
  type RaffleResponse,
  type CreateRaffleRequest,
  type UpdateRaffleRequest,
} from './raffles'

// API de Tickets
export {
  ticketsApi,
  default as ticketsApiDefault,
  type TicketResponse,
  type BuyTicketsRequest,
  type BuyTicketsResponse,
  type GetTicketsQuery,
} from './tickets'

// API de Pagos
export {
  paymentsApi,
  default as paymentsApiDefault,
  type PaymentResponse,
  type CreatePaymentRequest,
  type PaymentStatusResponse,
  type GetPaymentsQuery,
} from './payments'

// API de Contacto
export {
  contactApi,
  default as contactApiDefault,
} from './contact'

// Tipos generales
export type {
  ContactMessageRequest,
  ContactMessageResponse,
  ApiResponse,
  PaginatedResponse,
} from './types'

