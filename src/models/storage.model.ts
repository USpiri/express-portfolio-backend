import { Schema, model } from 'mongoose'
import { Storage } from '../interfaces/storage.interface'

const StorageShema = new Schema<Storage>(
  {
    filename: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const StorageModel = model('storage', StorageShema)
export default StorageModel
