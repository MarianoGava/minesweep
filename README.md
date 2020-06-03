# Minesweep

Traditional minesweeper game made using React, Hooks and Redux Toolkit

Minesweeper is a grid of tiles, each of which may or may not cover hidden mines. The goal is to click on every tile except those that have mines. When a user clicks a tile, one of two things happens: if the tile was covering a mine, the mine is revealed and the game ends in failure; if the tile was not covering a mine, it instead reveals the number of adjacent tiles (including diagonals) that are covering mines - and, if that number is 0, it behaves as if the user has clicked on every cell around it. With each turn, the game is validated:

- If the player uncovers a bomb tile, the player loses and the game ends.

- If the player uncovers a non-bomb tile (number) and there are remaining non-bomb tiles uncovered, the game continues. Otherwise, the player wins.

## Running

`yarn install`

## Running

`yarn start`

## Testing

To run a single test file you can do:

`yarn test [filePath]`

for example:

`yarn test src/components/grid/Cell.spec.js`

to run the coverage report you should run:

`yarn test:coverage`
