import type { Raffle, Ticket, Payment } from "./types"

export const mockRaffles: Raffle[] = [
  {
    id: "r1",
    title: "Premiación de Chain of Lucky",
    description:
      "Primer lugar: 100.000$\n Segundo lugar: 50.000$\n Tercer lugar: 25.000$\n Cuarto lugar: 10.000$\n Quinto lugar: 5.000$\n y premios especial al usuario que haya comprado más tickets de 1.000$",
    image: "/sorteo-1.jpg",
    price: 2,
    ticketPrice: 2,
    stock: 3247,
    totalTickets: 5000,
    soldTickets: 1753,
    endsAt: "2025-12-31T23:59:59Z",
    status: "active",
    discounts: [],
  }
]

export const mockActiveRaffle: Raffle = mockRaffles[0]

export const mockPreviousRaffles: null = null;
/*
export const mockPreviousRaffles: Raffle[] = [
  {
    id: "r4",
    title: "Apple Watch Ultra 2",
    description: "Apple Watch Ultra 2 con correa Alpine",
    image: "/apple-watch-ultra-on-wrist.jpg",
    price: 1800,
    ticketPrice: 6,
    stock: 0,
    totalTickets: 2500,
    soldTickets: 2500,
    endsAt: "2025-08-10T23:59:59Z",
    status: "ended",
    winner: "Carlos R. – Concepción, CL",
    discounts: [],
  }
]
*/

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
