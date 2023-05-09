import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { createUser, findUser, findUsers, removeUser, updateUser } from '../services/user'
import { User } from '../interfaces/user.interface'

const getUser = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await findUser(id)

    if (response === null) {
      handleHttp(res, 'ERROR_USER_NOT_FOUNT', { code: 404 })
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
    const user = body as User
    const response = await updateUser(id, user)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATE_USER', { errorRaw: error })
  }
}

const deleteUser = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await removeUser(id)
    if (response.deletedCount === 0) {
      handleHttp(res, 'ERROR_ITEM_NOT_FOUND', { code: 404 })
      return
    }
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETE_ITEM', { errorRaw: error })
  }
}

export { getUser, getUsers, postUser, putUser, deleteUser }
