/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { loginAdmin, registerAdmin } from '../controllers/auth.controller'
import { checkSession } from '../middlewares/session.middleware'

const router = Router()

router.post('/register', checkSession, registerAdmin)
router.post('/login', loginAdmin)

export { router }
