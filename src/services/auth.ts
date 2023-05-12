import { Auth, LoginRestult } from '@interface'
import { signToken } from '../utils/jwt.handle'
import { encrypt, verify } from '../utils/password.handle'
import AuthModel from '../models/auth.model'

const registerUser = async ({ username, password }: Auth): Promise<string | Auth> => {
  try {
    const check = await AuthModel.findOne({ username })

    if (check !== null) return 'USER_ALREADY_EXIST'

    const encryptedPassword = await encrypt(password)
    const response = await AuthModel.create({ username, password: encryptedPassword })

    return response
  } catch (error) {
    return 'DATA_BASE_ERROR'
  }
}

const loginUser = async ({ username, password }: Auth): Promise<string | LoginRestult> => {
  const auth = await AuthModel.findOne({ username })

  if (auth === null) return 'USER_NOT_FOUND'

  const hash = auth.password
  const isCorrect = await verify(password, hash)

  if (!isCorrect) return 'WRONG_PASSWORD'

  const token = signToken(auth.username)
  return {
    token
  }
}

export { registerUser, loginUser }
