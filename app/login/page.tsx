"use client"

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { VoiceTextInput } from "@/components/voice-text-input"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      await signIn(email, password)
      router.push('/') // Redirige al inicio después del login exitoso
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.')
      console.error(err)
    }
  }

  return (
    <main>
      <MobileNav />

      <div className="container px-4 py-6 max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Universo Trabajo" width={80} height={80} className="rounded-full" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 mb-2">{error}</p>}
              
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <VoiceTextInput
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onValueChange={(value) => setEmail(value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <VoiceTextInput
                  id="password"
                  type="password"
                  placeholder="Tu contraseña"
                  value={password}
                  onValueChange={(value) => setPassword(value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
              >
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <div className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link href="/registro" className="text-primary font-medium">
                Regístrate
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
