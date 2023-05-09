import { Skill } from '@interface'
import SkillModel from '../models/skill.model'
import { DeleteResult } from '../interfaces/result.interface'

const createSkill = async (skill: Skill): Promise<Skill> => {
  return await SkillModel.create(skill)
}

const findSkill = async (id: string): Promise<Skill | null> => {
  return await SkillModel.findOne({ _id: id })
}

const findSkills = async (): Promise<Skill[]> => {
  return await SkillModel.find({})
}

const updateSkill = async (id: string, skill: Skill): Promise<Skill | null> => {
  return await SkillModel.findOneAndUpdate({ _id: id }, skill, {
    // retorna el objeto actualizado
    new: true
  })
}

const removeSkill = async (id: string): Promise<DeleteResult> => {
  return await SkillModel.deleteOne({ _id: id })
}

export { createSkill, findSkill, findSkills, updateSkill, removeSkill }
