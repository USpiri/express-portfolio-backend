import { ErrorHandlerExtra } from '@interface'
import { Response } from 'express'

const handleHttp = (
  res: Response,
  error: string,
  extra: ErrorHandlerExtra = { code: 500, errorRaw: null }
): void => {
  const detail = extra?.errorRaw
  res.status(extra?.code ?? 500)
  res.send({ error, detail })
}

export { handleHttp }
