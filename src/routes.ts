import { Router, Request, Response } from 'express'
import { DynamoMusicsRepository } from './repositories/dynamodb/dynamodb-musics-repository'

const router = Router()
const db = new DynamoMusicsRepository()

router.get('/', (_, res: Response) => {
  res.status(200).send('Vc é fera!')
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/musics', async (_, res: Response) => {
  const data = await db.findAll()

  res.json(data)
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/musics', async (req: Request, res: Response) => {
  const { Item } = req.body

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!Item) {
    throw new Error('Item is empty')
  }

  const data = await db.create(Item)

  res.json(data)
})

export {
  router
}
