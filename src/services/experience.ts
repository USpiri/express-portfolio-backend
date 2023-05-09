import { Experience, DeleteResult } from '@interface'
import ExperienceModel from '../models/experience.model'

const createExperience = async (experience: Experience): Promise<Experience> => {
  return await ExperienceModel.create(experience)
}

const findExperience = async (id: string): Promise<Experience | null> => {
  return await ExperienceModel.findOne({ _id: id })
}

const findExperiences = async (): Promise<Experience[]> => {
  return await ExperienceModel.find({})
}

const updateExperience = async (id: string, experience: Experience): Promise<Experience | null> => {
  return await ExperienceModel.findOneAndUpdate({ _id: id }, experience, {
    // retorna el objeto actualizado
    new: true
  })
}

const removeExperience = async (id: string): Promise<DeleteResult> => {
  return await ExperienceModel.deleteOne({ _id: id })
}

export { createExperience, findExperience, findExperiences, updateExperience, removeExperience }
