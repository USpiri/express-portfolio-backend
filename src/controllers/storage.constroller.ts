import { Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { Storage, ExtendedRequest } from '@interface'
import { uploadFile } from '../services/storage'

const getFile = async (req: ExtendedRequest, res: Response): Promise<void> => {
  try {
    const { token, file } = req
    const data: Storage = {
      filename: file?.fieldname ?? '',
      path: file?.path ?? '',
      userId: token?.id ?? ''
    }
    const response = await uploadFile(data)
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_GETTING_FILE', { errorRaw: e })
  }
}

export { getFile }
