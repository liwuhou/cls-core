import { Schema, model, Types } from 'mongoose'

export interface RequestUrl {
  date: Date
  url: string
  params: Record<string, any>
  timeout: number
  isSuccess: boolean
  requestQueueCount: number
  estimateNetType: string
  rtt: number
  userIp?: string
  isOverstack?: boolean
  takeTime?: number
  errMsg: string
}

export const RequestUrlSchema = new Schema<RequestUrl>({
  date: Date,
  url: { type: String },
  params: { type: Object },
  timeout: { type: Number },
  isSuccess: { type: Boolean },
  requestQueueCount: { type: Number },
  estimateNetType: { type: String },
  rtt: { type: Number },
  userIp: { type: String },
  isOverstack: { type: Boolean },
  takeTime: { type: Number },
  errMsg: { type: String },
})

export const RequestUrlModel = model<RequestUrl>('request', RequestUrlSchema)
