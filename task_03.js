const cells = document.querySelectorAll('.cell');
const newButton = document.getElementById('new');
let currentPlayer = 'X'; 
let gameState = Array(9).fill(''); 
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = clickedCell.getAttribute('data-index');
    if (gameState[clickedIndex] !== '' || !gameActive) {
        return;
    }
    gameState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkResult() {
    let roundWon = false;
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        alert(`Player ${currentPlayer} wins!`);
        gameActive = false;
    } else if (!gameState.includes('')) {
        alert('It\'s a draw!');
        gameActive = false;
    }
}

function newGame() {
    currentPlayer = 'X';
    gameState = Array(9).fill('');
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

newButton.addEventListener('click', newGame);
