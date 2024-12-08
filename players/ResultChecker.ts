import {ShipName} from './playera/PlayerA';

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
    console.log({shipName: shipName});

    switch (shipName) {
      case ShipName.Carrier: {
        console.log('here : Carrier');
        this.carrierShots++;
        if (this.carrierShots == 5) this.isCarrierDrawn = true;
        break;
      }
      case ShipName.Battleship: {
        console.log('here : Battleship');
        this.battleShipShots++;
        if (this.battleShipShots == 4) this.isBattleShipDrawn = true;
        break;
      }
      case ShipName.Cruiser: {
        console.log('here : Cruiser');
        this.cruiserShots++;
        if (this.cruiserShots == 3) this.isCruiserDrawn = true;
        break;
      }
      case ShipName.Submarine: {
        console.log('here : Submarine');
        this.submarineShipShots++;
        if (this.submarineShipShots == 3) this.isSubmarineDrawn = true;
        break;
      }
      case ShipName.Destroyer: {
        console.log('here : Destroyer');
        this.destroyerShipShots++;
        if (this.destroyerShipShots == 3) this.isDestroyerDrawn = true;
        break;
      }
    }
    console.log({carrierShots: this.carrierShots, state: this.isCarrierDrawn});
    console.log({
      battleShipShots: this.battleShipShots,
      state: this.isBattleShipDrawn,
    });
    console.log({cruiserShots: this.cruiserShots, state: this.isCruiserDrawn});
    console.log({
      submarineShipShots: this.submarineShipShots,
      state: this.isSubmarineDrawn,
    });
    console.log({
      destroyerShipShots: this.destroyerShipShots,
      state: this.isDestroyerDrawn,
    });
    const list = [
      this.isCarrierDrawn,
      this.isBattleShipDrawn,
      this.isCruiserDrawn,
      this.isSubmarineDrawn,
      this.isDestroyerDrawn,
    ];
    console.log(list);
    return [
      this.isCarrierDrawn,
      this.isBattleShipDrawn,
      this.isCruiserDrawn,
      this.isSubmarineDrawn,
      this.isDestroyerDrawn,
    ].every(v => v == true);
  }
}
