import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import {
  createProject,
  findProject,
  findProjects,
  removeProject,
  updateProject
} from '../services/project'

const getProject = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await findProject(id)

    if (response === null) {
      handleHttp(res, 'ERROR_PROJECT_NOT_FOUNT', { code: 404 })
      return
    }

    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GET_PROJECT', { errorRaw: error })
  }
}

const getProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const response = await findProjects()
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GET_PROJECTS', { errorRaw: error })
  }
}

const postProject = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const response = await createProject(body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_NEW_PROJECT', { errorRaw: error })
  }
}

const putProject = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await updateProject(id, body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATE_PROJECT', { errorRaw: error })
  }
}

const deleteProject = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await removeProject(id)
    if (response.deletedCount === 0) {
      handleHttp(res, 'ERROR_PROJECT_NOT_FOUND', { code: 404 })
      return
    }
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETE_PROJECT', { errorRaw: error })
  }
}

export { getProject, getProjects, postProject, putProject, deleteProject }
