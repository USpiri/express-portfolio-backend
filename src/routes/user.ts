/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getUser, postUser, updateUser } from '../controllers/user'

const router = Router()

router.get('/', getUser)
router.post('/', postUser)
router.put('/:id', updateUser)

export { router }
