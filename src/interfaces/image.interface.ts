import { Storage } from './storage.interface'

export interface Image extends Omit<Storage, '_id'> {
  type: ImageType
}

export type ImageType = 'NATURE' | 'PORTRAIT'

export enum ImageTypeE {
  NATURE,
  PORTRAIT
}
