import * as dayjs from 'dayjs'
import Currency, { ICurrency } from '../models/Currency'
import ExchangeratesApiService from './ExchangeratesApiService'

class CurrencyService {
  async getCurrency(currencyParam: string, date: string = dayjs().format('YYYY-MM-DD')): Promise<ICurrency> {
    try {
      const currency = currencyParam.toUpperCase()
      const currencyMongo: ICurrency = await Currency.findOne({ currency, date })
      if (!currencyMongo) {
        const apiService = new ExchangeratesApiService()
        const currencyData = await apiService.getCurrencies(currency, date)

        const currencySaveData = {
          currency,
          date,
          value: currencyData.rates[currency],
        } as ICurrency

        const saveCurrency = new Currency(currencySaveData)
        const savedCurrency = await saveCurrency.save()

        return savedCurrency
      }
      return currencyMongo
    } catch (err) {
      console.log(err)
      return {} as ICurrency
    }
  }
}

export default CurrencyService
