import { Schema, model } from 'mongoose'

export interface RequestUrl {
  url: string
  params: Record<string, any>
  timeout: number
  isSuccess: boolean
  requestQueueCount: number
  estimateNetType: string
  rtt: number
}

export const RequestUrlSchema = new Schema<RequestUrl>(
  {
    url: { type: String, required: true },
    params: { type: Object, required: true },
    timeout: { type: Number },
    isSuccess: { type: Boolean },
    requestQueueCount: { type: Number },
    estimateNetType: { type: String },
    rtt: { type: Number },
  },
  {
    autoCreate: false,
  },
)

export const RequestUrlModel = model<RequestUrl>('requestUrl', RequestUrlSchema)
