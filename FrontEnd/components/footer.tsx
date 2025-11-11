import Link from "next/link"
import { CloverIcon, CloverIconImage } from "@/components/clover-icon"

export function Footer() {
  return (
    <footer className="relative z-20 bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-1">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={250} width={250}/>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Participa hoy. Gana en grande. Dios te abre camino.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terminos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contacto</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contáctanos
                </Link>
              </li>
              <li>
                <a
                  href="mailto:Chainoflucky@gmail.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Chainoflucky@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/34643907132"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                +34643907132
                </a>
              </li>
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Información</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/como-funciona"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-1 pt-1 border-t border-secondary/20 flex items-center justify-center gap-2">
          <CloverIcon className="w-4 h-4 text-secondary" />
          <p className="text-sm text-muted-foreground">© 2025 Chain of Lucky. Todos los derechos reservados.</p>
          <CloverIcon className="w-4 h-4 text-secondary" />
        </div>
      </div>
    </footer>
  )
}
