import axios from 'axios'

class ExchangeratesApiService {
  async getCurrencies(currency: string) {
    try {
    const currencies = await axios.get(`https://api.exchangeratesapi.io/latest?base=RUB&symbols=${currency}`)
    return currencies.data
    } catch (err) {
      console.log(err)
      return []
    }
  }
}

export default ExchangeratesApiService
