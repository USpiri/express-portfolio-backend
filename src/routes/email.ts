/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { sendEmail } from '../controllers/email.controller'

const routerEmail = Router()

routerEmail.post('/:id', sendEmail)

export { routerEmail }
