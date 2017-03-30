import rp = require('request-promise')
import cheerio = require('cheerio')
import { request, sleep, resolveFunc } from './util'

declare const Promise

interface CrawlerConfig {
  startUrl: string | Function
  fetchInterval: number
  nextPage: Function,
  getNextStepUrls: Function
}

interface FetchConfig {
  data?: Object,
  urlParams?: Object
}

interface FetchedResBody {
  $: cheerio,
  resBody: string
}

export class Crawler {

  private startUrl: string | Function
  protected fetchInterval: number = 0
  protected nextPage: Function
  protected getNextStepUrls: Function
  protected fetchedResBodies: FetchedResBody[] = []

  constructor (
    config: CrawlerConfig
  ) {
    this.startUrl = config.startUrl
    this.fetchInterval = config.fetchInterval
    this.nextPage = config.nextPage
    this.getNextStepUrls = config.getNextStepUrls
  }

  // public async fetch (config: FetchConfig): Promise<any> {
  //   let uri = typeof this.startUrl === 'function' ? this.startUrl.apply(this, config.urlParams) : this.startUrl
  //   let resBody = await request({
  //     uri,
  //     method: 'GET',
  //     data: config.data
  //   })
  //   let $ = cheerio.load(resBody)
  //   let nextPageFetchConfig: FetchConfig = this.nextPage.call(this, resBody, $)
  //   if (this.nextPage(resBody, $)) {
  //     await this.fetch(config)
  //     await sleep(this.fetchInterval)
  //   }
  //   return
  // }

  public async fetch (config): Promise<Crawler> {
    let uri = resolveFunc(this.startUrl, this)
    let resBody = await request({
      uri, method: 'GET', data: config.data
    })
    let $ = cheerio.load(resBody)
    let nextPageConfig = this.nextPage(resBody, $)
    this.fetchedResBodies.push({ $, resBody })
    if (nextPageConfig) {
      await this.fetch(nextPageConfig)
      await sleep(this.fetchInterval)
    }
    return this
  }

  public fetchUrls () {
    // console.log(this.fetchedResBodies, 123)
    return this.fetchedResBodies.map(el => this.getNextStepUrls(el.$))
  }

}
