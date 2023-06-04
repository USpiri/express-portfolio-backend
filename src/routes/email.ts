/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { sendEmail } from '../controllers/email.controller'

const router = Router()

router.post('/:id', sendEmail)

export { router }
