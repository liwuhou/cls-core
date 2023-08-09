import { connect } from 'mongoose'
export * from './model/RequestModel'
export * from './model/SnapshootModel'

// 建连 mongodb
const checkConnectedMap: Record<string, boolean> = {}
export const connectMongodb = async (dbName = 'cls') => {
  if (checkConnectedMap[dbName]) return true

  await connect(`mongodb://127.0.0.1:27017/${dbName}`)

  return (checkConnectedMap[dbName] = true)
}

export const closeMongodb = async () => {
  process.exit(0)
}
