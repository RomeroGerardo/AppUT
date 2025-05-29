"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic } from "lucide-react"

interface VoiceSearchProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export function VoiceSearch({ placeholder = "¿Qué servicio necesitas?", onSearch, className = "" }: VoiceSearchProps) {
  const [query, setQuery] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  // Simulación de reconocimiento de voz
  // En una implementación real, usaríamos la Web Speech API
  useEffect(() => {
    if (isRecording) {
      const timer = setTimeout(() => {
        // Simulamos que se ha reconocido algo después de 3 segundos
        const fakeRecognizedText = [
          "plomero en mi zona",
          "electricista urgente",
          "jardinero disponible hoy",
          "técnico de aire acondicionado",
        ][Math.floor(Math.random() * 4)]

        setQuery(fakeRecognizedText)
        setIsRecording(false)

        if (onSearch) {
          onSearch(fakeRecognizedText)
        }
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isRecording, onSearch])

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (isRecording) {
      // Si estamos deteniendo la grabación, no hacemos nada más
      // El efecto se encargará de procesar el resultado
    } else {
      // Si estamos comenzando a grabar, podríamos reiniciar el query
      // o dejarlo como está para permitir edición
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex w-full">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pr-10 w-full"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full"
          onClick={toggleRecording}
        >
          <Mic className={`h-4 w-4 ${isRecording ? "text-red-500" : "text-muted-foreground"}`} />
        </Button>
      </form>

      {isRecording && <div className="mt-2 text-sm text-primary animate-pulse">Escuchando... Habla para buscar</div>}
    </div>
  )
}
