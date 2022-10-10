export interface CreateParamsInterface {
  artist: string
  songTitle: string
}

export interface MusicsRepositoryInterface {
  findAll: () => Promise<any>
  create: (items: CreateParamsInterface) => Promise<any>
}
