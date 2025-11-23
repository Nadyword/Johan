const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.RUTA_API || 'https://chainoflucky/Sorteo/api'

export async function AprobarTicket(IdCompra: string, Motivo: string, tokken: string): Promise<{ message: string }> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "IdCompra": IdCompra,
    "Motivo": Motivo,
    "Tokken": tokken
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(`${API_URL}/Tickets/Aprobado`, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al aprobar ticket: ${errorText}`);
    }

    const result = await response.text();

    try {
      return JSON.parse(result) as { message: string };
    } catch (parseError) {
      return { message: result };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function CamceladoTicket(IdCompra: string, Motivo: string, tokken: string): Promise<{ message: string }> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "IdCompra": IdCompra,
    "Motivo": Motivo,
    "Tokken": tokken
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(`${API_URL}/Tickets/Rechazado`, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al cancelar ticket: ${errorText}`);
    }

    const result = await response.text();

    try {
      return JSON.parse(result) as { message: string };
    } catch (parseError) {
      return { message: result };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function MetricasTicket(): Promise<{
  pagado: number
  cancelado: number
  penditen: number
}> {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow" as RequestRedirect
  };
  
  try {
    const response = await fetch(`${API_URL}/Tickets/Metricas`, requestOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al obtener métricas: ${errorText}`);
    }
    
    const result = await response.text();
    
    try {
      return JSON.parse(result) as {
        pagado: number
        cancelado: number
        penditen: number
      };
    } catch (parseError) {
      throw new Error(`Respuesta inválida del servidor: ${result}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Genera un ticket con los parámetros dados.
 * @param params { 
 *    RaffleId: string,
 *    UserId: string | number,
 *    PricevoTicket: number,
 *    TicketQuantity: number,
 *    Image?: string,
 *    Note?: string,
 *    ImagenSorteo?: string,
 *    tokken: string | number
 * }
 */
export async function GenerarTicket({
  RaffleId,
  UserId,
  PricevoTicket,
  TicketQuantity,
  Note,
  Image,
  ImagenSorteo,
  tokken
}: {
  RaffleId: string,
  UserId: string | number,
  PricevoTicket: number,
  TicketQuantity: number,
  Image?: string,
  Note?: string,
  ImagenSorteo?: string,
  tokken: string | number
}) {
  // Valores por defecto para Note, Image y ModePay
  const defaultModePay = "Generado";

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestBody = {
    RaffleId,
    UserId,
    PricevoTicket,
    ModePay: defaultModePay,      // Siempre "Generado"
    TicketQuantity,
    Image: Image || "Sin foto",
    Note: Note || "nada",
    ImagenSorteo: ImagenSorteo || "sin foto"
  };

  const raw = JSON.stringify(requestBody);

  // Imprimir el body que se envía
  console.log("📤 Body enviado al API:", JSON.stringify(requestBody, null, 2));

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch(`${API_URL}/Sorteo/api/Buytickets/${tokken}`, requestOptions);
    const result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
