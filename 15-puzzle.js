//Globales Array erstellen
let positionGrid = [];

function shufflePuzzle() {
    //Funktion um zufällige Anordung der Kacheln zu erzeugen
    const min = 1;
    const max = 16;
    let arrayRandomDiv = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    //Schritt 1: Iteraton der for-Schleife nutzen, um alle 16 Kacheln abzuarbeiten
    for (let i = 1; i <= 16; i++) {
        let stopCondition = false;

        while (stopCondition !== true) {
            //Schritt 2: Zufallszahl zwischen 1 und 16 erzeugen
            let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

            if (arrayRandomDiv.includes(randomNumber)) {
                /**
                 * Schritt 3: Wenn die Zufallszahl noch im Array enthalten ist, wird diese aus arrayGridnumbers
                 *              entfernt, als zufälliges Div ins Grid appended und in positionGrid für die exakte
                 *              Position des Div gepushed.
                 */
                arrayRandomDiv.splice(arrayRandomDiv.indexOf(randomNumber), 1);
                document
                    .querySelector('.layout-puzzle')
                    .append(document.getElementById('tile-' + randomNumber));
                positionGrid.push(randomNumber);

                //Schritt 4: While-Schleife mit wahrer stopCondition beenden
                stopCondition = true;
            }
        }
    }
    //Schritt 5: Nachbarfelder finden über findNeighbourfields()
    findNeighbourfields();
}

function findNeighbourfields() {
    //Funktion um bewegbare Nachbarfeld zu finden
    let emptyDiv;
    let emptyDivPosition;
    for (let i = 0; i <= positionGrid.length; i++) {
        //Schritt 1: Leeres Feld ermitteln
        if (positionGrid[i] === 16) {
            emptyDiv = document.getElementById('tile-' + positionGrid[i]);
            emptyDivPosition = i;
        }
    }

    //Schritt 2: Oberes Nachbarfeld feststellen
    let neighbourfieldTop = document.getElementById('tile-' + positionGrid[emptyDivPosition - 4]);

    //Schritt 2.1: Oberes Nachbarfeld über Eventlistener klickbar machen
    let eventistenerTop;
    if (neighbourfieldTop !== null) {
        neighbourfieldTop.addEventListener('click', moveNeighbourfields);
        neighbourfieldTop.classList.add('purple-div');
        eventistenerTop = true;
    }

    //Schritt 3: Unteres Nachbarfeld feststellen
    let neighbourfieldBottom = document.getElementById('tile-' + positionGrid[emptyDivPosition + 4]);

    //Schritt 3.1: Unteres Nachbarfeld über Eventlistener klickbar machen
    let eventlistenerBottom;
    if (neighbourfieldBottom !== null) {
        neighbourfieldBottom.addEventListener('click', moveNeighbourfields);
        neighbourfieldBottom.classList.add('purple-div');
        eventlistenerBottom = true;
    }

    //Schritt 4: Rechtes Nachbarfeld feststellen
    let neighbourfieldRight;
    let eventlistenerRight;
    if (
        emptyDivPosition !== 3 &&
        emptyDivPosition !== 7 &&
        emptyDivPosition !== 11 &&
        emptyDivPosition !== 15
    ) {
        neighbourfieldRight = document.getElementById('tile-' + positionGrid[emptyDivPosition + 1]);
        //Schritt 4.1: Rechtes Nachbarfeld über Eventlistener klickbar machen
        neighbourfieldRight.addEventListener('click', moveNeighbourfields);
        neighbourfieldRight.classList.add('purple-div');
        eventlistenerRight = true;
    }

    //Schritt 5: Linkes Nachbarfeld feststellen
    let neighbourfieldLeft;
    let eventlistenerLeft;
    if (
        emptyDivPosition !== 0 &&
        emptyDivPosition !== 4 &&
        emptyDivPosition !== 8 &&
        emptyDivPosition !== 12
    ) {
        neighbourfieldLeft = document.getElementById('tile-' + positionGrid[emptyDivPosition - 1]);
        //Schritt 5.1: Linkes Nachbarfeld über Eventlistener klickbar machen
        neighbourfieldLeft.addEventListener('click', moveNeighbourfields);
        neighbourfieldLeft.classList.add('purple-div');
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
    //Callback-Funktion für den Eventlistener, um Nachbarfelder zu bewegen
    let returnValues = findNeighbourfields();
    let x;
    let y;
    let gridlayout = document.querySelector('.layout-puzzle');

    //Schritt 1: Über event.target das geklickte Element bekommen
    let clickedNeighbourfield = event.currentTarget;

    //Schritt 2: Variablen für die Verschiebung der Felder pro Nachbar definieren
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

    /**
     * Schritt 3: Kacheln und Kachelpositionen im Array tauschen
     * Schritt 3.1: geklicktes Nachbarfeld mit leerem Div tauschen
     */
    gridlayout.insertBefore(clickedNeighbourfield, returnValues[0]);

    //Schritt 3.2: Positionen der Werte im Array tauschen
    let temp = positionGrid[returnValues[1] - x];
    positionGrid[returnValues[1] - x] = positionGrid[returnValues[1]];
    positionGrid[returnValues[1]] = temp;

    //Schritt 3.3: Leeres Div mit geklicktem Nachbarfeld tauschen
    gridlayout.insertBefore(
        returnValues[0],
        document.getElementById('tile-' + positionGrid[returnValues[1] - y]),
    );

    //Schritt 3.4: Eventlistener der alten Nachbarfelder entfernen
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

    //Schritt 3.6: Prüfen, ob Nutzer mit der richtigen Reihenfolge gewonnen hat
    getWinner();

    //Schritt 3.7: findNeighbourfields() neu aufrufen, um neue Nachbarfelder zu ermitteln
    findNeighbourfields();
}

function newGame() {
    //Funktion um neues Spiel mit neuer Reihenfolge zu starten
    //Schritt 1: Bestehende Eventlistener von den Nachbarfeldern entfernen
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

    //Schritt 2: Puzzle erneut sotieren
    positionGrid = [];
    shufflePuzzle();
}

function sortPuzzle() {
    //Funktion um Kacheln in der richtigen Reihenfolge zu sortieren
    //Schritt 1: Mithilfe der Iteration alle 15 Kacheln abarbeiten
    for (let i = 1; i <= 16; i++) {
        //Schritt 2: Der Reihenfolge nach die Kacheln ins Grid hinzufügen über append()-Methode
        document.querySelector('.layout-puzzle').append(document.getElementById('tile-' + i));
    }
}

function getWinner() {
    //Funktion um auf ein gewonnenes Spiel zu prüfen
    //Schritt 1: Iterativ prüfen, ob der Array richtig sortiert ist
    let winner;
    for (let i = 0; i <= 15; i++) {
        if (i + 1 === positionGrid[i]) {
            winner = true;
        } else {
            return;
        }
    }

    //Schritt 2: Meldung ausgeben, falls gewonnen wurde
    alert('Du hast gewonnen!');
}

shufflePuzzle();
