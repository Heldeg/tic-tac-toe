import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'tictactoe.db';
const DATABASE_VERSION = 1;

export async function initializeDatabase(db: SQLiteDatabase): Promise<void> {
    const result = await db.getFirstAsync<{ user_version: number }>(
        'PRAGMA user_version'
    );

    const currentVersion = result?.user_version ?? 0;

    if (currentVersion >= DATABASE_VERSION) {
        return;
    }

    console.log("Init DB, Current Version:", currentVersion);

    if (currentVersion === 0) {
        await db.execAsync(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS player (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        difficulty TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS game (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        player_x INTEGER NOT NULL,
        player_o INTEGER NOT NULL,
        num_moves INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (player_x) REFERENCES player (id),
        FOREIGN KEY (player_o) REFERENCES player (id)
      );
    `);

        const countSettings = await db.getFirstAsync<{ total: number }>(
            'SELECT COUNT(*) as total FROM settings'
        );
        if ((countSettings?.total ?? 0) === 0) {
            await db.runAsync(
                `INSERT INTO settings (difficulty) VALUES (?)`,
                ['Easy'] // Easy, Medium, Hard
            );
        }

        // Insert default players
        const countPlayers = await db.getFirstAsync<{ total: number }>(
            'SELECT COUNT(*) as total FROM player'
        );

        if ((countPlayers?.total ?? 0) === 0) {
            await db.runAsync(`INSERT INTO player (name) VALUES (?)`, ['Local Player']); // ID 1
            await db.runAsync(`INSERT INTO player (name) VALUES (?)`, ['guest profile']);      // ID 2
            await db.runAsync(`INSERT INTO player (name) VALUES (?)`, ['Easy AI']);      // ID 3
            await db.runAsync(`INSERT INTO player (name) VALUES (?)`, ['Medium AI']);      // ID 4
            await db.runAsync(`INSERT INTO player (name) VALUES (?)`, ['Hard AI']);    // ID 5
        }
    }

    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}