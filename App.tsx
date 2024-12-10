import React, {useRef} from 'react';
import {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import {ResultChecker} from './players/ResultChecker';
import {
  GamePlayer,
  ShipName,
  ShipsAndOpponentsShot,
  ShotState,
} from './players/Model';
import {GameController} from './players/GameController';

const controller = new GameController();

function App(): React.JSX.Element {
  const [listA, setListA] = useState<ShipsAndOpponentsShot[]>(new Array(100));
  const [listB, setListB] = useState<ShipsAndOpponentsShot[]>(new Array(100));
  const [starterPlayer, setStarterPlayer] = useState<number>();
  const [message, setMessage] = useState<string>('Lets Start');

  const delayTime = 1000;

  let interval: any = null;

  const [gameResultA, setGameResultA] = useState<boolean>(false);
  const [gameResultB, setGameResultB] = useState<boolean>(false);

  const playerAPositionTheShips = async () => {
    await setTimeoutPromise(
      () => setMessage('player A PositionTheShips'),
      delayTime,
    );
    await setTimeoutPromise(
      () => setListA(controller.playerAPositionTheShips()),
      delayTime,
    );
  };

  const playerBPositionTheShips = async () => {
    await setTimeoutPromise(
      () => setMessage('player B PositionTheShips'),
      delayTime,
    );
    await setTimeoutPromise(
      () => setListB(controller.playerBPositionTheShips()),
      delayTime,
    );
  };

  const playerAshot = () => {
    const status = controller.playerAStartAttack();
    console.log(status.score);

    if (status.gameResult) clearInterval(interval);

    setListB(list => {
      return [...(list = status.playerBBoard)];
    });
  };

  const playerBshot = () => {
    const status = controller.playerBStartAttack();

    console.log(status.score);

    if (status.gameResult) clearInterval(interval);

    setListA(list => {
      return [...(list = status.playerABoard)];
    });
  };

  const attack = () => {
    let toggle = false;
    const whichPlayerToStart = controller.whichPlayerStart();

    if (whichPlayerToStart == GamePlayer.A) {
      toggle = true;
      setMessage('Player A will start');
    } else {
      toggle = false;
      setMessage('Player B will start');
    }

    interval = setInterval(() => {
      toggle ? playerAshot() : playerBshot();
      toggle = !toggle;
    }, delayTime);
  };

  useEffect(() => {
    playerAPositionTheShips().then(playerBPositionTheShips).then(attack);
  }, []);

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
        keyExtractor={(item, index) => 'key' + index.toString()}
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
        keyExtractor={(item, index) => 'key' + index.toString()}
      />
    </View>
  );
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function setTimeoutPromise(callback: () => void, ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms)).then(callback);
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
