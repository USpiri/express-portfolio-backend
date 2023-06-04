import sharp from 'sharp'
import { imageHandler } from '../interfaces/handlers.interface'

const isValidImageType = (type: string): boolean => {
  return type === 'NATURE' || type === 'PORTRAIT'
}

const imageHandle = async (file: Buffer, options: imageHandler): Promise<string> => {
  const base64Image = await sharp(file).resize(options).toBuffer()
  return `data:image/jpeg;base64,${imageToBase64(base64Image)}`
}

const imageToBase64 = (image: Buffer): string => {
  return image.toString('base64')
}

export { isValidImageType, imageHandle, imageToBase64 }
