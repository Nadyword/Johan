/**
 * API de Contacto
 * Maneja todas las operaciones relacionadas con mensajes de contacto
 */

import { apiClient } from './client'
import type { ContactMessageRequest, ContactMessageResponse } from './types'

class ContactApi {
  /**
   * Envía un mensaje de contacto
   * @param messageData - Datos del mensaje de contacto
   * @returns Respuesta del mensaje enviado
   */
  async sendMessage(messageData: ContactMessageRequest): Promise<ContactMessageResponse> {
    return apiClient.post<ContactMessageResponse>('/contact', messageData)
  }

  /**
   * Obtiene los mensajes de contacto del usuario autenticado (si aplica)
   * @returns Lista de mensajes del usuario
   */
  async getUserMessages(): Promise<ContactMessageResponse[]> {
    return apiClient.get<ContactMessageResponse[]>('/contact/messages')
  }

  /**
   * Obtiene un mensaje por su ID
   * @param id - ID del mensaje
   * @returns Datos del mensaje
   */
  async getMessageById(id: string): Promise<ContactMessageResponse> {
    return apiClient.get<ContactMessageResponse>(`/contact/messages/${id}`)
  }
}

// Exportar una instancia única
export const contactApi = new ContactApi()
export default contactApi

