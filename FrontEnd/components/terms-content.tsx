import { CloverIconImage } from "@/components/clover-icon"

export function TermsContent() {
  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-secondary/20 p-8 md:p-12 shadow-2xl space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          1. Primero
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Los números disponibles a comprar de nuestro sorteo serán descritos en la página de detalles de las mismas.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          2. Segundo
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Solo pueden participar personas naturales mayores de 18 años.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          3. Tercero
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Los premios serán pagados exclusivamente en criptomoneda especificamente USDT por la plataforma Binance a los ganadores de los premios.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          4. Cuarto
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Los ganadores deberán aceptar que Chain Of Lucky difunda en todas sus redes sociales fotografías y videos con la presencia de los ganadores luego de haber sido cancelados los premios.
        </p>
      </section>
    </div>
  )
}
