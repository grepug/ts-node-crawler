import { Crawler } from '../src/crawler'

let crawler = new Crawler({
  fetchInterval: 0.5,
  startUrl: 'http://www.aiyuke.com/cate-0-13-1.html',
  nextPage (res, $) {
    
  }
})

crawler.fetch({  })
