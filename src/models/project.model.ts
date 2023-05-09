import { Schema, model } from 'mongoose'
import { Project } from '@interface'

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
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const ProjectModel = model('projects', ProjectShema)
export default ProjectModel
