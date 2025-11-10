"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authApi } from "@/lib/api"

interface User {
  id: string
  name: string
  email: string
  token?: string
}

interface AuthContextType {
  user: User | null
  login: (Email: string, Password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Llamar al endpoint de la API
    const response = await authApi.login(email, password)
    
    // Procesar la respuesta de la API
    // El login retorna un LoginResponse con id y name
    const user = {
      id: response.id,
      name: response.name,
      email: email,
      token: response.id, // Usar el ID como token temporalmente
    }
    
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const register = async (name: string, email: string, password: string) => {
    // Mock register - replace with actual API call
    const mockUser = {
      id: "1",
      name,
      email,
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
