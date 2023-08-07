import 'dotenv/config'
import * as Dayjs from 'dayjs'
import * as weekday from 'dayjs/plugin/weekday'
import { searchLog } from './TClsClient'

Dayjs.extend(weekday)
;(async () => {
  const params = {
    TopicId: 'aa65e74f-5770-403e-ba2b-54a7a02bb063',
    From: +Dayjs().weekday(-6),
    To: +Dayjs(),
    Query: `kpi_topic: "requestProfile"`,
    Limit: 1000,
    Sort: 'desc',
    // Context
  }
  try {
    const res = await searchLog(params)
    // TODO: 根据返回的 `Context` 字段，不断透传获取全部日志

    console.log(res)
  } catch (e) {
    console.error(e)
  }
})()
