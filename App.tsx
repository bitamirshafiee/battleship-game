import React from 'react';
import {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {GamePlayer, ShipsAndOpponentsShot, ShotState} from './player/Models';
import {GameController} from './game/GameController';
import {getShipColorByName, setTimeoutPromise} from './utils/Helper';

const controller = new GameController();

function App(): React.JSX.Element {
  const [listA, setListA] = useState<ShipsAndOpponentsShot[]>(new Array(100));
  const [listB, setListB] = useState<ShipsAndOpponentsShot[]>(new Array(100));
  const [message, setMessage] = useState<string>('Lets Start');
  const [playerAScore, setPlayerAScore] = useState<number>(0);
  const [playerBScore, sePlayerBScore] = useState<number>(0);
  const delayTime = 1000;
  let interval: any = null;

  const playerAPositionTheShips = async () => {
    await setTimeoutPromise(
      () => setMessage('player A position The Ships'),
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

  const playerAAttack = () => {
    setMessage('player A Attack!');

    const status = controller.playerAStartAttack();
    setPlayerAScore(status.score);

    if (status.gameResult) {
      clearInterval(interval);
      setMessage('Player A you won!!!!');
    }

    setListB(() => {
      return [...status.playerBBoard];
    });
  };

  const playerBAttack = () => {
    setMessage('player B Attack!');
    const status = controller.playerBStartAttack();

    sePlayerBScore(status.score);

    if (status.gameResult) {
      clearInterval(interval);
      setMessage('Player B you won!!!!');
    }

    setListA(() => {
      return [...status.playerABoard];
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
      toggle ? playerAAttack() : playerBAttack();
      toggle = !toggle;
    }, delayTime);
  };

  useEffect(() => {
    playerAPositionTheShips().then(playerBPositionTheShips).then(attack);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}> Player A - score : {playerAScore} </Text>
      <FlatList
        data={listA}
        numColumns={10}
        renderItem={({item}) => (
          <View>
            <Text style={cellStyle(item, 22)}>
              {item ? textShow(item) : ''}
            </Text>
          </View>
        )}
        keyExtractor={(_item, index) => 'key' + index.toString()}
      />

      <Text style={styles.boardMessage}> {message}</Text>

      <Text style={styles.titleText}> Player B - score : {playerBScore}</Text>
      <FlatList
        data={listB}
        numColumns={10}
        renderItem={({item}) => (
          <View>
            <Text style={cellStyle(item, 22)}>
              {item ? textShow(item) : ''}
            </Text>
          </View>
        )}
        keyExtractor={(_item, index) => 'key' + index.toString()}
      />
    </SafeAreaView>
  );
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

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginVertical: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boardMessage: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },
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
