import { Schema, model } from 'mongoose'
import { Storage } from '../interfaces/storage.interface'

export const StorageShema = new Schema<Storage>(
  {
    filename: {
      type: String,
      required: false
    },
    src: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const StorageModel = model('storage', StorageShema)
export default StorageModel
