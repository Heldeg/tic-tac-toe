import { SQLiteDatabase } from 'expo-sqlite';
import { Game } from '../entity/Game';

export class GameDao {
    static async insertGame(db: SQLiteDatabase, playerX: number, playerO: number, numMoves: number): Promise<void> {
        await db.runAsync(
            'INSERT INTO game (player_x, player_o, num_moves) VALUES (?, ?, ?)',
            [playerX, playerO, numMoves]
        );
    }

    static async getGames(db: SQLiteDatabase): Promise<Game[]> {
        return await db.getAllAsync<Game>('SELECT * FROM game');
    }
}