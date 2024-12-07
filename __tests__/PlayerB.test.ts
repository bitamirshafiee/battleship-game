import {PlayerB, ShotState} from '../players/playerb/PlayerB';

import 'react-native';
import {expect, it} from '@jest/globals';
import {ShipName} from '../players/playera/PlayerA';

it('announced shot should not be the same as shot that has been shot before', () => {
  const playerB = new PlayerB();
  playerB.announcedShots.splice(2, 0, {
    position: 2,
    shot: {state: ShotState.Hit, shipName: ShipName.Carrier},
  });
  console.log(playerB.announcedShots);
  const result = playerB.checkIfThisShotHasBeenMadeBefore(3);
  console.log({result: result});
  expect(result != 2).toBe(true);
});

it('announced shot is ok if it has not been announced before', () => {
  const playerB = new PlayerB();
  playerB.announcedShots.splice(2, 0, {
    position: 2,
    shot: {state: ShotState.Hit, shipName: ShipName.Carrier},
  });
  console.log(playerB.announcedShots);
  const result = playerB.checkIfThisShotHasBeenMadeBefore(4);
  console.log({result: result});
  expect(result == 3).toBe(true);
});
