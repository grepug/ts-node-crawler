import rp = require('request-promise')
import _ from 'lodash'

declare const Promise
declare const setTimeout

export const sleep = (secs) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), secs * 1000)
  })
}


interface RequestOption {
  uri: string
  method: string
  data: Object
  body?: string
  headers?: Object
}

export const request = async (options: RequestOption): Promise<string> => rp(options)

export const resolveFunc = function (obj: any, context: any) {
  if (typeof obj === 'function') return obj.call(context)
  return obj
}
