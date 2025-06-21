"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/lib/supabase"
import dynamic from "next/dynamic"

const MapWithNoSSR = dynamic(() => import("@/components/MapaInteractivo"), { ssr: false })

export default function ServiciosPage() {
  const { user } = useAuth()
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: null as File | null,
    latitud: "",
    longitud: "",
    whatsapp: ""
  })
  const [mensaje, setMensaje] = useState("")
  const [subiendo, setSubiendo] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as any
    if (type === "file") {
      setForm({ ...form, imagen: files[0] })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleGeolocalizar = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setForm(f => ({ ...f, latitud: pos.coords.latitude.toString(), longitud: pos.coords.longitude.toString() }))
      })
    }
  }

  const handleMapChange = (lat: number, lng: number) => {
    setForm(f => ({ ...f, latitud: lat.toString(), longitud: lng.toString() }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensaje("")
    setSubiendo(true)
    let imagen_url = ""
    if (form.imagen) {
      const nombreArchivo = `${user?.id}-${Date.now()}-${form.imagen.name}`
      const { data, error: uploadError } = await supabase.storage.from("servicios").upload(nombreArchivo, form.imagen)
      if (uploadError) {
        setMensaje("Error al subir imagen: " + uploadError.message)
        setSubiendo(false)
        return // Detener el proceso si hay un error de subida
      }
      if (data) {
        const { data: publicUrl } = supabase.storage.from("servicios").getPublicUrl(nombreArchivo)
        imagen_url = publicUrl.publicUrl
      }
    }
    const { error: insertError } = await supabase
      .from("servicios")
      .insert({
        proveedor_id: user?.id,
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: form.precio ? parseFloat(form.precio) : null,
        imagen: imagen_url,
        latitud: form.latitud,
        longitud: form.longitud,
        whatsapp: form.whatsapp
      })
    setSubiendo(false)
    if (insertError) {
      setMensaje("Error al agregar servicio: " + insertError.message)
    } else {
      setMensaje("Servicio agregado correctamente")
      setForm({ nombre: "", descripcion: "", precio: "", imagen: null, latitud: "", longitud: "", whatsapp: "" })
    }
  }

  if (!user) return <div>Debes iniciar sesión</div>

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Agregar Servicio</h2>
      {mensaje && <div className="mb-4 text-green-600">{mensaje}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" value={form.nombre} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Nombre del servicio" required />
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Descripción" required />
        <input name="precio" value={form.precio} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Precio (opcional)" type="number" min="0" />
        <input name="imagen" type="file" accept="image/*" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className="w-full border p-2 rounded" placeholder="WhatsApp (opcional)" />
        <div className="flex gap-2">
          <input name="latitud" value={form.latitud} onChange={handleChange} disabled className="w-1/2 border p-2 rounded" placeholder="Latitud" />
          <input name="longitud" value={form.longitud} onChange={handleChange} disabled className="w-1/2 border p-2 rounded" placeholder="Longitud" />
          <button type="button" onClick={handleGeolocalizar} className="bg-indigo-500 text-white px-2 rounded">Ubicarme</button>
        </div>
        <div className="my-4">
          <MapWithNoSSR
            lat={form.latitud ? parseFloat(form.latitud) : -34.6}
            lng={form.longitud ? parseFloat(form.longitud) : -58.4}
            onChange={handleMapChange}
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded" disabled={subiendo}>{subiendo ? "Subiendo..." : "Agregar"}</button>
      </form>
    </div>
  )
} 