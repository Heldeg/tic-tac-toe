import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import Header from "../../../components/Header";
import { useGameSettings } from "../../../components/GameSettingsContext";
import type { DifficultyLevel } from "../../../domain/model/GameLogic";

export default function SettingsRoute() {
  const { difficulty, setDifficulty } = useGameSettings();

  const levels: DifficultyLevel[] = ["EASY", "MEDIUM", "HARD"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Configuración</Text>
        <Text style={styles.subtitle}>Elige la dificultad para el juego.</Text>

        <View style={styles.options}>
          {levels.map((level) => (
            <Pressable
              key={level}
              style={[styles.option, difficulty === level && styles.optionActive]}
              onPress={() => setDifficulty(level)}
            >
              <Text style={[styles.optionText, difficulty === level && styles.optionTextActive]}>
                {level}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <Header />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#111827", justifyContent: "space-between" },
  contentContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { color: "#f9fafb", fontSize: 24, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: "#9ca3af", fontSize: 16, textAlign: "center", marginBottom: 20 },
  options: { width: "100%", gap: 12 },
  option: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, backgroundColor: "#1f2937", borderWidth: 1, borderColor: "#374151" },
  optionActive: { backgroundColor: "#2563eb", borderColor: "#60a5fa" },
  optionText: { color: "#f9fafb", fontSize: 16, fontWeight: "600", textAlign: "center" },
  optionTextActive: { color: "#ffffff" },
});
