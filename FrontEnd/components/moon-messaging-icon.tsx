import React from "react"
import Image from "next/image"

interface MoonMessagingIconProps {
  className?: string
  style?: React.CSSProperties
  size?: number
  whatsappUrl?: string
  onWhatsAppClick?: () => void
}

export function MoonMessagingIcon({ 
  className = "w-12 h-12", 
  style,
  size = 48,
  whatsappUrl = "https://wa.me/34643907132",
  onWhatsAppClick
}: MoonMessagingIconProps) {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onWhatsAppClick) {
      onWhatsAppClick()
    } else {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    }
  }
  
  return (
    <div
      className={`${className} cursor-pointer hover:scale-110 transition-transform duration-300 drop-shadow-2xl`}
      style={style}
      onClick={handleWhatsAppClick}
    >
      <Image
        src="/logo-whatsapp.svg"
        alt="WhatsApp"
        width={size}
        height={size}
        className="w-full h-full"
      />
    </div>
  )
}

export default MoonMessagingIcon

