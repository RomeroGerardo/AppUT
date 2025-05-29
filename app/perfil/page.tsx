"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, MapPin, Phone, Save, Upload, Calendar, Settings, FileText, MessageSquare, LogOut } from "lucide-react"
import { VoiceTextInput } from "@/components/voice-text-input"
import { VoiceTextarea } from "@/components/voice-textarea"

// Simulamos un estado de proveedor registrado
// En una implementación real, esto vendría de una base de datos o estado global
const PROVIDER_REGISTERED = false

export default function PerfilPage() {
  const router = useRouter()

  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    name: "Juan Pérez",
    category: "jardineria",
    phone: "+52 123 456 7890",
    address: "Calle Principal 123, Ciudad de México",
    description:
      "Soy un profesional con experiencia en servicios de jardinería. Ofrezco servicios de calidad y puntualidad.",
    servicePrice: "250",
  })

  const updateFormField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Si el usuario no está registrado como proveedor, mostrar pantalla de registro
  if (!PROVIDER_REGISTERED) {
    return (
      <main className="pb-20">
        <MobileNav />
        <div className="container px-4 py-6 max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Perfil de proveedor</CardTitle>
              <CardDescription>Regístrate como proveedor para ofrecer tus servicios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">¿Quieres ofrecer tus servicios?</h3>
                <p className="text-muted-foreground mb-4">
                  Regístrate como proveedor para poder ofrecer tus servicios a miles de usuarios
                </p>
                <Button size="lg" className="w-full sm:w-auto" onClick={() => router.push("/registro")}>
                  <FileText className="mr-2 h-5 w-5" />
                  Registrarme como proveedor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  // Si el usuario ya está registrado como proveedor, mostrar su perfil
  return (
    <main className="pb-20">
      <MobileNav />

      <div className="container px-4 py-6 max-w-5xl mx-auto">
        <section className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Mi perfil de proveedor</h1>

          <Tabs defaultValue="info">
            <TabsList className="w-full mb-6 overflow-x-auto">
              <TabsTrigger value="info" className="flex-1">
                <User className="h-4 w-4 mr-2" />
                <span className="truncate">Información</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                <span className="truncate">Servicios</span>
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="truncate">Horario</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span className="truncate">Mensajes</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                <span className="truncate">Ajustes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Información personal</CardTitle>
                  <CardDescription>Actualiza tu información de perfil como proveedor</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary mb-2">
                      J
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Cambiar foto
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <VoiceTextInput
                        id="name"
                        value={formData.name}
                        onValueChange={(value) => updateFormField("name", value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="category">Categoría de servicio</Label>
                      <Select value={formData.category} onValueChange={(value) => updateFormField("category", value)}>
                        <SelectTrigger>
                          <SelectValue />
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

                    <div className="grid gap-2">
                      <Label htmlFor="phone">Teléfono de contacto</Label>
                      <div className="flex gap-2">
                        <VoiceTextInput
                          id="phone"
                          value={formData.phone}
                          onValueChange={(value) => updateFormField("phone", value)}
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon" className="shrink-0">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="address">Dirección de trabajo</Label>
                      <div className="flex gap-2">
                        <VoiceTextInput
                          id="address"
                          value={formData.address}
                          onValueChange={(value) => updateFormField("address", value)}
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon" className="shrink-0">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">Descripción de tus servicios</Label>
                      <VoiceTextarea
                        id="description"
                        rows={4}
                        value={formData.description}
                        onValueChange={(value) => updateFormField("description", value)}
                      />
                    </div>

                    <Button className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Guardar cambios
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Mis servicios</CardTitle>
                  <CardDescription>Administra los servicios que ofreces</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Servicios activos</h3>
                      <Button size="sm">Añadir servicio</Button>
                    </div>

                    <div className="space-y-2">
                      {["Reparación de fugas", "Instalación de grifos", "Desatascos de tuberías"].map(
                        (service, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                            <div>
                              <div className="font-medium">{service}</div>
                              <div className="text-sm text-muted-foreground">Desde $250</div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Editar
                              </Button>
                              <Button variant="outline" size="sm" className="text-destructive">
                                Eliminar
                              </Button>
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="pt-4">
                      <Label htmlFor="service-price">Precio por hora (promedio)</Label>
                      <div className="flex gap-2 mt-1">
                        <VoiceTextInput
                          id="service-price"
                          type="number"
                          value={formData.servicePrice}
                          onValueChange={(value) => updateFormField("servicePrice", value)}
                          className="flex-1"
                        />
                        <Select defaultValue="mxn">
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Mi horario</CardTitle>
                  <CardDescription>Configura tu disponibilidad</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[
                      { day: "Lunes", start: "08:00", end: "18:00", active: true },
                      { day: "Martes", start: "08:00", end: "18:00", active: true },
                      { day: "Miércoles", start: "08:00", end: "18:00", active: true },
                      { day: "Jueves", start: "08:00", end: "18:00", active: true },
                      { day: "Viernes", start: "08:00", end: "18:00", active: true },
                      { day: "Sábado", start: "09:00", end: "14:00", active: true },
                      { day: "Domingo", start: "00:00", end: "00:00", active: false },
                    ].map((schedule, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="font-medium w-24">{schedule.day}</div>
                        <div className="flex items-center gap-2 flex-1">
                          <VoiceTextInput
                            type="time"
                            defaultValue={schedule.start}
                            className="w-24"
                            disabled={!schedule.active}
                          />
                          <span>a</span>
                          <VoiceTextInput
                            type="time"
                            defaultValue={schedule.end}
                            className="w-24"
                            disabled={!schedule.active}
                          />
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <Switch checked={schedule.active} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-4">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar horario
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Mensajes</CardTitle>
                  <CardDescription>Gestiona tus conversaciones con clientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <MessageSquare className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No tienes mensajes</h3>
                    <p className="text-muted-foreground mb-4">
                      Aquí aparecerán los mensajes de tus clientes interesados en tus servicios
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Ajustes</CardTitle>
                  <CardDescription>Configura tu cuenta de proveedor</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="pr-4">
                      <h3 className="font-medium">Perfil visible</h3>
                      <p className="text-sm text-muted-foreground">Mostrar tu perfil en las búsquedas</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="pr-4">
                      <h3 className="font-medium">Notificaciones</h3>
                      <p className="text-sm text-muted-foreground">Recibir notificaciones de nuevos clientes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="pr-4">
                      <h3 className="font-medium">Ubicación en tiempo real</h3>
                      <p className="text-sm text-muted-foreground">Permitir acceso a tu ubicación</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="pr-4">
                      <h3 className="font-medium">Datos bancarios</h3>
                      <p className="text-sm text-muted-foreground">Configura tus métodos de pago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>

                  <div className="pt-4">
                    <Button variant="destructive" className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar sesión
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  )
}
