let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
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

function makeMove(cell) {
    const index = cell.dataset.index;

    if (board[index] === '' && !checkWinner()) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    if (checkWinner()) {
        document.getElementById('winner-message').textContent = `${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
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
        document.getElementById('winner-message').textContent = "It's a tie!";
    }

    return false;
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('winner-message').textContent = '';
    currentPlayer = 'X';
}

resetBoard();

