import Link from "next/link"
import { CloverIcon } from "@/components/clover-icon"

export function Footer() {
  return (
    <footer className="relative z-20 bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <CloverIcon className="w-8 h-8 text-secondary" />
              <span className="font-display font-extrabold text-xl text-primary">CHAIN OF LUCKY</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Participa hoy. Gana en grande. Dios te abre camino.
            </p>
          </div>

          {/* Legal Links */}
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
              <li>
                <Link
                  href="/como-funciona"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Cómo Funciona
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
                  href="mailto:info@chainoflucky.cl"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  info@chainoflucky.cl
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary/20 flex items-center justify-center gap-2">
          <CloverIcon className="w-4 h-4 text-secondary" />
          <p className="text-sm text-muted-foreground">© 2025 Chain of Lucky. Todos los derechos reservados.</p>
          <CloverIcon className="w-4 h-4 text-secondary" />
        </div>
      </div>
    </footer>
  )
}
