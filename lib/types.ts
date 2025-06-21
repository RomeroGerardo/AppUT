export type Usuario = {
  id: string
  email: string
  nombre: string
  apellido: string
  telefono?: string
  direccion?: string
  whatsapp?: string
  categoria?: string
  latitud?: string
  longitud?: string
  created_at: string
  updated_at: string
}

export type Servicio = {
  id: string
  proveedor_id: string // id del usuario
  nombre: string
  descripcion?: string
  precio?: number
  imagen?: string
  latitud?: string
  longitud?: string
  categoria?: string
  whatsapp?: string
  created_at?: string
  updated_at?: string
}

export type Reseña = {
  id: string
  usuario_id: string
  proveedor_id: string
  calificacion: number
  comentario?: string
  created_at: string
}

export type Favorito = {
  id: string
  usuario_id: string
  proveedor_id: string
  created_at: string
} 