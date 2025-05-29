"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Upload, ArrowRight, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { VoiceTextInput } from "@/components/voice-text-input"
import { VoiceTextarea } from "@/components/voice-textarea"

export default function RegistroPage() {
  const [step, setStep] = useState(1)
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const router = useRouter()

  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    category: "",
    experience: "",
    address: "",
    description: "",
    price: "",
    currency: "mxn",
    startTime: "08:00",
    endTime: "18:00",
  })

  const updateFormField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCompleteRegistration = () => {
    // Simulamos el registro exitoso
    setRegistrationComplete(true)

    // Después de 2 segundos, redirigimos al perfil
    setTimeout(() => {
      router.push("/perfil")
    }, 2000)
  }

  // Si el registro está completo, mostrar pantalla de éxito
  if (registrationComplete) {
    return (
      <main>
        <MobileNav />
        <div className="container px-4 py-6 max-w-md mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>¡Registro exitoso!</CardTitle>
              <CardDescription>Tu cuenta de proveedor ha sido creada correctamente</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Serás redirigido a tu perfil en unos segundos...</p>
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <div className="bg-primary h-2 rounded-full animate-pulse"></div>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button onClick={() => router.push("/perfil")}>Ir a mi perfil ahora</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    )
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
            <CardTitle>Registro de proveedor</CardTitle>
            <CardDescription>Completa tu información para ofrecer tus servicios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Paso {step} de 3</span>
                <span className="text-sm text-muted-foreground">
                  Información {step === 1 ? "personal" : step === 2 ? "profesional" : "adicional"}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <VoiceTextInput
                    id="name"
                    placeholder="Ingresa tu nombre completo"
                    value={formData.name}
                    onValueChange={(value) => updateFormField("name", value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <VoiceTextInput
                    id="phone"
                    placeholder="+52 123 456 7890"
                    value={formData.phone}
                    onValueChange={(value) => updateFormField("phone", value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <VoiceTextInput
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onValueChange={(value) => updateFormField("email", value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <VoiceTextInput
                    id="password"
                    type="password"
                    placeholder="********"
                    value={formData.password}
                    onValueChange={(value) => updateFormField("password", value)}
                  />
                </div>

                <Button className="w-full" onClick={() => setStep(2)}>
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría de servicio</Label>
                  <Select value={formData.category} onValueChange={(value) => updateFormField("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plomeria">Plomería</SelectItem>
                      <SelectItem value="electricidad">Electricidad</SelectItem>
                      <SelectItem value="jardineria">Jardinería</SelectItem>
                      <SelectItem value="limpieza">Limpieza</SelectItem>
                      <SelectItem value="carpinteria">Carpintería</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Años de experiencia</Label>
                  <Select value={formData.experience} onValueChange={(value) => updateFormField("experience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tus años de experiencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Menos de 1 año</SelectItem>
                      <SelectItem value="1-3">1-3 años</SelectItem>
                      <SelectItem value="3-5">3-5 años</SelectItem>
                      <SelectItem value="5-10">5-10 años</SelectItem>
                      <SelectItem value="10+">Más de 10 años</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección de trabajo</Label>
                  <div className="flex gap-2">
                    <VoiceTextInput
                      id="address"
                      placeholder="Ingresa tu dirección"
                      value={formData.address}
                      onValueChange={(value) => updateFormField("address", value)}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" className="shrink-0">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción de tus servicios</Label>
                  <VoiceTextarea
                    id="description"
                    rows={4}
                    placeholder="Describe los servicios que ofreces..."
                    value={formData.description}
                    onValueChange={(value) => updateFormField("description", value)}
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Atrás
                  </Button>
                  <Button className="flex-1" onClick={() => setStep(3)}>
                    Continuar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Foto de perfil</Label>
                  <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-md">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Arrastra una imagen o haz clic para subir</p>
                      <Button variant="outline" size="sm">
                        Seleccionar archivo
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Precio por hora (promedio)</Label>
                  <div className="flex gap-2">
                    <VoiceTextInput
                      id="price"
                      type="number"
                      placeholder="250"
                      value={formData.price}
                      onValueChange={(value) => updateFormField("price", value)}
                      className="flex-1"
                    />
                    <Select value={formData.currency} onValueChange={(value) => updateFormField("currency", value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mxn">MXN</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Horario de trabajo</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="start-time" className="text-xs">
                        Hora de inicio
                      </Label>
                      <VoiceTextInput
                        id="start-time"
                        type="time"
                        value={formData.startTime}
                        onValueChange={(value) => updateFormField("startTime", value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-time" className="text-xs">
                        Hora de fin
                      </Label>
                      <VoiceTextInput
                        id="end-time"
                        type="time"
                        value={formData.endTime}
                        onValueChange={(value) => updateFormField("endTime", value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Atrás
                  </Button>
                  <Button className="flex-1" onClick={handleCompleteRegistration}>
                    Completar registro
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <div className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-primary font-medium">
                Iniciar sesión
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
