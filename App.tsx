import React, {useRef} from 'react';
import {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ResultChecker} from './players/ResultChecker';
import {
  GamePlayer,
  ShipName,
  ShipsAndOpponentsShot,
  ShotState,
} from './players/Model';
import {Player} from './players/Player';
import {getRandomNumber} from './utils/Helper';

const playerA = new Player();
const playerB = new Player();
const resultChecker = new ResultChecker();

function App(): React.JSX.Element {
  const [listA, setListA] = useState<ShipsAndOpponentsShot[]>(new Array(100));
  const [listB, setListB] = useState<ShipsAndOpponentsShot[]>(new Array(100));
  const [starterPlayer, setStarterPlayer] = useState<number>();
  const [message, setMessage] = useState<string>('Lets Start');

  const delayTime = 100;

  let interval: any = null;

  const [gameResultA, setGameResultA] = useState<boolean>(false);
  const [gameResultB, setGameResultB] = useState<boolean>(false);

  const playerBshot = () => {
    const shotCellNumber = playerB.announceShot();
    const shotStatus = playerA.opponentShottedStatus(shotCellNumber);

    playerB.announcedShots[shotCellNumber - 1] = {
      position: shotCellNumber - 1,
      shot: shotStatus,
    };

    const result = resultChecker.checkSuccessStatus(shotStatus.shipName);
    if (result) clearInterval(interval);

    setGameResultB(result);
    console.log({gameResult: gameResultB, result: result});

    setListB(playerB.shipsAndOpponentsShotList);
    console.log(listA);
    // await delay(1000);
  };

  const playerAshot = () => {
    const shotCellNumber = playerA.announceShot();
    const shotStatus = playerB.opponentShottedStatus(shotCellNumber);

    playerA.announcedShots[shotCellNumber - 1] = {
      position: shotCellNumber - 1,
      shot: shotStatus,
    };

    const result = resultChecker.checkSuccessStatus(shotStatus.shipName);
    if (result) clearInterval(interval);

    setGameResultA(result);
    console.log({gameResult: gameResultA, result: result});

    setListA(playerA.shipsAndOpponentsShotList);
    console.log(listA);
    // await delay(1000);
  };

  const attack = () => {
    interval = setInterval(() => {
      playerAshot();
      playerBshot();
    }, 100);
  };
  // const sleep = (ms: number): Promise<void> =>
  //   new Promise(r => setTimeout(r, ms));

  // const bbb = async () => {
  //   for (let i = 0; i < 100; i++) {
  //     onHandlePress();

  //     await sleep(100);
  //   }
  // };

  const playerAPositionTheShips = async () => {
    await setTimeoutPromise(
      () => setMessage('player A PositionTheShips'),
      delayTime,
    );
    await setTimeoutPromise(() => playerA.positionShips(), delayTime);
    await setTimeoutPromise(
      () => setListA(playerA.shipsAndOpponentsShotList),
      delayTime,
    );
  };

  const playerBPositionTheShips = async () => {
    await setTimeoutPromise(
      () => setMessage('player B PositionTheShips'),
      delayTime,
    );
    await setTimeoutPromise(() => playerB.positionShips(), delayTime);
    await setTimeoutPromise(
      () => setListB(playerB.shipsAndOpponentsShotList),
      delayTime,
    );
  };

  const whichPlayerToStart = async () => {
    await setTimeoutPromise(
      () => setMessage('Which player to start'),
      delayTime,
    );

    await setTimeoutPromise(() => {
      console.log('result');
      const result = getRandomNumber(0, 1);
      if (result == 0) setMessage('Player A will start');
      else setMessage('Player B will start');
      setStarterPlayer(result);
    }, delayTime);
  };

  useEffect(() => {
    playerAPositionTheShips()
      .then(playerBPositionTheShips)
      .then(whichPlayerToStart)
      .then(playerBshot);

    attack();

    // while (!gameResultA && !gameResultB) {
    //   playerBshot();
    //   playerAshot();
    // }
  }, []);

  // setTimeout(() => onHandlePress(), 1000);

  // useEffect(() => {
  //   ///https://stackoverflow.com/questions/65049812/how-to-call-a-function-every-minute-in-a-react-componen
  //   const interval = setInterval(() => {
  //     const shotCellNumber = playerB.announceShot();
  //     const shotStatus = playerA.opponentShottedStatus(shotCellNumber);

  //     playerB.announcedShots[shotCellNumber - 1] = {
  //       position: shotCellNumber - 1,
  //       shot: shotStatus,
  //     };

  //     setListA(playerA.shipsAndOpponentsShotList);
  //     console.log(listA);

  //     const result = resultChecker.checkSuccessStatus(shotStatus.shipName);
  //     setGameResult(result);
  //     console.log({gameResult: gameResult, result: result});
  //     if (result) clearInterval(interval);
  //   }, 100);
  // }, []);

  return (
    <View>
      <FlatList
        data={listA}
        numColumns={10}
        extraData={listA}
        renderItem={({item}) => (
          <View>
            <Text style={cellStyle(item, 20)}>
              {item ? textShow(item) : ''}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text> {message}</Text>

      <FlatList
        style={styles.grid}
        data={listB}
        numColumns={10}
        extraData={listB}
        renderItem={({item}) => (
          <View>
            <Text style={cellStyle(item, 20)}>
              {item ? textShow(item) : ''}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* <TouchableOpacity style={styles.button} onPress={onHandlePress}>
        <Text>Submit</Text>
      </TouchableOpacity> */}
    </View>
  );
}
async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function setTimeoutPromise(callback: () => void, ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms)).then(callback);
}

function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef<(() => void) | undefined>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick(): void {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id: NodeJS.Timeout = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function textShow(item: ShipsAndOpponentsShot) {
  switch (item.opponentShotState) {
    case ShotState.Hit:
      return 'X';
    case ShotState.Miss:
      return '.';
    case ShotState.Undefine:
      return '';
  }
}

function cellStyle(item: ShipsAndOpponentsShot, cellSize: number) {
  const backgroundColor = getShipColorByName(item ? item.ship.name : '');
  return {
    height: cellSize,
    width: cellSize,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: backgroundColor,
    borderWidth: 1,
  };
}

const styles = StyleSheet.create({
  grid: {
    marginTop: 20,
  },
  button: {
    marginHorizontal: 12,
    marginVertical: 8,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#699df0',
    borderRadius: 5,
  },
});
export default App;

export function getShipColorByName(name: string): string {
  switch (name) {
    case ShipName.Carrier:
      return 'green';
    case ShipName.Battleship:
      return 'orange';
    case ShipName.Cruiser:
      return 'yellow';
    case ShipName.Submarine:
      return 'blue';
    case ShipName.Destroyer:
      return 'pink';
  }
  return '';
}
