/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  deleteSkill,
  getSkill,
  getSkills,
  postSkill,
  putSkill
} from '../controllers/skill.controller'
import { checkSession } from '../middlewares/session.middleware'

const router = Router()

router.get('/:id', getSkill)
router.get('/', getSkills)
router.post('/', checkSession, postSkill)
router.put('/:id', checkSession, putSkill)
router.delete('/:id', checkSession, deleteSkill)

export { router }
