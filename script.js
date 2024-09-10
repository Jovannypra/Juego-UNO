let players = [];
let currentPlayerIndex = 0;
let pointsToWin = 0;
let playerScores = [];

// Paso 1: Configuración inicial
function nextStep() {
    const numPlayers = document.getElementById('numPlayers').value;
    
    if (numPlayers < 2) {
        alert('Debe haber al menos 2 jugadores.');
        return;
    }
    
    document.getElementById('setup').style.display = 'none';
    document.getElementById('playerSetup').style.display = 'block';
    
    const playerNamesDiv = document.getElementById('playerNames');
    playerNamesDiv.innerHTML = '';  // Limpiar antes de agregar nuevos inputs
    
    for (let i = 0; i < numPlayers; i++) {
        playerNamesDiv.innerHTML += `<input type="text" id="player${i}" placeholder="Nombre del jugador ${i + 1}" required><br>`;
    }
}

// Paso 2: Selección del jugador inicial
function selectStartingPlayer() {
    players = [];
    playerScores = [];
    const numPlayers = document.getElementById('numPlayers').value;

    for (let i = 0; i < numPlayers; i++) {
        const playerName = document.getElementById(`player${i}`).value;
        if (!playerName) {
            alert(`Por favor, ingresa el nombre para el jugador ${i + 1}.`);
            return;
        }
        players.push(playerName);
        playerScores.push(0);  // Inicializar puntaje de cada jugador
    }
    
    document.getElementById('playerSetup').style.display = 'none';
    document.getElementById('startingPlayerSetup').style.display = 'block';
    
    const startingPlayerSelect = document.getElementById('startingPlayer');
    startingPlayerSelect.innerHTML = '';
    players.forEach((player, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = player;
        startingPlayerSelect.appendChild(option);
    });
}

// Paso 3: Inicio del juego
function startGame() {
    currentPlayerIndex = parseInt(document.getElementById('startingPlayer').value, 10);

    pointsToWin = parseInt(prompt('¿Cuántos puntos se necesitan para ganar?'), 10);
    
    if (!pointsToWin || isNaN(pointsToWin) || pointsToWin <= 0) {
        alert('Por favor, ingresa un número válido de puntos.');
        return;
    }
    
    document.getElementById('startingPlayerSetup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    
    document.getElementById('pointsToWin').textContent = pointsToWin;
    populatePlayerSelection();
    updateTurnInfo();
    updateScoreboard();
}

// Poblar el menú desplegable con los jugadores
function populatePlayerSelection() {
    const playerSelect = document.getElementById('selectedPlayer');
    playerSelect.innerHTML = '';
    players.forEach((player, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = player;
        playerSelect.appendChild(option);
    });
}

// Actualiza el tablero de puntajes
function updateScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = '';

    players.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player}: ${playerScores[index]} puntos`;
        scoreboard.appendChild(listItem);
    });
}

// Actualiza la información del turno y quién barajará las cartas
function updateTurnInfo() {
    document.getElementById('turnInfo').textContent = `Es el turno de ${players[currentPlayerIndex]}.`;
    
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    document.getElementById('shuffleInfo').textContent = `El siguiente en barajar es ${players[nextPlayerIndex]}.`;
}

// Agrega puntos al jugador seleccionado
function addPointsToPlayer() {
    const selectedPlayerIndex = parseInt(document.getElementById('selectedPlayer').value, 10);
    const points = parseInt(document.getElementById('addPoints').value, 10);

    if (isNaN(points) || points <= 0) {
        alert('Por favor, ingresa un número válido de puntos.');
        return;
    }

    playerScores[selectedPlayerIndex] += points;

    if (playerScores[selectedPlayerIndex] >= pointsToWin) {
        alert(`${players[selectedPlayerIndex]} ha ganado el juego con ${playerScores[selectedPlayerIndex]} puntos!`);
        resetGame();
        return;
    }

    // Pasar al siguiente jugador
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateTurnInfo();
    updateScoreboard();
    document.getElementById('addPoints').value = '';  // Limpiar campo de puntos
}

// Reinicia el juego
function resetGame() {
    document.getElementById('setup').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    document.getElementById('playerSetup').style.display = 'none';
    document.getElementById('startingPlayerSetup').style.display = 'none';
    document.getElementById('numPlayers').value = '';
    document.getElementById('playerNames').innerHTML = '';
    players = [];
    playerScores = [];
}

