import { connect } from 'mongoose'
import { RequestUrlModel } from './model/RequestModel'
import type { RequestUrl } from './model/RequestModel'
export * from './model/RequestModel'
export { Types } from 'mongoose'

// 建连 mongodb
export const connectMongodb = (() => {
  const checkConnectedMap: Record<string, boolean> = {}
  return async (dbName = 'cls') => {
    if (checkConnectedMap[dbName]) return true

    await connect(`mongodb://127.0.0.1:27017/${dbName}`)

    return (checkConnectedMap[dbName] = true)
  }
})()
