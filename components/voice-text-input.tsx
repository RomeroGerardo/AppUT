"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { VoiceInput } from "@/components/voice-input"

interface VoiceTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void
}

export function VoiceTextInput({ value, onChange, onValueChange, ...props }: VoiceTextInputProps) {
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
      } as React.ChangeEvent<HTMLInputElement>
      onChange(syntheticEvent)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <Input value={inputValue} onChange={handleChange} {...props} />
    </VoiceInput>
  )
}
