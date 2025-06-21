import { supabase } from './supabase'
import type { Usuario, Servicio, Reseña, Favorito } from './types'

// Funciones para Usuarios
export async function getUsuario(id: string) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Usuario
}

export async function createUsuario(usuario: Omit<Usuario, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('usuarios')
    .insert([usuario])
    .select()
    .single()
  
  if (error) throw error
  return data as Usuario
}

// Funciones para Servicios
export async function getServiciosByUsuario(usuarioId: string) {
  const { data, error } = await supabase
    .from('servicios')
    .select('*')
    .eq('proveedor_id', usuarioId)
  
  if (error) throw error
  return data as Servicio[]
}

// Funciones para Reseñas
export async function getReseñasByProveedor(proveedorId: string) {
  const { data, error } = await supabase
    .from('reseñas')
    .select('*')
    .eq('proveedor_id', proveedorId)
  
  if (error) throw error
  return data as Reseña[]
}

export async function createReseña(reseña: Omit<Reseña, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('reseñas')
    .insert([reseña])
    .select()
    .single()
  
  if (error) throw error
  return data as Reseña
}

// Funciones para Favoritos
export async function getFavoritosByUsuario(usuarioId: string) {
  const { data, error } = await supabase
    .from('favoritos')
    .select('*, usuarios(*)')
    .eq('usuario_id', usuarioId)
  
  if (error) throw error
  return data as (Favorito & { usuarios: Usuario })[]
}

export async function toggleFavorito(usuarioId: string, proveedorId: string) {
  const { data: existingFavorito, error: checkError } = await supabase
    .from('favoritos')
    .select('id')
    .eq('usuario_id', usuarioId)
    .eq('proveedor_id', proveedorId)
    .single()

  if (checkError && checkError.code !== 'PGRST116') throw checkError

  if (existingFavorito) {
    const { error } = await supabase
      .from('favoritos')
      .delete()
      .eq('id', existingFavorito.id)
    if (error) throw error
    return false
  } else {
    const { error } = await supabase
      .from('favoritos')
      .insert([{ usuario_id: usuarioId, proveedor_id: proveedorId }])
    if (error) throw error
    return true
  }
} 