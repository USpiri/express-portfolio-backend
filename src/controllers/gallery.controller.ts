import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { ExtendedRequest, Image, ImageType } from '@interface'
import {
  findImage,
  findImages,
  findImagesByType,
  removeImage,
  uploadImage
} from '../services/gallery'
import { imageHandle, isValidImageType } from '../utils/image.handle'
import { fit } from 'sharp'

const getImage = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await findImage(id)
    if (response === null) {
      handleHttp(res, 'ERROR_IMAGE_NOT_FOUND', { code: 404 })
      return
    }
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GET_IMAGE', { errorRaw: error })
  }
}

const getImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type } = req.params
    if (type !== undefined && !isValidImageType(type)) {
      handleHttp(res, 'ERROR_INVALID_IMAGE_TYPE', { code: 400 })
      return
    }

    const response = type === undefined ? await findImages() : await findImagesByType(type)
    if (response.length === 0) {
      handleHttp(res, 'ERROR_NO_IMAGES', { code: 404 })
      return
    }

    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GET_IMAGES', { errorRaw: error })
  }
}

const postImage = async (req: ExtendedRequest, res: Response): Promise<void> => {
  try {
    const { file, token, params } = req
    const { type } = params

    if (file === undefined) {
      handleHttp(res, 'ERROR_FILE_NOT_PROVIDED', { code: 400 })
      return
    }

    if (!isValidImageType(type)) {
      handleHttp(res, 'ERROR_INVALID_IMAGE_TYPE', { code: 400 })
      return
    }
    if (token === undefined) return

    const optimizedImage = await imageHandle(file.buffer, {
      width: 2000,
      height: 2000,
      fit: fit.inside,
      withoutEnlargement: true
    })
    const optimizedThumbnail = await imageHandle(file.buffer, {
      width: 400,
      withoutEnlargement: true
    })

    const data: Image = {
      src: optimizedImage,
      thumbnail: optimizedThumbnail,
      type: type as ImageType
    }

    const response = await uploadImage(data)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_NEW_IMAGE', { errorRaw: error })
  }
}

const deleteImage = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await removeImage(id)
    if (response.deletedCount === 0) {
      handleHttp(res, 'ERROR_IMAGE_NOT_FOUND', { code: 404 })
      return
    }
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETE_IMAGE', { errorRaw: error })
  }
}

export { getImage, getImages, postImage, deleteImage }
