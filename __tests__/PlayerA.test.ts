import 'react-native';
import {expect, it} from '@jest/globals';
import {PlayerA} from '../players/playera/PlayerA';

const playerA = new PlayerA();

it('not on the same row', () => {
  const result = playerA.isHeadAndTailOnTheSameRow(27, 32);
  expect(result).toBe(false);
});

it(' on the same row', () => {
  const result = playerA.isHeadAndTailOnTheSameRow(22, 27);
  expect(result).toBe(true);
});

it('not on the same row', () => {
  const result = playerA.isHeadAndTailOnTheSameRow(10, 15);
  expect(result).toBe(false);
});
