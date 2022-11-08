import { Debugger, EntityMode } from './player.debug'
import Entity from '~/entities/entity.model'
import Movement, { MovementStatus } from '~/modules/movement.module';

// Utils
import { Some } from '~/types/utils'

// Interfaces
interface PlayerProps {
  mode: EntityMode
}

// default class module
export default class Player extends Entity {

  #movement: Movement;
  
  public debugger: Some<Debugger>;

  constructor({ mode }: Partial<PlayerProps>) { super();

    this.#movement = new Movement(this);

    if ( mode ) this.debugger = new Debugger(this, {
      movement: this.#movement      
    });

  }

  get movementStatus() {
    return this.#movement.stats
  }

  public liveStep() {

    if ( this.#movement.stats.status === MovementStatus.Move ) {
      this.#movement.pressedKeys.forEach(key => {
        this.#movement.move(key);
      })
    }

  }

}