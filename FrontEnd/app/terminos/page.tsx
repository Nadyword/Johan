import { CloverIconImage } from "@/components/clover-icon"
import { TermsContent } from "@/components/terms-content"

export default function TerminosPage() {
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
              Términos y Condiciones
            </h1>
            <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-12 h-12 text-secondary" />
          </div>
        </div>

        <div className="animate-fade-up">
          <TermsContent />
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
