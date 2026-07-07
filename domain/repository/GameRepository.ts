import { SQLiteDatabase } from 'expo-sqlite';
import { GameDao } from '../data/dao/GameDao';
import { GameMapper } from '../data/mapper/GameMapper';
import { GameModel } from '../model/GameModel';

export class GameRepository {
    static async saveMatch(db: SQLiteDatabase, model: GameModel): Promise<void> {
        const entity = GameMapper.toEntity(model);
        await GameDao.insertGame(db, entity.playerX, entity.playerO, entity.numMoves);
    }

    static async getHistory(db: SQLiteDatabase): Promise<GameModel[]> {
        const entities = await GameDao.getGames(db);
        return entities.map(entity => GameMapper.toModel(entity));
    }
}