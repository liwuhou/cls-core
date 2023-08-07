import { connect } from 'mongoose'
import { RequestUrlModel } from './model/RequestModel'
import type { RequestUrl } from './model/RequestModel'
;(async () => {
  await connect('mongodb://127.0.0.1:27017/cls')

  const user = new RequestUrlModel<RequestUrl>({
    url: 'test',
    params: {},
    timeout: 0,
    isSuccess: true,
    requestQueueCount: 10,
    estimateNetType: '4g',
    rtt: 30,
  })

  user
    .save()
    .then(() => console.log('save successed', user.url))
    .catch((err) => console.log(err))
})()
