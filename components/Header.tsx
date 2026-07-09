import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

const tabs = [
  { route: "/game", label: "Juego" },
  { route: "/profile", label: "Perfil" },
  { route: "/settings", label: "Configuración" },
];

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable key={tab.route} style={styles.button} onPress={() => router.push(tab.route)}>
          <Text style={styles.buttonText}>{tab.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#111827",
    borderBottomColor: "#1f2937",
    borderBottomWidth: 1,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#1f2937",
  },
  buttonText: {
    color: "#f9fafb",
    fontWeight: "700",
  },
});
