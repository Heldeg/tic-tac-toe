import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { DATABASE_NAME, initializeDatabase } from "../domain/data/local/connection";
import { GameSettingsProvider } from "../components/GameSettingsContext";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={initializeDatabase}>
      <GameSettingsProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </GameSettingsProvider>
    </SQLiteProvider>
  );
}
