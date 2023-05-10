import { TokenResult } from '@interface'
import { sign, verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECTRET ?? 'default.sectret.key'

const signToken = (id: string): string => {
  return sign({ id }, JWT_SECRET, {
    expiresIn: '24h'
  })
}

const verifyToken = (jwt: string): TokenResult | null => {
  try {
    const decoded = verify(jwt, JWT_SECRET, {
      ignoreExpiration: false
    })
    if (typeof decoded === 'string') {
      return null
    }
    return {
      id: decoded.id,
      exp: decoded.exp
    }
  } catch (error) {
    return null
  }
}

export { signToken, verifyToken }
