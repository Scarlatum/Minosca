import { Position, PositionEnum } from '~/types/common'
import { IEntity } from '~/entities/entity.model'
import { Result } from '~/types/utils';


interface IStats {
  status: MovementStatus,
  range: number
}

const enum Keys { Up, Dowm, Left, Right }


interface IBindings {
  movement: Array<string>
}

interface IMovement {
  target    : IEntity,
  stats     : IStats,
  bindings  : IBindings;
  pressedKeys: Set<Keys>;
  keyMap: Map<string, Keys>
}

export const enum MovementStatus { Idle, Move, Blocked }

export default class Movement implements IMovement {

  static DEFAULT_MOVEMENT_BINDINGS: Array<string> = ['w','s','a','r'];

  target : IEntity
  stats : IStats = Movement.defaultStats();
  pressedKeys : Set<Keys> = new Set();
  bindings : IBindings = {
    movement: Movement.DEFAULT_MOVEMENT_BINDINGS
  };

  keyMap: Map<string, Keys> = new Map();

  constructor(target: IEntity) {
    this.target = target;
  }

  public static defaultStats(): IStats {
    return {
      status  : MovementStatus.Idle,
      range   : 1
    }
  }

  private static inBindingGroup(key: string, group: typeof Movement.DEFAULT_MOVEMENT_BINDINGS): boolean {
    return group.findIndex(x => x === key) !== -1
  }

  private init(): Result<void> {

    if ( !window ) return Error('WTF?');

    this.applyBindings(this.bindings.movement);

    // TODO DRY
    window.addEventListener('keydown', event => {

      const Key = this.keyMap.get(event.key);

      if ( !Key ) return;

      this.pressedKeys.add(Key);

      if ( Movement.inBindingGroup(event.key, this.bindings.movement) ) {
        this.stats.status = MovementStatus.Move
      }
      
    })

    window.addEventListener('keyup', event => {

      const Key = this.keyMap.get(event.key);

      if ( !Key ) return;

      this.pressedKeys.delete(Key);

      if ( Movement.inBindingGroup(event.key, this.bindings.movement) ) {
        this.stats.status = MovementStatus.Idle
      }

    })

  }

  private applyBindings(keyArray: Array<string>) {
    keyArray.forEach((key, index) => {
      this.keyMap.set(key, index)
    })
  }

  public move(key: Keys) {

    const pos = this.target.position;

    switch ( key ) {
      case Keys.Up: 
        pos[ PositionEnum.Y ] += this.stats.range; break;
      case Keys.Dowm: 
        pos[ PositionEnum.Y ] -= this.stats.range; break;
      case Keys.Right:
        pos[ PositionEnum.X ] += this.stats.range; break;
      case Keys.Left:
        pos[ PositionEnum.X ] -= this.stats.range; break;
    }

  }

}