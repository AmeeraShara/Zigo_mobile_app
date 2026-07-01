// src/screens/HomeScreen.tsx

import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import AppHeader from "../components/menu/AppHeader";
import DrawerMenu from "../components/menu/DrawerMenu";

export default function HomeScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <View style={styles.container}>
      <AppHeader onMenuPress={() => setDrawerVisible(true)} />

      <DrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
});