import { Schema, model } from 'mongoose'
import { SocialMedia, User } from '@interface'
import { StorageShema } from './storage.model'

const SocialMediaShema = new Schema<SocialMedia>(
  {
    github: {
      type: String,
      required: true
    },
    twitter: {
      type: String,
      required: true
    },
    instagram: {
      type: String,
      required: true
    },
    linkedin: {
      type: String,
      required: true
    }
  },
  {
    id: false,
    versionKey: false
  }
)

const UserShema = new Schema<User>(
  {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: [String],
      required: true
    },
    birthDate: {
      type: Date,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    location: {
      type: String,
      required: true
    },
    image: {
      type: StorageShema
    },
    media: {
      type: SocialMediaShema,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const UserModel = model('users', UserShema)
export default UserModel
