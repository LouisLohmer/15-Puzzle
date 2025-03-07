let currentPuzzleLayout = [];

function shufflePuzzle() {
    const min = 1;
    const max = 16;
    let allAvailableTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    for (let i = 1; i <= 16; i++) {
        let stopCondition = false;

        while (stopCondition !== true) {
            let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

            if (allAvailableTiles.includes(randomNumber)) {
                allAvailableTiles.splice(allAvailableTiles.indexOf(randomNumber), 1);
                document
                    .querySelector('.layout-puzzle')
                    .append(document.getElementById('tile-' + randomNumber));
                currentPuzzleLayout.push(randomNumber);

                stopCondition = true;
            }
        }
    }

    findNeighbourTiles();
}

function findNeighbourTiles() {
    let emptyTile;
    let emptyTilePosition;
    let topNeighbourTileExits = false;
    let bottomNeighbourTileExits = false;
    let rightNeighbourTile;
    let rightNeighbourTileExits = false;
    let leftNeighbourTile;
    let leftNeighbourTileExits = false;

    for (let i = 0; i <= currentPuzzleLayout.length; i++) {
        if (currentPuzzleLayout[i] === 16) {
            emptyTile = document.getElementById('tile-' + currentPuzzleLayout[i]);
            emptyTilePosition = i;
        }
    }

    // WARNING: DO NOT MOVE VARIABLE topNeighbourTile FROM LINE 47, OTHERWISE THE TILE IS ALWAYS NULL
    let topNeighbourTile = document.getElementById('tile-' + currentPuzzleLayout[emptyTilePosition - 4]);

    if (topNeighbourTile !== null) {
        topNeighbourTile.addEventListener('click', moveNeighbourTiles);
        topNeighbourTile.classList.add('purple-tile');
        topNeighbourTileExits = true;
    }

    // WARNING: DO NOT MOVE VARIABLE bottomNeighbourTilee FROM LINE 54, OTHERWISE THE TILE IS ALWAYS NULL
    let bottomNeighbourTile = document.getElementById('tile-' + currentPuzzleLayout[emptyTilePosition + 4]);

    if (bottomNeighbourTile !== null) {
        bottomNeighbourTile.addEventListener('click', moveNeighbourTiles);
        bottomNeighbourTile.classList.add('purple-tile');
        bottomNeighbourTileExits = true;
    }

    if (
        emptyTilePosition !== 3 &&
        emptyTilePosition !== 7 &&
        emptyTilePosition !== 11 &&
        emptyTilePosition !== 15
    ) {
        rightNeighbourTile = document.getElementById('tile-' + currentPuzzleLayout[emptyTilePosition + 1]);
        rightNeighbourTile.addEventListener('click', moveNeighbourTiles);
        rightNeighbourTile.classList.add('purple-tile');
        rightNeighbourTileExits = true;
    }

    if (
        emptyTilePosition !== 0 &&
        emptyTilePosition !== 4 &&
        emptyTilePosition !== 8 &&
        emptyTilePosition !== 12
    ) {
        leftNeighbourTile = document.getElementById('tile-' + currentPuzzleLayout[emptyTilePosition - 1]);
        leftNeighbourTile.addEventListener('click', moveNeighbourTiles);
        leftNeighbourTile.classList.add('purple-tile');
        leftNeighbourTileExits = true;
    }

    return [
        emptyTile,
        emptyTilePosition,
        leftNeighbourTile,
        rightNeighbourTile,
        topNeighbourTile,
        bottomNeighbourTile,
        topNeighbourTileExits,
        bottomNeighbourTileExits,
        leftNeighbourTileExits,
        rightNeighbourTileExits,
    ];
}

function removeCurrentNeighbourTiles() {
    let neighbourTilesData = findNeighbourTiles();

    if (neighbourTilesData[6] === true) {
        neighbourTilesData[4].removeEventListener('click', moveNeighbourTiles);
        neighbourTilesData[4].classList.remove('purple-tile');
    }

    if (neighbourTilesData[8] === true) {
        neighbourTilesData[2].removeEventListener('click', moveNeighbourTiles);
        neighbourTilesData[2].classList.remove('purple-tile');
    }

    if (neighbourTilesData[9] === true) {
        neighbourTilesData[3].removeEventListener('click', moveNeighbourTiles);
        neighbourTilesData[3].classList.remove('purple-tile');
    }

    if (neighbourTilesData[7] === true) {
        neighbourTilesData[5].removeEventListener('click', moveNeighbourTiles);
        neighbourTilesData[5].classList.remove('purple-tile');
    }
}

function moveNeighbourTiles(event) {
    let neighbourTilesData = findNeighbourTiles();
    let xCoordinate;
    let yCoordinate;
    let gridlayout = document.querySelector('.layout-puzzle');
    let clickedNeighbourfield = event.currentTarget;

    if (clickedNeighbourfield === neighbourTilesData[4]) {
        xCoordinate = 4;
        yCoordinate = 3;
    } else if (clickedNeighbourfield === neighbourTilesData[5]) {
        xCoordinate = -4;
        yCoordinate = -5;
    } else if (clickedNeighbourfield === neighbourTilesData[2]) {
        xCoordinate = 1;
        yCoordinate = 0;
    } else if (clickedNeighbourfield === neighbourTilesData[3]) {
        xCoordinate = -1;
        yCoordinate = -1;
    }

    // Swap Position of empty div and the clicked neighbourfield in Grid and in the array, in order to save the new tile sequenze
    gridlayout.insertBefore(clickedNeighbourfield, neighbourTilesData[0]);

    let temp = currentPuzzleLayout[neighbourTilesData[1] - xCoordinate];
    currentPuzzleLayout[neighbourTilesData[1] - xCoordinate] = currentPuzzleLayout[neighbourTilesData[1]];
    currentPuzzleLayout[neighbourTilesData[1]] = temp;

    gridlayout.insertBefore(
        neighbourTilesData[0],
        document.getElementById('tile-' + currentPuzzleLayout[neighbourTilesData[1] - yCoordinate]),
    );

    // Remove old neighbour tiles from the puzzel layout
    if (neighbourTilesData[6] === true) {
        neighbourTilesData[4].removeEventListener('click', moveNeighbourTiles);
        neighbourTilesData[4].classList.remove('purple-tile');
        neighbourTilesData[6] = false;
    }

    if (neighbourTilesData[7] === true) {
        neighbourTilesData[5].removeEventListener('click', moveNeighbourTiles);
        neighbourTilesData[5].classList.remove('purple-tile');
        neighbourTilesData[7] = false;
    }

    if (neighbourTilesData[9] === true) {
        neighbourTilesData[3].removeEventListener('click', moveNeighbourTiles);
        neighbourTilesData[3].classList.remove('purple-tile');
        neighbourTilesData[9] = false;
    }

    if (neighbourTilesData[8] === true) {
        neighbourTilesData[2].removeEventListener('click', moveNeighbourTiles);
        neighbourTilesData[2].classList.remove('purple-tile');
        neighbourTilesData[8] = false;
    }

    verifyWinner();

    findNeighbourTiles();
}

function startNewGame() {
    // Remove old neighbour tiles from the puzzel layout before the game starts
    removeCurrentNeighbourTiles();

    currentPuzzleLayout = [];

    shufflePuzzle();
}

function sortPuzzle() {
    let puzzleLayout = document.querySelector('.layout-puzzle');

    // Remove old neighbour tiles from the puzzel layout before the game starts
    removeCurrentNeighbourTiles();

    for (let i = 1; i <= 16; i++) {
        puzzleLayout.append(document.getElementById('tile-' + i));
    }
}

function verifyWinner() {
    let correctTileOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    for (let i = 0; i < correctTileOrder.length; i++) {
        if (correctTileOrder[i] !== currentPuzzleLayout[i]) {
            return;
        }
    }

    alert('Du hast gewonnen!');
}

shufflePuzzle();
