import { JwtPayload } from 'jsonwebtoken'

export interface DeleteResult {
  acknowledged: boolean
  deletedCount: number
}

export interface LoginRestult {
  token: string
}

export interface TokenResult extends JwtPayload {
  id: string
  exp?: number // Agregar esta propiedad
}
