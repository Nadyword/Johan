import { CloverIconImage } from "@/components/clover-icon"

export function TermsContentPopUp() {
  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-secondary/20 p-8 md:p-12 shadow-2xl space-y-8">

      <div className="text-center mb-2 animate-fade-up">
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-foreground">
          Términos del servicio
        </h3>
      </div>

      <section>
        <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          1. Primero
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-0">
          Los número disponibles a comprar en nuestro sorteo serán asignados de manera aleatoria por el sistema.
        </p>

        <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          2. Segundo
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-0">
          Solo pueden participar personas naturales mayores de 18 años.
        </p>

        <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          3. Tercero
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-0">
          Los premios serán pagados exclusivamente en criptomoneda especificamente USDT por la plataforma Binance a los ganadores de los premios.
        </p>

        <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
          4. Cuarto
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-0">
          Los ganadores deberán aceptar que Chain Of Lucky difunda en todas sus redes sociales fotografías y videos con la presencia de los ganadores luego de haber sido cancelados los premios.
        </p>
      </section>
    </div>
  )
}
