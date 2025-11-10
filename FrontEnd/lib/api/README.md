# Estructura de APIs

Esta carpeta contiene toda la estructura organizada para realizar llamadas a la API del backend.

## Estructura de Archivos

```
lib/api/
├── client.ts      # Cliente HTTP base con manejo de autenticación y errores
├── auth.ts        # API de autenticación (login, registro, logout)
├── raffles.ts     # API de rifas/sorteos
├── tickets.ts     # API de tickets
├── payments.ts    # API de pagos
├── contact.ts     # API de contacto
├── types.ts       # Tipos e interfaces compartidas
├── index.ts       # Exportación centralizada
└── README.md      # Esta documentación
```

## Uso Básico

### Importación Centralizada

```typescript
import { authApi, rafflesApi, ticketsApi, paymentsApi, contactApi } from '@/lib/api'
```

### Importación por Módulo

```typescript
import { authApi } from '@/lib/api/auth'
import { rafflesApi } from '@/lib/api/raffles'
```

## Ejemplos de Uso

### Autenticación

```typescript
import { authApi } from '@/lib/api'

// Login
try {
  const userId = await authApi.login('usuario@example.com', 'password123')
  console.log('Usuario autenticado:', userId)
} catch (error) {
  console.error('Error al iniciar sesión:', error.message)
}

// Registro
try {
  const response = await authApi.register(
    'Juan',
    'Pérez',
    'juan@example.com',
    'password123',
    'password123',
    '+56912345678',
    '1990-01-01'
  )
  console.log('Usuario registrado:', response)
} catch (error) {
  console.error('Error al registrar:', error.message)
}

// Logout
await authApi.logout()
```

### Rifas

```typescript
import { rafflesApi } from '@/lib/api'

// Obtener rifas activas
const activeRaffles = await rafflesApi.getActiveRaffles()

// Obtener rifa por ID
const raffle = await rafflesApi.getRaffleById('r1')

// Obtener rifa activa actual
const currentRaffle = await rafflesApi.getCurrentActiveRaffle()

// Crear nueva rifa (requiere autenticación)
const newRaffle = await rafflesApi.createRaffle({
  title: 'iPhone 15 Pro',
  description: 'Último modelo de iPhone',
  image: '/iphone.jpg',
  price: 2500,
  ticketPrice: 5,
  totalTickets: 5000,
  endsAt: '2025-12-31T23:59:59Z',
  discounts: [
    { quantity: 5, percentage: 5 },
    { quantity: 10, percentage: 10 }
  ]
})
```

### Tickets

```typescript
import { ticketsApi } from '@/lib/api'

// Obtener tickets del usuario
const userTickets = await ticketsApi.getUserTickets()

// Obtener tickets con filtros
const filteredTickets = await ticketsApi.getUserTickets({
  raffleId: 'r1',
  status: 'pending',
  page: 1,
  limit: 10
})

// Comprar tickets
const purchase = await ticketsApi.buyTickets({
  raffleId: 'r1',
  quantity: 10,
  paymentMethod: 'Tarjeta de Crédito'
})

// Obtener tickets disponibles
const available = await ticketsApi.getAvailableTicketsCount('r1')
```

### Pagos

```typescript
import { paymentsApi } from '@/lib/api'

// Obtener pagos del usuario
const payments = await paymentsApi.getUserPayments()

// Obtener pagos con filtros
const filteredPayments = await paymentsApi.getUserPayments({
  status: 'approved',
  method: 'Tarjeta de Crédito',
  startDate: '2025-01-01',
  endDate: '2025-12-31'
})

// Crear pago
const payment = await paymentsApi.createPayment({
  amount: 50000,
  method: 'Tarjeta de Crédito',
  raffleId: 'r1',
  quantity: 10
})

// Verificar estado de pago
const status = await paymentsApi.checkPaymentStatus('pay_123')

// Obtener métodos de pago disponibles
const methods = await paymentsApi.getAvailablePaymentMethods()
```

### Contacto

```typescript
import { contactApi } from '@/lib/api'

// Enviar mensaje de contacto
const message = await contactApi.sendMessage({
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  asunto: 'Consulta sobre rifas',
  mensaje: '¿Cómo funcionan las rifas?'
})
```

## Manejo de Errores

Todas las APIs lanzan errores de tipo `ApiError` cuando algo falla:

```typescript
import { authApi, type ApiError } from '@/lib/api'

try {
  await authApi.login('email@example.com', 'password')
} catch (error) {
  if (error instanceof Error) {
    const apiError = error as ApiError
    console.error('Error:', apiError.message)
    console.error('Status:', apiError.status)
    if (apiError.errors) {
      console.error('Errores de validación:', apiError.errors)
    }
  }
}
```

## Configuración

La URL base de la API se configura mediante variables de entorno:

- `NEXT_PUBLIC_API_URL` (prioridad)
- `RUTA_API` (fallback)
- `http://localhost:1607/Sorteo/api` (default)

Configura la variable en tu archivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:1607/Sorteo/api
```

## Autenticación

El cliente API automáticamente incluye el token de autenticación en todas las peticiones si está disponible en `localStorage` bajo la clave `user` con la estructura:

```json
{
  "id": "user_id",
  "token": "auth_token"
}
```

El token se envía en el header `Authorization: Bearer {token}`.

## Tipos TypeScript

Todos los módulos exportan sus tipos e interfaces. Puedes importarlos así:

```typescript
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RaffleResponse,
  TicketResponse,
  PaymentResponse,
  ContactMessageRequest,
  ContactMessageResponse
} from '@/lib/api'
```

## Buenas Prácticas

1. **Usa la importación centralizada**: `import { authApi } from '@/lib/api'`
2. **Maneja errores**: Siempre envuelve las llamadas en try-catch
3. **Tipado fuerte**: Usa los tipos exportados para mejor autocompletado
4. **Una instancia**: No crees nuevas instancias, usa las exportadas
5. **Validación**: Valida los datos antes de enviarlos a la API

