import { Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { Storage, ExtendedRequest } from '@interface'
import { uploadFile } from '../services/storage'
import fs from 'fs'

const getFile = async (req: ExtendedRequest, res: Response): Promise<void> => {
  try {
    const { token, file } = req

    if (file === undefined) {
      handleHttp(res, 'ERROR_FILE_NOT_PROVIDED', { code: 400 })
      return
    }
    if (token === undefined) return

    const data: Storage = {
      filename: file.filename,
      path: file.path,
      userId: token.id,
      ext: file.mimetype,
      imageSrc: `${req.protocol}://${req.get('host') ?? ''}/image/${file.filename}`,
      thumbnailUrl: `${req.protocol}://${req.get('host') ?? ''}/thumbnail/${file.filename}`
    }

    const response = await uploadFile(data)
    res.send(response)
  } catch (e) {
    const { file } = req
    if (file !== undefined) fs.unlinkSync(file.path)
    handleHttp(res, 'ERROR_GETTING_FILE', { errorRaw: e })
  }
}

export { getFile }
