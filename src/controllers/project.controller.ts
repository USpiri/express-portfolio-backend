import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import {
  createProject,
  findProject,
  findProjects,
  removeProject,
  updateProject
} from '../services/project'
import {
  deleteImageFromStorage,
  deleteThumbnailFromStorage,
  getFileName,
  imageHandle,
  thumbnailHandle
} from '../utils/image.handle'
import { Storage } from '../interfaces/storage.interface'
import { uploadFile } from '../services/storage'
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
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATE_PROJECT', { errorRaw: error })
  }
}

const putProjectImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { params, file, protocol } = req
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
    const filenameRandom = getFileName(file.originalname)

    await imageHandle(file.buffer, filenameRandom, {
      width: 1000,
      height: 1000,
      fit: fit.inside,
      withoutEnlargement: true
    })
    await thumbnailHandle(file.buffer, filenameRandom, { width: 400, withoutEnlargement: true })
    console.log(filenameRandom)

    const data: Storage = {
      filename: filenameRandom,
      userId: id,
      ext: file.mimetype,
      imageSrc: `${protocol}://${req.get('host') ?? ''}/image/${filenameRandom}`,
      thumbnailUrl: `${protocol}://${req.get('host') ?? ''}/thumbnail/${filenameRandom}`
    }

    const newFile = await uploadFile(data)
    project.image = newFile
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

    if (project.image !== undefined) {
      await deleteImageFromStorage(project.image.filename)
      await deleteThumbnailFromStorage(project.image.filename)
    }

    const response = await removeProject(id)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETE_PROJECT', { errorRaw: error })
  }
}

export { getProject, getProjects, postProject, putProject, deleteProject, putProjectImage }
