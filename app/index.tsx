import { ScrollView, StyleSheet, Text, View } from "react-native";
import TicTacToeScreen from "../components/TicTacToeGame";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <TicTacToeScreen></TicTacToeScreen>
      </ScrollView>
    </SafeAreaView>
  );
}
