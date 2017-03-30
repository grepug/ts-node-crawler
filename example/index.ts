import { Crawler } from '../src/crawler'
import _ from 'lodash'
import { toDiscipline, slice, resolveBoolean } from './lib/util'

declare const Promise

class MyCrawler extends Crawler {

  public nextStepObject: NextStepObject

  constructor (config) {
    super(config)
  }


}

interface NextStepObject {
  url: string,
  discipline: string,
  size: Number,
  type: string,
  qualification: Boolean
}

async function main (): Promise<any> {
  let myCrawler = new MyCrawler({
    fetchInterval: 0.5,
    startUrl: 'http://www.tournamentsoftware.com/sport/draws.aspx?id=BB4B9094-EBD8-4769-845C-DBA94B0B790B',
    getNextStepUrls ($): NextStepObject[] {
      let $tr = $('#content table.ruler tbody tr')
      let host = `http://www.tournamentsoftware.com/sport/`
      this.nextStepObject = slice.call($tr).map(el => {
        let $el = $(el)
        return {
          url: $el.find('.drawname a').attr('href'),
          discipline: toDiscipline($el.find('.drawname a').text()),
          size: $el.find('.drawname').next().text(),
          type: $el.find('.drawname').next().next().text(),
          qualification: resolveBoolean($el.find('.drawname').next().next().next().text())
        }
      })
      return this.nextStepObject.map(el => host + el.url)
    },
    nextPage (res, $) {
      return null
    },
  })
  let ins = await myCrawler.fetch({  })
  let res = ins.fetchUrls()
  console.log(res)
}

main()




// crawler.fetch({  })
