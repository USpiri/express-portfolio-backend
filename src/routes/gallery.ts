/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { checkSession } from '../middlewares/session.middleware'
import { deleteImage, getImage, getImages, postImage } from '../controllers/gallery.controller'
import multerMiddleware from '../middlewares/storage.middleware'

const router = Router()

router.get('/:id', getImage)
router.get('/', getImages)
router.post('/', checkSession, multerMiddleware.single('image'), postImage)
router.delete('/:id', checkSession, deleteImage)

export { router }
