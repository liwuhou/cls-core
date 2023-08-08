import { Schema, model } from 'mongoose'

export interface SnapshootUrl {
  url: string
  date: Date
}

export const SnapshootUrlSchema = new Schema<SnapshootUrl>({
  url: { type: String },
  date: { type: Date },
})

export const SnapshootUrlModel = model<SnapshootUrl>('snapshoot', SnapshootUrlSchema)
