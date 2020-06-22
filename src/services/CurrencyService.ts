import Currency, { ICurrency } from "../models/Currency"
import * as dayjs from "dayjs"
import ExchangeratesApiService from "./ExchangeratesApiService"

class CurrencyService {
  async getLatestCurrency(currency: string): Promise<string> {
    try {
      const date: string = dayjs().format('YYYY-MM-DD')
      currency = currency.toUpperCase()
      const currencyMongo: ICurrency = await Currency.findOne({ currency, date })
      if (!currencyMongo) {
        const apiService = new ExchangeratesApiService()
        const currencyData = await apiService.getCurrencies(currency)

        const currencySaveData = {
          currency,
          date,
          value: currencyData.rates[currency]
        } as ICurrency

        const saveCurrency = new Currency(currencySaveData)
        const savedCurrency = await saveCurrency.save()

        return savedCurrency.value
      }
      return currencyMongo.value
    } catch (err) {
      console.log(err)
      return ''
    }
  }
}

export default CurrencyService
