import { Storage } from './storage.interface'

export interface Image extends Storage {
  type: ImageType
}

export type ImageType = 'NATURE' | 'PORTRAIT'

export enum ImageTypeE {
  NATURE,
  PORTRAIT
}
