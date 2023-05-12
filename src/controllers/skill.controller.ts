import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { createSkill, findSkill, findSkills, removeSkill, updateSkill } from '../services/skill'

const getSkill = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await findSkill(id)

    if (response === null) {
      handleHttp(res, 'ERROR_SKILL_NOT_FOUND', { code: 404 })
      return
    }

    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GET_SKILL', { errorRaw: error })
  }
}

const getSkills = async (_req: Request, res: Response): Promise<void> => {
  try {
    const response = await findSkills()
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GET_SKILL', { errorRaw: error })
  }
}

const postSkill = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const response = await createSkill(body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_NEW_SKILL', { errorRaw: error })
  }
}

const putSkill = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await updateSkill(id, body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATE_SKILL', { errorRaw: error })
  }
}

const deleteSkill = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await removeSkill(id)
    if (response.deletedCount === 0) {
      handleHttp(res, 'ERROR_SKILL_NOT_FOUND', { code: 404 })
      return
    }
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETE_SKILL', { errorRaw: error })
  }
}

export { getSkill, getSkills, postSkill, putSkill, deleteSkill }
