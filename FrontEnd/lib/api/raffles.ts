/**
 * API de Rifas
 * Maneja todas las operaciones relacionadas con rifas/sorteos
 */

import { apiClient } from './client'
import type { Raffle } from '../types'

export interface RaffleResponse extends Raffle {}

export interface CreateRaffleRequest {
  title: string
  description: string
  image: string
  price: number
  ticketPrice: number
  totalTickets: number
  endsAt: string
  discounts?: {
    quantity: number
    percentage: number
  }[]
}

export interface UpdateRaffleRequest extends Partial<CreateRaffleRequest> {
  id: string
}

class RafflesApi {
  /**
   * Obtiene todas las rifas activas
   * @returns Lista de rifas activas
   */
  async getActiveRaffles(): Promise<RaffleResponse[]> {
    return apiClient.get<RaffleResponse[]>('/raffles/active')
  }

  /**
   * Obtiene todas las rifas finalizadas
   * @returns Lista de rifas finalizadas
   */
  async getEndedRaffles(): Promise<RaffleResponse[]> {
    return apiClient.get<RaffleResponse[]>('/raffles/ended')
  }

  /**
   * Obtiene todas las rifas
   * @returns Lista de todas las rifas
   */
  async getAllRaffles(): Promise<RaffleResponse[]> {
    return apiClient.get<RaffleResponse[]>('/raffles')
  }

  /**
   * Obtiene una rifa por su ID
   * @param id - ID de la rifa
   * @returns Datos de la rifa
   */
  async getRaffleById(id: string): Promise<RaffleResponse> {
    return apiClient.get<RaffleResponse>(`/raffles/${id}`)
  }

  /**
   * Crea una nueva rifa
   * @param raffleData - Datos de la rifa a crear
   * @returns Rifa creada
   */
  async createRaffle(raffleData: CreateRaffleRequest): Promise<RaffleResponse> {
    return apiClient.post<RaffleResponse>('/raffles', raffleData)
  }

  /**
   * Actualiza una rifa existente
   * @param raffleData - Datos de la rifa a actualizar
   * @returns Rifa actualizada
   */
  async updateRaffle(raffleData: UpdateRaffleRequest): Promise<RaffleResponse> {
    const { id, ...data } = raffleData
    return apiClient.put<RaffleResponse>(`/raffles/${id}`, data)
  }

  /**
   * Elimina una rifa
   * @param id - ID de la rifa a eliminar
   */
  async deleteRaffle(id: string): Promise<void> {
    return apiClient.delete<void>(`/raffles/${id}`)
  }

  /**
   * Obtiene la rifa activa actual
   * @returns Rifa activa
   */
  async getCurrentActiveRaffle(): Promise<RaffleResponse> {
    return apiClient.get<RaffleResponse>('/raffles/current')
  }
}

// Exportar una instancia única
export const rafflesApi = new RafflesApi()
export default rafflesApi

