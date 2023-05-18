import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

// const STORAGE_PATH = `${process.cwd()}/storage`

const storage = multer.memoryStorage()

// const storage = diskStorage({
//   destination(_req: Request, _file: Express.Multer.File, cb: any) {
//     cb(null, STORAGE_PATH)
//   },
//   filename(_req: Request, file: Express.Multer.File, cb: any) {
//     const ext = file.originalname.split('.').pop() ?? ''
//     const filenameRandom = `image-${Date.now()}.${ext}`
//     cb(null, filenameRandom)
//   }
// })

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  const allowedTypes = ['image/jpeg', 'image/png']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type'))
  }
}

const multerMiddleware = multer({ storage, fileFilter })
export default multerMiddleware
