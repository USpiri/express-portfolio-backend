import { Storage } from './storage.interface'

export interface User {
  name: string
  title: string
  description: string[]
  birthDate: Date
  phone: string
  email: string
  location: string
  image?: Storage
  media: SocialMedia
}

export interface SocialMedia {
  twitter: string
  github: string
  linkedin: string
  instagram: string
}
