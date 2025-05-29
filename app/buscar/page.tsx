"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { MobileNav } from "@/components/mobile-nav"
import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, MapPin, List, Map } from "lucide-react"
import { VoiceSearch } from "@/components/voice-search"

// Mapeo de categorías para mostrar nombres legibles
const categoryMap = {
  plomeria: "Plomería",
  electricidad: "Electricidad",
  jardineria: "Jardinería",
  estetica: "Estética",
  limpieza: "Limpieza",
  carpinteria: "Carpintería",
  todas: "Todas las categorías",
}

// Datos de ejemplo
const services = [
  { id: "1", name: "Carlos Rodríguez", category: "Plomería", rating: 4.8, distance: "1.2 km" },
  { id: "2", name: "María González", category: "Electricidad", rating: 4.5, distance: "0.8 km" },
  { id: "3", name: "Juan Pérez", category: "Jardinería", rating: 4.9, distance: "2.5 km" },
  { id: "4", name: "Ana Martínez", category: "Limpieza", rating: 4.7, distance: "1.5 km" },
  { id: "5", name: "Roberto Sánchez", category: "Plomería", rating: 4.3, distance: "3.0 km" },
  { id: "6", name: "Laura Torres", category: "Electricidad", rating: 4.6, distance: "2.2 km" },
  { id: "7", name: "Miguel Hernández", category: "Carpintería", rating: 4.4, distance: "1.8 km" },
  { id: "8", name: "Sofía Ramírez", category: "Pintura", rating: 4.2, distance: "2.7 km" },
]

export default function BuscarPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Obtener parámetros de la URL
  const categoriaParam = searchParams.get("categoria")
  const queryParam = searchParams.get("q")

  // Estados
  const [selectedCategory, setSelectedCategory] = useState(categoriaParam || "todas")
  const [searchQuery, setSearchQuery] = useState(queryParam || "")
  const [filteredServices, setFilteredServices] = useState(services)

  // Determinar el título según la categoría seleccionada
  const categoryTitle = categoriaParam
    ? `Servicios de ${categoryMap[categoriaParam] || "Profesionales"}`
    : queryParam
      ? `Resultados para "${queryParam}"`
      : "Buscar servicios"

  // Filtrar servicios cuando cambia la categoría o la búsqueda
  useEffect(() => {
    let filtered = [...services]

    if (categoriaParam && categoriaParam !== "todas") {
      const categoryName = categoryMap[categoriaParam]?.toLowerCase()
      if (categoryName) {
        filtered = filtered.filter((service) => service.category.toLowerCase() === categoryName)
      }
    }

    if (queryParam) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(queryParam.toLowerCase()) ||
          service.category.toLowerCase().includes(queryParam.toLowerCase()),
      )
    }

    setFilteredServices(filtered)
  }, [categoriaParam, queryParam])

  // Manejar cambio de categoría
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    router.push(`/buscar?categoria=${value}${queryParam ? `&q=${queryParam}` : ""}`)
  }

  // Manejar búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    router.push(`/buscar?q=${encodeURIComponent(query)}${categoriaParam ? `&categoria=${categoriaParam}` : ""}`)
  }

  return (
    <main className="pb-20">
      <MobileNav />

      <div className="container px-4 py-6 max-w-5xl mx-auto">
        <section className="mb-6">
          <h1 className="text-2xl font-bold mb-4 break-words">{categoryTitle}</h1>

          <div className="flex gap-2 mb-4">
            <VoiceSearch
              className="flex-1"
              placeholder="¿Qué servicio necesitas?"
              onSearch={handleSearch}
              value={searchQuery}
            />
            <Button variant="outline" size="icon">
              <MapPin className="h-4 w-4" />
            </Button>
            <Button onClick={() => handleSearch(searchQuery)}>
              <Search className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Buscar</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Categoría</label>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorías</SelectItem>
                  <SelectItem value="plomeria">Plomería</SelectItem>
                  <SelectItem value="electricidad">Electricidad</SelectItem>
                  <SelectItem value="jardineria">Jardinería</SelectItem>
                  <SelectItem value="limpieza">Limpieza</SelectItem>
                  <SelectItem value="carpinteria">Carpintería</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Distancia máxima</label>
              <div className="px-3">
                <Slider defaultValue={[5]} max={20} step={1} />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>0 km</span>
                  <span>5 km</span>
                  <span>10 km</span>
                  <span>15 km</span>
                  <span>20 km</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Calificación mínima</label>
              <Select defaultValue="0">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Todas las calificaciones</SelectItem>
                  <SelectItem value="3">3+ estrellas</SelectItem>
                  <SelectItem value="4">4+ estrellas</SelectItem>
                  <SelectItem value="4.5">4.5+ estrellas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Resultados ({filteredServices.length})</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <List className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Lista</span>
              </Button>
              <Button variant="outline" size="sm">
                <Map className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Mapa</span>
              </Button>
            </div>
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No se encontraron resultados para tu búsqueda</p>
              <Button onClick={() => router.push("/buscar")}>Ver todos los servicios</Button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
