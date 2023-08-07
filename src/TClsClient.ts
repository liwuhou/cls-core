import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import { SearchLogRequest } from 'tencentcloud-sdk-nodejs/tencentcloud/services/cls/v20201016/cls_models'

const CLIENT_CONFIG: ClientConfig = {
  credential: {
    secretId: process.env.TENCENTCLOUD_SECRET_ID,
    secretKey: process.env.TENCENTCLOUD_SECRET_KEY,
  },
  region: process.env.REGION,
  profile: {
    signMethod: 'HmacSHA1',
    httpProfile: {
      reqMethod: 'POST',
      reqTimeout: 30,
      endpoint: 'cls.tencentcloudapi.com',
    },
  },
}

const TclsClient = new tencentcloud.cls.v20201016.Client(CLIENT_CONFIG)

// 搜索日志
export const searchLog = async (params: SearchLogRequest) => {
  return new Promise((resolve, reject) => {
    TclsClient.SearchLog(params).then(
      (data) => resolve(data),
      (error) => reject(error),
    )
  })
}
