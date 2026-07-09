import React, { useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import Header from "../../../components/Header";
import { useGameData } from "../../../hooks/useGameData";

export default function ProfileRoute() {
  const { players, loading, updatePlayer } = useGameData();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftName, setDraftName] = useState("");

  const startEditing = (playerId: number, currentName: string) => {
    setEditingId(playerId);
    setDraftName(currentName);
  };

  const saveEditing = async () => {
    if (editingId === null) {
      return;
    }

    const trimmedName = draftName.trim();
    if (!trimmedName) {
      return;
    }

    await updatePlayer(editingId, trimmedName);
    setEditingId(null);
    setDraftName("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.subtitle}>Revisa y actualiza los nombres de los jugadores.</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#60a5fa" />
        ) : (
          <View style={styles.playersList}>
            {players.map((player) => (
              <View key={player.id} style={styles.playerCard}>
                {editingId === player.id ? (
                  <>
                    <TextInput
                      value={draftName}
                      onChangeText={setDraftName}
                      style={styles.input}
                      placeholder="Nombre del jugador"
                      placeholderTextColor="#9ca3af"
                    />
                    <Pressable style={styles.saveButton} onPress={saveEditing}>
                      <Text style={styles.saveButtonText}>Guardar</Text>
                    </Pressable>
                  </>
                ) : (
                  <>
                    <View style={styles.playerInfo}>
                      <Text style={styles.playerName}>{player.name}</Text>
                      <Text style={styles.playerId}>ID: {player.id}</Text>
                    </View>
                    <Pressable style={styles.editButton} onPress={() => startEditing(player.id, player.name)}>
                      <Text style={styles.editButtonText}>Editar</Text>
                    </Pressable>
                  </>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
      <Header />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#111827", justifyContent: "space-between" },
  contentContainer: { flex: 1, padding: 24, paddingTop: 32 },
  title: { color: "#f9fafb", fontSize: 24, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: "#9ca3af", fontSize: 16, marginBottom: 20 },
  playersList: { gap: 12 },
  playerCard: { backgroundColor: "#1f2937", borderRadius: 12, padding: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  playerInfo: { flex: 1 },
  playerName: { color: "#f9fafb", fontSize: 16, fontWeight: "600" },
  playerId: { color: "#9ca3af", fontSize: 12, marginTop: 4 },
  editButton: { backgroundColor: "#2563eb", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  editButtonText: { color: "#fff", fontWeight: "600" },
  input: { flex: 1, backgroundColor: "#111827", color: "#f9fafb", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, marginRight: 8 },
  saveButton: { backgroundColor: "#16a34a", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  saveButtonText: { color: "#fff", fontWeight: "600" },
});
