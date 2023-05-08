import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'

const getUser = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    res.send(body)
  } catch (error) {
    handleHttp(res, 'ERROR_GET_USER')
  }
}

const postUser = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    res.send(body)
  } catch (error) {
    handleHttp(res, 'ERROR_NEW_USER')
  }
}

const updateUser = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    res.send(body)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATE_USER')
  }
}

export { getUser, postUser, updateUser }
