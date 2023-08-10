import * as dayjs from 'dayjs'
import ora from 'ora'
import { closeMongodb, connectMongodb } from './mongo'
import { requestLog } from './client/fetchLog'

const STEP_DURATION = 60 * 60 * 1000

const params = {
  TopicId: 'aa65e74f-5770-403e-ba2b-54a7a02bb063',
  From: dayjs().subtract(4, 'day').hour(0).minute(0).second(0).valueOf(),
  To: dayjs().subtract(1, 'day').hour(23).minute(59).second(59).valueOf(),
  Query: `kpi_topic: "requestProfile"`,
  Limit: 1000,
  Sort: 'desc',
}

// 计算下一个时间区间的结束时间
const calcNextStepTime = (start: number, end: number): number =>
  start + STEP_DURATION < end ? start + STEP_DURATION : end

const main = async () => {
  const spinner = ora('努力分析日志中……').start()
  const { From, To, ...restParams } = params
  const startTime = Date.now()

  let Context,
    count = 0,
    start = From,
    end = calcNextStepTime(start, To)

  // 连接 mongodb 数据库
  await connectMongodb()

  while (true) {
    const {
      ResContext,
      ListOver,
      logCount = 1,
    } = await requestLog(
      {
        From: start,
        To: end,
        ...restParams,
      },
      Context,
    )
    count += logCount
    spinner.text = `正在分析中，已分析 ${count} 条日志……`
    Context = ResContext

    // 如果已经没有满足查询规则的日志了，就判断是否退出循环
    if (!Context || ListOver) {
      // 按某个时间段进行分片查询，绕过 cls 一次只能查询 100000 条的限制
      if (end === To) break
      start = end + 1
      end = calcNextStepTime(start, To)
    }
  }

  spinner.succeed(`分析完成，总共分析了 ${count} 条日志信息，耗时 ${Date.now() - startTime} 毫秒`)
  closeMongodb()
}

main()
