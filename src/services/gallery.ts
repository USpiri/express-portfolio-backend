import { DeleteResult, Image } from '@interface'
import GalleryModel from '../models/gallery.model'

const uploadImage = async (image: Image): Promise<Image> => {
  return await GalleryModel.create(image)
}

const findImage = async (id: string): Promise<Image | null> => {
  return await GalleryModel.findOne({ _id: id })
}

const findImages = async (): Promise<Image[]> => {
  return await GalleryModel.find({})
}

const findImagesByType = async (type: string): Promise<Image[]> => {
  return await GalleryModel.find({ type })
}

const updateImage = async (id: string, image: Image): Promise<Image | null> => {
  return await GalleryModel.findOneAndUpdate({ _id: id }, image, {
    // retorna el objeto actualizado
    new: true
  })
}

const removeImage = async (id: string): Promise<DeleteResult> => {
  return await GalleryModel.deleteOne({ _id: id })
}

export { uploadImage, findImage, findImages, updateImage, removeImage, findImagesByType }
