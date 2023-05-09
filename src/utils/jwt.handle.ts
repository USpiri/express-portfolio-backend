import { JwtPayload, sign, verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECTRET ?? 'default.sectret.key'

const signToken = (id: string): string => {
  return sign({ id }, JWT_SECRET, {
    expiresIn: '24h'
  })
}

const verifyToken = (jwt: string): string | JwtPayload | null => {
  try {
    return verify(jwt, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export { signToken, verifyToken }
