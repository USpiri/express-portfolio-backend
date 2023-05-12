import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { createUser, findUser, findUsers, removeUser, updateUser } from '../services/user'
import { Storage } from '@interface'
import { findFile, removeFile, uploadFile } from '../services/storage'
import fs from 'fs'

const getUser = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await findUser(id)

    if (response === null) {
      handleHttp(res, 'ERROR_USER_NOT_FOUND', { code: 404 })
      return
    }

    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GET_USER', { errorRaw: error })
  }
}

const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const response = await findUsers()
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GET_USER', { errorRaw: error })
  }
}

const postUser = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const response = await createUser(body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_NEW_USER', { errorRaw: error })
  }
}

const putUser = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await updateUser(id, body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATE_USER', { errorRaw: error })
  }
}

const putUserImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { params, file, protocol } = req
    const { id } = params
    const user = await findUser(id)

    if (user?.image !== undefined) {
      const dataFile = await findFile(user?.image._id ?? '')
      if (dataFile !== null) {
        fs.unlinkSync(dataFile.path)
        await removeFile(dataFile.filename)
      }
    }
    if (user === null) {
      handleHttp(res, 'ERROR_USER_NOT_FOUND', { code: 404 })
      return
    }
    if (file === null || file === undefined) {
      handleHttp(res, 'ERROR_FILE_NOT_PROVIDED', { code: 400 })
      return
    }

    const data: Storage = {
      filename: file.filename,
      path: file.path,
      userId: id,
      ext: file.mimetype,
      imageSrc: `${protocol}://${req.get('host') ?? ''}/image/${file.filename}`,
      thumbnailUrl: `${protocol}://${req.get('host') ?? ''}/thumbnail/${file.filename}`
    }

    const newFile = await uploadFile(data)
    user.image = newFile
    const response = await updateUser(id, user)
    res.send(response)
  } catch (error) {
    const { file } = req
    if (file !== undefined) fs.unlinkSync(file.path)
    handleHttp(res, 'ERROR_UPDATE_USER', { errorRaw: error })
  }
}

const deleteUser = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await removeUser(id)
    if (response.deletedCount === 0) {
      handleHttp(res, 'ERROR_USER_NOT_FOUND', { code: 404 })
      return
    }
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETE_USER', { errorRaw: error })
  }
}

export { getUser, getUsers, postUser, putUser, deleteUser, putUserImage }
