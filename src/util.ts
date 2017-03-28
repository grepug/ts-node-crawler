import rp = require('request-promise')

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
