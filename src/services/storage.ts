import { Storage } from '@interface'
import StorageModel from '../models/storage.model'

const uploadFile = async ({ filename, userId, path }: Storage): Promise<Storage> => {
  return await StorageModel.create({ filename, userId, path })
}

export { uploadFile }
