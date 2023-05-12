/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  putUser,
  putUserImage
} from '../controllers/user.controller'
import { checkSession } from '../middlewares/session.middleware'
import multerMiddleware from '../middlewares/storage.middleware'

const router = Router()

router.get('/:id', getUser)
router.get('/', getUsers)
router.post('/', checkSession, postUser)
router.put('/:id', checkSession, putUser)
router.put('/image/:id', checkSession, multerMiddleware.single('profile-image'), putUserImage)
router.delete('/:id', checkSession, deleteUser)

export { router }
