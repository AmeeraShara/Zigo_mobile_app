import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type AppHeaderProps = {
  onMenuPress: () => void;
};

export default function AppHeader({ onMenuPress }: AppHeaderProps) {
  return (
    <View style={styles.header}>
      {/* Logo */}
      <View style={styles.logo}>
        <Text style={styles.logoText}>Z</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Zigo Mobile</Text>

      {/* Hamburger */}
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={32} color="#111827" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 90,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  logo: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  logoText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  title: {
    flex: 1,
    marginLeft: 15,
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
});