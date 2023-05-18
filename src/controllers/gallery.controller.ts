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
import {
  deleteImageFromStorage,
  deleteThumbnailFromStorage,
  getFileName,
  imageHandle,
  isValidImageType,
  thumbnailHandle
} from '../utils/image.handle'
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
    const filenameRandom = getFileName(file.originalname)

    await imageHandle(file.buffer, filenameRandom, {
      width: 2000,
      height: 2000,
      fit: fit.inside,
      withoutEnlargement: true
    })
    await thumbnailHandle(file.buffer, filenameRandom, { width: 400, withoutEnlargement: true })

    const data: Image = {
      filename: filenameRandom,
      userId: token.id,
      ext: file.mimetype,
      imageSrc: `${req.protocol}://${req.get('host') ?? ''}/image/${filenameRandom}`,
      thumbnailUrl: `${req.protocol}://${req.get('host') ?? ''}/thumbnail/${filenameRandom}`,
      type: type as ImageType
    }

    const response = await uploadImage(data)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_NEW_IMAGE', { errorRaw: error })
  }
}

const deleteImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { params } = req
    const { id } = params
    const image = await findImage(id)
    if (image === null) {
      handleHttp(res, 'ERROR_IMAGE_NOT_FOUND', { code: 404 })
      return
    }

    await deleteImageFromStorage(image.filename)
    await deleteThumbnailFromStorage(image.filename)

    const response = await removeImage(id)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETE_IMAGE', { errorRaw: error })
  }
}

export { getImage, getImages, postImage, deleteImage }
