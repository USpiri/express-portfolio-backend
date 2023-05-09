/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { deleteUser, getUser, getUsers, postUser, putUser } from '../controllers/user.controller'

const router = Router()

router.get('/:id', getUser)
router.get('/', getUsers)
router.post('/', postUser)
router.put('/:id', putUser)
router.delete('/:id', deleteUser)

export { router }
