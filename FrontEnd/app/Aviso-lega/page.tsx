import { CloverIcon, CloverIconImage } from "@/components/clover-icon"

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10 animate-gradient" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="absolute top-20 left-10 w-16 h-16 text-secondary/10 animate-float" />
        <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="absolute top-40 right-20 w-12 h-12 text-accent/10 animate-float-delayed" />
        <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="absolute bottom-32 left-1/4 w-20 h-20 text-secondary/10 animate-float" />
        <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="absolute bottom-20 right-1/3 w-14 h-14 text-accent/10 animate-float-delayed" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-3 mb-4">
            <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-12 h-12 text-secondary" />
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground">
              Aviso Legal
            </h1>
            <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-12 h-12 text-secondary" />
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-secondary/20 p-8 md:p-12 shadow-2xl space-y-8 animate-fade-up">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              1. Información General
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              De conformidad con las obligaciones de información, se informa que el titular de este sitio web es:
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Denominación: Élite Emporium Properties, C.A.</li>
                <li>Domicilio: Calle Veracruz, Edificio Hacienda, piso 3, oficina 33F, Urb. Las Mercedes, Caracas, Municipio Baruta, Edo. Miranda. </li>
                <li>RIF: J-50756511-4</li>
                <li>Correo Electrónico: eliteemporiove@gmail.com</li>
                <li>Teléfono: +58 (424) 225-85-05</li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              2. Propiedad Intelectual e Industrial
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Todo el contenido de este sitio web (textos, imágenes, logotipos, diseños, software) es propiedad de Élite Emporium Properties C.A., o de sus licenciantes y está protegido por las leyes de propiedad intelectual e industrial. Queda expresamente prohibida su reproducción, distribución o comunicación pública sin autorización previa y por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              3. Condiciones de Uso y Limitación de Responsabilidad
            </h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>El usuario se compromete a utilizar el sitio web de forma lícita y a no realizar actividades que dañen los sistemas o la imagen de la empresa.</li>
              <li>Domicilio: Calle Veracruz, Edificio Hacienda, piso 3, oficina 33F, Urb. Las Mercedes, Caracas, Municipio Baruta, Edo. Miranda. </li>
              <li>RIF: J-50756511-4</li>
              <li>Correo Electrónico: eliteemporiove@gmail.com</li>
              <li>Teléfono: +58 (424) 225-85-05</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              4. Enlaces a Terceros
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Este sitio web puede contener enlaces a sitios externos. Élite Emporium Properties C.A., no ejerce control sobre estos sitios y no es responsable de sus contenidos o prácticas de privacidad. La inclusión de un enlace no implica una recomendación o aprobación de su contenido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={64} width={64} />
              5. Legislación Aplicable y Jurisdicción
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Este Aviso Legal se rige por la legislación de la República Bolivariana de Venezuela. Para cualquier controversia, las partes se someterán expresamente a los juzgados y tribunales de Caracas, Distrito Capital, con renuncia a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>
        </div>

        {/* Bottom decoration */}
        <div className="flex items-center justify-center gap-4 mt-12 animate-fade-up">
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-8 h-8 text-secondary/50 animate-float" />
          <p className="text-sm text-muted-foreground">Chain of Lucky - Participa hoy. Gana en grande.</p>
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-8 h-8 text-secondary/50 animate-float-delayed" />
        </div>
      </div>
    </div>
  )
}
