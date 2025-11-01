"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CloverIcon, CloverIconImage } from "@/components/clover-icon"
import { Eye, EyeOff, Sparkles, XIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("login")

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const { login, register } = useAuth()
  const router = useRouter()

  // Resetear el checkbox cuando se cambia de tab o se cierra el modal
  useEffect(() => {
    if (activeTab === "login" || !open) {
      setAcceptedTerms(false)
    }
  }, [activeTab, open])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(loginData.email, loginData.password)
      onOpenChange(false)
      router.push("/comprar")
    } catch (err) {
      setError("Ocurrió un error. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!registerData.name) {
        setError("Por favor ingresa tu nombre")
        setIsLoading(false)
        return
      }
      if (!acceptedTerms) {
        setError("Debes aceptar los términos y condiciones para registrarte")
        setIsLoading(false)
        return
      }
      await register(registerData.name, registerData.email, registerData.password)
      onOpenChange(false)
      router.push("/comprar")
    } catch (err) {
      setError("Ocurrió un error. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent 
          className="sm:max-w-md bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#6A8E23]"
          showCloseButton={false}
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-50 bg-[#F4A622] hover:bg-[#ff8c00] text-black rounded-md p-2 transition-colors shadow-lg hover:shadow-[#F4A622]/50"
            aria-label="Cerrar"
          >
            <XIcon className="w-6 h-6" />
          </button>
          <DialogHeader>
            <DialogTitle className="sr-only">Chain of Lucky - Autenticación</DialogTitle>
            <div className="flex items-center justify-center">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-02.png" height={175} width={275} className="text-[#6A8E23]" />
            </div>
            <DialogDescription className="text-center text-white/70">
              Tu oportunidad está a un clic de distancia
            </DialogDescription>
          </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#121212]">
            <TabsTrigger
              value="login"
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6A8E23] data-[state=active]:to-[#4F6D1F] data-[state=active]:text-white"
            >
              Ingresar
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6A8E23] data-[state=active]:to-[#4F6D1F] data-[state=active]:text-white"
            >
              Registrarse
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-white">
                  Correo Electrónico
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  className="bg-[#121212] border-[#6A8E23]/30 text-white focus:border-[#F4A622]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-white">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    className="bg-[#121212] border-[#6A8E23]/30 text-white focus:border-[#F4A622] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#F4A622] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#F4A622] text-black font-bold shadow-lg hover:shadow-[#F4A622]/50 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Cargando..."
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Ingresar
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name" className="text-white">
                  Nombre Completo
                </Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Juan Pérez"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                  className="bg-[#121212] border-[#6A8E23]/30 text-white focus:border-[#F4A622]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-white">
                  Correo Electrónico
                </Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                  className="bg-[#121212] border-[#6A8E23]/30 text-white focus:border-[#F4A622]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-white">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                    className="bg-[#121212] border-[#6A8E23]/30 text-white focus:border-[#F4A622] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                  className="mt-1 data-[state=checked]:bg-[#F4A622] data-[state=checked]:border-[#F4A622] data-[state=checked]:text-black"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-white/80 leading-tight cursor-pointer"
                >
                  Acepto los{" "}
                  <Link
                    href="/terminos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F4A622] hover:text-[#ff8c00] underline transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    términos y condiciones
                  </Link>
                </Label>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#F4A622] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#F4A622] text-black font-bold shadow-lg hover:shadow-[#F4A622]/50 transition-all duration-300"
                disabled={isLoading || !acceptedTerms}
              >
                {isLoading ? (
                  "Cargando..."
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Crear Cuenta
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
