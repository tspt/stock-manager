import { Router } from 'express'
import { stockService } from '../services/stock.service'

const router = Router()

router.get('/:code', async (req, res) => {
  try {
    // const { code } = req.query;
    const decodedData = await stockService.getStockData(req.params.code)
    // console.log(decodedData)
    // 设置正确的内容类型
    // res.header('Content-Type', 'text/plain; charset=UTF-8')
    res.json(decodedData)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' })
  }
})

export { router as stockRouter }
