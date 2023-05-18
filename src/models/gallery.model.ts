import { Schema, model } from 'mongoose'
import { Image } from '../interfaces/image.interface'

export const GalleryShema = new Schema<Image>(
  {
    filename: {
      type: String,
      unique: true,
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
    },
    type: {
      type: String,
      enum: ['NATURE', 'PORTRAIT'],
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
