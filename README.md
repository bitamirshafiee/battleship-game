# Battleship Game
This is a Battleship, which you can see the rules [here](https://en.wikipedia.org/wiki/Battleship_(game)).

## Game Description
In this game two players, A and B play the game against each other using a random number attacking the opponents board. Each step is being explained by a proper message and the players score is being shown too.

This is the flow:
- Each player positioning the ships.
- A player will be randomly chosen to start the game.
- Players start attacking each other's board. You can see a 'Hit' shot with a cross(X) and a 'Missed' shot with a dot (.) , This step will be continued until a player wins. 
- A proper message will be shown that which player has won.

## How to use it

This is the preview of the game :

<img src = "https://github.com/user-attachments/assets/2baecb9d-782a-4c78-ad86-f5880148516d" with = "300" height = "600">


- Each attack is being done in a timer of one second you can change **delayTime** in the **App.tsx** file to your favorite delay time.
- If the cells of the board are small you can change the size in **App.tsx** file in **cellStyle** functuion.
- I tried to explain the functions by their names so you can go throught it easier.

## Future Todos

Things I would like to do: 

- Creating a separate screen for game view, put it in the game package, use the controller for this view instead of using the controller for **App.tsx** and add a stack navigator.
- Use a factory pattern to create the controller at startup in **App.tsx**
- Right now the ships are just positioning horizontally, I have conmmented in the **Player** file that it can be vertically too. The logic will be randomly select to position the ships vertically or horizontally and then positioning them. for the sake of vertical positioning, we choose a random number and select a cell whether on top or below of the selected cell(it should be a multiply of 10).
- We can make the players smarter, after choosing a random number from 1 to 100 to attack, we can check if it is a hit or not, if it is a hit we can write a code to start hiting around the hitted cell.
- Tests has been written for some functions, and there could be more tests be written for forexample the result checker or UI.




