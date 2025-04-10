import { Router } from 'express'
import { stockService } from '../services/stock.service'

const router = Router()

router.get('/getList', async (req, res) => {
  try {
    const { code } = req.query
    const decodedData = await stockService.getStockList(code)
    // console.log(decodedData)
    // 设置正确的内容类型
    // res.header('Content-Type', 'text/plain; charset=UTF-8')
    res.status(200).json({ data: decodedData })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' })
  }
})

router.get('/getTimeShare', async (req, res) => {
  try {
    const decodedData = await stockService.getStockTimeShare(req.query)
    res.status(200).json({ data: decodedData })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' })
  }
})

router.get('/getCandlestick', async (req, res) => {
  try {
    const decodedData = await stockService.getStockCandlestick(req.query)
    res.status(200).json({ data: decodedData })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' })
  }
})

export { router as stockRouter }
