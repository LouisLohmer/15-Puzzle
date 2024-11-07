let positionGrid = [];

function shufflePuzzle() {
    const min = 1;
    const max = 16;
    let arrayRandomDiv = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    for (let i = 1; i <= 16; i++) {
        let stopCondition = false;

        while (stopCondition !== true) {
            let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

            if (arrayRandomDiv.includes(randomNumber)) {
                arrayRandomDiv.splice(arrayRandomDiv.indexOf(randomNumber), 1);
                document
                    .querySelector('.layout-puzzle')
                    .append(document.getElementById('tile-' + randomNumber));
                // Save random shuffeled sequence in an array in order to calculate neighbour fields and more
                positionGrid.push(randomNumber);

                stopCondition = true;
            }
        }
    }
    findNeighbourfields();
}

function findNeighbourfields() {
    // Get current Empty field of the puzzle
    let emptyDiv;
    let emptyDivPosition;
    for (let i = 0; i <= positionGrid.length; i++) {
        if (positionGrid[i] === 16) {
            emptyDiv = document.getElementById('tile-' + positionGrid[i]);
            emptyDivPosition = i;
        }
    }

    // Set top neighbour field and it´s Eventlistener to move around
    let neighbourfieldTop = document.getElementById('tile-' + positionGrid[emptyDivPosition - 4]);
    let eventistenerTop;
    if (neighbourfieldTop !== null) {
        neighbourfieldTop.addEventListener('click', moveNeighbourfields);
        neighbourfieldTop.classList.add('purple-div');
        // Flag to check later, if a eventlistener is currently set
        eventistenerTop = true;
    }

    // Set bottom neighbour field and it´s Eventlistener to move around
    let neighbourfieldBottom = document.getElementById('tile-' + positionGrid[emptyDivPosition + 4]);
    let eventlistenerBottom;
    if (neighbourfieldBottom !== null) {
        neighbourfieldBottom.addEventListener('click', moveNeighbourfields);
        neighbourfieldBottom.classList.add('purple-div');
        // Flag to check later, if a eventlistener is currently set
        eventlistenerBottom = true;
    }

    // Get right neighbour field and it´s Eventlistener to move around
    let neighbourfieldRight;
    let eventlistenerRight;
    if (
        emptyDivPosition !== 3 &&
        emptyDivPosition !== 7 &&
        emptyDivPosition !== 11 &&
        emptyDivPosition !== 15
    ) {
        neighbourfieldRight = document.getElementById('tile-' + positionGrid[emptyDivPosition + 1]);
        neighbourfieldRight.addEventListener('click', moveNeighbourfields);
        neighbourfieldRight.classList.add('purple-div');
        // Flag to check later, if a eventlistener is currently set
        eventlistenerRight = true;
    }

    // Get left neighbour field and it´s Eventlistener to move around
    let neighbourfieldLeft;
    let eventlistenerLeft;
    if (
        emptyDivPosition !== 0 &&
        emptyDivPosition !== 4 &&
        emptyDivPosition !== 8 &&
        emptyDivPosition !== 12
    ) {
        neighbourfieldLeft = document.getElementById('tile-' + positionGrid[emptyDivPosition - 1]);
        neighbourfieldLeft.addEventListener('click', moveNeighbourfields);
        neighbourfieldLeft.classList.add('purple-div');
        // Flag to check later, if a eventlistener is currently set
        eventlistenerLeft = true;
    }

    return [
        emptyDiv,
        emptyDivPosition,
        neighbourfieldLeft,
        neighbourfieldRight,
        neighbourfieldTop,
        neighbourfieldBottom,
        eventistenerTop,
        eventlistenerBottom,
        eventlistenerLeft,
        eventlistenerRight,
    ];
}

function moveNeighbourfields(event) {
    let returnValues = findNeighbourfields();
    let x;
    let y;
    let gridlayout = document.querySelector('.layout-puzzle');

    let clickedNeighbourfield = event.currentTarget;

    if (clickedNeighbourfield === returnValues[4]) {
        x = 4;
        y = 3;
    } else if (clickedNeighbourfield === returnValues[5]) {
        x = -4;
        y = -5;
    } else if (clickedNeighbourfield === returnValues[2]) {
        x = 1;
        y = 0;
    } else if (clickedNeighbourfield === returnValues[3]) {
        x = -1;
        y = -1;
    }

    // Swap Position in Grid and in the array, where current sequenz is saved
    gridlayout.insertBefore(clickedNeighbourfield, returnValues[0]);

    let temp = positionGrid[returnValues[1] - x];
    positionGrid[returnValues[1] - x] = positionGrid[returnValues[1]];
    positionGrid[returnValues[1]] = temp;

    gridlayout.insertBefore(
        returnValues[0],
        document.getElementById('tile-' + positionGrid[returnValues[1] - y]),
    );

    if (returnValues[6] === true) {
        returnValues[4].removeEventListener('click', moveNeighbourfields);
        returnValues[4].classList.remove('purple-div');
        returnValues[6] = false;
    }

    if (returnValues[7] === true) {
        returnValues[5].removeEventListener('click', moveNeighbourfields);
        returnValues[5].classList.remove('purple-div');
        returnValues[7] = false;
    }

    if (returnValues[9] === true) {
        returnValues[3].removeEventListener('click', moveNeighbourfields);
        returnValues[3].classList.remove('purple-div');
        returnValues[9] = false;
    }

    if (returnValues[8] === true) {
        returnValues[2].removeEventListener('click', moveNeighbourfields);
        returnValues[2].classList.remove('purple-div');
        returnValues[8] = false;
    }

    getWinner();

    findNeighbourfields();
}

function newGame() {
    let returnValues = findNeighbourfields();

    if (returnValues[6] === true) {
        returnValues[4].removeEventListener('click', moveNeighbourfields);
        returnValues[4].classList.remove('purple-div');
    }

    if (returnValues[8] === true) {
        returnValues[2].removeEventListener('click', moveNeighbourfields);
        returnValues[2].classList.remove('purple-div');
    }

    if (returnValues[9] === true) {
        returnValues[3].removeEventListener('click', moveNeighbourfields);
        returnValues[3].classList.remove('purple-div');
    }

    if (returnValues[7] === true) {
        returnValues[5].removeEventListener('click', moveNeighbourfields);
        returnValues[5].classList.remove('purple-div');
    }

    positionGrid = [];
    shufflePuzzle();
}

function sortPuzzle() {
    for (let i = 1; i <= 16; i++) {
        document.querySelector('.layout-puzzle').append(document.getElementById('tile-' + i));
    }
}

function getWinner() {
    let winner;
    for (let i = 0; i <= 15; i++) {
        if (i + 1 === positionGrid[i]) {
            winner = true;
        } else {
            return;
        }
    }

    alert('Du hast gewonnen!');
}

shufflePuzzle();
