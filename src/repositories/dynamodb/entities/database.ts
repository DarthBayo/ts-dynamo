import { DynamoDBClient, CreateTableCommandInput, CreateTableCommand, ResourceInUseException } from '@aws-sdk/client-dynamodb'
import dotenv from 'dotenv'
dotenv.config()

class Database {
  protected client: DynamoDBClient

  constructor (tableParams: CreateTableCommandInput) {
    const params = {
      apiVersion: process.env.AWS_DYNAMO_VERSION ?? 'latest',
      region: process.env.AWS_DYNAMO_REGION,
      credentials: {
        accessKeyId: process.env.AWS_DYNAMO_CREDENTIALS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_DYNAMO_CREDENTIALS_SECRET_ACCESS_KEY ?? ''
      }
    }

    this.client = new DynamoDBClient(params)

    void this.createTableIfNotExists(tableParams)
  }

  private async createTableIfNotExists (params: CreateTableCommandInput): Promise<void> {
    try {
      await this.client.send(new CreateTableCommand(params))
    } catch (error) {
      if (!(error instanceof ResourceInUseException)) {
        console.error('Error when creating the table', error)
        throw new Error('Error when creating the table.')
      }
    }
  }
}

export {
  Database
}
