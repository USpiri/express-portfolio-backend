/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { loginAdmin, registerAdmin } from '../controllers/auth.controller'
import { checkSession } from '../middlewares/session.middleware'

const routerAuth = Router()

routerAuth.post('/register', checkSession, registerAdmin)
routerAuth.post('/login', loginAdmin)

export { routerAuth }
