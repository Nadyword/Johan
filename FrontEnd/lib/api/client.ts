/**
 * Cliente HTTP configurado para todas las llamadas a la API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.RUTA_API || 'https://chainoflucky/Sorteo/api'

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  /**
   * Obtiene el token de autenticación del localStorage
   */
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        return userData.token || null
      } catch {
        return null
      }
    }
    return null
  }

  /**
   * Construye las opciones de la petición
   */
  private async buildRequestOptions(
    method: string,
    body?: unknown,
    customHeaders?: HeadersInit
  ): Promise<RequestInit> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(customHeaders as Record<string, string> | undefined),
    }

    const token = this.getAuthToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const options: RequestInit = {
      method,
      headers,
    }

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body)
    }

    return options
  }

  /**
   * Maneja las respuestas de la API
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData: any = {}
      
      try {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json()
        } else {
          errorData = {
            message: response.statusText || 'Error en la petición',
          }
        }
      } catch {
        errorData = {
          message: response.statusText || 'Error en la petición',
        }
      }

      // Manejo especial para errores de validación
      if (response.status === 400 && errorData.errors) {
        const errorMessages: string[] = []
        Object.keys(errorData.errors).forEach((field) => {
          const messages = errorData.errors[field]
          if (Array.isArray(messages)) {
            errorMessages.push(...messages)
          }
        })
        errorData.message = errorMessages.join(' ') || errorData.message
      }

      const error: ApiError = {
        message: errorData.message || errorData.title || 'Error desconocido',
        status: response.status,
        errors: errorData.errors,
      }

      throw error
    }

    // Si la respuesta está vacía, retornar null
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return null as T
    }

    return response.json()
  }

  /**
   * Realiza una petición GET
   */
  async get<T>(endpoint: string, customHeaders?: HeadersInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const options = await this.buildRequestOptions('GET', undefined, customHeaders)

    const response = await fetch(url, options)
    return this.handleResponse<T>(response)
  }

  /**
   * Realiza una petición POST
   */
  async post<T>(endpoint: string, body?: unknown, customHeaders?: HeadersInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const options = await this.buildRequestOptions('POST', body, customHeaders)

    const response = await fetch(url, options)
    return this.handleResponse<T>(response)
  }

  /**
   * Realiza una petición PUT
   */
  async put<T>(endpoint: string, body?: unknown, customHeaders?: HeadersInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const options = await this.buildRequestOptions('PUT', body, customHeaders)

    const response = await fetch(url, options)
    return this.handleResponse<T>(response)
  }

  /**
   * Realiza una petición PATCH
   */
  async patch<T>(endpoint: string, body?: unknown, customHeaders?: HeadersInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const options = await this.buildRequestOptions('PATCH', body, customHeaders)

    const response = await fetch(url, options)
    return this.handleResponse<T>(response)
  }

  /**
   * Realiza una petición DELETE
   */
  async delete<T>(endpoint: string, customHeaders?: HeadersInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const options = await this.buildRequestOptions('DELETE', undefined, customHeaders)

    const response = await fetch(url, options)
    return this.handleResponse<T>(response)
  }
}

// Exportar una instancia única del cliente
export const apiClient = new ApiClient(API_BASE_URL)

