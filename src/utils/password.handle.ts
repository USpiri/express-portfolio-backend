import { compare, hash } from 'bcryptjs'

const encrypt = async (password: string): Promise<string> => {
  return await hash(password, 10)
}

const verify = async (password: string, hash: string): Promise<boolean> => {
  return await compare(password, hash)
}

export { encrypt, verify }
