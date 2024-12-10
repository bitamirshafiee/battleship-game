import {getRandomNumber} from '../utils/Helper';
import {ShipsAndOpponentsShot, Shot, ShotState} from '../player/Models';
import {Player} from '../player/Player';
import {ResultChecker} from '../player/ResultChecker';

export class GameController {
  public playerA: Player = new Player();
  public playerB: Player = new Player();
  private resultCheckerA = new ResultChecker();
  private resultCheckerB = new ResultChecker();
  private playerBScore: number = 0;
  private playerAScore: number = 0;

  public playerAPositionTheShips() {
    this.playerA.positionShips();
    return this.playerA.shipsAndOpponentsShotList;
  }

  public playerBPositionTheShips() {
    this.playerB.positionShips();
    return this.playerB.shipsAndOpponentsShotList;
  }

  public whichPlayerStart() {
    return getRandomNumber(0, 1);
  }

  public playerAStartAttack(): {
    gameResult: boolean;
    score: number;
    playerBBoard: ShipsAndOpponentsShot[];
  } {
    const shotCellNumber = this.playerA.announceShot();
    const shotStatus = this.playerB.opponentShottedStatus(shotCellNumber);

    this.getPlayerAScore(shotStatus);

    this.playerA.announcedShots[shotCellNumber - 1] = {
      position: shotCellNumber - 1,
      shot: shotStatus,
    };
    const result = this.resultCheckerA.checkSuccessStatus(shotStatus.shipName);
    return {
      gameResult: result,
      score: this.playerAScore,
      playerBBoard: this.playerB.shipsAndOpponentsShotList,
    };
  }
  public playerBStartAttack(): {
    gameResult: boolean;
    score: number;
    playerABoard: ShipsAndOpponentsShot[];
  } {
    const shotCellNumber = this.playerB.announceShot();
    const shotStatus = this.playerA.opponentShottedStatus(shotCellNumber);

    this.getPlayerBScore(shotStatus);

    this.playerB.announcedShots[shotCellNumber - 1] = {
      position: shotCellNumber - 1,
      shot: shotStatus,
    };
    const result = this.resultCheckerB.checkSuccessStatus(shotStatus.shipName);
    return {
      gameResult: result,
      score: this.playerBScore,
      playerABoard: this.playerA.shipsAndOpponentsShotList,
    };
  }

  getPlayerBScore(shotStatus: Shot) {
    if (shotStatus.state == ShotState.Hit) return this.playerBScore++;
    else return this.playerBScore;
  }

  getPlayerAScore(shotStatus: Shot) {
    if (shotStatus.state == ShotState.Hit) return this.playerAScore++;
    else return this.playerAScore;
  }
}
