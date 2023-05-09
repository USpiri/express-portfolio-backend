import { User } from '@interface'
import UserModel from '../models/user.model'

const createUser = async (user: User): Promise<User> => {
  return await UserModel.create(user)
}

const getUser = async (id: string): Promise<User | null> => {
  return await UserModel.findOne({ _id: id })
}

const getUsers = async (): Promise<User[]> => {
  return await UserModel.find({})
}

const updateUser = async (id: string, user: User): Promise<User | null> => {
  return await UserModel.findOneAndUpdate({ _id: id }, user, {
    // retorna el objeto actualizado
    new: true
  })
}

const deleteUser = async (id: string): Promise<User | null> => {
  return await UserModel.findOne({ _id: id })
}

export { createUser, getUser, getUsers, updateUser, deleteUser }
