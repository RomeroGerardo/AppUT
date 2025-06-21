"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

const links = [
  { href: "/", label: "Inicio" },
  { href: "/perfil", label: "Mi Perfil" },
  { href: "/servicios", label: "Servicios" },
  { href: "/mis-servicios", label: "Mis Servicios" },
  { href: "/registro", label: "Registrarse" },
]

export default function Menu() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <nav className="w-full bg-gray-100 py-3 mb-6 shadow">
      <ul className="flex justify-center gap-6 items-center">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`px-3 py-1 rounded hover:bg-indigo-200 transition-colors ${pathname === link.href ? "bg-indigo-600 text-white" : "text-gray-800"}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          {user ? (
            <button
              onClick={signOut}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Cerrar Sesión
            </button>
          ) : (
            <Link
              href="/login"
              className={`px-3 py-1 rounded hover:bg-indigo-200 transition-colors ${pathname === "/login" ? "bg-indigo-600 text-white" : "text-gray-800"}`}
            >
              Iniciar Sesión
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
} 