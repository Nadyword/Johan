"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TermsContent } from "./terms-content"

export function TermsModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Mostrar el modal cada vez que se carga la página
    setOpen(true)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent 
        className="sm:max-w-3xl max-h-[90vh] overflow-y-auto hide-scrollbar bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#6A8E23]"
        showCloseButton={false}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-50 bg-[#F4A622] hover:bg-[#ff8c00] text-black rounded-md p-2 transition-colors shadow-lg hover:shadow-[#F4A622]/50"
          aria-label="Cerrar"
        >
          <XIcon className="w-6 h-6" />
        </button>

        <DialogHeader>
          <DialogTitle className="sr-only">Términos y Condiciones</DialogTitle>
        </DialogHeader>

        <TermsContent />

        <div className="flex justify-center mt-6">
          <Button
            onClick={() => setOpen(false)}
            className="bg-gradient-to-r from-[#F4A622] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#F4A622] text-black font-bold shadow-lg hover:shadow-[#F4A622]/50 transition-all duration-300"
          >
            Entendido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
