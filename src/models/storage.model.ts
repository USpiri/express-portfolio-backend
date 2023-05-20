import { Schema, model } from 'mongoose'
import { Storage } from '../interfaces/storage.interface'

export const StorageShema = new Schema<Storage>(
  {
    filename: {
      type: String,
      required: false
    },
    userId: {
      type: String
    },
    ext: {
      type: String
    },
    imageSrc: {
      type: String
    },
    thumbnailUrl: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const StorageModel = model('storage', StorageShema)
export default StorageModel
