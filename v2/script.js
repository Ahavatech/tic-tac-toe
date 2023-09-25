let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameMode = 'person';

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const winnerMessage = document.getElementById('winner-message');
const resetButton = document.getElementById('reset-button');
const modeToggle = document.getElementById('modeToggle');

modeToggle.addEventListener('change', () => {
    gameMode = modeToggle.value;
    resetBoard();
});

cells.forEach(cell => cell.addEventListener('click', () => makeMove(cell)));
resetButton.addEventListener('click', resetBoard);

function makeMove(cell) {
    const index = cell.dataset.index;

    if (board[index] === '' && !checkWinner() && (gameMode === 'person' || (gameMode === 'computer' && currentPlayer === 'X'))) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (gameMode === 'computer' && !checkWinner()) {
            computerMove();
        }
    }

    if (checkWinner()) {
        winnerMessage.textContent = `${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
    }
}

function computerMove() {
    const emptyCells = board.reduce((acc, val, index) => {
        if (val === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerIndex = emptyCells[randomIndex];
        board[computerIndex] = currentPlayer;
        cells[computerIndex].textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }

    if (!board.includes('')) {
        winnerMessage.textContent = "It's a tie!";
    }

    return false;
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    winnerMessage.textContent = '';
    currentPlayer = 'X';
}

