import { MusicsRepositoryInterface } from '../musics-repository'
import { Database } from './database'
import { BatchExecuteStatementCommand } from '@aws-sdk/client-dynamodb'

class DynamoMusicsRepository extends Database implements MusicsRepositoryInterface {
  public async find (): Promise<any> {
    const command = new BatchExecuteStatementCommand({
      Statements: [
        {
          Statement: 'SELECT * FROM Musics WHERE EXISTS(songTitle) AND EXISTS(artist)'
          // Parameters: [
          //   { S: 'Master Of Puppets' },
          //   { S: 'Metallica' }
          // ]
        }
      ]
    })

    const data = await this.client.send(command)
      .then(({ Responses }) => Responses)
      .catch(err => console.log(err))

    return data
  }
}

export {
  DynamoMusicsRepository
}
