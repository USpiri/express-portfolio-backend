import { User } from '@interface'
import UserModel from '../models/user.model'
import { DeleteResult } from '../interfaces/result.interface'

const createUser = async (user: User): Promise<User> => {
  return await UserModel.create(user)
}

const findUser = async (id: string): Promise<User | null> => {
  return await UserModel.findOne({ _id: id })
}

const findUsers = async (): Promise<User[]> => {
  return await UserModel.find({})
}

const updateUser = async (id: string, user: User): Promise<User | null> => {
  return await UserModel.findOneAndUpdate({ _id: id }, user, {
    // retorna el objeto actualizado
    new: true
  })
}

const removeUser = async (id: string): Promise<DeleteResult> => {
  return await UserModel.deleteOne({ _id: id })
}

export { createUser, findUser, findUsers, updateUser, removeUser }
