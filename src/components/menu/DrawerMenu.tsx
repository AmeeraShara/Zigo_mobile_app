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
    subCategories: [],
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
  const [showCategories, setShowCategories] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isShopSelected, setIsShopSelected] = useState(false);
  
  const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -SCREEN_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start();

    if (visible) {
      // Reset when drawer opens
      setShowCategories(false);
      setExpandedCategory(null);
      setSelectedCategory(null);
      setIsShopSelected(false);
    }
  }, [visible]);

  const handleShopPress = () => {
    // Toggle categories visibility and select shop
    setShowCategories(!showCategories);
    setIsShopSelected(true); // Shop is now selected
    setSelectedCategory("shop");
    if (!showCategories) {
      setExpandedCategory(null);
    }
  };

  const toggleCategory = (id: string) => {
    // Keep shop selected
    setIsShopSelected(true);
    if (selectedCategory === id) {
      setExpandedCategory(expandedCategory === id ? null : id);
    } else {
      setSelectedCategory(id);
      setExpandedCategory(id);
    }
  };

  const handleSubCategoryPress = (categoryName: string, sub: string) => {
    console.log(`Category: ${categoryName}, Subcategory: ${sub}`);
    onClose();
  };

  // Render Shop level (only "Shop" item)
  const renderShopLevel = () => (
    <TouchableOpacity
      style={[
        styles.shopItem,
        isShopSelected && styles.shopItemSelected // Red when shop is selected
      ]}
      onPress={handleShopPress}
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        <Ionicons
          name="storefront-outline"
          size={24}
          color="#FFFFFF"
          style={styles.itemIcon}
        />
        <Text style={styles.shopText}>Shop</Text>
        <Ionicons
          name={showCategories ? "chevron-up" : "chevron-down"}
          size={20}
          color={isShopSelected ? "#FFFFFF" : "#8A8AA8"}
          style={styles.chevronIcon}
        />
      </View>
    </TouchableOpacity>
  );

  // Render Categories
  const renderCategories = () => (
    <>
      <View style={styles.divider} />

      {/* All categories (excluding "Shop" itself) */}
      {menuData.slice(1).map((item) => {
        const isExpanded = expandedCategory === item.id;
        const isSelected = selectedCategory === item.id;
        const hasSubCategories = item.subCategories.length > 0;

        return (
          <View key={item.id} style={styles.categoryWrapper}>
            {/* Category Item */}
            <TouchableOpacity
              style={[
                styles.categoryItem,
                isSelected && styles.categoryItemSelected,
                !isSelected && isExpanded && hasSubCategories && styles.categoryItemExpanded,
              ]}
              onPress={() => toggleCategory(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.itemContent}>
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextSelected,
                    !isSelected && isExpanded && hasSubCategories && styles.categoryTextExpanded,
                  ]}
                >
                  {item.name}
                </Text>
                {hasSubCategories && (
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={isSelected ? "#FFFFFF" : "#8A8AA8"}
                    style={styles.chevronIcon}
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
                    <Text style={styles.subItemText}>{sub}</Text>
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
            backgroundColor: '#000000', 
          },
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >


            {/* Shop Item */}
            {renderShopLevel()}

            {/* Categories - Shown when showCategories is true */}
            {showCategories && renderCategories()}
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

  // Header styles
  headerContainer: {
    marginBottom: 8,
  },


  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginBottom: 12,
  },

  // Shop styles
  shopItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },

  shopItemSelected: {
    backgroundColor: '#ff002b', // Red when selected
  },

  shopText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: '#FFFFFF',
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

  // Category styles
  categoryWrapper: {
    marginBottom: 2,
  },

  categoryItem: {
    paddingVertical: 12,
    borderRadius: 8,
    paddingHorizontal: 12,
  },

  categoryItemSelected: {
    backgroundColor: '#ff002b', // Red when selected
  },

  categoryItemExpanded: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },

  categoryText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    color: '#FFFFFF',
  },

  categoryTextSelected: {
    color: '#FFFFFF',
    fontWeight: "500",
  },

  categoryTextExpanded: {
    color: '#FFFFFF',
    fontWeight: "400",
  },

  // Subcategories styles
  subCategoryContainer: {
    marginLeft: 12,
    marginBottom: 8,
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
  },

  subItem: {
    paddingVertical: 8,
    paddingLeft: 4,
  },

  subItemText: {
    fontSize: 15,
    color: '#8A8AA8',
    fontWeight: "400",
  },
});