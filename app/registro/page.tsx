"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter, useSearchParams } from 'next/navigation'
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { VoiceTextInput } from "@/components/voice-text-input"
import { supabase } from '../../lib/supabaseClient'
import { FaBroom, FaTools, FaBolt, FaLeaf, FaTruck, FaUserAlt, FaDog, FaLaptop } from "react-icons/fa"

const categorias = [
  { nombre: "Limpieza", icon: <FaBroom />, color: "bg-blue-100", id: "limpieza" },
  { nombre: "Plomería", icon: <FaTools />, color: "bg-green-100", id: "plomeria" },
  { nombre: "Electricidad", icon: <FaBolt />, color: "bg-yellow-100", id: "electricidad" },
  { nombre: "Jardinería", icon: <FaLeaf />, color: "bg-lime-100", id: "jardineria" },
  { nombre: "Delivery", icon: <FaTruck />, color: "bg-orange-100", id: "delivery" },
  { nombre: "Belleza", icon: <FaUserAlt />, color: "bg-pink-100", id: "belleza" },
  { nombre: "Mascotas", icon: <FaDog />, color: "bg-amber-100", id: "mascotas" },
  { nombre: "Tecnología", icon: <FaLaptop />, color: "bg-indigo-100", id: "tecnologia" },
]

type Servicio = {
  id: string
  nombre: string
  descripcion: string
  precio: number
  duracion_estimada: number
  proveedor_id: string
  categoria?: string
  proveedor?: string
}

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: ''
  })
  const [error, setError] = useState('')
  const { signUp } = useAuth()
  const router = useRouter()
  const [registroExitoso, setRegistroExitoso] = useState(false)
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const { user } = useAuth()
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState("")
  const [ubicacion, setUbicacion] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const { email, password, ...userData } = formData
      await signUp(email, password, { ...userData, email })
      setRegistroExitoso(true)
    } catch (err: any) {
      setError(err?.message || 'Error al registrar usuario. Por favor, intenta de nuevo.')
      console.error(err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    const fetchServicios = async () => {
      const { data, error } = await supabase.from("servicios").select("*")
      if (!error && data) setServicios(data)
      setLoading(false)
    }
    fetchServicios()
  }, [])

  // Simulación de cantidad de servicios por categoría
  const serviciosPorCategoria = (cat: string) =>
    servicios.filter(s => s.categoria === cat).length || Math.floor(Math.random() * 200 + 50)

  if (registroExitoso) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold mb-4">¡Registro exitoso!</h2>
          <p className="mb-4">
            Te enviamos un correo de confirmación. Por favor, revisa tu bandeja de entrada y confirma tu cuenta antes de iniciar sesión.
          </p>
          <button
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={() => router.push('/login?message=confirma_email')}
          >
            Ir a Iniciar Sesión
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear una cuenta
          </h2>
        </div>
        {message === 'confirma_email' && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            Te enviamos un correo de confirmación. Por favor, revisa tu bandeja de entrada antes de iniciar sesión.
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.apellido}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <input
                id="direccion"
                name="direccion"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrarse
            </button>
          </div>
        </form>
        <div className="text-sm text-center mt-4">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">Iniciar sesión</a>
        </div>
      </div>
    </div>
  )
}










