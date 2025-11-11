import type { Raffle, Ticket, Payment } from "./types"
import { rafflesApi } from "./api/raffles"

// Inicializar como arrays vacíos para evitar problemas de hidratación
// Los datos se cargarán en el cliente usando las funciones async
export const mockRafflesActive: Raffle[] = []
export const mockActiveRaffle: Raffle | undefined = undefined
export const mockPreviousRaffles: Raffle[] = []

// Función para cargar las rifas activas (usar en el cliente)
export async function loadMockRafflesActive(): Promise<Raffle[]> {
  return await rafflesApi.getRafflesActive()
}

// Función para cargar las rifas desactivadas (usar en el cliente)
export async function loadMockRafflesDeactive(): Promise<Raffle[]> {
  return await rafflesApi.getRafflesDeactive()
}




export const mockTickets: Ticket[] = [
  {
    id: "t_001",
    raffleId: "r1",
    number: "045678",
    qr: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23fff" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23000" font-size="14"%3EQR Code%3C/text%3E%3C/svg%3E',
    status: "pending",
    purchasedAt: "2025-10-25T14:30:00Z",
    raffleName: "iPhone 15 Pro Max 256GB",
  },
  {
    id: "t_002",
    raffleId: "r1",
    number: "045679",
    qr: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23fff" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23000" font-size="14"%3EQR Code%3C/text%3E%3C/svg%3E',
    status: "pending",
    purchasedAt: "2025-10-25T14:30:00Z",
    raffleName: "iPhone 15 Pro Max 256GB",
  },
]

export const mockPayments: Payment[] = [
  {
    id: "pay_abc123",
    amount: 25000,
    method: "Tarjeta de Crédito",
    status: "approved",
    reference: "REF-2025-001",
    createdAt: "2025-10-25T14:30:00Z",
    tickets: 10,
  },
  {
    id: "pay_def456",
    amount: 5000,
    method: "Transferencia",
    status: "approved",
    reference: "REF-2025-002",
    createdAt: "2025-10-20T10:15:00Z",
    tickets: 2,
  },
]
