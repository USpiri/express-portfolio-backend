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

const router = Router()

router.get('/:id', getProject)
router.get('/', getProjects)
router.post('/', checkSession, postProject)
router.put('/:id', checkSession, putProject)
router.put('/image/:id', checkSession, multerMiddleware.single('project-image'), putProjectImage)
router.delete('/:id', checkSession, deleteProject)

export { router }
