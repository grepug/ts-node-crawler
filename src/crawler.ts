import rp = require('request-promise')
import cheerio = require('cheerio')
import { request, sleep } from './util'

declare const Promise

interface CrawlerConfig {
  startUrl: string | Function
  fetchInterval: number
  nextPage: Function
}

interface FetchConfig {
  data: Object,
  urlParams?: Object
}

export class Crawler {

  private startUrl: string | Function
  protected fetchInterval: number = 0
  protected nextPage: Function

  constructor (
    config: CrawlerConfig
  ) {
    this.startUrl = config.startUrl
    this.fetchInterval = config.fetchInterval
    this.nextPage = config.nextPage
  }

  public async fetch (config: FetchConfig): Promise<any> {
    let uri = typeof this.startUrl === 'function' ? this.startUrl.apply(this, config.urlParams) : this.startUrl
    let resBody = await request({
      uri,
      method: 'GET',
      data: config.data
    })
    let $ = cheerio.load(resBody)
    let nextPageFetchConfig: FetchConfig = this.nextPage(resBody, $)
    if (this.nextPage(resBody, $)) {
      await this.fetch(config)
      await sleep(this.fetchInterval)
    }
    return
  }





}
