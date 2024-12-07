import React from 'react';
import {useEffect, useState} from 'react';
import {
  PlayerA,
  ShipName,
  ShipsAndOpponentsShot,
} from './players/playera/PlayerA';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {PlayerB, ShotState} from './players/playerb/PlayerB';

function App(): React.JSX.Element {
  const [list, setList] = useState<ShipsAndOpponentsShot[]>(new Array(100));
  useEffect(() => {
    const playerA = new PlayerA();
    const playerB = new PlayerB();

    playerA.positionShips();

    const shotCellNumber = playerB.announceShot();
    const shotStatus = playerA.opponentShottedStatus(shotCellNumber);

    playerB.announcedShots[shotCellNumber - 1] = {
      position: shotCellNumber - 1,
      shot: shotStatus,
    };

    console.log({shotStatus: playerB.announcedShots[shotCellNumber - 1]});

    setList(playerA.shipsAndOpponentsShotList);
  }, []);

  return (
    <FlatList
      data={list}
      numColumns={10}
      renderItem={({item}) => (
        <View>
          <Text style={cellStyle(item, 20)}>{item ? textShow(item) : ''}</Text>
        </View>
      )}
    />
  );
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
    height: 60,
    width: 60,
    borderWidth: 1,
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
