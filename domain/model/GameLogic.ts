export type Player = 'X' | 'O' | null;
export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]            
];

export const checkWinner = (board: Player[]): Player => {
    for (let combo of WINNING_COMBINATIONS) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

export const getAvailableMoves = (board: Player[]): number[] => {
    return board.map((cell, index) => (cell === null ? index : -1)).filter(index => index !== -1);
};

export const isGameOver = (board: Player[]): boolean => {
    return checkWinner(board) !== null || getAvailableMoves(board).length === 0;
};