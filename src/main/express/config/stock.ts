export default {
  port: 3001,
  cacheClearTime: 5 * 60 * 1000,
  // defaultSource: process.env.NODE_ENV === 'production' ? 'sina' : 'sina',
  source: ['sina', 'tencent'],
  sina: {
    endpoint: 'https://hq.sinajs.cn/list=',
    timeout: 5000,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      Referer: 'http://finance.sina.com.cn'
    }
  },
  tencent: {
    endpoint: 'https://proxy.finance.qq.com/ifzqgtimg/appstock/app/newfqkline/get',
    //endpoint: 'https://qt.gtimg.cn/q=',
    timeout: 5000,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      Referer: 'https://gu.qq.com'
    }
  }
}
