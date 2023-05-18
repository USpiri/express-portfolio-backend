import { Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { Storage, ExtendedRequest } from '@interface'
import { uploadFile } from '../services/storage'
import { fit } from 'sharp'
import { getFileName, imageHandle, thumbnailHandle } from '../utils/image.handle'

const getFile = async (req: ExtendedRequest, res: Response): Promise<void> => {
  try {
    const { token, file } = req

    if (file === undefined) {
      handleHttp(res, 'ERROR_FILE_NOT_PROVIDED', { code: 400 })
      return
    }
    if (token === undefined) return

    const filenameRandom = getFileName(file.originalname)

    await imageHandle(file.buffer, filenameRandom, {
      width: 2000,
      height: 2000,
      fit: fit.inside,
      withoutEnlargement: true
    })
    await thumbnailHandle(file.buffer, filenameRandom, { width: 400, withoutEnlargement: true })

    const data: Storage = {
      filename: filenameRandom,
      userId: token.id,
      ext: file.mimetype,
      imageSrc: `${req.protocol}://${req.get('host') ?? ''}/image/${filenameRandom}`,
      thumbnailUrl: `${req.protocol}://${req.get('host') ?? ''}/thumbnail/${filenameRandom}`
    }

    const response = await uploadFile(data)
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_GETTING_FILE', { errorRaw: e })
  }
}

export { getFile }
