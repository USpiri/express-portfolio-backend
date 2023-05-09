/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  deleteExperience,
  getExperience,
  getExperiences,
  postExperience,
  putExperience
} from '../controllers/experience.controller'
import { checkSession } from '../middlewares/session.middleware'

const router = Router()

router.get('/:id', getExperience)
router.get('/', getExperiences)
router.post('/', checkSession, postExperience)
router.put('/:id', checkSession, putExperience)
router.delete('/:id', checkSession, deleteExperience)

export { router }
