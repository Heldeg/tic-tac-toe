import { SafeAreaView, StyleSheet, View } from "react-native";
import TicTacToeScreen from "../../../components/TicTacToeGame";
import Header from "../../../components/Header";

export default function GameRoute() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <TicTacToeScreen />
      </View>
      <Header />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#111827", justifyContent: "space-between" },
  contentContainer: { flex: 1 },
});
