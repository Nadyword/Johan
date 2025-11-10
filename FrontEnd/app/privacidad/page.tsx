import { CloverIcon, CloverIconImage } from "@/components/clover-icon"

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-accent/5 to-secondary/10 animate-gradient" />

      {/* Floating clovers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="absolute top-20 right-10 w-16 h-16 text-accent/10 animate-float" />
        <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="absolute top-40 left-20 w-12 h-12 text-secondary/10 animate-float-delayed" />
        <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="absolute bottom-32 right-1/4 w-20 h-20 text-accent/10 animate-float" />
        <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="absolute bottom-20 left-1/3 w-14 h-14 text-secondary/10 animate-float-delayed" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-3 mb-4">
            <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-12 h-12 text-accent" />
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground">
              Política de Privacidad
            </h1>
            <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-12 h-12 text-accent" />
          </div>
        </div>

        {/* Content */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-accent/20 p-8 md:p-12 shadow-2xl space-y-8 animate-fade-up">
          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              1. Recopilación de Información
            </h2>
            Recopilamos información personal necesaria para nuestros servicios de sorteos, incluyendo:

            <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
              <li>Información de identificación (nombre completo, número de identificación)</li>
              <li>Datos de contacto (dirección, correo electrónico, teléfono)</li>
              <li>Información financiera (detalles de pago, historial de transacciones)</li>
              <li>Documentación de verificación de edad e identidad</li>
            </ul>

            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              2. Uso de la Información
            </h2>
            Utilizamos su información para:

            <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
              <li>Procesar compras de boletos y participación en sorteos</li>
              <li>Verificar su identidad y elegibilidad</li>
              <li>Distribuir premios y gestionar reclamos</li>
              <li>Cumplir con regulaciones y prevención de fraude</li>
              <li>Enviar notificaciones importantes sobre sorteos y premios</li>
            </ul>

            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              3. Compartir Información
            </h2>
            Podemos compartir su información con:

            <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
              <li>Autoridades reguladoras</li>
              <li>Proveedores de servicios de pago</li>
              <li>Entidades legales cuando sea requerido por ley</li>
            </ul>

            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              4. Protección de Datos
            </h2>
            Implementamos rigurosas medidas de seguridad, incluyendo:

            <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
              <li>Encriptación de datos sensibles</li>
              <li>Sistemas de seguridad monitoreados</li>
              <li>Acceso restringido a información personal</li>
              <li>Protocolos de respuesta ante incidentes</li>
            </ul>

            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              5. Sus Derechos
            </h2>
            Usted tiene derecho a:
            <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
              <li>Acceder a su información personal</li>
              <li>Solicitar correcciones de datos inexactos</li>
              <li>Retirar su consentimiento para comunicaciones promocionales</li>
              <li>Solicitar la eliminación de sus datos (sujeto a requisitos legales)</li>
              <li>Obtener una copia de sus datos personales</li>
            </ul>

            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              6. Retención de Datos
            </h2>
            Mantenemos su información personal mientras su cuenta esté activa o según lo requiera la ley. Para transacciones de sorteos, conservamos los registros según los períodos establecidos por las regulaciones y leyes fiscales aplicables.

            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              7. Contacto
            </h2>
            Para ejercer sus derechos o realizar consultas sobre privacidad, contáctenos a través de nuestros canales oficiales.
          </section>

        </div>

        {/* Bottom decoration */}
        <div className="flex items-center justify-center gap-4 mt-12 animate-fade-up">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-8 h-8 text-accent/50 animate-float" />
          <p className="text-sm text-muted-foreground">Tu privacidad es nuestra prioridad</p>
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-8 h-8 text-accent/50 animate-float-delayed" />
        </div>
      </div>
    </div >
  )
}
