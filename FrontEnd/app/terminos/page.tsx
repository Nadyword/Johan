import { CloverIcon } from "@/components/clover-icon"

export default function TerminosPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10 animate-gradient" />

      {/* Floating clovers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <CloverIcon className="absolute top-20 left-10 w-16 h-16 text-secondary/10 animate-float" />
        <CloverIcon className="absolute top-40 right-20 w-12 h-12 text-accent/10 animate-float-delayed" />
        <CloverIcon className="absolute bottom-32 left-1/4 w-20 h-20 text-secondary/10 animate-float" />
        <CloverIcon className="absolute bottom-20 right-1/3 w-14 h-14 text-accent/10 animate-float-delayed" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-3 mb-4">
            <CloverIcon className="w-12 h-12 text-secondary" />
            <h1 className="font-display text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
              Términos y Condiciones
            </h1>
            <CloverIcon className="w-12 h-12 text-secondary" />
          </div>
          <p className="text-muted-foreground">Última actualización: Enero 2025</p>
        </div>

        {/* Content */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-secondary/20 p-8 md:p-12 shadow-2xl space-y-8 animate-fade-up">
          <section>
            <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              1. Aceptación de los Términos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Al acceder y utilizar Chain of Lucky, usted acepta estar sujeto a estos Términos y Condiciones. Si no está
              de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              2. Descripción del Servicio
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Chain of Lucky es una plataforma digital de rifas y sorteos que permite a los usuarios:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Participar en rifas digitales comprando tickets</li>
              <li>Visualizar rifas activas y anteriores</li>
              <li>Gestionar sus tickets y pagos</li>
              <li>Recibir notificaciones sobre resultados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              3. Registro y Cuenta de Usuario
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Para participar en las rifas, debe crear una cuenta proporcionando información precisa y completa. Usted
              es responsable de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Mantener la confidencialidad de su contraseña</li>
              <li>Todas las actividades que ocurran bajo su cuenta</li>
              <li>Notificar inmediatamente cualquier uso no autorizado</li>
              <li>Ser mayor de 18 años para participar</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              4. Compra de Tickets
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Al comprar tickets de rifa:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Los pagos son procesados de forma segura</li>
              <li>Las compras son finales y no reembolsables</li>
              <li>Los descuentos por cantidad se aplican automáticamente</li>
              <li>Recibirá confirmación por correo electrónico</li>
              <li>Los números de ticket son asignados aleatoriamente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              5. Sorteos y Ganadores
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Los sorteos se realizan de manera transparente y justa:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Los ganadores son seleccionados aleatoriamente</li>
              <li>Los resultados son publicados en la plataforma</li>
              <li>Los ganadores son notificados por correo electrónico</li>
              <li>Los premios deben ser reclamados dentro de 30 días</li>
              <li>Chain of Lucky se reserva el derecho de verificar la identidad del ganador</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              6. Prohibiciones
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Está prohibido:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Usar la plataforma para actividades ilegales</li>
              <li>Intentar manipular o alterar los sorteos</li>
              <li>Crear múltiples cuentas para obtener ventajas</li>
              <li>Compartir o vender cuentas de usuario</li>
              <li>Realizar ingeniería inversa de la plataforma</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              7. Limitación de Responsabilidad
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Chain of Lucky no será responsable por daños indirectos, incidentales o consecuentes que resulten del uso
              o la imposibilidad de usar el servicio. Nos reservamos el derecho de modificar, suspender o discontinuar
              el servicio en cualquier momento sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              8. Modificaciones
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor
              inmediatamente después de su publicación en la plataforma. El uso continuado del servicio después de
              dichos cambios constituye su aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
              <CloverIcon className="w-6 h-6" />
              9. Contacto
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Para preguntas sobre estos Términos y Condiciones, puede contactarnos en:
            </p>
            <p className="text-accent font-semibold mt-2">info@chainoflucky.cl</p>
          </section>
        </div>

        {/* Bottom decoration */}
        <div className="flex items-center justify-center gap-4 mt-12 animate-fade-up">
          <CloverIcon className="w-8 h-8 text-secondary/50 animate-float" />
          <p className="text-sm text-muted-foreground">Chain of Lucky - Participa hoy. Gana en grande.</p>
          <CloverIcon className="w-8 h-8 text-secondary/50 animate-float-delayed" />
        </div>
      </div>
    </div>
  )
}
