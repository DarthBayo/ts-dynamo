import { DynamoDBClient, DynamoDB, CreateTableCommandInput, ResourceInUseException } from '@aws-sdk/client-dynamodb'
import dotenv from 'dotenv'
dotenv.config()

class Database {
  protected client: DynamoDBClient
  private readonly db: DynamoDB

  constructor () {
    const params = {
      apiVersion: process.env.AWS_DYNAMO_VERSION ?? 'latest',
      region: process.env.AWS_DYNAMO_REGION,
      credentials: {
        accessKeyId: process.env.AWS_DYNAMO_CREDENTIALS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_DYNAMO_CREDENTIALS_SECRET_ACCESS_KEY ?? ''
      }
    }
    this.client = new DynamoDBClient(params)
    this.db = new DynamoDB(params)

    void this.createTableIfNotExists()
    void this.updateTable()

    this.db.destroy()
  }

  private async createTableIfNotExists (): Promise<void> {
    const params: CreateTableCommandInput = {
      TableName: 'Musics',
      AttributeDefinitions: [
        {
          AttributeName: 'songTitle',
          AttributeType: 'S'
        },
        {
          AttributeName: 'artist',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'songTitle',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'artist',
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

    try {
      await this.db.createTable(params)
    } catch (error) {
      if (!(error instanceof ResourceInUseException)) {
        console.error('Error when creating the table', error)
        throw new Error('Error when creating the table.')
      }
    }
  }

  private async updateTable (): Promise<void> {

  }
}

export {
  Database
}
