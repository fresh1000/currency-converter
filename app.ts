import * as dotenv from 'dotenv'
import connect from './src/connect'
import app from './src/index'

if (process.env.DOTENV) {
  process.env.DOTENV
    .split(',')
    .filter((val) => val)
    .forEach((envPath) => dotenv.config({ path: envPath }))
}

const port = 3000

const db = process.env.MONGO_URL
console.log(process.env.MONGO_URL)
connect(db)

app.listen(port)
console.log(`Server running at ${port}`)
