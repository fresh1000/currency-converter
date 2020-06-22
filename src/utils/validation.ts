import { param, query } from 'express-validator'
import * as dayjs from 'dayjs'

const validateCurrencyLatest = [
  param('currency').isIn(['usd', 'eur']),
]

const validateCurrencyHistory = [
  param('currency').isIn(['usd', 'eur']),
  query('amount').isFloat({ gt: 0 }),
  param('date').custom((value) => {
    if(!dayjs(value).isValid()) {
      throw new Error('Invalid date')
    }

    if (!dayjs(value, 'YYYY-MM-DD').isValid())  {
      throw new Error('Invalid date format')
    }

    if (!dayjs(value).isAfter(dayjs('2020-01-01'))) {
      throw new Error('Date must be after 2020-01-01')
    }

    if (dayjs(value).isAfter(dayjs())) {
      throw new Error('Date must be before current date or current date')
    }
    return true
  })
]

export {
  validateCurrencyLatest,
  validateCurrencyHistory,
}
