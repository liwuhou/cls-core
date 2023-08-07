import 'dotenv/config'
import * as Dayjs from 'dayjs'
import * as weekday from 'dayjs/plugin/weekday'
import { searchLog } from './ClsClient'
import type { SearchLogParams, SearchLogResponse } from './ClsClient'

Dayjs.extend(weekday)

const params = {
  TopicId: 'aa65e74f-5770-403e-ba2b-54a7a02bb063',
  From: +Dayjs().weekday(-6),
  To: +Dayjs(),
  Query: `kpi_topic: "requestProfile"`,
  Limit: 100,
  Sort: 'desc',
}

const requestLog = async (params: Omit<SearchLogParams, 'Context'>, Context?: string) => {
  const res = await searchLog({
    ...params,
    Context,
  })
  // 写入数据
  if (res.Context) requestLog(params, res.Context)
}

requestLog(params)
