import sharp from 'sharp'
import { imageHandler } from '../interfaces/handlers.interface'
import fs from 'fs'

const isValidImageType = (type: string): boolean => {
  return type === 'NATURE' || type === 'PORTRAIT'
}

const imageHandle = async (
  file: Buffer,
  fileName: string,
  options: imageHandler
): Promise<sharp.OutputInfo> => {
  return await sharp(file).resize(options).toFile(`./storage/images/${fileName}`)
}

const thumbnailHandle = async (
  file: Buffer,
  fileName: string,
  options: imageHandler
): Promise<sharp.OutputInfo> => {
  return await sharp(file).resize(options).toFile(`./storage/thumbnails/${fileName}`)
}

const getFileName = (originalname: string): string => {
  const ext = originalname.split('.').pop() ?? ''
  return `image-${Date.now()}.${ext}`
}

const deleteImageFromStorage = async (fileName: string): Promise<void> => {
  fs.unlinkSync(`./storage/images/${fileName}`)
}

const deleteThumbnailFromStorage = async (fileName: string): Promise<void> => {
  fs.unlinkSync(`./storage/thumbnails/${fileName}`)
}

export {
  isValidImageType,
  imageHandle,
  thumbnailHandle,
  getFileName,
  deleteImageFromStorage,
  deleteThumbnailFromStorage
}
