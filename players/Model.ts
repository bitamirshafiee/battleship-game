export enum ShipName {
  Carrier = 'Carrier',
  Battleship = 'Battleship',
  Cruiser = 'Cruiser',
  Submarine = 'Submarine',
  Destroyer = 'Destroyer',
}

export type Ship = {name: string; length: number};

export function getShips() {
  return [
    {name: ShipName.Carrier, length: 5},
    {name: ShipName.Battleship, length: 4},
    {name: ShipName.Cruiser, length: 3},
    {name: ShipName.Submarine, length: 3},
    {name: ShipName.Destroyer, length: 3},
  ];
}

enum ShipDirection {
  Horizontal = 1,
  Vertical = 2,
}
export type AnnouncedShots = {position: number; shot: Shot};
export type Shot = {state: ShotState; shipName?: string};

export enum ShotState {
  Hit = 'Hit',
  Miss = 'Miss',
  Undefine = '',
}

export type ShipsAndOpponentsShot = {ship: Ship; opponentShotState: ShotState};

export enum GamePlayer {
  A,
  B,
}
