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

// Every category has subcategories
const menuData = [
  {
    id: "1",
    name: "Shop",
    icon: "storefront-outline",
    subCategories: [], // Empty array - no subcategories
  },
  {
    id: "2",
    name: "Chargers",
    icon: "flash-outline",
    subCategories: [
      "Fast Chargers",
      "Wireless Chargers",
      "Car Chargers",
      "Wall Chargers",
      "Charging Stations",
    ],
  },
  {
    id: "3",
    name: "Power Banks",
    icon: "battery-full-outline",
    subCategories: [
      "5000mAh",
      "10000mAh",
      "20000mAh",
      "MagSafe Power Banks",
    ],
  },
  {
    id: "4",
    name: "Cables",
    icon: "usb-outline",
    subCategories: [
      "USB-C",
      "Lightning",
      "Micro USB",
      "HDMI",
      "Type-C to Type-C",
    ],
  },
  {
    id: "5",
    name: "Audio",
    icon: "headset-outline",
    subCategories: [
      "Earbuds",
      "Headphones",
      "Bluetooth Speakers",
      "Neckbands",
    ],
  },
  {
    id: "6",
    name: "Protection",
    icon: "shield-outline",
    subCategories: [
      "Screen Protectors",
      "Phone Cases",
      "Camera Protectors",
      "Laptop Sleeves",
    ],
  },
  {
    id: "7",
    name: "Smart Accessories",
    icon: "watch-outline",
    subCategories: [
      "Smart Watches",
      "Fitness Bands",
      "Smart Tags",
      "Wearables",
    ],
  },
  {
    id: "8",
    name: "Camera & Selfie",
    icon: "camera-outline",
    subCategories: [
      "Selfie Sticks",
      "Tripods",
      "Ring Lights",
      "Phone Lenses",
    ],
  },
  {
    id: "9",
    name: "Mounts & Holders",
    icon: "phone-portrait-outline",
    subCategories: [
      "Car Mounts",
      "Bike Mounts",
      "Desk Holders",
      "Magnetic Holders",
    ],
  },
  {
    id: "10",
    name: "Memory & Storage",
    icon: "save-outline",
    subCategories: [
      "Micro SD Cards",
      "USB Flash Drives",
      "External SSDs",
      "Memory Card Readers",
    ],
  },
  {
    id: "11",
    name: "Computer Accessories",
    icon: "laptop-outline",
    subCategories: [
      "Keyboards",
      "Mouse",
      "Webcams",
      "USB Hubs",
      "Laptop Stands",
    ],
  },
  {
    id: "12",
    name: "Batteries",
    icon: "battery-charging-outline",
    subCategories: [
      "AA Batteries",
      "AAA Batteries",
      "Rechargeable Batteries",
      "Button Cells",
    ],
  },
];

export default function DrawerMenu({ visible, onClose }: Props) {
  // Navigation state
  const [showCategories, setShowCategories] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -SCREEN_WIDTH,
      duration: visible ? 250 : 200,
      useNativeDriver: true,
    }).start();

    // Reset to shop level when drawer opens
    if (visible) {
      setShowCategories(false);
      setExpandedCategory(null);
    }
  }, [visible]);

  // Handle Shop click - show categories
  const handleShopPress = () => {
    setShowCategories(true);
    setExpandedCategory(null);
  };

  // Handle back to Shop
  const handleBackToShop = () => {
    setShowCategories(false);
    setExpandedCategory(null);
  };

  // Toggle category expansion
  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  // Handle subcategory click
  const handleSubCategoryPress = (categoryName: string, sub: string) => {
    console.log(`Category: ${categoryName}, Subcategory: ${sub}`);
    onClose();
  };

  // Render Shop level (only "Shop" item)
  const renderShopLevel = () => (
    <TouchableOpacity
      style={styles.shopItem}
      onPress={handleShopPress}
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        <Ionicons
          name="storefront-outline"
          size={24}
          color={Colors.drawer.iconColor}
          style={styles.itemIcon}
        />
        <Text style={styles.shopText}>Shop</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={20}
          color={Colors.drawer.iconColor}
          style={styles.chevronIcon}
        />
      </View>
    </TouchableOpacity>
  );

  // Render Categories level with expandable subcategories
  const renderCategoriesLevel = () => (
    <>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackToShop}
        activeOpacity={0.7}
      >
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color={Colors.drawer.categoryText}
        />
        <Text style={styles.backButtonText}>Shop</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* All categories (excluding "Shop" itself) */}
      {menuData.slice(1).map((item) => {
        const isExpanded = expandedCategory === item.id;
        const hasSubCategories = item.subCategories.length > 0;

        return (
          <View key={item.id} style={styles.categoryWrapper}>
            {/* Category Item */}
            <TouchableOpacity
              style={[
                styles.categoryItem,
                isExpanded && hasSubCategories && styles.categoryItemExpanded,
              ]}
              onPress={() => toggleCategory(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.itemContent}>
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={
                    isExpanded && hasSubCategories
                      ? Colors.brand.accent
                      : Colors.drawer.iconColor
                  }
                  style={styles.itemIcon}
                />
                <Text
                  style={[
                    styles.categoryText,
                    isExpanded && hasSubCategories && styles.categoryTextExpanded,
                  ]}
                >
                  {item.name}
                </Text>
                {hasSubCategories && (
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={Colors.drawer.iconColor}
                  />
                )}
              </View>
            </TouchableOpacity>

            {/* Subcategories - shown below the category */}
            {isExpanded && hasSubCategories && (
              <View style={styles.subCategoryContainer}>
                {item.subCategories.map((sub, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.subItem}
                    onPress={() => handleSubCategoryPress(item.name, sub)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.subItemText}>• {sub}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </>
  );

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
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {showCategories ? renderCategoriesLevel() : renderShopLevel()}
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
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
    shadowOffset: {
      width: 2,
      height: 0,
    },
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

  // Shop level styles
  shopItem: {
    paddingVertical: 16,
    borderRadius: 8,
  },

  shopText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    color: Colors.drawer.categoryText,
  },

  // Common styles
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemIcon: {
    marginRight: 14,
  },

  chevronIcon: {
    marginLeft: 8,
  },

  // Categories level styles
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 8,
  },

  backButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.drawer.categoryText,
    marginLeft: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginBottom: 12,
  },

  categoryWrapper: {
    marginBottom: 2,
  },

  categoryItem: {
    paddingVertical: 14,
    borderRadius: 8,
  },

  categoryItemExpanded: {
    backgroundColor: "#F8F8FC",
  },

  categoryText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: Colors.drawer.categoryText,
  },

  categoryTextExpanded: {
    color: Colors.brand.accent,
    fontWeight: "600",
  },

  // Subcategories styles
  subCategoryContainer: {
    marginLeft: 18,
    marginBottom: 8,
    borderLeftWidth: 1,
    borderLeftColor: "#E5E5E5",
    paddingLeft: 18,
  },

  subItem: {
    paddingVertical: 10,
  },

  subItemText: {
    fontSize: 15,
    color: Colors.drawer.subCategoryText,
  },
});