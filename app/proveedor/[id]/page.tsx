import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Phone, MapPin, MessageCircle, Calendar, Clock, ChevronLeft } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo
const provider = {
  id: "1",
  name: "Carlos Rodríguez",
  category: "Plomería",
  rating: 4.8,
  reviewCount: 124, // Cambiado de "reviews" a "reviewCount"
  phone: "+52 123 456 7890",
  address: "Calle Principal 123, Ciudad de México",
  description:
    "Plomero profesional con más de 10 años de experiencia en instalaciones, reparaciones y mantenimiento de sistemas de plomería residencial y comercial.",
  services: [
    "Reparación de fugas",
    "Instalación de grifos",
    "Desatascos de tuberías",
    "Instalación de calentadores",
    "Reparación de inodoros",
  ],
  reviews: [
    {
      id: "1",
      user: "María G.",
      rating: 5,
      date: "15/04/2023",
      comment: "Excelente servicio, muy profesional y puntual.",
    },
    {
      id: "2",
      user: "Juan P.",
      rating: 5,
      date: "02/03/2023",
      comment: "Resolvió el problema rápidamente. Muy recomendable.",
    },
    { id: "3", user: "Ana M.", rating: 4, date: "18/02/2023", comment: "Buen trabajo, aunque un poco caro." },
    {
      id: "4",
      user: "Roberto S.",
      rating: 5,
      date: "05/01/2023",
      comment: "Muy profesional y detallista. Volveré a contratarlo.",
    },
  ],
}

export default function ProviderPage({ params }: { params: { id: string } }) {
  return (
    <main className="pb-20">
      <MobileNav />

      <div className="container px-4 py-6 max-w-5xl mx-auto">
        <Link href="/buscar" className="flex items-center text-muted-foreground mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a resultados
        </Link>

        <div className="bg-muted rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl sm:text-3xl font-bold text-primary shrink-0">
              {provider.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold truncate">{provider.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge>{provider.category}</Badge>
                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(provider.rating) ? "fill-primary text-primary" : "text-muted"}`}
                      />
                    ))}
                  <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                  <span className="ml-1 text-sm text-muted-foreground">({provider.reviewCount} reseñas)</span>
                </div>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1 shrink-0" />
                <span className="text-sm truncate">{provider.address}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Button className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Llamar
              </Button>
              <Button variant="outline" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Mensaje
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="info">
          <TabsList className="w-full mb-6 overflow-x-auto">
            <TabsTrigger value="info" className="flex-1">
              Información
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">
              Reseñas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-xl font-semibold mb-3">Acerca de</h2>
                <p className="mb-6 break-words">{provider.description}</p>

                <h3 className="text-lg font-semibold mb-3">Servicios</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {provider.services.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2 mt-2"></div>
                      <span className="break-words">{service}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold mb-3">Horario</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground shrink-0" />
                    <span>Lunes a Viernes</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground shrink-0" />
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground shrink-0" />
                    <span>Sábados</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground shrink-0" />
                    <span>9:00 AM - 2:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                  <h2 className="text-xl font-semibold">Reseñas</h2>
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(provider.rating) ? "fill-primary text-primary" : "text-muted"}`}
                        />
                      ))}
                    <span className="ml-2 font-bold text-lg">{provider.rating}</span>
                    <span className="ml-1 text-sm text-muted-foreground">({provider.reviews.length})</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {provider.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between mb-2 flex-wrap gap-1">
                        <div className="font-medium">{review.user}</div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                      <div className="flex items-center mb-2">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                            />
                          ))}
                      </div>
                      <p className="text-sm break-words">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
