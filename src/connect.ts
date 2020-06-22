import * as mongoose from 'mongoose'

const connectSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

export default (db) => {
  const connect = () => {
    mongoose
      .connect(db, connectSettings)
      .then(() => { console.info(`Successfully connected to ${db}`) })
      .catch((error) => {
        console.error('Error connecting to database: ', error)
        return process.exit(1)
      })
  }
  connect()

  mongoose.connection.on('disconnected', connect)
}
