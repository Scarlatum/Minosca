import PlayerModel from './player.model'
import Movement, { MovementStatus } from '~/modules/movement.module';
import { Position, PositionEnum } from '~/types/common'

export const enum EntityMode {
  NORMAL,
  DEBUG,
}

interface IDebuggerContext {
  movement: Movement
}

export interface IPlayerDebug {
  forceMove: (keys: Array<string>, ctx: Movement) => [ MovementStatus, Position ]
}

export class Debugger implements IPlayerDebug {

  private target: PlayerModel;
  private context: IDebuggerContext;

  constructor(target: PlayerModel, context: IDebuggerContext) {
    this.target   = target;
    this.context  = context
  }

  // !TODO
  // static ERROR_BUILDER() {
  //   const setSize = ([ exp, act ]: Array<number>) => `pressed set work incorrect. Keys array size: ${ exp } but their set is ${ act }`
  // }

  public forceMove(keys: Array<string>, movementContext: Movement = this.context.movement): [ MovementStatus, Position ] {

    if ( !movementContext ) throw Error('Movement context is undefined or null')

    movementContext.stats.status = MovementStatus.Move;

    keys.forEach(key => {

      const bindKey = movementContext.keyMap.get(key);

      if ( bindKey === undefined ) throw Error(`undefined bind for ${ key } key`);

      movementContext.pressedKeys.add(bindKey);

    });

    if ( !movementContext.pressedKeys.size ) 
      throw Error(`pressed set work incorrect. Keys array size: ${ keys.length } but their set is ${ movementContext.pressedKeys.size }`);

    movementContext.pressedKeys.forEach(key => {
      movementContext.move(key);
    })

    return [ movementContext.stats.status, this.target.position ];

  }

}