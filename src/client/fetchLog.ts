import * as dayjs from 'dayjs'
import { RequestUrl, RequestUrlModel } from '../model/RequestModel'
import { SnapshootUrlModel } from '../model/SnapshootModel'
import { searchLog } from './ClsClient'
import type { IContext, LogInfos, SearchLogParams } from './ClsClient'

// 获取 cls 日志
export const requestLog = async (params: Omit<SearchLogParams, 'Context'>, Context?: IContext) => {
  const {
    Context: ResContext,
    ListOver = true,
    Results,
  } = await searchLog({
    ...params,
    Context,
  })

  await handleResultes(Results)

  return { ResContext, ListOver, logCount: Results.length }
}

// 写入受影响的 url 数据
const handleResultes = async (logInfos: LogInfos) => {
  if (!Array.isArray(logInfos) || !logInfos.length) return
  for (const log of logInfos) {
    const { LogJson } = log
    const { user_ip: userIp, params, time_str } = JSON.parse(LogJson)
    const date = dayjs(time_str).toDate()
    const { isOverstack, requestProfiles } = params

    for (const requestInfo of JSON.parse(requestProfiles)) {
      const { requestQueueSnapshoot, ...urlInfo } = requestInfo

      await RequestUrlModel.create({
        date,
        userIp,
        isOverstack,
        ...(urlInfo as Omit<RequestUrl, 'userIp' | 'isOverstack'>),
      })

      await handleReqeustQueueSnapshoot(requestQueueSnapshoot, date)
    }
  }
}

// 写入快照中的 url
const handleReqeustQueueSnapshoot = async (queue: string[], date: Date) => {
  if (!Array.isArray(queue) || !queue.length) return

  for (const url of queue) {
    await SnapshootUrlModel.create({
      url,
      date,
    })
  }
}
