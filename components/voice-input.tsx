"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Mic } from "lucide-react"

interface VoiceInputProps {
  onVoiceCapture: (text: string) => void
  isRecording: boolean
  setIsRecording: (isRecording: boolean) => void
  children: ReactNode
}

export function VoiceInput({ onVoiceCapture, isRecording, setIsRecording, children }: VoiceInputProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Simulación de reconocimiento de voz
  // En una implementación real, usaríamos la Web Speech API
  useEffect(() => {
    if (isRecording) {
      const timer = setTimeout(() => {
        // Simulamos que se ha reconocido algo después de 2 segundos
        const fakeRecognizedText = [
          "Este es un texto de ejemplo reconocido por voz",
          "Hola, soy un profesional con experiencia",
          "Me especializo en servicios de calidad",
          "Ofrezco los mejores precios del mercado",
          "Disponible de lunes a viernes",
        ][Math.floor(Math.random() * 5)]

        onVoiceCapture(fakeRecognizedText)
        setIsRecording(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isRecording, onVoiceCapture, setIsRecording])

  return (
    <div className="relative w-full">
      {children}
      <Button
        ref={buttonRef}
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={() => setIsRecording(!isRecording)}
      >
        <Mic className={`h-4 w-4 ${isRecording ? "text-red-500" : "text-muted-foreground"}`} />
        <span className="sr-only">Usar micrófono</span>
      </Button>
      {isRecording && (
        <div className="mt-1 text-xs text-primary animate-pulse">
          Escuchando... Habla para convertir tu voz en texto
        </div>
      )}
    </div>
  )
}
