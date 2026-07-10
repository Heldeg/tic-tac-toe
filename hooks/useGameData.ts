import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { PlayerDao } from '../domain/data/dao/PlayerDao';
import { SettingsDao } from '../domain/data/dao/SettingsDao';
import { PlayerModel } from '../domain/model/PlayerModel';
import { SettingsModel } from '../domain/model/SettingsModel';

export const useGameData = () => {
    const db = useSQLiteContext();
    const [settings, setSettings] = useState<SettingsModel | null>(null);
    const [players, setPlayers] = useState<PlayerModel[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const loadedSettings = await SettingsDao.getSettings(db);
            const loadedPlayers = await PlayerDao.getPlayers(db);

            setSettings(loadedSettings);
            setPlayers(loadedPlayers);
        } catch (error) {
            console.error("Error loading data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadData();
    }, [db]);

    const changeDifficulty = async (newDifficulty: string) => {
        await SettingsDao.updateSettings(db, newDifficulty);
        await loadData();
    };

    const updatePlayer = async (id: number, name: string) => {
        await PlayerDao.updatePlayer(db, id, name);
        await loadData();
    };

    return { settings, players, loading, changeDifficulty, updatePlayer };
};