/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { checkSession } from '../middlewares/session.middleware'
import multerMiddleware from '../middlewares/storage.middleware'
import { getFile } from '../controllers/storage.constroller'

const router = Router()

router.post('/', checkSession, multerMiddleware.single('file'), getFile)

export { router }
