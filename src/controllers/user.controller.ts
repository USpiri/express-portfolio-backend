import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { createUser, findUser, findUsers, removeUser, updateUser } from '../services/user'
import { uploadFile } from '../services/storage'
import { deleteImageFromStorage, getFileName, imageHandle } from '../utils/image.handle'
import { Storage } from '../interfaces/storage.interface'

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

    if (user === null) {
      handleHttp(res, 'ERROR_USER_NOT_FOUND', { code: 404 })
      return
    }
    if (file === null || file === undefined) {
      handleHttp(res, 'ERROR_FILE_NOT_PROVIDED', { code: 400 })
      return
    }
    if (user.image !== null && user.image !== undefined) {
      await deleteImageFromStorage(user.image.filename)
    }
    const filenameRandom = getFileName(file.originalname)

    await imageHandle(file.buffer, filenameRandom, {
      width: 800,
      height: 800,
      withoutEnlargement: true
    })

    const data: Storage = {
      filename: filenameRandom,
      src: `${protocol}://${req.get('host') ?? ''}/image/${filenameRandom}`
    }

    const newFile = await uploadFile(data)
    user.image = newFile
    const response = await updateUser(id, user)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATE_USER', { errorRaw: error })
  }
}

const deleteUser = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const user = await findUser(id)

    if (user === null) {
      handleHttp(res, 'ERROR_USER_NOT_FOUND', { code: 404 })
      return
    }

    if (user.image !== null && user.image !== undefined) {
      await deleteImageFromStorage(user.image.filename)
    }
    const response = await removeUser(id)

    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETE_USER', { errorRaw: error })
  }
}

export { getUser, getUsers, postUser, putUser, deleteUser, putUserImage }
