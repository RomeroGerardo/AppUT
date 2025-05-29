"use client"
import { MobileNav } from "@/components/mobile-nav"
import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Briefcase, Wrench, Scissors, Leaf } from "lucide-react"
import { VoiceSearch } from "@/components/voice-search"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Datos de ejemplo
const featuredServices = [
  { id: "1", name: "Carlos Rodríguez", category: "Plomería", rating: 4.8, distance: "1.2 km" },
  { id: "2", name: "María González", category: "Electricidad", rating: 4.5, distance: "0.8 km" },
  { id: "3", name: "Juan Pérez", category: "Jardinería", rating: 4.9, distance: "2.5 km" },
  { id: "4", name: "Ana Martínez", category: "Limpieza", rating: 4.7, distance: "1.5 km" },
]

const categories = [
  { id: "plomeria", name: "Plomería", icon: <Wrench className="h-6 w-6" /> },
  { id: "electricidad", name: "Electricidad", icon: <Briefcase className="h-6 w-6" /> },
  { id: "jardineria", name: "Jardinería", icon: <Leaf className="h-6 w-6" /> },
  { id: "estetica", name: "Estética", icon: <Scissors className="h-6 w-6" /> },
]

export default function Home() {
  const router = useRouter()

  const handleSearch = (query: string) => {
    router.push(`/buscar?q=${encodeURIComponent(query)}`)
  }

  return (
    <main>
      <MobileNav />

      <div className="container px-4 py-6 max-w-5xl mx-auto">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bienvenido a Universo Trabajo</h1>
          <p className="text-muted-foreground">Encuentra los mejores profesionales cerca de ti</p>

          <div className="mt-6 flex gap-2">
            <VoiceSearch className="flex-1" onSearch={handleSearch} />
            <Button variant="outline" size="icon">
              <MapPin className="h-4 w-4" />
            </Button>
            <Button>Buscar</Button>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-2 items-center justify-center">
            <p className="text-sm text-muted-foreground">¿Eres un profesional y quieres ofrecer tus servicios?</p>
            <Button variant="outline" asChild>
              <Link href="/registro">Regístrate como proveedor</Link>
            </Button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categorías</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Button key={category.id} variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
                <a href={`/buscar?categoria=${category.id}`}>
                  <div className="p-2 rounded-full bg-primary/10">{category.icon}</div>
                  <span>{category.name}</span>
                </a>
              </Button>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Servicios destacados</h2>
            <Button variant="link" asChild>
              <a href="/buscar">Ver todos</a>
            </Button>
          </div>

          <Tabs defaultValue="cercanos">
            <TabsList className="mb-4">
              <TabsTrigger value="cercanos">Cercanos</TabsTrigger>
              <TabsTrigger value="populares">Populares</TabsTrigger>
              <TabsTrigger value="recientes">Recientes</TabsTrigger>
            </TabsList>

            <TabsContent value="cercanos" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </TabsContent>

            <TabsContent value="populares" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...featuredServices]
                .sort((a, b) => b.rating - a.rating)
                .map((service) => (
                  <ServiceCard key={service.id} {...service} />
                ))}
            </TabsContent>

            <TabsContent value="recientes" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...featuredServices].reverse().map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  )
}
