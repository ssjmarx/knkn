export interface TiledLayerHead {
  name: string
  visible: boolean
}

export interface TiledMapHead {
  tilewidth: number
  tileheight: number
  width: number
  height: number
  layers: TiledLayerHead[]
}
