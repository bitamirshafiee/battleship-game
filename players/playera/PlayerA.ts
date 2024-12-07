import {getRandomNumber} from '../../utils/Helper';

export class PlayerA {
  public shipsAndOpponentsShotList: ShipsAndOpponentsShot[] = new Array(100);
  public positionShips() {
    console.log(this.shipsAndOpponentsShotList);
    ships.forEach(ship => {
      this.arrangeShipHorizontally(ship);
      // const shipDirectionHorizontalOrVertical = getRandomNumber(
      //   ShipDirection.Horizontal,
      //   ShipDirection.Vertical,
      // );
      // if (shipDirectionHorizontalOrVertical == ShipDirection.Horizontal) {
      //   this.arrangeShipHorizontally(ship);
      // } else if (shipDirectionHorizontalOrVertical == ShipDirection.Vertical) {
      // }
    });
  }

  public arrangeShipHorizontally(ship: Ship) {
    const shipHead = getRandomNumber(1, 100);
    const shipTail = shipHead + ship.length;

    if (shipTail <= 100) {
      if (this.isCellOccupied(shipHead, shipTail)) {
        if (this.isHeadAndTailOnTheSameRow(shipHead, shipTail)) {
          this.shipsAndOpponentsShotList?.fill(
            {ship: ship, opponentShot: ''},
            shipHead - 1,
            shipTail - 1,
          );
        } else this.arrangeShipHorizontally(ship);
      } else {
        this.arrangeShipHorizontally(ship);
      }
    } else {
      this.arrangeShipHorizontally(ship);
    }
  }

  isCellOccupied(head: number, tail: number): boolean {
    const desiredCellsToBeOccupied = this.shipsAndOpponentsShotList.slice(
      head - 1,
      tail - 1,
    );
    console.log(desiredCellsToBeOccupied);

    const result = desiredCellsToBeOccupied.every(v => {
      v.ship.name.length == 0;
    });
    console.log({
      every: result,
    });
    return result;
  }

  public isHeadAndTailOnTheSameRow(head: number, tail: number) {
    const d = Math.floor((head - 1) / 10);
    if (tail - 1 <= (d + 1) * 10) return true;
    else return false;
  }

  public isBetween(min: number, max: number, value: number) {
    if (value >= min && value <= max) return true;
    else return false;
  }
}

export enum ShipName {
  Carrier = 'Carrier',
  Battleship = 'Battleship',
  Cruiser = 'Cruiser',
  Submarine = 'Submarine',
  Destroyer = 'Destroyer',
}

export type Ship = {name: string; length: number};

const ships = [
  {name: ShipName.Carrier, length: 5},
  {name: ShipName.Battleship, length: 4},
  {name: ShipName.Cruiser, length: 3},
  {name: ShipName.Submarine, length: 3},
  {name: ShipName.Destroyer, length: 3},
];

enum ShipDirection {
  Horizontal = 1,
  Vertical = 2,
}

export type ShipsAndOpponentsShot = {ship: Ship; opponentShot: ''};
