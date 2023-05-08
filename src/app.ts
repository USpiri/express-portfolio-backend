import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes'

const PORT = process.env.PROT ?? 3000
const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.get('/ping', (_req, res) => {
  console.log('Someone pinged')
  const timestamp = Date.now()
  const uptime = process.uptime()
  res.send({ timestamp, uptime })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
