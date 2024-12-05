export class PlayerA {

    constructor(private list[])
}

enum ShipName{
    Carrier = 1,
    Battleship = 2,
    Cruiser = 3,
    Submarine = 4,
    Destroyer = 5
}

export type ship  = {name : ShipName, length : number}

const ships = [{name : ShipName.Carrier, length : 5}, {name : ShipName.Battleship, length : 4}, {name : ShipName.Battleship, length : 4} ]
