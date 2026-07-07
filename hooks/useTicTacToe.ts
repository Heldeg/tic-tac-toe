import { useState, useEffect, useCallback } from 'react';
import { checkWinner, isGameOver, Player, DifficultyLevel, getAvailableMoves } from '../domain/model/GameLogic';
import { getAiMove } from '../domain/model/AILogic';

export const useTicTacToe = (difficulty: DifficultyLevel = 'MEDIUM') => {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true); 
    const [winner, setWinner] = useState<Player>(null);

    const handleCellClick = useCallback((index: number) => {
        if (board[index] || !isPlayerTurn || isGameOver(board)) return;

        // Player turn
        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);
        setIsPlayerTurn(false);
    }, [board, isPlayerTurn]);

    // AI TUrn
    useEffect(() => {
        if (!isPlayerTurn && !isGameOver(board)) {
            // Time for drama
            const timer = setTimeout(() => {
                const aiMoveIndex = getAiMove(board, difficulty);

                const newBoard = [...board];
                newBoard[aiMoveIndex] = 'O';
                setBoard(newBoard);
                setIsPlayerTurn(true);
            }, 500); 

            return () => clearTimeout(timer);
        }
    }, [isPlayerTurn, board, difficulty]);

    useEffect(() => {
        const currentWinner = checkWinner(board);
        if (currentWinner) {
            setWinner(currentWinner);
        }
    }, [board]);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsPlayerTurn(true);
        setWinner(null);
    };

    return {
        board,
        winner,
        isDraw: !winner && getAvailableMoves(board).length === 0,
        isPlayerTurn,
        handleCellClick,
        resetGame
    };
};