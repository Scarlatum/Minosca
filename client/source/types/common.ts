
export const enum PositionEnum {
  X,
  Y,
}

export interface Position {
  [ PositionEnum.X ]: number,
  [ PositionEnum.Y ]: number,
}