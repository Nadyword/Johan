const API_URL = process.env.RUTA_API|| 'http://localhost:1607/Sorteo/api'

export interface LoginRequest {
  Email: string
  Password: string
}

export interface LoginResponse {
  id: string
  name: string
}


export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_URL}/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
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
        return JSON.parse(text)
      } catch {
        // Si no es JSON válido, lanzar error
        throw new Error('Respuesta inválida del servidor')
      }
    }
    
    // Si no es JSON, lanzar error (login siempre debería devolver JSON)
    throw new Error('Respuesta inválida del servidor')
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Error desconocido al realizar la petición')
  }
}

export interface RegisterRequest {
  Id: number
  Identifi: string
  Nombre: string
  Apellido: string
  Email: string
  Genero: string
  Pais: string
  Clave: string
  ConfirmClave: string
  Telefono: string
  Fec_naci: string
}

export interface RegisterResponse {
  id?: string
  message?: string
  [key: string]: any
}

export async function register(
  Nombre: string,
  Apellido: string,
  Email: string,
  Clave: string,
  ConfirmClave: string,
  Telefono: string,
  Fec_naci: string,
  Id: number = 0,
  Identifi: string = '',
  Genero: string = '',
  Pais: string = ''
): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${API_URL}/Register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id,
        Identifi,
        Nombre,
        Apellido,
        Email,
        Genero,
        Pais,
        Clave,
        ConfirmClave,
        Telefono,
        Fec_naci,
      }),
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
        return JSON.parse(text)
      } catch {
        // Si no es JSON válido, devolver el texto como mensaje
        return { message: text }
      }
    }
    
    // Si no es JSON, devolver el texto
    return { message: text }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Error desconocido al realizar la petición')
  }
}

export interface ForgotPasswordResponse {
  message?: string
  success?: boolean
  [key: string]: any
}

export async function forgotPassword(email: string): Promise<ForgotPasswordResponse> {
  try {
    const response = await fetch(`${API_URL}/RecoveryPass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "To": email })
    });
    const contentType = response.headers.get('content-type');
    const text = await response.text();

    if (!response.ok) {
      let errorMessage = `Error: ${response.status} ${response.statusText}`;
      if (contentType && contentType.includes('application/json')) {
        try {
          const data = JSON.parse(text);
          if (data.message) {
            errorMessage = data.message;
          } else if (typeof data === 'string') {
            errorMessage = data;
          }
        } catch {
          errorMessage = text || errorMessage;
        }
      } else {
        errorMessage = text || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Si la respuesta es exitosa, intentar parsear como JSON
    if (contentType && contentType.includes('application/json')) {
      try {
        return JSON.parse(text);
      } catch {
        return { message: text, success: true };
      }
    }

    // Si no es JSON, devolver el texto
    return { message: text, success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error desconocido al realizar la petición');
  }
}

export const authApi = {
  login,
  register,
  forgotPassword
}

export default authApi