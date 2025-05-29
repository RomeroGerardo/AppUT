"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, ChevronDown } from "lucide-react"

export function HeaderActions() {
  return (
    <div className="hidden sm:flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Opciones
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/registro">Registrarse como proveedor</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/login">Iniciar sesión</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button asChild>
        <Link href="/registro">
          <FileText className="mr-2 h-4 w-4" />
          Ofrecer servicios
        </Link>
      </Button>
    </div>
  )
}
