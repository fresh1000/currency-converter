import * as mongoose from 'mongoose'

export interface ICurrency extends mongoose.Document {
  value: string,
  currency: string,
  date: string,
}

const currencySchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
}, { versionKey: false })

export default mongoose.model<ICurrency>('Currency', currencySchema)
