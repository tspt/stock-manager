import { Router } from 'express'
import { stockService } from '../services/stock.service'

const router = Router()

router.get('/:code', async (req, res) => {
  try {
    // const { code } = req.query;
    const data = await stockService.getStockData(req.params.code)
    console.log(data)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' })
  }
})

export { router as stockRouter }
