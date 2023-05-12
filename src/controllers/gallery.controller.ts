import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { ExtendedRequest, Image, ImageType } from '@interface'
import fs from 'fs'
import {
  findImage,
  findImages,
  findImagesByType,
  removeImage,
  uploadImage
} from '../services/gallery'
import { isValidImageType } from '../utils/image.handle'

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
    const response = type === undefined ? await findImages() : await findImagesByType(type)
    if (response.length === 0 && type !== undefined) {
      handleHttp(res, 'ERROR_INVALID_IMAGE_TYPE', { code: 400 })
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
      fs.unlinkSync(file.path)
      return
    }
    if (token === undefined) return

    const data: Image = {
      filename: file.filename,
      path: file.path,
      userId: token.id,
      ext: file.mimetype,
      imageSrc: `${req.protocol}://${req.get('host') ?? ''}/image/${file.filename}`,
      thumbnailUrl: `${req.protocol}://${req.get('host') ?? ''}/thumbnail/${file.filename}`,
      type: type as ImageType
    }

    const response = await uploadImage(data)
    res.send(response)
  } catch (error) {
    const { file } = req
    if (file !== undefined) fs.unlinkSync(file.path)
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
    fs.unlinkSync(image.path)
    const response = await removeImage(id)
    res.send(response)
  } catch (error) {
    const { file } = req
    if (file !== undefined) fs.unlinkSync(file.path)
    handleHttp(res, 'ERROR_DELETE_IMAGE', { errorRaw: error })
  }
}

export { getImage, getImages, postImage, deleteImage }
