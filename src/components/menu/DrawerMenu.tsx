// components/menu/DrawerMenu.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = {
  visible: boolean;
  onClose: () => void;
};

// Sample data based on your image
const menuData = [
  {
    id: '1',
    name: 'Shop',
    icon: 'storefront-outline',
    isHeader: true,
  },
  {
    id: '2',
    name: 'Chargers',
    icon: 'flash-outline',
    subCategories: [
      'Fast Chargers',
      'Wireless Chargers',
      'Car Chargers',
    ],
  },
  {
    id: '3',
    name: 'Power Banks',
    icon: 'battery-full-outline',
    subCategories: [],
  },
  {
    id: '4',
    name: 'Cables',
    icon: 'usb-outline',
    subCategories: [],
  },
  {
    id: '5',
    name: 'Audio',
    icon: 'headset-outline',
    subCategories: [],
  },
  {
    id: '6',
    name: 'Protection',
    icon: 'shield-outline',
    subCategories: [],
  },
  {
    id: '7',
    name: 'Smart Accessories',
    icon: 'watch-outline',
    subCategories: [],
  },
  {
    id: '8',
    name: 'Camera & Selfie',
    icon: 'camera-outline',
    subCategories: [],
  },
  {
    id: '9',
    name: 'Mounts & Holders',
    icon: 'phone-portrait-outline',
    subCategories: [],
  },
  {
    id: '10',
    name: 'Memory & Storage',
    icon: 'save-outline',
    subCategories: [],
  },
  {
    id: '11',
    name: 'Computer Access...',
    icon: 'laptop-outline',
    subCategories: [],
  },
  {
    id: '12',
    name: 'Batteries',
    icon: 'battery-charging-outline',
    subCategories: [],
  },
];

export default function DrawerMenu({ visible, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

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

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <>
      {visible && (
        <Pressable 
          style={[styles.overlay, { backgroundColor: Colors.drawer.overlay }]} 
          onPress={onClose} 
        />
      )}

      <Animated.View
        style={[
          styles.drawer,
          { 
            transform: [{ translateX }],
            backgroundColor: Colors.drawer.background,
          },
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {menuData.map((item) => {
              const isExpanded = expanded === item.id;
              const hasSubCategories = item.subCategories && item.subCategories.length > 0;

              return (
                <View key={item.id} style={styles.itemWrapper}>
                  <TouchableOpacity
                    style={[
                      styles.mainItem,
                      isExpanded && styles.mainItemExpanded,
                    ]}
                    onPress={() => {
                      if (hasSubCategories) {
                        toggleExpand(item.id);
                      } else {
                        console.log('Selected:', item.name);
                        onClose();
                      }
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={styles.itemContent}>
                      <Ionicons
                        name={item.icon as any}
                        size={22}
                        color={isExpanded ? Colors.brand.accent : Colors.drawer.iconColor}
                        style={styles.itemIcon}
                      />
                      <Text style={[
                        styles.itemText,
                        isExpanded && styles.itemTextExpanded,
                      ]}>
                        {item.name}
                      </Text>
                      {hasSubCategories && (
                        <Ionicons
                          name={isExpanded ? "chevron-up" : "chevron-down"}
                          size={20}
                          color={Colors.drawer.iconColor}
                          style={styles.chevron}
                        />
                      )}
                    </View>
                  </TouchableOpacity>

                  {/* Sub Categories */}
                  {isExpanded && hasSubCategories && (
                    <View style={styles.subCategoryContainer}>
                      {item.subCategories.map((sub, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.subItem}
                          onPress={() => {
                            console.log('Selected sub:', sub);
                            onClose();
                          }}
                          activeOpacity={0.7}
                        >
                          <Text style={styles.subItemText}>{sub}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },

  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "80%",
    zIndex: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },

  safeArea: {
    flex: 1,
    paddingTop: 50,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },

  itemWrapper: {
    marginBottom: 2,
  },

  mainItem: {
    paddingVertical: 14,
    borderRadius: 8,
  },

  mainItemExpanded: {
    backgroundColor: '#F8F8FC',
  },

  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemIcon: {
    marginRight: 14,
  },

  itemText: {
    fontSize: 16,
    color: Colors.drawer.categoryText,
    fontWeight: '500',
    flex: 1,
  },

  itemTextExpanded: {
    color: Colors.brand.accent,
    fontWeight: '600',
  },

  chevron: {
    marginLeft: 'auto',
  },

  subCategoryContainer: {
    paddingLeft: 36,
    paddingBottom: 8,
  },

  subItem: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },

  subItemText: {
    fontSize: 15,
    color: Colors.drawer.subCategoryText,
    fontWeight: '400',
  },
});