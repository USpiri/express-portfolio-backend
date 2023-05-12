import { Schema, model } from 'mongoose'
import { Storage } from '@interface'

export const GalleryShema = new Schema<Storage>(
  {
    filename: {
      type: String,
      unique: true,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    ext: {
      type: String,
      required: true
    },
    imageSrc: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const GalleryModel = model('gallery', GalleryShema)
export default GalleryModel
