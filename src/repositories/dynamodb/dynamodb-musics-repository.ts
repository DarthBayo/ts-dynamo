import { MusicsRepositoryInterface, CreateParamsInterface } from '../musics-repository'
import { MusicEntity } from './entities/music-entity'

export class DynamoMusicsRepository implements MusicsRepositoryInterface {
  protected readonly TableName = 'Musics'
  private readonly entiy: MusicEntity

  constructor () {
    this.entiy = new MusicEntity()
  }

  public async findAll (): Promise<any> {
    const data = await this.entiy.findAll({
      TableName: this.TableName
    })

    return data
  }

  public async create (item: CreateParamsInterface): Promise<any> {
    const data = await this.entiy.create({
      TableName: this.TableName,
      Item: {
        artist: {
          S: item.artist
        },
        songTitle: {
          S: item.songTitle
        }
      }
    })

    return data
  }
}
