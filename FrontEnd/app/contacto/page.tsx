"use client"

import type React from "react"

import { CloverIcon, CloverIconImage } from "@/components/clover-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("¡Mensaje enviado! Te responderemos pronto.")
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
 
      <div className="fixed inset-0 bg-gradient-to-br from-background via-secondary/5 to-accent/10 animate-gradient -z-10" />

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
          <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-8 h-8 text-accent" />
        </div>
      ))}

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-3 mb-6">
            <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-12 h-12 text-accent animate-float" />
            <h1 className="font-display text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text">
              Contáctanos
            </h1>
            <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-12 h-12 text-secondary animate-float-delayed" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes preguntas? Estamos aquí para ayudarte
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="animate-fade-up">
            <div className="bg-card/50 backdrop-blur-sm border border-secondary/20 rounded-2xl p-8 hover:border-secondary/50 transition-all duration-300 shadow-lg">
              <h2 className="text-2xl font-display font-bold mb-6 text-foreground">Envíanos un Mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Nombre Completo</label>
                  <Input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Tu nombre"
                    required
                    className="bg-background/50 border-secondary/30 focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Correo Electrónico</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
                    required
                    className="bg-background/50 border-secondary/30 focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Asunto</label>
                  <Input
                    type="text"
                    value={formData.asunto}
                    onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                    className="bg-background/50 border-secondary/30 focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Mensaje</label>
                  <Textarea
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    placeholder="Escribe tu mensaje aquí..."
                    required
                    rows={6}
                    className="bg-background/50 border-secondary/30 focus:border-secondary resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-black text-white font-bold py-6 rounded-full hover:shadow-lg hover:shadow-secondary/50 transition-all duration-300 hover:scale-105"
                >
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </div>
          <div className="space-y-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-2xl p-8 hover:border-accent/50 transition-all duration-300 shadow-lg">
              <h2 className="text-2xl font-display font-bold mb-6 text-foreground">Información de Contacto</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Email</h3>
                    <a
                      href="mailto:Chainoflucky@gmail.com"
                      className="text-muted-foreground hover:text-secondary transition-colors"
                    >
                      Chainoflucky@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Teléfono</h3>
                    <p className="text-muted-foreground">+34643907132</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Horario de Atención</h3>
                    <p className="text-muted-foreground">Lunes a Viernes: 9:00 - 18:00</p>
                    <p className="text-muted-foreground">Sábados: 10:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 shadow-lg">
              <h2 className="text-2xl font-display font-bold mb-4 text-foreground">Preguntas Frecuentes</h2>
              <p className="text-muted-foreground mb-4">
                Antes de contactarnos, revisa nuestra sección de preguntas frecuentes. Quizás encuentres la respuesta
                que buscas.
              </p>
              <Button
                variant="outline"
                className="w-full border-primary/30 hover:border-primary hover:bg-primary/10 bg-transparent"
              >
                Ver FAQ
              </Button>
            </div>

            <div className="bg-gradient-to-br from-secondary/20 to-accent/20 backdrop-blur-sm border border-secondary/30 rounded-2xl p-8 text-center">
              <CloverIconImage src="/CHAIN OF LUCKY_CURVAS-03.svg" height={100} width={100} className="w-16 h-16 text-secondary mx-auto mb-4 animate-pulse-slow" />
              <h3 className="font-display font-bold text-xl mb-2 text-foreground">¡Estamos para ayudarte!</h3>
              <p className="text-sm text-muted-foreground">
                Tu satisfacción es nuestra prioridad. Responderemos tu mensaje en menos de 24 horas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
