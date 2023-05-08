import { Schema, model } from 'mongoose'
import { User } from '@interface'

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
      required: true
    },
    location: {
      type: String,
      required: true
    },
    image: {
      type: String,
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
