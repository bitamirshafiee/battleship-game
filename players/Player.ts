import {getRandomNumber} from '../utils/Helper';
import {
  AnnouncedShots,
  GamePlayer,
  getShips,
  Ship,
  ShipsAndOpponentsShot,
  Shot,
  ShotState,
} from './Model';

export class Player {
  public shipsAndOpponentsShotList: ShipsAndOpponentsShot[] = new Array(100);
  public announcedShots: AnnouncedShots[] = new Array(100);

  public positionShips() {
    getShips().forEach(ship => {
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

  arrangeShipHorizontally(ship: Ship) {
    const shipHead = getRandomNumber(1, 100);
    const shipTail = shipHead + ship.length;

    if (shipTail <= 100) {
      if (this.isCellOccupied(shipHead, shipTail)) {
        if (this.isHeadAndTailOnTheSameRow(shipHead, shipTail)) {
          // TODO fill or =
          this.shipsAndOpponentsShotList?.fill(
            {ship: ship, opponentShotState: ShotState.Undefine},
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
    const result = desiredCellsToBeOccupied.every(v => {
      v.ship.name.length == 0;
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

  public opponentShottedStatus(shotNumber: number): Shot {
    const opponentShottedCell = this.shipsAndOpponentsShotList[shotNumber - 1];
    const shot = opponentShottedCell
      ? {state: ShotState.Hit, shipName: opponentShottedCell.ship.name}
      : {state: ShotState.Miss};

    this.shipsAndOpponentsShotList[shotNumber - 1] = {
      ship: opponentShottedCell
        ? opponentShottedCell.ship
        : {name: '', length: 0},
      opponentShotState: shot.state,
    };
    return shot;
  }

  public announceShot(): number {
    const shotNumber = getRandomNumber(1, 100);
    const result = this.checkIfThisShotHasBeenMadeBefore(shotNumber);
    return result;
  }
  //public for the sake of testing
  public checkIfThisShotHasBeenMadeBefore(shotNumber: number) {
    return this.announcedShots[shotNumber - 1]
      ? this.announceShot()
      : shotNumber;
  }
}
