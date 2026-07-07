import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTicTacToe } from "../hooks/useTicTacToe";
import { DifficultyLevel } from "../domain/model/GameLogic";

export default function TicTacToeScreen() {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("MEDIUM");

  const { board, winner, isDraw, isPlayerTurn, handleCellClick, resetGame } =
    useTicTacToe(difficulty);

  const toggleDifficulty = () => {
    if (!isPlayerTurn && !winner && !isDraw) return;

    const levels: DifficultyLevel[] = ["EASY", "MEDIUM", "HARD"];
    const currentIndex = levels.indexOf(difficulty);
    const nextIndex = (currentIndex + 1) % levels.length;

    setDifficulty(levels[nextIndex]);
    resetGame();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TiC TAC TOE vs IA</Text>

      {/* Controll */}
      <View style={styles.controls}>
        <Pressable style={styles.button} onPress={toggleDifficulty}>
          <Text style={styles.buttonText}>Dificultad: {difficulty}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </Pressable>
      </View>

      <View style={styles.statusContainer}>
        {winner ? (
          <Text style={styles.statusText}>¡El ganador es: {winner}!</Text>
        ) : isDraw ? (
          <Text style={styles.statusText}>¡Es un empate!</Text>
        ) : (
          <Text style={styles.statusText}>
            {isPlayerTurn ? "Tu turno (X)" : "La IA está pensando..."}
          </Text>
        )}
      </View>

      <View style={styles.board}>
        {board.map((cellState, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.cell,
              pressed && styles.cellPressed,
            ]}
            onPress={() => handleCellClick(index)}
            disabled={cellState !== null || !isPlayerTurn || !!winner}
          >
            <Text
              style={[
                styles.cellText,
                cellState === "X" ? styles.textX : styles.textO,
              ]}
            >
              {cellState}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  controls: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  statusContainer: {
    marginBottom: 20,
    height: 30,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#333",
    borderWidth: 2,
    borderColor: "#333",
  },
  cell: {
    width: "33.33%",
    height: "33.33%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  cellPressed: {
    backgroundColor: "#e0e0e0",
  },
  cellText: {
    fontSize: 60,
    fontWeight: "bold",
  },
  textX: {
    color: "#FF3B30",
  },
  textO: {
    color: "#34C759",
  },
});
