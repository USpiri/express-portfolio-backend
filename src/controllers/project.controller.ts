import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import {
  createProject,
  findProject,
  findProjects,
  removeProject,
  updateProject
} from '../services/project'
import { imageHandle } from '../utils/image.handle'
import { fit } from 'sharp'

const getProject = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await findProject(id)
    if (response === null) {
      handleHttp(res, 'ERROR_PROJECT_NOT_FOUND', { code: 404 })
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
    if (response === null) {
      handleHttp(res, 'ERROR_PROJECT_NOT_FOUND', { code: 404 })
      return
    }
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATE_PROJECT', { errorRaw: error })
  }
}

const putProjectImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { params, file } = req
    const { id } = params
    const project = await findProject(id)

    if (project === null) {
      handleHttp(res, 'ERROR_PROJECT_NOT_FOUND', { code: 404 })
      return
    }
    if (file === null || file === undefined) {
      handleHttp(res, 'ERROR_FILE_NOT_PROVIDED', { code: 400 })
      return
    }

    project.image = await imageHandle(file.buffer, {
      width: 640,
      height: 800,
      fit: fit.inside,
      withoutEnlargement: true
    })

    const response = await updateProject(id, project)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATE_PROJECT_IMAGE', { errorRaw: error })
  }
}

const deleteProject = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const project = await findProject(id)
    if (project === null) {
      handleHttp(res, 'ERROR_PROJECT_NOT_FOUND', { code: 404 })
      return
    }

    const response = await removeProject(id)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETE_PROJECT', { errorRaw: error })
  }
}

export { getProject, getProjects, postProject, putProject, deleteProject, putProjectImage }
