import { DeleteResult, Storage } from '@interface'
import StorageModel from '../models/storage.model'

const uploadFile = async (file: Storage): Promise<Storage> => {
  return await StorageModel.create(file)
}

const findFile = async (id: string): Promise<Storage | null> => {
  return await StorageModel.findOne({ _id: id })
}

const findFiles = async (): Promise<Storage[]> => {
  return await StorageModel.find({})
}

const updateFile = async (id: string, file: Storage): Promise<Storage | null> => {
  return await StorageModel.findOneAndUpdate({ _id: id }, file, {
    // retorna el objeto actualizado
    new: true
  })
}

const removeFile = async (filename: string): Promise<DeleteResult> => {
  return await StorageModel.deleteOne({ filename })
}

export { uploadFile, findFile, findFiles, updateFile, removeFile }
