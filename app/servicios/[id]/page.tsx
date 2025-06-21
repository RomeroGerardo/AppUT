"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { FaWhatsapp } from "react-icons/fa"

export default function ServicioDetallePage() {
  const params = useParams()
  const id = params?.id as string
  const [servicio, setServicio] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServicio = async () => {
      const { data, error } = await supabase.from("servicios").select("*").eq("id", id).single()
      setServicio(data)
      setLoading(false)
    }
    if (id) fetchServicio()
  }, [id])

  if (loading) return <div className="max-w-xl mx-auto mt-10">Cargando...</div>
  if (!servicio) return <div className="max-w-xl mx-auto mt-10">Servicio no encontrado.</div>

  const whatsappLink = servicio.whatsapp
    ? `https://wa.me/${servicio.whatsapp}?text=Hola!%20Estoy%20interesado%20en%20el%20servicio%20${encodeURIComponent(servicio.nombre)}`
    : null
  const phoneLink = !servicio.whatsapp && servicio.whatsapp
    ? `tel:${servicio.whatsapp}`
    : null

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      {servicio.imagen && (
        <img src={servicio.imagen} alt={servicio.nombre} className="w-full h-48 object-cover rounded mb-4" />
      )}
      <h1 className="text-2xl font-bold mb-2">{servicio.nombre}</h1>
      <p className="mb-2 text-gray-700">{servicio.descripcion}</p>
      {servicio.precio && <p className="text-indigo-600 font-semibold mb-2">Precio: ${servicio.precio}</p>}
      {servicio.categoria && <p className="text-sm text-gray-500 mb-2">Categoría: {servicio.categoria}</p>}
      {whatsappLink && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 transition"
        >
          <FaWhatsapp /> Contratar Servicio por WhatsApp
        </a>
      )}
      {!whatsappLink && phoneLink && (
        <a
          href={phoneLink}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition"
        >
          Llamar al proveedor
        </a>
      )}
      {!whatsappLink && !phoneLink && (
        <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition" disabled>
          No disponible para contratar por WhatsApp
        </button>
      )}
      {servicio.latitud && servicio.longitud && (
        <div className="my-4">
          <iframe
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: '8px' }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${servicio.latitud},${servicio.longitud}&z=15&output=embed`}
          ></iframe>
        </div>
      )}
    </div>
  )
} 