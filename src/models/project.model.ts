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
      required: false
    },
    link: {
      type: String,
      required: false
    },
    image: {
      type: String,
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
