import { apiClient } from './client'
import type { Raffle } from '../types'
import type { TicketResponse } from './types'

export interface RaffleResponse extends Raffle {}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.RUTA_API || 'https://chainoflucky/Sorteo/api'

class RafflesApi {
  async getRafflesActive(): Promise<RaffleResponse[]> {
    return apiClient.get<RaffleResponse[]>('/RaffleActive')
  }

  async getRafflesDeactive(): Promise<RaffleResponse[]> {
    return apiClient.get<RaffleResponse[]>('/RaffleDeactive')
  }


  private async fileToBase64(file: File): Promise<string> {
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

  async buyTickets(
    raffleId: string,
    userId: number,
    pricePerTicket: number,
    modePay: string,
    ticketQuantity: number,
    imageFile: File,
    note: string,
    imagenSorteo: string
  ): Promise<TicketResponse[]> {

    const imageBase64 = await this.fileToBase64(imageFile)
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const requestBody = {
      "RaffleId": raffleId,
      "UserId": userId,
      "PricevoTicket": pricePerTicket,
      "ModePay": modePay,
      "TicketQuantity": ticketQuantity,
      "Image": imageBase64,
      "Note": note,
      "ImagenSorteo": imagenSorteo
    };
    
    const maxRetries = 2; // 2 intentos adicionales (3 intentos en total)
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const raw = JSON.stringify(requestBody);
        
        const requestOptions: RequestInit = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow" as RequestRedirect
        };
        
        const response = await fetch(`${API_BASE_URL}/Buytickets`, requestOptions);
        
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Error al comprar boletos: ${errorText}`)
        }
        
        const result = await response.text();
        console.log(`Intento ${attempt + 1}:`, result);
        
        // Verificar si la respuesta contiene el mensaje de error de ticket duplicado
        if (result.includes("Código de ticket duplicado") || result.includes("codigo de ticket duplicado")) {
          // Si no es el último intento, esperar 1 segundo y reintentar
          if (attempt < maxRetries) {
            console.log(`Código de ticket duplicado detectado. Esperando 1 segundo antes del intento ${attempt + 2}...`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
            continue; // Reintentar
          } else {
            // Si es el último intento, lanzar el error
            throw new Error("Código de ticket duplicado. Se agotaron los intentos.")
          }
        }
        
        // Si llegamos aquí, la respuesta fue exitosa
        try {
          return JSON.parse(result) as TicketResponse[];
        } catch (parseError) {
          // Si la respuesta no es JSON válido, lanzar error
          throw new Error(`Respuesta inválida del servidor: ${result}`)
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // Si no es un error de ticket duplicado o es el último intento, lanzar el error inmediatamente
        if (!lastError.message.includes("Código de ticket duplicado") && !lastError.message.includes("codigo de ticket duplicado")) {
          throw lastError;
        }
        
        // Si es el último intento y sigue siendo error de ticket duplicado, lanzar el error
        if (attempt === maxRetries) {
          throw lastError;
        }
        
        // Si es error de ticket duplicado y no es el último intento, esperar y continuar
        console.log(`Código de ticket duplicado detectado. Esperando 1 segundo antes del intento ${attempt + 2}...`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
      }
    }
    
    // Si llegamos aquí, todos los intentos fallaron
    throw lastError || new Error("Error desconocido al comprar boletos");
  }

  async getTickets(userId: number): Promise<TicketResponse[]> {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow" as RequestRedirect
    };

    const response = await fetch(`${API_BASE_URL}/Buytickets/User/${userId}`, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al obtener tickets: ${errorText}`);
    }

    const result = await response.text();
    console.log(result);

    try {
      const rawTickets = JSON.parse(result) as any[];
      console.log("Raw tickets from API:", rawTickets);

      const tickets: TicketResponse[] = rawTickets.map((t) => {
        // Intentar diferentes posibles nombres del campo de imagen
        const imagenSorteo = t.imagenSorteo || t.ImagenSorteo || t.imagen || t.image || t.Imagen || '';
        console.log("Ticket mapped:", { ...t, imagenSorteo });
        
        return {
          tituloSorteo: t.tituloSorteo,
          codigoTicket: t.codigoTicket,
          fechaCompra: t.fechaCompra,
          fechaFinalizacion: t.fechaFinalizacion,
          sorteoActivo: t.sorteoActivo,
          estadoPago: t.estadoPago,
          idSorteo: t.idSorteo,
          idUsuario: t.idUsuario,
          imagenSorteo: imagenSorteo,
        };
      });

      return tickets;
    } catch (error) {
      throw new Error(`Respuesta inválida del servidor: ${result}`);
    }
  }

  async getTicketsByCodigo(codigo: number): Promise<TicketResponse[]> {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow" as RequestRedirect
    };

    const response = await fetch(`${API_BASE_URL}/Buytickets/Ticks/${codigo}`, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al obtener tickets: ${errorText}`);
    }

    const result = await response.text();
    console.log(result);

    try {
      const rawTickets = JSON.parse(result) as any[];
      console.log("Raw tickets from API:", rawTickets);

      const tickets: TicketResponse[] = rawTickets.map((t) => {
        // Intentar diferentes posibles nombres del campo de imagen
        const imagenSorteo = t.imagenSorteo || t.ImagenSorteo || t.imagen || t.image || t.Imagen || '';
        
        // Intentar diferentes posibles nombres para los campos de usuario
        const nombre = t.nombre || t.Nombre || t.name || t.Name || '';
        const apellidos = t.apellidos || t.Apellidos || t.apellido || t.Apellido || t.lastName || t.LastName || '';
        const telefono = t.telefono || t.Telefono || t.telephone || t.phone || t.Phone || '';
        const correo = t.correo || t.Correo || t.email || t.Email || t.correoElectronico || t.CorreoElectronico || '';
        const identidad = t.identidad || t.Identidad || t.cedula || t.Cedula || t.dni || t.DNI || t.documento || t.Documento || '';
        const nota = t.nota || t.Nota || t.note || t.Note || '';
        console.log("Ticket raw data:", t);
        console.log("Ticket mapped - usuario info:", { nombre, apellidos, telefono, correo, identidad });
        
        return {
          tituloSorteo: t.tituloSorteo,
          codigoTicket: t.codigoTicket,
          fechaCompra: t.fechaCompra,
          fechaFinalizacion: t.fechaFinalizacion,
          sorteoActivo: t.sorteoActivo,
          estadoPago: t.estadoPago,
          idSorteo: t.idSorteo,
          idUsuario: t.idUsuario,
          imagenSorteo: imagenSorteo,
          nombre: nombre || undefined,
          apellidos: apellidos || undefined,
          telefono: telefono || undefined,
          correo: correo || undefined,
          identidad: identidad || undefined,
          nota: nota || undefined,
        };
      });

      return tickets;
    } catch (error) {
      throw new Error(`Respuesta inválida del servidor: ${result}`);
    }
  }

  async gethistorial_tickets(tokken: string): Promise<string> {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow" as RequestRedirect
    };
    
    const response = await fetch(`${API_BASE_URL}/MangerPayments/${tokken}`, requestOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al obtener historial de pagos: ${errorText}`);
    }
    
    const result = await response.text();
    return result;
  }
}

export const rafflesApi = new RafflesApi();
export default rafflesApi