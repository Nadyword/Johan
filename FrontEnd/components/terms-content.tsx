import { CloverIconImage } from "@/components/clover-icon"

export function TermsContent() {
  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-secondary/20 p-8 md:p-12 shadow-2xl space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          1. Aceptación de los Términos
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Al acceder y utilizar los servicios de Chain Of Lucky, usted acepta estar sujeto a estos términos de servicio. Estos términos rigen su uso de nuestra plataforma para la compra de boletos y participación en sorteos.
        </p>

        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          2. Elegibilidad y Requisitos
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Para utilizar nuestros servicios, usted debe: ser mayor de 18 años, tener capacidad legal para celebrar contratos vinculantes, proporcionar información precisa y actualizada durante el registro, y cumplir con todas las leyes y regulaciones locales aplicables.
          No vendemos bajo ningún concepto, ningún boleto, ni entregamos premios a MENORES DE EDAD, en consecuencia, no pueden participar niños (as) y/o adolescentes en ninguno de nuestros sorteos. No utilizar a niños (as) y/o adolescentes como intermediarios para realizar compras en el sistema, o quedará anulada la misma.
        </p>

        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          3. Servicios de Boletería y Sorteos
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Chain Of Lucky ofrece servicios de venta de boletos y sorteos. Nos reservamos el derecho de: verificar su identidad antes de procesar cualquier transacción, limitar la cantidad de boletos por persona, cancelar transacciones sospechosas de fraude, y modificar o suspender cualquier servicio según sea necesario.
          Pueden participar desde cualquier lugar del mundo siempre y cuando tengan a su disposición la cuenta receptora en criptomonedas USDT por la plataforma Binance para la cancelación de los premios sorteados.
        </p>

        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          4. Pagos y Reembolsos
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Los pagos deben realizarse en su totalidad antes de la emisión de boletos. No se aceptan reembolsos una vez emitidos los boletos, excepto en casos específicos determinados por los responsables del sorteo. No se realizan devoluciones de pagos bajo ningún concepto.
          De tener algún reclamo con respeto a sus pedidos deben hacerlo dentro de las 24 horas posteriores a la realización del mismo.
        </p>

        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          5. Premios y Reclamos
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Los ganadores serán notificados según los procedimientos establecidos para cada sorteo. Los premios deben ser reclamados dentro del período especificado y con la documentación requerida. Chain Of Lucky no se hace responsable por premios no reclamados en el tiempo establecido.

          Cada ganador tiene un lapso de 72 horas para atender a nuestro llamado, de no responder transcurridas las 72 horas se elige otro ganador dentro de los mismos boletos vendidos.
          Si el equipo de verificación y seguridad detecta alguna irregularidad en el pago con el que la persona ganadora participó automáticamente pierde el premio.
          Los premios se pagan a través de criptomonedas USDT por la plataforma Binance.
        </p>

        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          6. Publicidad y Uso de Imagen
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Todos al participar, automáticamente aceptan ser publicados (en caso de resultar ganador/a) en redes sociales y/o cualquier otro medio que Chain Of Lucky considere prudente, a fin de dar testimonio públicamente del cumplimiento transparente de la respectiva entrega de premios.
          Los ganadores (as) de premios considerados de gran valor, deberán firmar una autorización de cesión de imagen con Chain Of Lucky, en el cual aceptan ser publicados como "ganadores (as)" en redes sociales y medios de comunicación.
          Todos al participar aceptan que Chain Of Lucky pueda enviar publicidad y/o recomendaciones a los datos registrados en nuestro sistema, sea número telefónico o correo electrónico.
        </p>

        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          7. Responsabilidad Legal
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Chain Of Lucky actúa como intermediario autorizado para la venta de boletos. No nos hacemos responsables por: resultados de sorteos, pérdidas o daños derivados del uso de nuestros servicios, problemas técnicos fuera de nuestro control, o uso indebido de la plataforma por parte del usuario.
          Si algún ganador tiene una conducta irregular hacia cualquier persona del equipo, Chain Of Lucky tiene el derecho de prohibirle la participación en futuros sorteos.
        </p>

        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          8. Modificaciones
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en nuestra plataforma. El uso continuado de nuestros servicios implica la aceptación de dichas modificaciones.
        </p>
      </section>
    </div>
  )
}
