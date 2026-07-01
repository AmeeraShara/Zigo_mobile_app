// src/components/menu/DrawerMenu.tsx

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
import { router } from "expo-router";
import { categories } from "../../data/categories";

const SCREEN_WIDTH = Dimensions.get("window").width;

export interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export default function DrawerMenu({ visible, onClose }: DrawerMenuProps) {
  const [showCategories, setShowCategories] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -SCREEN_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start();

    if (visible) {
      setShowCategories(false);
      setExpandedCategory(null);
      setSelectedCategory(null);
    }
  }, [visible]);

  const handleShopPress = () => {
    setShowCategories(!showCategories);
    if (!showCategories) {
      setExpandedCategory(null);
    }
  };

  const toggleCategory = (id: string) => {
    if (selectedCategory === id) {
      setExpandedCategory(expandedCategory === id ? null : id);
    } else {
      setSelectedCategory(id);
      setExpandedCategory(id);
    }
  };

  const handleSubCategoryPress = (categoryName: string, subCategoryName: string) => {
    onClose();
    // Use router.push with Expo Router
    router.push({
      pathname: '/category-products',
      params: { 
        categoryName, 
        subCategoryName 
      }
    });
  };

  const renderShopLevel = () => (
    <TouchableOpacity
      style={[
        styles.shopItem,
        showCategories && styles.shopItemSelected 
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
          color={showCategories ? "#FFFFFF" : "#8A8AA8"}
          style={styles.chevronIcon}
        />
      </View>
    </TouchableOpacity>
  );

  const renderCategories = () => (
    <>
      <View style={styles.divider} />

      {categories.map((item) => {
        const isExpanded = expandedCategory === item.id;
        const isSelected = selectedCategory === item.id;
        const hasSubCategories = item.subCategories.length > 0;

        return (
          <View key={item.id} style={styles.categoryWrapper}>
            <TouchableOpacity
              style={[
                styles.categoryItem,
                isSelected && styles.categoryItemSelected,
              ]}
              onPress={() => toggleCategory(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.itemContent}>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={isSelected ? "#FFFFFF" : "#8A8AA8"}
                  style={styles.itemIcon}
                />
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextSelected,
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

            {isExpanded && hasSubCategories && (
              <View style={styles.subCategoryContainer}>
                {item.subCategories.map((sub) => (
                  <TouchableOpacity
                    key={sub.id}
                    style={styles.subItem}
                    onPress={() => handleSubCategoryPress(item.name, sub.name)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.subItemText}>{sub.name}</Text>
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
          style={[styles.overlay]}
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
            {renderShopLevel()}
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginBottom: 12,
  },
  shopItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  shopItemSelected: {
    backgroundColor: '#ff002b', 
  },
  shopText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: '#FFFFFF',
  },
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
  categoryWrapper: {
    marginBottom: 2,
  },
  categoryItem: {
    paddingVertical: 12,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  categoryItemSelected: {
    backgroundColor: '#ff002b', 
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