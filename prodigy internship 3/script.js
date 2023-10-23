
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart-button');
const winnerMessage = document.getElementById('winner-message');
const winnerText = document.getElementById('winner-text');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        return 'Draw';
    }

    return null;
}

function highlightWinner(cells, winner) {
    cells.forEach((cell, index) => {
        if (gameBoard[index] === winner) {
            cell.classList.add('winner');
        }
    });
    status.textContent = '';

    
    winnerText.textContent = `Player ${winner} wins!`;
    winnerMessage.style.display = 'block';
}

function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    const winner = checkWin();
    if (winner) {
        gameActive = false;
        highlightWinner(cells, winner);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.textContent = 'Player X\'s turn';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'winner');
    });
    winnerMessage.style.display = 'none'; // Hide the winner message
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handleCellClick(index);
    });
});

restartButton.addEventListener('click', () => {
    restartGame();
});

restartGame();
