"use client"

import { CloverIcon, CloverIconImage } from "@/components/clover-icon"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10 animate-gradient -z-10" />

      {/* Floating clovers - more particles */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.1 + Math.random() * 0.2,
            zIndex: 0,
          }}
        >
            <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-8 h-8 text-secondary" />
        </div>
      ))}

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-3 mb-6">
            <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-12 h-12 text-secondary animate-float" />
            <h1 className="font-display text-5xl md:text-6xl font-extrabold text-foreground">
              ¿Cómo Funciona?
            </h1>
            <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-12 h-12 text-accent animate-float-delayed" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Participa en nuestros sorteos digitales de forma simple, segura y transparente
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-8 mb-16">
          {[
            {
              step: "1",
              title: "Regístrate",
              description:
                "Crea tu cuenta en Chain of Lucky de forma gratuita. Solo necesitas tu correo electrónico y una contraseña segura.",
              icon: "👤",
            },
            {
              step: "2",
              title: "Elige tu Sorteo",
              description:
                "Explora nuestros sorteos activos y selecciona el que más te guste. Cada sorteo muestra el premio, precio del boleto y fecha del sorteo.",
              icon: "🎯",
            },
            {
              step: "3",
              title: "Compra tus Boletos",
              description:
                "Selecciona la cantidad de boletos que deseas. ¡Mientras más boletos compres, más descuento obtienes! Los descuentos van desde 5% hasta 20%.",
              icon: "🎫",
            },
            {
              step: "4",
              title: "Realiza el Pago",
              description:
                "Paga de forma segura con tu método preferido. Aceptamos tarjetas de crédito, débito y transferencias bancarias.",
              icon: "💳",
            },
            {
              step: "5",
              title: "Recibe tus Boletos",
              description:
                "Inmediatamente después del pago, recibirás tus números de la suerte por correo electrónico y en tu panel de usuario.",
              icon: "🔢",
            },
            {
              step: "6",
              title: "¡Espera el Sorteo!",
              description:
                "El día del sorteo, se realizará la selección del ganador de forma aleatoria y transparente. ¡Buena suerte!",
              icon: "🍀",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="border-s border-accent/100 border-black rounded-2xl p-8 animate-fade-up"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-bold text-secondary">PASO {item.step}</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-secondary/50 to-transparent" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-bold text-center mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text ">
            ¿Por qué elegir Chain of Lucky?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Transparencia Total",
                description: "Todos los sorteos son verificables y transparentes",
                icon: "✓",
              },
              {
                title: "Pagos Seguros",
                description: "Procesamiento de pagos encriptado y protegido",
                icon: "🔒",
              },
              {
                title: "Soporte 24/7",
                description: "Estamos aquí para ayudarte en todo momento",
                icon: "💬",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-xl p-6 text-center hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 animate-fade-up"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-up" style={{ animationDelay: "0.9s" }}>
          <Link href="/comprar">
            <Button
              size="lg"
              className="bg-gradient-to-r from-secondary to-primary text-foreground font-bold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-5 h-5 mr-2" />
              Comprar Boletos Ahora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
