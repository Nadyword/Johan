export interface Raffle {
  id: string
  title: string
  description: string
  image: string
  price: number
  stock: number
  totalTickets: number
  endsAt: string
  status: "active" | "ended"
  winner?: string
  discounts: {
    quantity: number
    percentage: number
  }[]
}

export interface Ticket {
  id: string
  raffleId: string
  number: string
  qr: string
  status: "pending" | "drawn" | "winner"
  purchasedAt: string
  raffleName: string
}

export interface Payment {
  id: string
  amount: number
  method: string
  status: "approved" | "failed" | "refunded"
  reference: string
  createdAt: string
  tickets: number
}
