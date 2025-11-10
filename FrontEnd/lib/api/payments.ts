/**
 * API de Pagos
 * Maneja todas las operaciones relacionadas con pagos
 */

import { apiClient } from './client'
import type { Payment } from '../types'

export interface PaymentResponse extends Payment {}

export interface CreatePaymentRequest {
  amount: number
  method: string
  raffleId: string
  quantity: number
  reference?: string
}

export interface PaymentStatusResponse {
  id: string
  status: 'approved' | 'failed' | 'refunded' | 'pending'
  message?: string
}

export interface GetPaymentsQuery {
  status?: 'approved' | 'failed' | 'refunded' | 'pending'
  method?: string
  page?: number
  limit?: number
  startDate?: string
  endDate?: string
}

class PaymentsApi {
  /**
   * Obtiene todos los pagos del usuario autenticado
   * @param query - Parámetros de búsqueda opcionales
   * @returns Lista de pagos del usuario
   */
  async getUserPayments(query?: GetPaymentsQuery): Promise<PaymentResponse[]> {
    const params = new URLSearchParams()
    
    if (query?.status) params.append('status', query.status)
    if (query?.method) params.append('method', query.method)
    if (query?.page) params.append('page', query.page.toString())
    if (query?.limit) params.append('limit', query.limit.toString())
    if (query?.startDate) params.append('startDate', query.startDate)
    if (query?.endDate) params.append('endDate', query.endDate)

    const queryString = params.toString()
    const endpoint = queryString ? `/payments?${queryString}` : '/payments'
    
    return apiClient.get<PaymentResponse[]>(endpoint)
  }

  /**
   * Obtiene un pago por su ID
   * @param id - ID del pago
   * @returns Datos del pago
   */
  async getPaymentById(id: string): Promise<PaymentResponse> {
    return apiClient.get<PaymentResponse>(`/payments/${id}`)
  }

  /**
   * Crea un nuevo pago
   * @param paymentData - Datos del pago
   * @returns Pago creado
   */
  async createPayment(paymentData: CreatePaymentRequest): Promise<PaymentResponse> {
    return apiClient.post<PaymentResponse>('/payments', paymentData)
  }

  /**
   * Verifica el estado de un pago
   * @param paymentId - ID del pago
   * @returns Estado actualizado del pago
   */
  async checkPaymentStatus(paymentId: string): Promise<PaymentStatusResponse> {
    return apiClient.get<PaymentStatusResponse>(`/payments/${paymentId}/status`)
  }

  /**
   * Confirma un pago pendiente
   * @param paymentId - ID del pago
   * @param confirmationData - Datos de confirmación
   * @returns Pago confirmado
   */
  async confirmPayment(
    paymentId: string,
    confirmationData?: { reference?: string; proof?: string }
  ): Promise<PaymentResponse> {
    return apiClient.post<PaymentResponse>(`/payments/${paymentId}/confirm`, confirmationData)
  }

  /**
   * Solicita un reembolso
   * @param paymentId - ID del pago
   * @param reason - Razón del reembolso
   * @returns Pago con estado de reembolso
   */
  async requestRefund(paymentId: string, reason?: string): Promise<PaymentResponse> {
    return apiClient.post<PaymentResponse>(`/payments/${paymentId}/refund`, { reason })
  }

  /**
   * Obtiene los métodos de pago disponibles
   * @returns Lista de métodos de pago disponibles
   */
  async getAvailablePaymentMethods(): Promise<{ id: string; name: string; enabled: boolean }[]> {
    return apiClient.get<{ id: string; name: string; enabled: boolean }[]>('/payments/methods')
  }
}

// Exportar una instancia única
export const paymentsApi = new PaymentsApi()
export default paymentsApi

