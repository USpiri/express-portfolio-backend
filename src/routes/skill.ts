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

const routerSkill = Router()

routerSkill.get('/:id', getSkill)
routerSkill.get('/', getSkills)
routerSkill.post('/', checkSession, postSkill)
routerSkill.put('/:id', checkSession, putSkill)
routerSkill.delete('/:id', checkSession, deleteSkill)

export { routerSkill }
