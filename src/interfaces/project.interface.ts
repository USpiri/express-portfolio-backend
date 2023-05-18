import { Storage } from './storage.interface'

export interface Project {
  title: string
  tags: string[]
  description: string
  longDescription: string
  github: string
  link: string
  image: Storage
}
