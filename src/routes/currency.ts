import { Router } from 'express'
import CurrencyController from '../controllers/CurrencyController'
import { validateCurrencyLatest, validateCurrencyHistory } from '../utils/validation'

const router = Router()
const currencyController = new CurrencyController()

router.get('/currency/history/:currency/:date', validateCurrencyHistory, currencyController.currencyHistory)
router.get('/currency/latest/:currency', validateCurrencyLatest, currencyController.currencyLatest)

export default router
