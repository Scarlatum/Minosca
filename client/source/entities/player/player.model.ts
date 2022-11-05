import Entity from '~/entities/entity.model'
import Movement, { MovementStatus } from '~/modules/movement.module';

interface IPlayer {}

export default class Player extends Entity implements IPlayer {

  #movement: Movement;

  constructor() { super();
    this.#movement = new Movement(this);
  }

  public liveStep() {

    if ( this.#movement.stats.status === MovementStatus.Move ) {
      this.#movement.pressedKeys.forEach(key => {
        this.#movement.move(key);
      })
    }

  }

}