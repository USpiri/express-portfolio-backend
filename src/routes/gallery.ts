/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { checkSession } from '../middlewares/session.middleware'
import { deleteImage, getImage, getImages, postImage } from '../controllers/gallery.controller'
import multerMiddleware from '../middlewares/storage.middleware'

const routerGallery = Router()

routerGallery.get('/single/:id', getImage)
routerGallery.get('/:type?', getImages)
routerGallery.post('/:type?', checkSession, multerMiddleware.single('image'), postImage)
routerGallery.delete('/:id', checkSession, deleteImage)

export { routerGallery }
