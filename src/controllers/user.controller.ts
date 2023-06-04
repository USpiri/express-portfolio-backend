import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { createUser, findUser, findUsers, removeUser, updateUser } from '../services/user'
import { imageHandle } from '../utils/image.handle'

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
    if (response.length === 0) {
      handleHttp(res, 'ERROR_NOT_USERS_FOUND', { code: 404 })
      return
    }
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GET_USERS', { errorRaw: error })
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
    if (response === null) {
      handleHttp(res, 'ERROR_USER_NOT_FOUND', { code: 404 })
      return
    }
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATE_USER', { errorRaw: error })
  }
}

const putUserImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { params, file } = req
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

    const image = await imageHandle(file.buffer, {
      width: 800,
      height: 800,
      withoutEnlargement: true
    })
    user.image = image

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

    const response = await removeUser(id)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETE_USER', { errorRaw: error })
  }
}

export { getUser, getUsers, postUser, putUser, deleteUser, putUserImage }
