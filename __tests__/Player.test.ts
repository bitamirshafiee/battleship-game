import 'react-native';
import {expect, it} from '@jest/globals';
import {Player} from '../player/Player';
import {ShipName, ShotState} from '../player/Models';

const player = new Player();

it('not on the same row', () => {
  const result = player.isHeadAndTailOnTheSameRow(27, 32);
  expect(result).toBe(false);
});

it(' on the same row', () => {
  const result = player.isHeadAndTailOnTheSameRow(22, 27);
  expect(result).toBe(true);
});

it('not on the same row', () => {
  const result = player.isHeadAndTailOnTheSameRow(10, 15);
  expect(result).toBe(false);
});

it('announced shot should not be the same as shot that has been shot before', () => {
  const playerB = new Player();
  playerB.announcedShots[2] = {
    position: 2,
    shot: {state: ShotState.Hit, shipName: ShipName.Carrier},
  };
  const result = playerB.checkIfThisShotHasBeenMadeBefore(3);
  expect(result != 3).toBe(true);
});

it('announced shot is ok if it has not been announced before', () => {
  const playerB = new Player();
  playerB.announcedShots[2] = {
    position: 2,
    shot: {state: ShotState.Hit, shipName: ShipName.Carrier},
  };
  const result = playerB.checkIfThisShotHasBeenMadeBefore(4);
  expect(result == 4).toBe(true);
});
