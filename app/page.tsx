"use client"
import { MobileNav } from "@/components/mobile-nav"
import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Briefcase, Wrench, Scissors, Leaf } from "lucide-react"
import { VoiceSearch } from "@/components/voice-search"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import { useAuth } from "@/hooks/useAuth"
import { FaWhatsapp } from "react-icons/fa"

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

type Servicio = {
  id: string
  nombre: string
  descripcion: string
  precio?: number
  proveedor_id?: string
  categoria?: string
  imagen?: string
  whatsapp?: string
}

const IMAGEN_DEFAULT = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"

export default function Home() {
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth()
  const [servicios, setServicios] = useState<Servicio[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('usuarios').select('*');
      if (!error) setUsers(data || []);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const { data, error } = await supabase
          .from("servicios")
          .select("*")
          .order('created_at', { ascending: false })
        
        if (error) {
          console.error('Error al cargar servicios:', error)
          return
        }
        
        if (data) {
          setServicios(data)
        }
      } catch (err) {
        console.error('Error inesperado:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchServicios()
  }, [])

  const handleSearch = (query: string) => {
    router.push(`/buscar?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">
        ¡Bienvenido{user ? `, ${user.nombre}` : ""} a Universo Trabajo!
      </h1>
      <p className="text-lg mb-8">
        Explora, edita tu perfil, agrega servicios y encuentra lo que necesitas.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Servicios destacados</h2>
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-500">Cargando servicios...</p>
        </div>
      ) : servicios.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No hay servicios disponibles en este momento.</p>
          {!user && (
            <p className="text-sm text-gray-400">
              Inicia sesión para ver más servicios o crear uno nuevo.
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {servicios.map((servicio) => (
            <Link key={servicio.id} href={`/servicios/${servicio.id}`} className="border rounded p-4 shadow hover:shadow-lg transition flex flex-col cursor-pointer bg-white hover:bg-gray-50">
              <img src={servicio.imagen || IMAGEN_DEFAULT} alt={servicio.nombre} className="w-full h-32 object-cover rounded mb-2" />
              <h3 className="font-bold text-lg mb-2">{servicio.nombre}</h3>
              <p className="mb-2 text-gray-700">{servicio.descripcion}</p>
              {servicio.precio && (
                <p className="text-indigo-600 font-semibold mb-1">Precio: ${servicio.precio}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
