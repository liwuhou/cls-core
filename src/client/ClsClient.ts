import 'dotenv/config'
import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import {
  SearchLogRequest,
  SearchLogResponse,
} from 'tencentcloud-sdk-nodejs/tencentcloud/services/cls/v20201016/cls_models'

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

type dePromise<T> = T extends Promise<infer U> ? U : T
export type IContext = dePromise<SearchLogRequest>['Context'] | undefined
export type LogInfos = dePromise<SearchLogResponse>['Results'] | null
export type SearchLogParams = SearchLogRequest

// 搜索日志
export const searchLog = async (params: SearchLogRequest): Promise<SearchLogResponse> => {
  const Client = new TClsClient(CLIENT_CONFIG)
  return new Promise((resolve, reject) => {
    Client.SearchLog(params).then(
      (data) => resolve(data),
      (error) => reject(error),
    )
  })
}
