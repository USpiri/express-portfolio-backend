import { Schema, model } from 'mongoose'
import { Auth } from '../interfaces/auth.interface'

const AuthShema = new Schema<Auth>(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
)

const AuthModel = model('auth', AuthShema)
export default AuthModel
