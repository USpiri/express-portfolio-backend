/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  deleteProject,
  getProject,
  getProjects,
  postProject,
  putProject
} from '../controllers/project.controller'
import { checkSession } from '../middlewares/session.middleware'

const router = Router()

router.get('/:id', getProject)
router.get('/', getProjects)
router.post('/', checkSession, postProject)
router.put('/:id', checkSession, putProject)
router.delete('/:id', checkSession, deleteProject)

export { router }
