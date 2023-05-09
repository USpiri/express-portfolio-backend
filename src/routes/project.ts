/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  deleteProject,
  getProject,
  getProjects,
  postProject,
  putProject
} from '../controllers/project.controller'

const router = Router()

router.get('/:id', getProject)
router.get('/', getProjects)
router.post('/', postProject)
router.put('/:id', putProject)
router.delete('/:id', deleteProject)

export { router }
