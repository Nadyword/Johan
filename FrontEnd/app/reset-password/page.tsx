"use client"

import { Eye, EyeOff, Sparkles, Lock, AlertCircle } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { CloverIconImage } from "@/components/clover-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { authApi } from "@/lib/api/auth"
import Link from "next/link"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isValidToken, setIsValidToken] = useState(false)

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  })

  // Validar que el token esté presente
  useEffect(() => {
    if (!token) {
      setError("Token de recuperación no válido o faltante. Por favor, solicita un nuevo enlace de recuperación.")
      setIsValidToken(false)
    } else {
      setIsValidToken(true)
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    if (!token) {
      setError("Token de recuperación no válido")
      return
    }

    if (!formData.newPassword) {
      setError("Por favor ingresa tu nueva contraseña")
      return
    }

    if (!formData.confirmPassword) {
      setError("Por favor confirma tu nueva contraseña")
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (formData.newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setIsLoading(true)

    try {
      const response = await authApi.resetPassword(
        token,
        formData.newPassword,
        formData.confirmPassword
      )

      setSuccessMessage(
        response.message || "Tu contraseña ha sido restablecida exitosamente"
      )

      // Limpiar el formulario
      setFormData({
        newPassword: "",
        confirmPassword: "",
      })

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Ocurrió un error al restablecer la contraseña. Por favor intenta de nuevo."
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Si no hay token, mostrar mensaje de error
  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] px-4">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-2 border-red-500/30 rounded-lg p-8 shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-red-500/10 rounded-full p-4">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-white">Token Inválido</h1>
              <p className="text-white/70">{error}</p>
              <Button
                asChild
                className="mt-4 bg-gradient-to-r from-[#F4A622] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#F4A622] text-black font-bold"
              >
                <Link href="/">Volver al Inicio</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#6A8E23] rounded-lg p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <CloverIconImage
              src="/CHAIN OF LUCKY_CURVAS-02.png"
              height={100}
              width={150}
              className="text-[#6A8E23]"
            />
          </div>

          {/* Título */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-[#6A8E23]/20 rounded-full p-3">
                <Lock className="w-8 h-8 text-[#6A8E23]" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Restablecer Contraseña
            </h1>
            <p className="text-white/70 text-sm">
              Ingresa tu nueva contraseña para continuar
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-white">
                Nueva Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  required
                  className="bg-[#121212] border-[#6A8E23]/30 text-white focus:border-[#F4A622] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-white">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  className="bg-[#121212] border-[#6A8E23]/30 text-white focus:border-[#F4A622] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-md p-3 text-sm text-green-400">
                {successMessage}
                <p className="mt-2 text-xs text-green-300/80">
                  Serás redirigido al inicio en unos segundos...
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#F4A622] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#F4A622] text-black font-bold shadow-lg hover:shadow-[#F4A622]/50 transition-all duration-300"
              disabled={isLoading || !!successMessage}
            >
              {isLoading ? (
                "Procesando..."
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Restablecer Contraseña
                </>
              )}
            </Button>

            <div className="text-center">
              <Link
                href="/"
                className="text-sm text-[#F4A622] hover:text-[#ff8c00] transition-colors underline"
              >
                Volver al inicio
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

