"use client"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/lib/supabase"
import dynamic from "next/dynamic"

const IMAGEN_DEFAULT = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
const MapWithNoSSR = dynamic(() => import("@/components/MapaInteractivo"), { ssr: false })

export default function MisServiciosPage() {
  const { user } = useAuth()
  const [servicios, setServicios] = useState<any[]>([])
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio: "", imagen: "", latitud: "", longitud: "", whatsapp: "" })
  const [mensaje, setMensaje] = useState("")

  useEffect(() => {
    if (user) {
      console.log("Fetching services for user ID:", user.id)
      supabase.from("servicios").select("*").eq("proveedor_id", user.id).then(({ data, error }) => {
        if (error) {
          console.error("Error fetching user services:", error)
        }
        if (data) {
          setServicios(data)
          console.log("Fetched services:", data)
        }
      })
    }
  }, [user])

  const handleEdit = (servicio: any) => {
    setEditId(servicio.id)
    setForm({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      precio: servicio.precio || "",
      imagen: servicio.imagen || "",
      latitud: servicio.latitud || "",
      longitud: servicio.longitud || "",
      whatsapp: servicio.whatsapp || ""
    })
  }

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleMapChange = (lat: number, lng: number) => {
    setForm(f => ({ ...f, latitud: lat.toString(), longitud: lng.toString() }))
  }

  const handleSave = async (id: string) => {
    if (!user) {
      setMensaje("Debes iniciar sesión para guardar cambios.")
      return
    }

    try {
      console.log("Intentando actualizar servicio con ID:", id);
      console.log("Datos del formulario:", form);

      // Validar que los campos requeridos no estén vacíos
      if (!form.nombre || !form.descripcion) {
        setMensaje("El nombre y la descripción son obligatorios");
        return;
      }

      const updateData = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: form.precio ? parseFloat(form.precio) : null,
        imagen: form.imagen || null,
        latitud: form.latitud || null,
        longitud: form.longitud || null,
        whatsapp: form.whatsapp || null,
        updated_at: new Date().toISOString()
      };

      console.log("Datos a actualizar:", updateData);

      const { data, error } = await supabase
        .from("servicios")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error al actualizar servicio:", error);
        setMensaje("Error al actualizar: " + error.message);
        return;
      }

      console.log("Servicio actualizado exitosamente:", data);
      setMensaje("Servicio actualizado correctamente");
      setEditId(null);

      // Actualizar la lista de servicios
      const { data: updatedServices, error: fetchError } = await supabase
        .from("servicios")
        .select("*")
        .eq("proveedor_id", user.id);

      if (fetchError) {
        console.error("Error al actualizar la lista:", fetchError);
      } else {
        setServicios(updatedServices);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setMensaje("Error inesperado al actualizar el servicio");
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este servicio?")) return
    const { error } = await supabase.from("servicios").delete().eq("id", id)
    if (!error) {
      setMensaje("Servicio eliminado")
      setServicios(servicios.filter(s => s.id !== id))
    } else {
      setMensaje("Error al eliminar")
    }
  }

  if (!user) return <div>Debes iniciar sesión</div>

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Mis Servicios</h2>
      {mensaje && <div className="mb-4 text-green-600">{mensaje}</div>}
      {servicios.length === 0 ? (
        <p>No tienes servicios creados.</p>
      ) : (
        <ul className="space-y-4">
          {servicios.map(servicio => (
            <li key={servicio.id} className="border rounded p-4 flex flex-col gap-2">
              <img src={servicio.imagen || IMAGEN_DEFAULT} alt={servicio.nombre} className="w-full h-24 object-cover rounded mb-2" />
              <div className="font-bold">{servicio.nombre}</div>
              <div>{servicio.descripcion}</div>
              {servicio.precio && <div className="text-indigo-600">Precio: ${servicio.precio}</div>}
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(servicio)} className="bg-gray-300 px-3 py-1 rounded">Editar</button>
                <button onClick={() => handleDelete(servicio.id)} className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
              </div>
              {editId === servicio.id && (
                <div className="mt-2">
                  <input name="nombre" value={form.nombre} onChange={handleChange} className="border p-2 rounded mb-2 w-full" />
                  <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="border p-2 rounded mb-2 w-full" />
                  <input name="precio" value={form.precio} onChange={handleChange} className="border p-2 rounded mb-2 w-full" placeholder="Precio (opcional)" type="number" min="0" />
                  <input name="imagen" value={form.imagen} onChange={handleChange} className="border p-2 rounded mb-2 w-full" placeholder="URL de imagen" />
                  <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className="border p-2 rounded mb-2 w-full" placeholder="WhatsApp (opcional)" />
                  <div className="my-4">
                    <MapWithNoSSR
                      lat={form.latitud ? parseFloat(form.latitud) : -34.6}
                      lng={form.longitud ? parseFloat(form.longitud) : -58.4}
                      onChange={handleMapChange}
                    />
                  </div>
                  <button onClick={() => handleSave(servicio.id)} className="bg-indigo-600 text-white px-4 py-2 rounded mr-2">Guardar</button>
                  <button onClick={() => setEditId(null)} className="text-gray-500">Cancelar</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
} 