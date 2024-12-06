import React from 'react';
import {useEffect, useState} from 'react';
import {
  PlayerA,
  ShipName,
  ShipsAndOpponentsShot,
} from './players/playera/PlayerA';
import {FlatList, StyleSheet, Text, View} from 'react-native';

function App(): React.JSX.Element {
  const [list, setList1] = useState<ShipsAndOpponentsShot[]>(new Array(100));
  useEffect(() => {
    const playerA = new PlayerA();
    playerA.positionShips();
    setList1(playerA.shipsAndOpponentsShotList);
  }, []);

  return (
    <FlatList
      data={list}
      numColumns={10}
      renderItem={({item}) => (
        <View>
          <Text style={cellStyle(item ? item.ship.name : '', 20)}>
            {item ? item.ship.name : ''}
          </Text>
        </View>
      )}
    />
  );
}

function cellStyle(name: string, cellSize: number) {
  const backgroundColor = getShipColorByName(name);
  return {
    height: cellSize,
    width: cellSize,
    backgroundColor: backgroundColor,
    borderWidth: 1,
  };
}

const styles = StyleSheet.create({
  cell: {
    height: 45,
    width: 45,
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
