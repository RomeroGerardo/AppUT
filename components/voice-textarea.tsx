"use client"

import type React from "react"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { VoiceInput } from "@/components/voice-input"

interface VoiceTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onValueChange?: (value: string) => void
}

export function VoiceTextarea({ value, onChange, onValueChange, ...props }: VoiceTextareaProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [inputValue, setInputValue] = useState(value || "")

  const handleVoiceCapture = (text: string) => {
    const newValue = inputValue ? `${inputValue} ${text}` : text
    setInputValue(newValue)

    if (onValueChange) {
      onValueChange(newValue)
    }

    // Crear un evento sintético para onChange
    if (onChange) {
      const syntheticEvent = {
        target: { value: newValue },
      } as React.ChangeEvent<HTMLTextAreaElement>
      onChange(syntheticEvent)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
    if (onChange) {
      onChange(e)
    }
    if (onValueChange) {
      onValueChange(e.target.value)
    }
  }

  return (
    <VoiceInput onVoiceCapture={handleVoiceCapture} isRecording={isRecording} setIsRecording={setIsRecording}>
      <Textarea value={inputValue} onChange={handleChange} {...props} />
    </VoiceInput>
  )
}
