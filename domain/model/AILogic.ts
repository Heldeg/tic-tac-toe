import { Player, checkWinner, getAvailableMoves } from './GameLogic';

const getWinningMove = (board: Player[], player: Player): number | null => {
    const availableMoves = getAvailableMoves(board);
    for (let move of availableMoves) {
        const tempBoard = [...board];
        tempBoard[move] = player;
        if (checkWinner(tempBoard) === player) return move;
    }
    return null;
};

const getEasyMove = (board: Player[]): number => {
    const availableMoves = getAvailableMoves(board);
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
};

const getMediumMove = (board: Player[]): number => {
    const winMove = getWinningMove(board, 'O');
    if (winMove !== null) return winMove;

    const blockMove = getWinningMove(board, 'X');
    if (blockMove !== null) return blockMove;

    // 3. Get center if its possible
    if (board[4] === null) return 4;

    // 4. Random
    return getEasyMove(board);
};

// HARD MINMAX
const minimax = (board: Player[], depth: number, isMaximizing: boolean): number => {
    const winner = checkWinner(board);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (getAvailableMoves(board).length === 0) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

const getHardMove = (board: Player[]): number => {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
};

export const getAiMove = (board: Player[], difficulty: 'EASY' | 'MEDIUM' | 'HARD'): number => {
    switch (difficulty) {
        case 'EASY': return getEasyMove(board);
        case 'MEDIUM': return getMediumMove(board);
        case 'HARD': return getHardMove(board);
        default: return getEasyMove(board);
    }
};