import { Request, Response } from 'express'
import { loginUser, registerUser } from '../services/auth'
import { handleHttp } from '../utils/error.handle'

const registerAdmin = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const response = await registerUser(body)

    if (typeof response === 'string') {
      handleHttp(res, response, { code: 409 })
      return
    }

    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_REGISTER_USER', { errorRaw: error })
  }
}

const loginAdmin = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = body
    const response = await loginUser({ username, password })

    if (typeof response === 'string') {
      handleHttp(res, response, { code: 401 })
      return
    }

    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_LOGIN_USER', { errorRaw: error })
  }
}

export { registerAdmin, loginAdmin }
