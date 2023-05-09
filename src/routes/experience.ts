/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  deleteExperience,
  getExperience,
  getExperiences,
  postExperience,
  putExperience
} from '../controllers/experience.controller'

const router = Router()

router.get('/:id', getExperience)
router.get('/', getExperiences)
router.post('/', postExperience)
router.put('/:id', putExperience)
router.delete('/:id', deleteExperience)

export { router }
