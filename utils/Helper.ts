import {ShipName} from '../player/Models';

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export function setTimeoutPromise(callback: () => void, ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms)).then(callback);
}

export function getShipColorByName(name: string): string {
  switch (name) {
    case ShipName.Carrier:
      return 'darkseagreen';
    case ShipName.Battleship:
      return 'orange';
    case ShipName.Cruiser:
      return 'yellow';
    case ShipName.Submarine:
      return 'cornflowerblue';
    case ShipName.Destroyer:
      return 'pink';
  }
  return '';
}
