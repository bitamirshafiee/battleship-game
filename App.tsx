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
import {ShipName, ShipsAndOpponentsShot, ShotState} from './players/Model';
import {Player} from './players/Player';

const playerA = new Player();
const playerB = new Player();
const resultChecker = new ResultChecker();

function App(): React.JSX.Element {
  let [list, setList] = useState<ShipsAndOpponentsShot[]>(new Array(100));

  const [gameResult, setGameResult] = useState<boolean>(false);

  const onHandlePress = () => {
    const shotCellNumber = playerB.announceShot();
    const shotStatus = playerA.opponentShottedStatus(shotCellNumber);

    playerB.announcedShots[shotCellNumber - 1] = {
      position: shotCellNumber - 1,
      shot: shotStatus,
    };

    const result = resultChecker.checkSuccessStatus(shotStatus.shipName);
    setGameResult(result);
    console.log({gameResult: gameResult, result: result});

    setList(playerA.shipsAndOpponentsShotList);
    console.log(list);
  };
  // const sleep = (ms: number): Promise<void> =>
  //   new Promise(r => setTimeout(r, ms));

  // const bbb = async () => {
  //   for (let i = 0; i < 100; i++) {
  //     onHandlePress();

  //     await sleep(100);
  //   }
  // };

  useEffect(() => {
    playerA.positionShips();
    setList(playerA.shipsAndOpponentsShotList);
    // bbb();
    console.log(list);
  }, []);

  // setTimeout(() => onHandlePress(), 1000);

  useEffect(() => {
    ///https://stackoverflow.com/questions/65049812/how-to-call-a-function-every-minute-in-a-react-componen
    const interval = setInterval(() => {
      const shotCellNumber = playerB.announceShot();
      const shotStatus = playerA.opponentShottedStatus(shotCellNumber);

      playerB.announcedShots[shotCellNumber - 1] = {
        position: shotCellNumber - 1,
        shot: shotStatus,
      };

      setList(playerA.shipsAndOpponentsShotList);
      console.log(list);

      const result = resultChecker.checkSuccessStatus(shotStatus.shipName);
      setGameResult(result);
      console.log({gameResult: gameResult, result: result});
      if (result) clearInterval(interval);
    }, 100);
  }, []);

  const callMe = () => {
    useInterval(() => {
      onHandlePress();
    }, 1000);
  };
  useEffect(() => {});

  return (
    <View>
      <FlatList
        data={list}
        numColumns={10}
        extraData={list}
        renderItem={({item}) => (
          <View>
            <Text style={cellStyle(item, 20)}>
              {item ? textShow(item) : ''}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity style={styles.button} onPress={onHandlePress}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
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
  cell: {
    height: 20,
    width: 20,
    borderWidth: 1,
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
