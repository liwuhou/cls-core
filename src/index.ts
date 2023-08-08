import * as dayjs from 'dayjs'
import ora from 'ora'
import { connectMongodb } from './mongo'
import { requestLog } from './client/fetchLog'

const params = {
  TopicId: 'aa65e74f-5770-403e-ba2b-54a7a02bb063',
  From: dayjs().subtract(4, 'day').hour(0).minute(0).second(0).valueOf(),
  To: dayjs().subtract(1, 'day').hour(23).minute(59).second(59).valueOf(),
  Query: `kpi_topic: "requestProfile"`,
  Limit: 1000,
  Sort: 'desc',
}

const main = async () => {
  const startTime = Date.now()
  const spinner = ora('努力分析日志中……').start()
  setTimeout(() => {
    spinner.color = 'yellow'
    spinner.text = '数据量有点大啊，还在持续分析中……'
  }, 30000)
  let Context
  let count = 0

  // 连接 mongodb 数据库
  await connectMongodb()

  while (true) {
    const { ResContext, ListOver, logCount = 1 } = await requestLog(params, Context)
    count += logCount
    Context = ResContext

    // 如果已经没有满足查询规则的日志了，就退出循环
    if (!Context || ListOver) break
  }

  spinner.stop()
  console.log(`分析完成，总共分析了 ${count} 条日志信息，耗时 ${Date.now() - startTime} 毫秒`)
  process.exit(0)
}

main()
