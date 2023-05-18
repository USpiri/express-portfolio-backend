import { ResizeOptions } from 'sharp'

export interface ErrorHandlerExtra {
  code?: number
  errorRaw?: any
}

export interface imageHandler extends ResizeOptions {}
