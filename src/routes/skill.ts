/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  deleteSkill,
  getSkill,
  getSkills,
  postSkill,
  putSkill
} from '../controllers/skill.controller'

const router = Router()

router.get('/:id', getSkill)
router.get('/', getSkills)
router.post('/', postSkill)
router.put('/:id', putSkill)
router.delete('/:id', deleteSkill)

export { router }
