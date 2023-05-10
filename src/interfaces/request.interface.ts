import { Request } from 'express'
import { TokenResult } from './result.interface'

export interface ExtendedRequest extends Request {
  token?: TokenResult
}
