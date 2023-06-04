import { Document } from 'mongoose'

export interface User extends Document {
  name: string
  title: string
  description: string[]
  birthDate: Date
  phone: string
  email: string
  location: string
  image?: string
  media: SocialMedia
}

export interface SocialMedia {
  twitter: string
  github: string
  linkedin: string
  instagram: string
}
