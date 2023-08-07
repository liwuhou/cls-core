import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'

const TClsClient = tencentcloud.cls.v20201016.Client

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

const Client = new TClsClient(CLIENT_CONFIG)

export type SearchLogParams = Parameters<typeof Client.SearchLog>[0]
export type SearchLogResponse = ReturnType<typeof Client.SearchLog>

// 搜索日志
export const searchLog = async (params: SearchLogParams): Promise<SearchLogResponse> => {
  return new Promise((resolve, reject) => {
    Client.SearchLog(params).then(
      (data) => resolve(data),
      (error) => reject(error),
    )
  })
}
