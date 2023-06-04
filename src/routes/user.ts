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

const routerUser = Router()

routerUser.get('/:id', getUser)
routerUser.get('/', getUsers)
routerUser.post('/', checkSession, postUser)
routerUser.put('/:id', checkSession, putUser)
routerUser.put('/image/:id', checkSession, multerMiddleware.single('profile-image'), putUserImage)
routerUser.delete('/:id', checkSession, deleteUser)

export { routerUser }
