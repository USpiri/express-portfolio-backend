/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { deleteUser, getUser, getUsers, postUser, putUser } from '../controllers/user.controller'
import { checkSession } from '../middlewares/session.middleware'

const router = Router()

router.get('/:id', getUser)
router.get('/', checkSession, getUsers)
router.post('/', checkSession, postUser)
router.put('/:id', checkSession, putUser)
router.delete('/:id', checkSession, deleteUser)

export { router }
