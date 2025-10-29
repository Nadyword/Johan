import { CloverIcon } from "@/components/clover-icon"

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-accent/5 to-secondary/10 animate-gradient" />

      {/* Floating clovers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <CloverIcon className="absolute top-20 right-10 w-16 h-16 text-accent/10 animate-float" />
        <CloverIcon className="absolute top-40 left-20 w-12 h-12 text-secondary/10 animate-float-delayed" />
        <CloverIcon className="absolute bottom-32 right-1/4 w-20 h-20 text-accent/10 animate-float" />
        <CloverIcon className="absolute bottom-20 left-1/3 w-14 h-14 text-secondary/10 animate-float-delayed" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-3 mb-4">
            <CloverIcon className="w-12 h-12 text-accent" />
            <h1 className="font-display text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent">
              Política de Privacidad
            </h1>
            <CloverIcon className="w-12 h-12 text-accent" />
          </div>
          <p className="text-muted-foreground">Última actualización: Enero 2025</p>
        </div>

        {/* Content */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-accent/20 p-8 md:p-12 shadow-2xl space-y-8 animate-fade-up">
          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              1. Introducción
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              En Chain of Lucky, nos comprometemos a proteger su privacidad y datos personales. Esta Política de
              Privacidad explica cómo recopilamos, usamos, compartimos y protegemos su información cuando utiliza
              nuestra plataforma de rifas digitales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              2. Información que Recopilamos
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Recopilamos diferentes tipos de información para proporcionar y mejorar nuestro servicio:
            </p>
            <div className="space-y-4 ml-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Información Personal:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Nombre completo</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Información de pago (procesada de forma segura)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Información de Uso:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Historial de compras y participación en rifas</li>
                  <li>Preferencias y configuraciones de cuenta</li>
                  <li>Interacciones con la plataforma</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Información Técnica:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador y dispositivo</li>
                  <li>Cookies y tecnologías similares</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              3. Cómo Usamos su Información
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Utilizamos la información recopilada para:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Procesar sus compras de tickets y pagos</li>
              <li>Gestionar su cuenta y preferencias</li>
              <li>Notificarle sobre resultados de sorteos</li>
              <li>Enviar confirmaciones y actualizaciones importantes</li>
              <li>Mejorar nuestros servicios y experiencia de usuario</li>
              <li>Prevenir fraudes y garantizar la seguridad</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              4. Compartir Información
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              No vendemos su información personal. Podemos compartir su información con:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Procesadores de pago para completar transacciones</li>
              <li>Proveedores de servicios que nos ayudan a operar la plataforma</li>
              <li>Autoridades legales cuando sea requerido por ley</li>
              <li>Terceros con su consentimiento explícito</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              5. Seguridad de Datos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra
              acceso no autorizado, alteración, divulgación o destrucción. Esto incluye encriptación SSL, almacenamiento
              seguro de datos y controles de acceso estrictos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              6. Sus Derechos
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Usted tiene derecho a:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Acceder a su información personal</li>
              <li>Corregir datos inexactos o incompletos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Solicitar la portabilidad de sus datos</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              7. Cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el uso de la plataforma y
              personalizar contenido. Puede controlar las cookies a través de la configuración de su navegador, aunque
              esto puede afectar la funcionalidad del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              8. Retención de Datos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Conservamos su información personal solo durante el tiempo necesario para cumplir con los propósitos
              descritos en esta política, a menos que la ley requiera o permita un período de retención más largo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              9. Cambios a esta Política
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios
              significativos publicando la nueva política en esta página y actualizando la fecha de "última
              actualización".
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
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
          <CloverIcon className="w-8 h-8 text-accent/50 animate-float" />
          <p className="text-sm text-muted-foreground">Tu privacidad es nuestra prioridad</p>
          <CloverIcon className="w-8 h-8 text-accent/50 animate-float-delayed" />
        </div>
      </div>
    </div>
  )
}
