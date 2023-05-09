import { NextFunction, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { verifyToken } from '../utils/jwt.handle'
import { ExtendedRequest } from '@interface'

const checkSession = (req: ExtendedRequest, res: Response, next: NextFunction): void => {
  try {
    const header = req.headers.authorization

    if (header == null) {
      handleHttp(res, 'NOT_AUTHORIZED', { code: 401 })
      return
    }

    const jwt = header.split(' ').pop() ?? ''
    const decodedToken = verifyToken(jwt) as { id: string }

    if (decodedToken === null) {
      handleHttp(res, 'INVALID_TOKEN', { code: 401 })
      return
    }

    req.id = decodedToken
    next()
  } catch (error) {
    handleHttp(res, 'INVALID_SESSION', { code: 401, errorRaw: error })
  }
}

export { checkSession }
