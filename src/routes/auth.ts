/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { loginAdmin, registerAdmin } from '../controllers/auth.controller'

const router = Router()

router.post('/register', registerAdmin)
router.post('/login', loginAdmin)

export { router }
