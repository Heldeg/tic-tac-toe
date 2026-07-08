import { SQLiteDatabase } from 'expo-sqlite';
import { SettingsDao } from '../data/dao/SettingsDao';
import { SettingsMapper } from '../data/mapper/SettingsMapper';
import { SettingsModel } from '../model/SettingsModel';


export class SettingsRepository {
    static async saveSettings(db: SQLiteDatabase, model: SettingsModel): Promise<void> {
        const entity = SettingsMapper.toEntity(model);
        await SettingsDao.updateSettings(db, entity.difficulty)
    }

    static async getSettings(db: SQLiteDatabase): Promise<SettingsModel | null> {
        const entity = await SettingsDao.getSettings(db);
        return entity ? SettingsMapper.toModel(entity) : null;
    }
}