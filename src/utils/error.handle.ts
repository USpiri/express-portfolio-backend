import { ErrorHandlerExtra } from '@interface'
import { Response } from 'express'

const handleHttp = (
  res: Response,
  error: string,
  extra: ErrorHandlerExtra = { code: 500, errorRaw: null }
): void => {
  // if (extra?.errorRaw != null) console.log(extra?.errorRaw)
  const message = extra?.errorRaw
  res.status(extra?.code ?? 500)
  res.send({ error, message })
}

export { handleHttp }
