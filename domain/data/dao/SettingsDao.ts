import { SQLiteDatabase } from 'expo-sqlite';
import { Settings } from '../entity/Settings';

export class SettingsDao {
  static async updateSettings(db: SQLiteDatabase, difficulty: string): Promise<void> {
    await db.runAsync(
      'UPDATE settings SET difficulty = ? WHERE id = 1',
      [difficulty]
    );
  }

  static async getSettings(db: SQLiteDatabase): Promise<Settings | null> {
    return await db.getFirstAsync<Settings>('SELECT * FROM settings LIMIT 1');
  }
}