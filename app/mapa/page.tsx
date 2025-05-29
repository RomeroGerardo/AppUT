"use client"

import { useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VoiceSearch } from "@/components/voice-search"
import { MapPin, List, MapIcon, Navigation } from "lucide-react"

// Datos de ejemplo
const providers = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    category: "Plomería",
    rating: 4.8,
    distance: "1.2 km",
    lat: 19.432608,
    lng: -99.133209,
  },
  {
    id: "2",
    name: "María González",
    category: "Electricidad",
    rating: 4.5,
    distance: "0.8 km",
    lat: 19.436608,
    lng: -99.135209,
  },
  {
    id: "3",
    name: "Juan Pérez",
    category: "Jardinería",
    rating: 4.9,
    distance: "2.5 km",
    lat: 19.430608,
    lng: -99.131209,
  },
  {
    id: "4",
    name: "Ana Martínez",
    category: "Limpieza",
    rating: 4.7,
    distance: "1.5 km",
    lat: 19.434608,
    lng: -99.137209,
  },
]

export default function MapaPage() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map")

  return (
    <main className="pb-20">
      <MobileNav />

      <div className="container px-4 py-6 max-w-5xl mx-auto">
        <section className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Proveedores cercanos</h1>

          <div className="flex gap-2 mb-4">
            <VoiceSearch className="flex-1" />
            <Button variant="outline" size="icon">
              <MapPin className="h-4 w-4" />
            </Button>
            <Button>
              <MapPin className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Buscar</span>
            </Button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">Mostrando proveedores en un radio de 5 km</div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Lista</span>
              </Button>
              <Button variant={viewMode === "map" ? "default" : "outline"} size="sm" onClick={() => setViewMode("map")}>
                <MapIcon className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Mapa</span>
              </Button>
            </div>
          </div>
        </section>

        {viewMode === "map" ? (
          <div className="relative">
            <div className="bg-muted rounded-lg aspect-[4/3] md:aspect-[16/9] flex items-center justify-center">
              <div className="text-center p-4">
                <MapIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Mapa interactivo con la ubicación de los proveedores cercanos</p>
                <Button className="mt-4">
                  <Navigation className="h-4 w-4 mr-2" />
                  Usar mi ubicación
                </Button>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 max-h-[40vh] overflow-y-auto">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Proveedores cercanos</h3>
                  <div className="space-y-2">
                    {providers.map((provider) => (
                      <div
                        key={provider.id}
                        className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                      >
                        <div>
                          <div className="font-medium truncate">{provider.name}</div>
                          <div className="text-sm text-muted-foreground">{provider.category}</div>
                        </div>
                        <div className="text-sm">{provider.distance}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {providers.map((provider) => (
              <Card key={provider.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold truncate">{provider.name}</h3>
                      <div className="text-sm text-muted-foreground">{provider.category}</div>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1 text-muted-foreground shrink-0" />
                        <span className="text-xs text-muted-foreground">{provider.distance}</span>
                      </div>
                    </div>
                    <Button asChild>
                      <a href={`/proveedor/${provider.id}`}>Ver perfil</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
