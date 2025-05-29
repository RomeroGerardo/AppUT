"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, MapPin, Menu, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import Image from "next/image"
// Importar el componente HeaderActions
import { HeaderActions } from "@/components/header-actions"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Inicio",
      icon: <Home className="h-5 w-5" />,
      active: pathname === "/",
    },
    {
      href: "/buscar",
      label: "Buscar",
      icon: <Search className="h-5 w-5" />,
      active: pathname === "/buscar" || pathname.startsWith("/buscar?"),
    },
    {
      href: "/mapa",
      label: "Mapa",
      icon: <MapPin className="h-5 w-5" />,
      active: pathname === "/mapa",
    },
    {
      href: "/perfil",
      label: "Perfil",
      icon: <FileText className="h-5 w-5" />,
      active: pathname === "/perfil",
    },
  ]

  return (
    <>
      {/* Añadir el componente HeaderActions en la barra superior */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background border-b">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-6 py-4">
              <div className="flex items-center justify-center">
                <Image src="/logo.png" alt="Universo Trabajo" width={100} height={100} className="rounded-full" />
              </div>
              <nav className="flex flex-col gap-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 text-lg rounded-md hover:bg-accent ${
                      route.active ? "bg-accent" : ""
                    }`}
                  >
                    {route.icon}
                    {route.label}
                  </Link>
                ))}
                <div className="border-t my-2"></div>
                <Link
                  href="/registro"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-lg rounded-md hover:bg-accent text-primary"
                >
                  <FileText className="h-5 w-5" />
                  Registrarse como proveedor
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Universo Trabajo" width={40} height={40} className="rounded-full" />
          <span className="font-bold text-xl hidden sm:inline">Universo Trabajo</span>
        </Link>

        <div className="flex items-center gap-2">
          <HeaderActions />
          <ThemeToggle />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
        <nav className="flex justify-around">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`flex flex-col items-center py-3 px-2 ${
                route.active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {route.icon}
              <span className="text-xs mt-1 text-center">{route.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="pb-20 pt-16">{/* Espacio para el contenido principal */}</div>
    </>
  )
}
