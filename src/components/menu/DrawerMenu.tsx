import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { categories } from "../../data/categories";

const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function DrawerMenu({ visible, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // FIX: stable animation reference
  const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  // FIX: safer effect dependency
  useEffect(() => {
    if (visible) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: -SCREEN_WIDTH,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, translateX]);

  return (
    <>
      {/* Overlay */}
      {visible && (
        <Pressable style={styles.overlay} onPress={onClose} />
      )}

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX }] },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Categories</Text>

          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Safety check */}
        {Array.isArray(categories) && (
          <View style={styles.list}>
            {categories.map((cat) => {
              const isOpen = expanded === cat.id;

              return (
                <View key={cat.id}>
                  {/* Main Category */}
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() =>
                      setExpanded(isOpen ? null : cat.id)
                    }
                  >
                    <Ionicons
                      name="grid-outline"
                      size={22}
                      color="#64748B"
                    />

                    <Text style={styles.itemText}>
                      {cat.name}
                    </Text>

                    <Ionicons
                      name={
                        isOpen
                          ? "chevron-up-outline"
                          : "chevron-down-outline"
                      }
                      size={20}
                      color="#64748B"
                      style={{ marginLeft: "auto" }}
                    />
                  </TouchableOpacity>

                  {/* Sub Categories */}
                  {isOpen &&
                    cat.subCategories?.map((sub) => (
                      <TouchableOpacity
                        key={sub.id}
                        style={styles.subItem}
                        onPress={() => {
                          console.log("Selected:", sub.id);
                          onClose();
                        }}
                      >
                        <Text style={styles.subText}>
                          • {sub.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              );
            })}
          </View>
        )}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    // ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 10,
  },

  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "80%",
    backgroundColor: "#fff",
    zIndex: 20,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  list: {
    marginTop: 10,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 10,
  },

  itemText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#111827",
  },

  subItem: {
    paddingLeft: 45,
    paddingVertical: 8,
  },

  subText: {
    color: "#64748B",
    fontSize: 14,
  },
});