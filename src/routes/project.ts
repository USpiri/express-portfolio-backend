/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  deleteProject,
  getProject,
  getProjects,
  postProject,
  putProject,
  putProjectImage
} from '../controllers/project.controller'
import { checkSession } from '../middlewares/session.middleware'
import multerMiddleware from '../middlewares/storage.middleware'

const routerProject = Router()

routerProject.get('/:id', getProject)
routerProject.get('/', getProjects)
routerProject.post('/', checkSession, postProject)
routerProject.put('/:id', checkSession, putProject)
routerProject.put(
  '/image/:id',
  checkSession,
  multerMiddleware.single('project-image'),
  putProjectImage
)
routerProject.delete('/:id', checkSession, deleteProject)

export { routerProject }
