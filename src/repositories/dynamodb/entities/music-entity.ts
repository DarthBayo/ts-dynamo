import { Database } from './database'
import {
  CreateTableCommandInput,
  ScanCommand,
  ScanCommandInput,
  PutItemCommand,
  PutItemCommandInput
} from '@aws-sdk/client-dynamodb'

export class MusicEntity extends Database {
  constructor () {
    const params: CreateTableCommandInput = {
      TableName: 'Musics',
      AttributeDefinitions: [
        {
          AttributeName: 'artist',
          AttributeType: 'S'
        },
        {
          AttributeName: 'songTitle',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'artist',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'songTitle',
          KeyType: 'RANGE'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      },
      StreamSpecification: {
        StreamEnabled: false
      }
    }
    super(params)
  }

  public async findAll (params: ScanCommandInput): Promise<any> {
    try {
      const data = await this.client.send(new ScanCommand(params))

      return data.Items
    } catch (error) {
      console.log(error)
    }
  }

  public async create (params: PutItemCommandInput): Promise<any> {
    try {
      await this.client.send(new PutItemCommand(params))

      return params.Item
    } catch (error) {
      console.log(error)
    }
  }
}
