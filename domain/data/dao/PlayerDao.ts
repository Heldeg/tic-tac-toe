import { SQLiteDatabase } from 'expo-sqlite';
import { PlayerModel } from '../../model/PlayerModel';

export class PlayerDao {
  static async getPlayers(db: SQLiteDatabase): Promise<PlayerModel[]> {
    return await db.getAllAsync<PlayerModel>('SELECT * FROM players');
  }
  static async updatePlayer(db: SQLiteDatabase, id: number, name: string): Promise<void> {
    await db.runAsync(
      'UPDATE players SET name = ? WHERE id = ?',
      [name, id]
    );
  }

}
