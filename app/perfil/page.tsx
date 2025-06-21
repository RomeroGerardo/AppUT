"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/lib/supabase"
import dynamic from "next/dynamic"

const categorias = [
  "Limpieza",
  "Plomería",
  "Electricidad",
  "Jardinería",
  "Delivery",
  "Belleza",
  "Mascotas",
  "Tecnología",
  "Otro"
]

const MapWithNoSSR = dynamic(() => import("@/components/MapaInteractivo"), { ssr: false })

export default function PerfilPage() {
  const { user, loading } = useAuth()
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    whatsapp: "",
    direccion: "",
    categoria: "",
    latitud: "",
    longitud: ""
  })
  const [editando, setEditando] = useState(false)
  const [mensaje, setMensaje] = useState("")

  useEffect(() => {
    if (user) {
      setForm({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        telefono: user.telefono || "",
        whatsapp: user.whatsapp || "",
        direccion: user.direccion || "",
        categoria: user.categoria || "",
        latitud: user.latitud || "",
        longitud: user.longitud || ""
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
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
    const { error } = await supabase
      .from("usuarios")
      .update(form)
      .eq("id", user?.id)
    if (error) {
      setMensaje("Error al actualizar perfil")
    } else {
      setMensaje("Perfil actualizado correctamente")
      setEditando(false)
    }
  }

  if (loading) return <div>Cargando...</div>
  if (!user) return <div>Debes iniciar sesión</div>

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      {mensaje && <div className="mb-4 text-green-600">{mensaje}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" value={form.nombre} onChange={handleChange} disabled={!editando} className="w-full border p-2 rounded" placeholder="Nombre" />
        <input name="apellido" value={form.apellido} onChange={handleChange} disabled={!editando} className="w-full border p-2 rounded" placeholder="Apellido" />
        <input name="telefono" value={form.telefono} onChange={handleChange} disabled={!editando} className="w-full border p-2 rounded" placeholder="Teléfono" />
        <input name="whatsapp" value={form.whatsapp} onChange={handleChange} disabled={!editando} className="w-full border p-2 rounded" placeholder="WhatsApp" />
        <input name="direccion" value={form.direccion} onChange={handleChange} disabled={!editando} className="w-full border p-2 rounded" placeholder="Dirección" />
        <select name="categoria" value={form.categoria} onChange={handleChange} disabled={!editando} className="w-full border p-2 rounded">
          <option value="">Selecciona una categoría</option>
          {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <div className="flex gap-2">
          <input name="latitud" value={form.latitud} onChange={handleChange} disabled className="w-1/2 border p-2 rounded" placeholder="Latitud" />
          <input name="longitud" value={form.longitud} onChange={handleChange} disabled className="w-1/2 border p-2 rounded" placeholder="Longitud" />
          {editando && <button type="button" onClick={handleGeolocalizar} className="bg-indigo-500 text-white px-2 rounded">Ubicarme</button>}
        </div>
        {editando && (
          <div className="my-4">
            <MapWithNoSSR
              lat={form.latitud ? parseFloat(form.latitud) : -34.6}
              lng={form.longitud ? parseFloat(form.longitud) : -58.4}
              onChange={handleMapChange}
            />
          </div>
        )}
        {editando ? (
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Guardar</button>
        ) : (
          <button type="button" onClick={() => setEditando(true)} className="w-full bg-gray-300 py-2 rounded">Editar</button>
        )}
      </form>
      {form.latitud && form.longitud && !editando && (
        <div className="my-4">
          <iframe
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: '8px' }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${form.latitud},${form.longitud}&z=15&output=embed`}
          ></iframe>
        </div>
      )}
    </div>
  )
}
