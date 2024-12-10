import {ShipName} from './Models';

export class ResultChecker {
  private carrierShots = 0;
  private battleShipShots = 0;
  private cruiserShots = 0;
  private submarineShipShots = 0;
  private destroyerShipShots = 0;

  private isCarrierDrawn = false;
  private isBattleShipDrawn = false;
  private isCruiserDrawn = false;
  private isSubmarineDrawn = false;
  private isDestroyerDrawn = false;

  public checkSuccessStatus(shipName?: string) {
    return shipName ? this.checkIfAllShipsDrawn(shipName) : false;
  }

  checkIfAllShipsDrawn(shipName: string): boolean {
    switch (shipName) {
      case ShipName.Carrier: {
        this.carrierShots++;
        if (this.carrierShots == 5) this.isCarrierDrawn = true;
        break;
      }
      case ShipName.Battleship: {
        this.battleShipShots++;
        if (this.battleShipShots == 4) this.isBattleShipDrawn = true;
        break;
      }
      case ShipName.Cruiser: {
        this.cruiserShots++;
        if (this.cruiserShots == 3) this.isCruiserDrawn = true;
        break;
      }
      case ShipName.Submarine: {
        this.submarineShipShots++;
        if (this.submarineShipShots == 3) this.isSubmarineDrawn = true;
        break;
      }
      case ShipName.Destroyer: {
        this.destroyerShipShots++;
        if (this.destroyerShipShots == 3) this.isDestroyerDrawn = true;
        break;
      }
    }
    const list = [
      this.isCarrierDrawn,
      this.isBattleShipDrawn,
      this.isCruiserDrawn,
      this.isSubmarineDrawn,
      this.isDestroyerDrawn,
    ];
    return [
      this.isCarrierDrawn,
      this.isBattleShipDrawn,
      this.isCruiserDrawn,
      this.isSubmarineDrawn,
      this.isDestroyerDrawn,
    ].every(v => v == true);
  }
}
