import { DEFAULT_RENDER_CONTEXT } from '~/application';
import { IEntity } from '~/entities/entity.model';
import { PositionEnum } from '~/types/common';


interface IView {
  model : IEntity
}

export class PlayerView implements IView {

  public model: IEntity;

  constructor(model: IEntity) {
    this.model = model;
  }

  draw(ctx: DEFAULT_RENDER_CONTEXT) {

    const { width, height } = this.model.hitbox;

    ctx.fillStyle = 'red';
    ctx.fillRect(
      this.model.position[PositionEnum.X],
      this.model.position[PositionEnum.Y],
      width,
      height,
    );

  }
}