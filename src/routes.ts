import { Router, Response } from 'express'
import { DynamoMusicsRepository } from './repositories/dynamodb/dynamodb-musics-repository'

const router = Router()

router.get('/', (_, res: Response) => {
  res.status(200).send('Vc é fera!')
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/music', async (_, res: Response) => {
  const db = new DynamoMusicsRepository()

  const data = await db.find()

  res.json(data)
})

export {
  router
}
