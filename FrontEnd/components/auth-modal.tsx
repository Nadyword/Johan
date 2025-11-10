"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { authApi, RegisterRequest } from "@/lib/api/auth"
import { Eye, EyeOff, Sparkles, XIcon } from "lucide-react"
import { CloverIconImage } from "@/components/clover-icon"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import type React from "react"
import Link from "next/link"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("login")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
  })

  const [registerData, setRegisterData] = useState<RegisterRequest>({
    Id: 0,
    Identifi: "",
    Nombre: "",
    Apellido: "",
    Email: "",
    Genero: "",
    Pais: "",
    Clave: "",
    ConfirmClave: "",
    Telefono: "",
    Fec_naci: "",
  })

  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const { login: loginContext } = useAuth()
  const router = useRouter()

  // Resetear el checkbox cuando se cambia de tab o se cierra el modal
  useEffect(() => {
    if (activeTab === "login" || !open) {
      setAcceptedTerms(false)
    }
    if (!open) {
      setShowForgotPassword(false)
      setForgotPasswordEmail("")
      setSuccessMessage("")
      setError("")
    }
  }, [activeTab, open])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {

      const response = await authApi.login(loginData.Email, loginData.Password)

      if (!response) {
        setError("Servicio no disponible por el momento. Por favor intenta más tarde.")
        setIsLoading(false)
        return
      }

      if (response.name === "Usuario no encontrado") {
        setError("Usuario no encontrado. Por favor verifica tus credenciales.")
        return
      } else if (response.name === "Contraseña incorrecta") {
        setError("Contraseña incorrecta. Por favor verifica tus credenciales.")
        return
      }

      setIsLoading(false)

      const userId = response.id;

      const userData = {
        id: userId,
        email: loginData.Email,
      }

      localStorage.setItem("user", JSON.stringify(userData))

      await loginContext(loginData.Email, loginData.Password)

      onOpenChange(false)
      router.push("/comprar")

    } catch (err) {

      const errorMessage = err instanceof Error ? err.message : "Ocurrió un error. Por favor intenta de nuevo."
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    setIsLoading(true)

    try {
      if (!registerData.Nombre) {
        setError("Por favor ingresa tu nombre")
        setIsLoading(false)
        return
      }

      if (!registerData.Email) {
        setError("Por favor ingresa tu correo electrónico")
        setIsLoading(false)
        return
      }

      if (!registerData.Clave) {
        setError("Por favor ingresa tu contraseña")
        setIsLoading(false)
        return
      }

      if (!registerData.ConfirmClave) {
        setError("Por favor ingresa tu contraseña de confirmación")
        setIsLoading(false)
        return
      }

      if (registerData.Clave !== registerData.ConfirmClave) {
        setError("Las contraseñas no coinciden")
        setIsLoading(false)
        return
      }

      if (!acceptedTerms) {
        setError("Debes aceptar los términos y condiciones para registrarte")
        setIsLoading(false)
        return
      }

      // Validar campos adicionales requeridos
      if (!registerData.Identifi) {
        setError("Por favor ingresa tu cédula de identidad")
        setIsLoading(false)
        return
      }

      if (!registerData.Genero || registerData.Genero === "S") {
        setError("Por favor selecciona tu género")
        setIsLoading(false)
        return
      }

      if (!registerData.Telefono) {
        setError("Por favor ingresa tu número de teléfono")
        setIsLoading(false)
        return
      }

      if (!registerData.Fec_naci) {
        setError("Por favor ingresa tu fecha de nacimiento")
        setIsLoading(false)
        return
      }

      const birthDate = new Date(registerData.Fec_naci)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      if (isNaN(age) || age < 18) {
        setError("Debes ser mayor de 18 años para registrarte")
        setIsLoading(false)
        return
      }

      if (!registerData.Pais || registerData.Pais === "S") {
        setError("Por favor selecciona tu país")
        setIsLoading(false)
        return
      }

      const response = await authApi.register(
        registerData.Nombre,
        registerData.Apellido,
        registerData.Email,
        registerData.Clave,
        registerData.ConfirmClave,
        registerData.Telefono,
        registerData.Fec_naci,
        0,
        registerData.Identifi,
        registerData.Genero,
        registerData.Pais
      )

      if (response.id === "Correo o documento ya existe") {
        setError("Correo o documento ya existe")
        setIsLoading(false)
        return
      }

      // Borra todos los cambios y muestra mensaje de registro exitoso, luego cambia a la pestaña de iniciar sesión
      setRegisterData({
        Id: 0,
        Nombre: "",
        Apellido: "",
        Email: "",
        Clave: "",
        ConfirmClave: "",
        Telefono: "",
        Fec_naci: "",
        Identifi: "",
        Genero: "",
        Pais: "S"
      })
      setError("")
      alert("Registro exitoso")
      setActiveTab("login")
    } catch (err) {
      setError("Ocurrió un error. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    setIsLoading(true)

    try {
      if (!forgotPasswordEmail) {
        setError("Por favor ingresa tu correo electrónico")
        setIsLoading(false)
        return
      }

      const response = await authApi.forgotPassword(forgotPasswordEmail)

      setSuccessMessage(
        response.message ||
        "Se ha enviado un enlace de recuperación a tu correo electrónico. Por favor revisa tu bandeja de entrada."
      )
      setForgotPasswordEmail("")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ocurrió un error. Por favor intenta de nuevo."
      setError(errorMessage)
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
            <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-02.png" height={100} width={150} className="text-[#6A8E23]" />
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
            {!showForgotPassword ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-white">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={loginData.Email}
                    onChange={(e) => setLoginData({ ...loginData, Email: e.target.value })}
                    required
                    className="bg-[#121212] border-[#6A8E23]/30 text-white focus:border-[#F4A622]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password" className="text-white">
                      Contraseña
                    </Label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(true)
                        setError("")
                        setSuccessMessage("")
                      }}
                      className="text-sm text-[#F4A622] hover:text-[#ff8c00] transition-colors underline"
                    >
                      Olvidé mi contraseña
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginData.Password}
                      onChange={(e) => setLoginData({ ...loginData, Password: e.target.value })}
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
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email" className="text-white">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    required
                    className="bg-[#121212] border-[#6A8E23]/30 text-white focus:border-[#F4A622]"
                  />
                  <p className="text-sm text-white/60">
                    Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu contraseña.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-md p-3 text-sm text-green-400">
                    {successMessage}
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false)
                      setError("")
                      setSuccessMessage("")
                      setForgotPasswordEmail("")
                    }}
                    variant="outline"
                    className="flex-1 border-[#6A8E23]/30 text-black hover:bg-[#6A8E23]/20"
                  >
                    Volver
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#F4A622] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#F4A622] text-black font-bold shadow-lg hover:shadow-[#F4A622]/50 transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Enviar
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Columna 1 */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-nombre" className="text-white">
                      Nombres
                    </Label>
                    <Input
                      id="register-nombre"
                      type="text"
                      placeholder="Juan"
                      value={registerData.Nombre}
                      onChange={(e) => setRegisterData({ ...registerData, Nombre: e.target.value })}
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
                      value={registerData.Email}
                      onChange={(e) => setRegisterData({ ...registerData, Email: e.target.value })}
                      required
                      className="bg-[#121212] border-[#6A8E23]/30 text-white focus:border-[#F4A622]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-pais" className="text-white">
                      País
                    </Label>
                    <select
                      id="register-pais"
                      value={registerData.Pais}
                      onChange={(e) => setRegisterData({ ...registerData, Pais: e.target.value })}
                      required
                      className="w-full px-3 py-1.5 rounded-md bg-[#121212] border border-[#6A8E23]/30 text-white focus:border-[#F4A622] focus:outline-none"
                    >
                      <option value="S">Selecciona tu país</option>
                      <option value="AF">Afganistán</option>
                      <option value="AL">Albania</option>
                      <option value="DE">Alemania</option>
                      <option value="AD">Andorra</option>
                      <option value="AO">Angola</option>
                      <option value="AI">Anguilla</option>
                      <option value="AQ">Antártida</option>
                      <option value="AG">Antigua y Barbuda</option>
                      <option value="AN">Antillas Holandesas</option>
                      <option value="SA">Arabia Saudí</option>
                      <option value="DZ">Argelia</option>
                      <option value="AR">Argentina</option>
                      <option value="AM">Armenia</option>
                      <option value="AW">Aruba</option>
                      <option value="AU">Australia</option>
                      <option value="AT">Austria</option>
                      <option value="AZ">Azerbaiyán</option>
                      <option value="BS">Bahamas</option>
                      <option value="BH">Bahrein</option>
                      <option value="BD">Bangladesh</option>
                      <option value="BB">Barbados</option>
                      <option value="BE">Bélgica</option>
                      <option value="BZ">Belice</option>
                      <option value="BJ">Benin</option>
                      <option value="BM">Bermudas</option>
                      <option value="BY">Bielorrusia</option>
                      <option value="MM">Birmania</option>
                      <option value="BO">Bolivia</option>
                      <option value="BA">Bosnia y Herzegovina</option>
                      <option value="BW">Botswana</option>
                      <option value="BR">Brasil</option>
                      <option value="BN">Brunei</option>
                      <option value="BG">Bulgaria</option>
                      <option value="BF">Burkina Faso</option>
                      <option value="BI">Burundi</option>
                      <option value="BT">Bután</option>
                      <option value="CV">Cabo Verde</option>
                      <option value="KH">Camboya</option>
                      <option value="CM">Camerún</option>
                      <option value="CA">Canadá</option>
                      <option value="TD">Chad</option>
                      <option value="CL">Chile</option>
                      <option value="CN">China</option>
                      <option value="CY">Chipre</option>
                      <option value="VA">Ciudad del Vaticano (Santa Sede)</option>
                      <option value="CO">Colombia</option>
                      <option value="KM">Comores</option>
                      <option value="CG">Congo</option>
                      <option value="CD">Congo, República Democrática del</option>
                      <option value="KR">Corea</option>
                      <option value="KP">Corea del Norte</option>
                      <option value="CI">Costa de Marfíl</option>
                      <option value="CR">Costa Rica</option>
                      <option value="HR">Croacia (Hrvatska)</option>
                      <option value="CU">Cuba</option>
                      <option value="DK">Dinamarca</option>
                      <option value="DJ">Djibouti</option>
                      <option value="DM">Dominica</option>
                      <option value="EC">Ecuador</option>
                      <option value="EG">Egipto</option>
                      <option value="SV">El Salvador</option>
                      <option value="AE">Emiratos Árabes Unidos</option>
                      <option value="ER">Eritrea</option>
                      <option value="SI">Eslovenia</option>
                      <option value="ES">España</option>
                      <option value="US">Estados Unidos</option>
                      <option value="EE">Estonia</option>
                      <option value="ET">Etiopía</option>
                      <option value="FJ">Fiji</option>
                      <option value="PH">Filipinas</option>
                      <option value="FI">Finlandia</option>
                      <option value="FR">Francia</option>
                      <option value="GA">Gabón</option>
                      <option value="GM">Gambia</option>
                      <option value="GE">Georgia</option>
                      <option value="GH">Ghana</option>
                      <option value="GI">Gibraltar</option>
                      <option value="GD">Granada</option>
                      <option value="GR">Grecia</option>
                      <option value="GL">Groenlandia</option>
                      <option value="GP">Guadalupe</option>
                      <option value="GU">Guam</option>
                      <option value="GT">Guatemala</option>
                      <option value="GY">Guayana</option>
                      <option value="GF">Guayana Francesa</option>
                      <option value="GN">Guinea</option>
                      <option value="GQ">Guinea Ecuatorial</option>
                      <option value="GW">Guinea-Bissau</option>
                      <option value="HT">Haití</option>
                      <option value="HN">Honduras</option>
                      <option value="HU">Hungría</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="IQ">Irak</option>
                      <option value="IR">Irán</option>
                      <option value="IE">Irlanda</option>
                      <option value="BV">Isla Bouvet</option>
                      <option value="CX">Isla de Christmas</option>
                      <option value="IS">Islandia</option>
                      <option value="KY">Islas Caimán</option>
                      <option value="CK">Islas Cook</option>
                      <option value="CC">Islas de Cocos o Keeling</option>
                      <option value="FO">Islas Faroe</option>
                      <option value="HM">Islas Heard y McDonald</option>
                      <option value="FK">Islas Malvinas</option>
                      <option value="MP">Islas Marianas del Norte</option>
                      <option value="MH">Islas Marshall</option>
                      <option value="UM">Islas menores de Estados Unidos</option>
                      <option value="PW">Islas Palau</option>
                      <option value="SB">Islas Salomón</option>
                      <option value="SJ">Islas Svalbard y Jan Mayen</option>
                      <option value="TK">Islas Tokelau</option>
                      <option value="TC">Islas Turks y Caicos</option>
                      <option value="VI">Islas Vírgenes (EEUU)</option>
                      <option value="VG">Islas Vírgenes (Reino Unido)</option>
                      <option value="WF">Islas Wallis y Futuna</option>
                      <option value="IL">Israel</option>
                      <option value="IT">Italia</option>
                      <option value="JM">Jamaica</option>
                      <option value="JP">Japón</option>
                      <option value="JO">Jordania</option>
                      <option value="KZ">Kazajistán</option>
                      <option value="KE">Kenia</option>
                      <option value="KG">Kirguizistán</option>
                      <option value="KI">Kiribati</option>
                      <option value="KW">Kuwait</option>
                      <option value="LA">Laos</option>
                      <option value="LS">Lesotho</option>
                      <option value="LV">Letonia</option>
                      <option value="LB">Líbano</option>
                      <option value="LR">Liberia</option>
                      <option value="LY">Libia</option>
                      <option value="LI">Liechtenstein</option>
                      <option value="LT">Lituania</option>
                      <option value="LU">Luxemburgo</option>
                      <option value="MK">Macedonia, Ex-República Yugoslava de</option>
                      <option value="MG">Madagascar</option>
                      <option value="MY">Malasia</option>
                      <option value="MW">Malawi</option>
                      <option value="MV">Maldivas</option>
                      <option value="ML">Malí</option>
                      <option value="MT">Malta</option>
                      <option value="MA">Marruecos</option>
                      <option value="MQ">Martinica</option>
                      <option value="MU">Mauricio</option>
                      <option value="MR">Mauritania</option>
                      <option value="YT">Mayotte</option>
                      <option value="MX">México</option>
                      <option value="FM">Micronesia</option>
                      <option value="MD">Moldavia</option>
                      <option value="MC">Mónaco</option>
                      <option value="MN">Mongolia</option>
                      <option value="MS">Montserrat</option>
                      <option value="MZ">Mozambique</option>
                      <option value="NA">Namibia</option>
                      <option value="NR">Nauru</option>
                      <option value="NP">Nepal</option>
                      <option value="NI">Nicaragua</option>
                      <option value="NE">Níger</option>
                      <option value="NG">Nigeria</option>
                      <option value="NU">Niue</option>
                      <option value="NF">Norfolk</option>
                      <option value="NO">Noruega</option>
                      <option value="NC">Nueva Caledonia</option>
                      <option value="NZ">Nueva Zelanda</option>
                      <option value="OM">Omán</option>
                      <option value="NL">Países Bajos</option>
                      <option value="PA">Panamá</option>
                      <option value="PG">Papúa Nueva Guinea</option>
                      <option value="PK">Paquistán</option>
                      <option value="PY">Paraguay</option>
                      <option value="PE">Perú</option>
                      <option value="PN">Pitcairn</option>
                      <option value="PF">Polinesia Francesa</option>
                      <option value="PL">Polonia</option>
                      <option value="PT">Portugal</option>
                      <option value="PR">Puerto Rico</option>
                      <option value="QA">Qatar</option>
                      <option value="UK">Reino Unido</option>
                      <option value="CF">República Centroafricana</option>
                      <option value="CZ">República Checa</option>
                      <option value="ZA">República de Sudáfrica</option>
                      <option value="DO">República Dominicana</option>
                      <option value="SK">República Eslovaca</option>
                      <option value="RE">Reunión</option>
                      <option value="RW">Ruanda</option>
                      <option value="RO">Rumania</option>
                      <option value="RU">Rusia</option>
                      <option value="EH">Sahara Occidental</option>
                      <option value="KN">Saint Kitts y Nevis</option>
                      <option value="WS">Samoa</option>
                      <option value="AS">Samoa Americana</option>
                      <option value="SM">San Marino</option>
                      <option value="VC">San Vicente y Granadinas</option>
                      <option value="SH">Santa Helena</option>
                      <option value="LC">Santa Lucía</option>
                      <option value="ST">Santo Tomé y Príncipe</option>
                      <option value="SN">Senegal</option>
                      <option value="SC">Seychelles</option>
                      <option value="SL">Sierra Leona</option>
                      <option value="SG">Singapur</option>
                      <option value="SY">Siria</option>
                      <option value="SO">Somalia</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="PM">St Pierre y Miquelon</option>
                      <option value="SZ">Suazilandia</option>
                      <option value="SD">Sudán</option>
                      <option value="SE">Suecia</option>
                      <option value="CH">Suiza</option>
                      <option value="SR">Surinam</option>
                      <option value="TH">Tailandia</option>
                      <option value="TW">Taiwán</option>
                      <option value="TZ">Tanzania</option>
                      <option value="TJ">Tayikistán</option>
                      <option value="TF">Territorios franceses del Sur</option>
                      <option value="TP">Timor Oriental</option>
                      <option value="TG">Togo</option>
                      <option value="TO">Tonga</option>
                      <option value="TT">Trinidad y Tobago</option>
                      <option value="TN">Túnez</option>
                      <option value="TM">Turkmenistán</option>
                      <option value="TR">Turquía</option>
                      <option value="TV">Tuvalu</option>
                      <option value="UA">Ucrania</option>
                      <option value="UG">Uganda</option>
                      <option value="UY">Uruguay</option>
                      <option value="UZ">Uzbekistán</option>
                      <option value="VU">Vanuatu</option>
                      <option value="VE">Venezuela</option>
                      <option value="VN">Vietnam</option>
                      <option value="YE">Yemen</option>
                      <option value="YU">Yugoslavia</option>
                      <option value="ZM">Zambia</option>
                      <option value="ZW">Zimbabue</option>
                    </select>
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
                        value={registerData.Clave}
                        onChange={(e) => setRegisterData({ ...registerData, Clave: e.target.value })}
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

                  <div className="space-y-2">
                    <Label htmlFor="register-nacimiento" className="text-white">
                      Fecha de Nacimiento
                    </Label>
                    <Input
                      id="register-nacimiento"
                      type="date"
                      placeholder="DD/MM/YYYY"
                      value={registerData.Fec_naci}
                      onChange={(e) => setRegisterData({ ...registerData, Fec_naci: e.target.value })}
                      required
                      className="bg-[#121212] border-[#6A8E23]/30 text-white focus:border-[#F4A622]"
                    />
                  </div>
                </div>

                {/* Columna 2 */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-apellido" className="text-white">
                      Apellidos
                    </Label>
                    <Input
                      id="register-apellido"
                      type="text"
                      placeholder="Pérez"
                      value={registerData.Apellido}
                      onChange={(e) => setRegisterData({ ...registerData, Apellido: e.target.value })}
                      required
                      className="bg-[#121212] border-[#6A8E23]/30 text-white focus:border-[#F4A622]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-genero" className="text-white">
                      Género
                    </Label>
                    <select
                      id="register-genero"
                      value={registerData.Genero}
                      onChange={(e) => setRegisterData({ ...registerData, Genero: e.target.value })}
                      required
                      className="w-full px-3 py-1.5 rounded-md bg-[#121212] border border-[#6A8E23]/30 text-white focus:border-[#F4A622] focus:outline-none"
                    >
                      <option value="S">Selecciona tu género</option>
                      <option value="H">Hombre</option>
                      <option value="M">Mujer</option>
                      <option value="O">Otro</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-cedula" className="text-white">
                      Cédula de Identidad
                    </Label>
                    <Input
                      id="register-cedula"
                      type="text"
                      placeholder="V1234567890"
                      value={registerData.Identifi}
                      onChange={(e) => setRegisterData({ ...registerData, Identifi: e.target.value })}
                      required
                      className="bg-[#121212] border-[#6A8E23]/30 text-white focus:border-[#F4A622]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password-confirmation" className="text-white">
                      Contraseña Confirmación
                    </Label>
                    <div className="relative">
                      <Input
                        id="register-password-confirmation"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={registerData.ConfirmClave}
                        onChange={(e) => setRegisterData({ ...registerData, ConfirmClave: e.target.value })}
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

                  <div className="space-y-2">
                    <Label htmlFor="register-telefono" className="text-white">
                      Número de Teléfono
                    </Label>
                    <Input
                      id="register-telefono"
                      type="tel"
                      placeholder="+58 04123456789"
                      value={registerData.Telefono}
                      onChange={(e) => setRegisterData({ ...registerData, Telefono: e.target.value })}
                      required
                      className="bg-[#121212] border-[#6A8E23]/30 text-white focus:border-[#F4A622]"
                    />
                  </div>

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
