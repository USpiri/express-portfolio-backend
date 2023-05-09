import { Project, DeleteResult } from '@interface'
import ProjectModel from '../models/project.model'

const createProject = async (project: Project): Promise<Project> => {
  return await ProjectModel.create(project)
}

const findProject = async (id: string): Promise<Project | null> => {
  return await ProjectModel.findOne({ _id: id })
}

const findProjects = async (): Promise<Project[]> => {
  return await ProjectModel.find({})
}

const updateProject = async (id: string, project: Project): Promise<Project | null> => {
  return await ProjectModel.findOneAndUpdate({ _id: id }, project, {
    // retorna el objeto actualizado
    new: true
  })
}

const removeProject = async (id: string): Promise<DeleteResult> => {
  return await ProjectModel.deleteOne({ _id: id })
}

export { createProject, findProject, findProjects, updateProject, removeProject }
