import 'dotenv/config'
import { connect } from 'mongoose'

const DB_MONGO_URI = process.env.DB_MONGO_URI as string

async function dbConnect(): Promise<void> {
  await connect(DB_MONGO_URI)
}

export default dbConnect
