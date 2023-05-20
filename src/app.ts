import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes'
import dbConnect from './config/mongo'

const PORT = process.env.PROT ?? 3000
const app = express()

app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ limit: '25mb' }))
app.use(cors())
app.use(router)
app.use('/image', express.static('storage/images'))
app.use('/thumbnail', express.static('storage/thumbnails'))

dbConnect()
  .then(() => console.log('Connection established'))
  .catch((err) => console.log(err))

app.get('/ping', (_req, res) => {
  console.log('Someone pinged')
  const timestamp = Date.now()
  const uptime = process.uptime()
  res.send({ timestamp, uptime })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
