import { Schema, model } from 'mongoose'
import { Project } from '@interface'
import { StorageShema } from './storage.model'

const ProjectShema = new Schema<Project>(
  {
    title: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    longDescription: {
      type: String,
      required: true
    },
    github: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    image: {
      type: StorageShema,
      required: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const ProjectModel = model('projects', ProjectShema)
export default ProjectModel
