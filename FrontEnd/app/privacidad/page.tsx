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
              1. Responsable del Tratamiento
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Los datos personales recabados a través de este sitio web serán tratados por Élite Emporium Properties, C.A., con domicilio en Caracas- Venezuela, Registro de Información Fiscal J-50756511-4, y dirección de correo electrónico de contacto: eliteemporiove@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              2. Finalidades del Tratamiento
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li> Gestionar y responder las consultas, comentarios y solicitudes de información que realice a través de nuestro sitio web, formularios de contacto o correo electrónico.</li>
                <li>Prestar los servicios inmobiliarios que nos solicite (evaluación de propiedades, visitas, procesos de compra-venta-alquiler, concursos, promociones y eventos).</li>
                <li> Enviarle comunicaciones comerciales sobre nuestros servicios, promociones, concurso, eventos o novedades, siempre que haya prestado su consentimiento para ello.</li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              3. Base Legal y Consentimiento
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              El tratamiento de sus datos para atender sus consultas y prestar nuestros servicios se basa en su consentimiento, que se entiende prestado al facilitarnos su información y aceptar esta política. Puede retirar su consentimiento en cualquier momento.
            </p>

          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              4. Principios Aplicables
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
            Nos comprometemos a tratar sus datos de acuerdo con los principios constitucionales desarrollados por la jurisprudencia Venezolana, que incluyen:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Calidad y Finalidad: Los datos serán adecuados, pertinentes y no excesivos en relación con las finalidades para las que se recaban.</li>
              <li>Temporalidad: Los datos serán conservados solo hasta que se cumplan las finalidades que justificaron su recogida.</li>
              <li>Seguridad y Confidencialidad: Implementamos medidas técnicas y organizativas para proteger sus datos contra alteración, pérdida o acceso no autorizado.</li>
              <li>Autodeterminación informativa: Usted tiene derecho a acceder, rectificar o suprimir sus datos, así como a oponerse a su tratamiento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              5. Destinatarios y Transferencias
            </h2>
            <p className="text-muted-foreground leading-relaxed">
            Los datos personales no serán cedidos a terceros, salvo cuando sea necesario para la ejecución de un contrato por algún ente del Estado Venezolano competente o por obligación legal y/o judicial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              6. Derechos de los Usuarios
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
            Puede ejercer sus derechos de acceso, rectificación, supresión y oposición al tratamiento de sus datos, dirigiendo una comunicación escrita, acompañada de una copia de su documento de identidad, a la dirección de correo electrónico: atencion.eliteemporiove@gmail.com.
            </p>

          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              7. Política sobre Menores de Edad
            </h2>
            <p className="text-muted-foreground leading-relaxed">
            Quien facilite datos a través de este sitio web declara ser mayor de 18 años. Élite Emporium Properties C.A., no recaba conscientemente información de menores de esa edad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              8. Retención de Datos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Conservamos su información personal solo durante el tiempo necesario para cumplir con los propósitos
              descritos en esta política, a menos que la ley requiera o permita un período de retención más largo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              9. Cambios a esta Política
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios
              significativos publicando la nueva política en esta página y actualizando la fecha de "última
              actualización".
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2 text-foreground">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              10. Contacto
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, contáctenos en:
            </p>
            <p className="text-accent font-semibold mt-2">info@chainoflucky.cl</p>
          </section>
        </div>

        {/* Bottom decoration */}
        <div className="flex items-center justify-center gap-4 mt-12 animate-fade-up">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-8 h-8 text-accent/50 animate-float" />
          <p className="text-sm text-muted-foreground">Tu privacidad es nuestra prioridad</p>
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-8 h-8 text-accent/50 animate-float-delayed" />
        </div>
      </div>
    </div>
  )
}
