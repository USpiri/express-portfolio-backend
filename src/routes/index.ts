import { Router } from 'express'
import { readdirSync } from 'fs'

const PATH_ROUTER = `${__dirname}`
const router = Router()

const clearFileName = (filename: string): string => {
  const file = filename.split('.').shift()
  return file ?? ''
}

readdirSync(PATH_ROUTER).filter(async (filename) => {
  const name = clearFileName(filename)

  if (name !== 'index') {
    await import(`./${name}`).then((routerModule) => {
      console.log('Loading: ' + name)
      router.use(`/${name}`, routerModule.router)
    })
  }
})

export { router }
