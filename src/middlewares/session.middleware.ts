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
    const decodedToken = verifyToken(jwt)

    if (decodedToken === null) {
      handleHttp(res, 'INVALID_TOKEN', { code: 401 })
      return
    }

    if (decodedToken.exp != null && Date.now() >= decodedToken.exp * 1000) {
      handleHttp(res, 'TOKEN_EXPIRED', { code: 401 })
      return
    }

    req.token = decodedToken
    next()
  } catch (error) {
    handleHttp(res, 'INVALID_SESSION', { code: 401, errorRaw: error })
  }
}

export { checkSession }
