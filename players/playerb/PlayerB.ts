import {getRandomNumber} from '../../utils/Helper';

export class PlayerB {
  public announcedShots: AnnouncedShots[] = new Array(100);

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

export type AnnouncedShots = {position: number; shot: Shot};
export type Shot = {state: ShotState; shipName?: string};

export enum ShotState {
  Hit = 'Hit',
  Miss = 'Miss',
  Undefine = '',
}
