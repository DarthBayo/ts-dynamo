import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes'

const app = express()
dotenv.config()

app.use(express.json())
app.use(router)

const port = process.env.PORT ?? 3333
app.listen(port, () => {
  console.log(`Server running! - ${port}`)
})
