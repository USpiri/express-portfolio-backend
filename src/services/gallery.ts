import { DeleteResult, Storage } from '@interface'
import GalleryModel from '../models/gallery.model'

const uploadImage = async (image: Storage): Promise<Storage> => {
  return await GalleryModel.create(image)
}

const findImage = async (id: string): Promise<Storage | null> => {
  return await GalleryModel.findOne({ _id: id })
}

const findImages = async (): Promise<Storage[]> => {
  return await GalleryModel.find({})
}

const updateImage = async (id: string, image: Storage): Promise<Storage | null> => {
  return await GalleryModel.findOneAndUpdate({ _id: id }, image, {
    // retorna el objeto actualizado
    new: true
  })
}

const removeImage = async (id: string): Promise<DeleteResult> => {
  return await GalleryModel.deleteOne({ _id: id })
}

export { uploadImage, findImage, findImages, updateImage, removeImage }
