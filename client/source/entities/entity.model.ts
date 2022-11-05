import { Position, PositionEnum } from '~/types/common'


export interface IHitBox {
  width: number,
  height: number,
}

export interface IEntity {
  position: Position
  hitbox: IHitBox,
}

export default class Entity implements IEntity {

  position: Position = Entity.defaultPosition() 
  hitbox = Entity.defaultHitbox();

  public static defaultPosition(): Position {
    return {
      [ PositionEnum.X ]: 0,
      [ PositionEnum.Y ]: 0,
    }
  }

  public static defaultHitbox(): IHitBox {
    return {
      height  : 50,
      width   : 50,
    }
  }

}