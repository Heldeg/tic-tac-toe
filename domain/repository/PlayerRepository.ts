import { SQLiteDatabase } from 'expo-sqlite';
import { PlayerDao } from '../data/dao/PlayerDao';
import { PlayerMapper } from '../data/mapper/PlayerMapper';
import { PlayerModel } from '../model/PlayerModel';

export class PlayerRepository {
    static async getPlayers(db: SQLiteDatabase): Promise<PlayerModel[]> {
        const entities = await PlayerDao.getPlayers(db);
        return entities.map(entity => PlayerMapper.toModel(entity));
    }
    static async updatePlayer(db: SQLiteDatabase, id: number, name: string): Promise<void> {
        await PlayerDao.updatePlayer(db, id, name);
    }

}