import { describe, test, expect } from 'vitest';
import { EntityMode } from '~/entities/player/player.debug';

import PlayerModel from '~/entities/player/player.model';
import { PositionEnum } from '~/types/common'

describe('movement::common', () => {

  const Player = new PlayerModel({ mode: EntityMode.DEBUG });

  test('common::move', () => {

    const { range }     = Player.movementStatus;
    const prevPosition  = { ...Player.position };

    Player.debugger?.forceMove(['w','d']);

    expect(prevPosition).not.toStrictEqual(Player.position);

    expect(Player.position[ PositionEnum.X ]).toBe(prevPosition[ PositionEnum.X ] + range);
    expect(Player.position[ PositionEnum.Y ]).toBe(prevPosition[ PositionEnum.Y ] + range);

  })

})