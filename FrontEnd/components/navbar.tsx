"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CloverIcon, CloverIconImage } from "@/components/clover-icon"
import { useAuth } from "@/lib/auth-context"
import { AuthModal } from "@/components/auth-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavLink {
  href: string
  label: string
  adminOnly?: boolean
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user, logout } = useAuth()

  // Filtrar enlaces según el usuario
  const allNavLinks: NavLink[] = [
    { href: "/", label: "Inicio" },
    { href: "/comprar", label: "Comprar" },
    { href: "/mis-tickets", label: "Mis Boletos" },
    { href: "/pagos", label: "Pagos", adminOnly: true },
    { href: "/rifas-anteriores", label: "Sorteos Anteriores" },
  ]

  const navLinks = allNavLinks.filter(
    (link) => !link.adminOnly || (user && user.name?.toLowerCase() === "admin")
  )

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#121212] via-[#1a1a1a] to-[#121212] backdrop-blur-lg border-b-2 border-[#6A8E23]/30 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-02.png" height={50} width={80}/>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-white/80 hover:text-[#F4A622] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6A8E23] to-[#F4A622] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-gradient-to-r from-[#6A8E23] to-[#4F6D1F] border-[#F4A622]/30 text-white hover:border-[#F4A622] hover:bg-[#6A8E23]"
                    >
                      <User className="w-4 h-4" />
                      {user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-[#6A8E23]/30">
                    <DropdownMenuItem asChild className="text-white hover:bg-[#6A8E23]/20 hover:text-[#F4A622]">
                      <Link href="/mis-tickets">Mis boletos</Link>
                    </DropdownMenuItem>
                    {user && user.name?.toLowerCase() === "admin" && (
                      <DropdownMenuItem asChild className="text-white hover:bg-[#6A8E23]/20 hover:text-[#F4A622]">
                        <Link href="/pagos">Historial de Pagos</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-[#6A8E23]/30" />
                    <DropdownMenuItem onClick={logout} className="text-red-400 hover:bg-red-500/20 hover:text-red-300">
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-[#F4A622] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#F4A622] text-black font-bold shadow-lg hover:shadow-[#F4A622]/50 transition-all duration-300 hover:scale-105"
                >
                  Ingresar
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white hover:text-[#F4A622] transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-[#6A8E23]/30">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-white/80 hover:text-[#F4A622] transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <div className="pt-3 border-t border-[#6A8E23]/30">
                      <p className="text-sm text-white/70 mb-2">{user.name}</p>
                      <Button
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                        variant="outline"
                        size="sm"
                        className="w-full border-red-500/30 text-red-400 hover:bg-red-500/20"
                      >
                        Cerrar Sesión
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      setShowAuthModal(true)
                      setIsOpen(false)
                    }}
                    className="bg-gradient-to-r from-[#F4A622] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#F4A622] text-black font-bold"
                  >
                    Ingresar
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  )
}
