import { Schema, model } from 'mongoose'
import { Experience } from '@interface'

const ExperienceShema = new Schema<Experience>(
  {
    jobTitle: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const ExperienceModel = model('experiences', ExperienceShema)
export default ExperienceModel
