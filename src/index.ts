import * as dayjs from 'dayjs'
import { searchLog } from './ClsClient'
import { connectMongodb, RequestUrl, RequestUrlModel, Types } from './mongo'
import type { SearchLogParams, IContext, LogInfos } from './ClsClient'

const params = {
  TopicId: 'aa65e74f-5770-403e-ba2b-54a7a02bb063',
  From: dayjs().subtract(1, 'day').hour(4).minute(0).second(0).valueOf(),
  To: dayjs().subtract(1, 'day').hour(5).minute(0).second(0).valueOf(),
  Query: `kpi_topic: "requestProfile"`,
  Limit: 2,
  Sort: 'desc',
}

const requestLog = async (params: Omit<SearchLogParams, 'Context'>, Context?: IContext) => {
  const { Context: ResContext, Results } = await searchLog({
    ...params,
    Context,
  })

  await handleResultes(Results)
  // if (ResContext) requestLog(params, ResContext) // 接续上下文
}

// 写入数据
const handleResultes = async (logInfos: LogInfos) => {
  if (!Array.isArray(logInfos) || !logInfos.length) return
  for (const log of logInfos) {
    const { LogJson } = log
    const { user_ip: userIp, params } = JSON.parse(LogJson)
    const { isOverstack, requestProfiles } = params

    for (const requestInfo of JSON.parse(requestProfiles)) {
      const { requestQueueSnapshoot, ...urlInfo } = requestInfo

      const saveExcutor = new RequestUrlModel<RequestUrl>({
        userIp,
        isOverstack,
        ...(urlInfo as Omit<RequestUrl, 'userIp' | 'isOverstack'>),
      })
      await saveExcutor.save().then(() => console.log('success'))
      console.log('🤔 ~ file: index.ts:39 ~ handleResultes ~ saveExcutor:', saveExcutor)

      await handleReqeustQueueSnapshoot(requestQueueSnapshoot, saveExcutor?._id)
    }
  }
}

const handleReqeustQueueSnapshoot = async (queue: string[], id?: Types.ObjectId) => {
  console.log('🤔 ~ file: index.ts:47 ~ handleReqeustQueueSnapshoot ~ queue:', queue)
  if (!Array.isArray(queue) || !queue.length) return

  // TODO: 存入快照
}

;(async () => {
  await connectMongodb()
  await requestLog(params)
})()
