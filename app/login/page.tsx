"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogIn } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { VoiceTextInput } from "@/components/voice-text-input"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Estados para los campos del formulario
  const [providerEmail, setProviderEmail] = useState("")
  const [providerPassword, setProviderPassword] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPassword, setClientPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulamos un inicio de sesión
    setTimeout(() => {
      setIsLoading(false)
      router.push("/perfil")
    }, 1500)
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
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>Accede a tu cuenta para gestionar tus servicios</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="provider">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="provider">Proveedor</TabsTrigger>
                <TabsTrigger value="client">Cliente</TabsTrigger>
              </TabsList>

              <TabsContent value="provider">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <VoiceTextInput
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      required
                      value={providerEmail}
                      onValueChange={setProviderEmail}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Contraseña</Label>
                      <Link href="/recuperar" className="text-sm text-primary">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <VoiceTextInput
                      id="password"
                      type="password"
                      placeholder="********"
                      required
                      value={providerPassword}
                      onValueChange={setProviderPassword}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>Iniciando sesión...</>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Iniciar sesión
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="client">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Correo electrónico</Label>
                    <VoiceTextInput
                      id="client-email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      required
                      value={clientEmail}
                      onValueChange={setClientEmail}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="client-password">Contraseña</Label>
                      <Link href="/recuperar" className="text-sm text-primary">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <VoiceTextInput
                      id="client-password"
                      type="password"
                      placeholder="********"
                      required
                      value={clientPassword}
                      onValueChange={setClientPassword}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>Iniciando sesión...</>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Iniciar sesión
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <div className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link href="/registro" className="text-primary font-medium">
                Regístrate como proveedor
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
