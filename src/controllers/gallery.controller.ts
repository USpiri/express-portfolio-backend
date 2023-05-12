import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { ExtendedRequest, Storage } from '@interface'
import fs from 'fs'
import { findImage, findImages, removeImage, uploadImage } from '../services/gallery'

const getImage = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await findImage(id)

    if (response === null) {
      handleHttp(res, 'ERROR_IMAGE_NOT_FOUNT', { code: 404 })
      return
    }

    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GET_IMAGE', { errorRaw: error })
  }
}

const getImages = async (_req: Request, res: Response): Promise<void> => {
  try {
    const response = await findImages()
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GET_IMAGES', { errorRaw: error })
  }
}

const postImage = async (req: ExtendedRequest, res: Response): Promise<void> => {
  try {
    const { file, token } = req

    if (file === undefined) {
      handleHttp(res, 'ERROR_FILE_NOT_PROVIDED', { code: 400 })
      return
    }
    if (token === undefined) return

    const data: Storage = {
      filename: file.filename,
      path: file.path,
      userId: token.id,
      ext: file.mimetype,
      imageSrc: `${req.protocol}://${req.get('host') ?? ''}/image/${file.filename}`,
      thumbnailUrl: `${req.protocol}://${req.get('host') ?? ''}/thumbnail/${file.filename}`
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
