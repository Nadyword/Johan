const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.RUTA_API || 'https://chainoflucky/Sorteo/api'

export interface UserResponse {
  id: number
  identifi: string
  nombre: string
  apellido: string
  email: string
  genero: string
  pais: string
  clave: string
  confirmClave: string
  telefono: string
  fec_naci: string
}

export async function getUsers(): Promise<UserResponse[]> {
  try {
    const response = await fetch(`${API_URL}/Usuario`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Leer el contenido de la respuesta como texto primero
    const contentType = response.headers.get('content-type')
    const text = await response.text()
    
    if (!response.ok) {
      let errorMessage = `Error: ${response.status} ${response.statusText}`
      
      // Intentar parsear como JSON si el content-type indica JSON
      if (contentType && contentType.includes('application/json')) {
        try {
          const data = JSON.parse(text)
          if (data.message) {
            errorMessage = data.message
          } else if (typeof data === 'string') {
            errorMessage = data
          }
        } catch {
          // Si falla el parseo, usar el texto directamente
          errorMessage = text || errorMessage
        }
      } else {
        // Si no es JSON, usar el texto directamente
        errorMessage = text || errorMessage
      }
      
      throw new Error(errorMessage)
    }

    // Si la respuesta es exitosa, intentar parsear como JSON
    if (contentType && contentType.includes('application/json')) {
      try {
        const parsed = JSON.parse(text)
        // Si es un array, retornarlo directamente
        if (Array.isArray(parsed)) {
          return parsed
        }
        // Si es un objeto, intentar extraer un array
        if (parsed.data && Array.isArray(parsed.data)) {
          return parsed.data
        }
        // Si no, retornar el objeto en un array
        return [parsed]
      } catch {
        // Si no es JSON válido, lanzar error
        throw new Error('Respuesta inválida del servidor')
      }
    }
    
    // Si no es JSON, intentar parsear como texto
    try {
      const parsed = JSON.parse(text)
      if (Array.isArray(parsed)) {
        return parsed
      }
      return [parsed]
    } catch {
      throw new Error('Respuesta inválida del servidor')
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Error desconocido al obtener la lista de usuarios')
  }
}

// Función auxiliar para convertir archivo a base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // Remover el prefijo "data:image/...;base64," si existe
      const base64 = result.includes(',') ? result.split(',')[1] : result
      resolve(base64)
    }
    reader.onerror = (error) => reject(error)
  })
}

export async function generateTicketForUser(
  userId: number,
  raffleId: string,
  pricePerTicket: number,
  ticketQuantity: number = 1,
  adminToken: string,
  imageFile?: File,
  notes?: string
): Promise<any> {
  try {
    // Convertir el archivo a base64 si se proporciona
    let imageBase64 = ""
    if (imageFile) {
      imageBase64 = await fileToBase64(imageFile)
    } else {
      // Crear una imagen por defecto en base64 (imagen transparente de 1x1 pixel)
      imageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    }
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const requestBody = {
      "RaffleId": raffleId,
      "UserId": userId,
      "PricevoTicket": pricePerTicket,
      "ModePay": "admin-generado",
      "TicketQuantity": ticketQuantity,
      "Image": imageBase64,
      "Note": notes && notes.trim() ? notes.trim() : "Ticket generado por administrador",
      "ImagenSorteo": ""
    };
    
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(requestBody),
      redirect: "follow" as RequestRedirect
    };

    const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.RUTA_API || 'https://chainoflucky/Sorteo/api'
    const response = await fetch(`${API_URL}/Buytickets`, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al generar ticket: ${errorText}`);
    }

    const result = await response.text();
    
    try {
      return JSON.parse(result);
    } catch (parseError) {
      return { message: result };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error desconocido al generar el ticket');
  }
}

export const usersApi = {
  getUsers,
  generateTicketForUser: generateTicketForUser as (
    userId: number,
    raffleId: string,
    pricePerTicket: number,
    ticketQuantity: number,
    adminToken: string,
    imageFile?: File,
    notes?: string
  ) => Promise<any>,
}

export default usersApi

