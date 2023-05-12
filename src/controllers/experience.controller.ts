import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import {
  createExperience,
  findExperience,
  findExperiences,
  removeExperience,
  updateExperience
} from '../services/experience'

const getExperience = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await findExperience(id)

    if (response === null) {
      handleHttp(res, 'ERROR_EXPERIENCE_NOT_FOUND', { code: 404 })
      return
    }

    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GET_EXPERIENCE', { errorRaw: error })
  }
}

const getExperiences = async (_req: Request, res: Response): Promise<void> => {
  try {
    const response = await findExperiences()
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GET_EXPERIENCES', { errorRaw: error })
  }
}

const postExperience = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const response = await createExperience(body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_NEW_EXPERIENCE', { errorRaw: error })
  }
}

const putExperience = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await updateExperience(id, body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATE_EXPERIENCE', { errorRaw: error })
  }
}

const deleteExperience = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await removeExperience(id)
    if (response.deletedCount === 0) {
      handleHttp(res, 'ERROR_EXPERIENCE_NOT_FOUND', { code: 404 })
      return
    }
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETE_EXPERIENCE', { errorRaw: error })
  }
}

export { getExperience, getExperiences, postExperience, putExperience, deleteExperience }
