import { Request, Response } from 'express'
import { validationResult, Result } from 'express-validator'
import CurrencyService from '../services/CurrencyService'
import { ICurrency } from '../models/Currency'

class CurrencyController {
  async currencyHistory(req: Request, res: Response) {
    const errors: Result = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).send({ errors: errors.array() })
    }
    return res.status(200).send({  })
  }

  async currencyLatest(req: Request, res: Response) {
    const errors: Result = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).send({ errors: errors.array() })
    }

    try {
      const currencyService = new CurrencyService()
      const result: string = await currencyService.getLatestCurrency(req.params.currency)
      return res.status(200).send({ result })
    } catch (err) {
      return res.status(500).send(err)
    }
  }
}

export default CurrencyController