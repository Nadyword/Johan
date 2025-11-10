/**
 * API de Tickets
 * Maneja todas las operaciones relacionadas con tickets de rifas
 */

import { apiClient } from './client'
import type { Ticket } from '../types'

export interface TicketResponse extends Ticket {}

export interface BuyTicketsRequest {
  raffleId: string
  quantity: number
  paymentMethod?: string
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

export interface GetTicketsQuery {
  raffleId?: string
  status?: 'pending' | 'drawn' | 'winner'
  page?: number
  limit?: number
}

class TicketsApi {
  /**
   * Obtiene todos los tickets del usuario autenticado
   * @param query - Parámetros de búsqueda opcionales
   * @returns Lista de tickets del usuario
   */
  async getUserTickets(query?: GetTicketsQuery): Promise<TicketResponse[]> {
    const params = new URLSearchParams()
    
    if (query?.raffleId) params.append('raffleId', query.raffleId)
    if (query?.status) params.append('status', query.status)
    if (query?.page) params.append('page', query.page.toString())
    if (query?.limit) params.append('limit', query.limit.toString())

    const queryString = params.toString()
    const endpoint = queryString ? `/tickets?${queryString}` : '/tickets'
    
    return apiClient.get<TicketResponse[]>(endpoint)
  }

  /**
   * Obtiene un ticket por su ID
   * @param id - ID del ticket
   * @returns Datos del ticket
   */
  async getTicketById(id: string): Promise<TicketResponse> {
    return apiClient.get<TicketResponse>(`/tickets/${id}`)
  }

  /**
   * Compra tickets para una rifa
   * @param buyData - Datos de la compra
   * @returns Tickets comprados y información del pago
   */
  async buyTickets(buyData: BuyTicketsRequest): Promise<BuyTicketsResponse> {
    return apiClient.post<BuyTicketsResponse>('/tickets/buy', buyData)
  }

  /**
   * Obtiene los tickets de una rifa específica
   * @param raffleId - ID de la rifa
   * @returns Lista de tickets de la rifa
   */
  async getTicketsByRaffle(raffleId: string): Promise<TicketResponse[]> {
    return apiClient.get<TicketResponse[]>(`/tickets/raffle/${raffleId}`)
  }

  /**
   * Obtiene el número de tickets disponibles para una rifa
   * @param raffleId - ID de la rifa
   * @returns Número de tickets disponibles
   */
  async getAvailableTicketsCount(raffleId: string): Promise<{ available: number }> {
    return apiClient.get<{ available: number }>(`/tickets/available/${raffleId}`)
  }

  /**
   * Valida un ticket por su número
   * @param ticketNumber - Número del ticket
   * @param raffleId - ID de la rifa
   * @returns Datos del ticket si es válido
   */
  async validateTicket(ticketNumber: string, raffleId: string): Promise<TicketResponse> {
    return apiClient.post<TicketResponse>('/tickets/validate', {
      ticketNumber,
      raffleId,
    })
  }
}

// Exportar una instancia única
export const ticketsApi = new TicketsApi()
export default ticketsApi

