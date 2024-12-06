/**
 * @format
 */

import 'react-native';
// Note: import explicitly to use the types shipped with jest.
import {expect, it} from '@jest/globals';

// Note: test renderer must be required after react-native.
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
