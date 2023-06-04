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

const routerExperience = Router()

routerExperience.get('/:id', getExperience)
routerExperience.get('/', getExperiences)
routerExperience.post('/', checkSession, postExperience)
routerExperience.put('/:id', checkSession, putExperience)
routerExperience.delete('/:id', checkSession, deleteExperience)

export { routerExperience }
