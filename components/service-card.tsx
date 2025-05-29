import { Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface ServiceCardProps {
  id: string
  name: string
  category: string
  rating: number
  distance: string
  image?: string
}

export function ServiceCard({ id, name, category, rating, distance, image }: ServiceCardProps) {
  return (
    <Link href={`/proveedor/${id}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-md h-full">
        <div className="aspect-video bg-muted relative">
          {image ? (
            <img src={image || "/placeholder.svg"} alt={name} className="object-cover w-full h-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <span className="text-primary font-bold text-xl">{name.charAt(0)}</span>
            </div>
          )}
          <Badge className="absolute top-2 right-2">{distance}</Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg truncate">{name}</h3>
          <p className="text-muted-foreground text-sm">{category}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex items-center">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted"}`}
                />
              ))}
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
