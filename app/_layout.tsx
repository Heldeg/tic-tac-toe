import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
import { DATABASE_NAME, initializeDatabase } from '../domain/data/local/connection';

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={initializeDatabase}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  )
}
