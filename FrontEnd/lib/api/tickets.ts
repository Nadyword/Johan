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
    console.log(result);

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
    console.log(result);

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
    console.log(result);
    
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
