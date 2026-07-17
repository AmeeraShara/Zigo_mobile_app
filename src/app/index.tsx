// app/index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { categories, Category, SubCategory } from './data/categories';
import { navigateTo } from './utils/navigation';

const { width } = Dimensions.get('window');

export default function CategoryScreen() {
  const [expandedDrawerCategories, setExpandedDrawerCategories] = useState<Set<string>>(new Set());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const slideAnim = useState(new Animated.Value(-width * 0.75))[0];

  const toggleDrawerCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedDrawerCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedDrawerCategories(newExpanded);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.75,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsDrawerOpen(false);
    });
  };

  const handleCategorySelect = (categoryId: string, categoryName: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
    toggleDrawerCategory(categoryId);
  };

  const handleSubCategorySelect = (subCategoryName: string) => {
    setSelectedSubCategory(subCategoryName);
    navigateTo.products(subCategoryName);
    closeDrawer();
  };

  // Drawer Category Renderer
  const renderDrawerCategory = ({ item }: { item: Category }) => {
    const isExpanded = expandedDrawerCategories.has(item.id);
    const isSelected = selectedCategory === item.id;
    
    return (
      <View style={styles.drawerCategoryContainer}>
        <TouchableOpacity
          style={[
            styles.drawerCategoryHeader,
            isSelected && styles.drawerCategoryHeaderSelected
          ]}
          onPress={() => handleCategorySelect(item.id, item.name)}
        >
          <View style={styles.categoryHeaderLeft}>
            <Ionicons 
              name={item.icon} 
              size={22} 
              color={isSelected ? '#FFFFFF' : '#FFFFFF'} 
            />
            <Text style={[
              styles.drawerCategoryTitle,
              isSelected && styles.drawerCategoryTitleSelected
            ]}>
              {item.name}
            </Text>
          </View>
          <Ionicons
            name={isExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={18}
            color={isSelected ? '#FFFFFF' : '#FFFFFF'}
          />
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.drawerSubCategoryList}>
            {item.subCategories.map((subItem) => {
              const isSubSelected = selectedSubCategory === subItem.name;
              return (
                <TouchableOpacity
                  key={subItem.id}
                  style={[
                    styles.drawerSubCategoryItem,
                    isSubSelected && styles.drawerSubCategoryItemSelected
                  ]}
                  onPress={() => handleSubCategorySelect(subItem.name)}
                >
                  <Text style={[
                    styles.drawerSubCategoryText,
                    isSubSelected && styles.drawerSubCategoryTextSelected
                  ]}>
                    {subItem.name}
                  </Text>
                  <Ionicons 
                    name="chevron-forward-outline" 
                    size={16} 
                    color={isSubSelected ? '#FFFFFF' : '#FFFFFF'} 
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  // Drawer Content
  const renderDrawer = () => {
    if (!isDrawerOpen) return null;

    return (
      <Modal
        transparent={true}
        visible={isDrawerOpen}
        animationType="none"
        onRequestClose={closeDrawer}
      >
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <View style={styles.drawerOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View 
                style={[
                  styles.drawerContent,
                  {
                    transform: [{ translateX: slideAnim }],
                    width: width * 0.75,
                  }
                ]}
              >
                <View style={styles.drawerHeader}>
                  <Text style={styles.drawerTitle}>Categories</Text>
                  <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
                    <Ionicons name="close-outline" size={28} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                
                <FlatList
                  data={categories}
                  renderItem={renderDrawerCategory}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.drawerListContent}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Logo and Hamburger Menu */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🛍️ Shop</Text>
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
          <Ionicons name="menu-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Empty Landing Page - Just a clean background */}
      <View style={styles.landingContent}>
        <Text style={styles.welcomeText}>Welcome to Shop</Text>
        <Text style={styles.subText}>Tap the menu icon to browse categories</Text>
      </View>

      {/* Drawer */}
      {renderDrawer()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logoContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  menuButton: {
    padding: 4,
  },
  landingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  // Drawer styles
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#000000', // Black background for drawer
    paddingTop: 20,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
  },
  closeButton: {
    padding: 4,
  },
  drawerListContent: {
    paddingVertical: 8,
  },
  drawerCategoryContainer: {
    backgroundColor: '#000000', // Black background
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  drawerCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#000000', // Black background
  },
  drawerCategoryHeaderSelected: {
    backgroundColor: '#FF0000', // Red background for selected
  },
  categoryHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerCategoryTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF', // White text
    marginLeft: 12,
  },
  drawerCategoryTitleSelected: {
    color: '#FFFFFF', // White text on red background
  },
  drawerSubCategoryList: {
    backgroundColor: '#1A1A1A', // Slightly lighter black for subcategories
    paddingLeft: 20,
  },
  drawerSubCategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingLeft: 44,
    borderTopWidth: 1,
    borderTopColor: '#333333',
    backgroundColor: '#1A1A1A', // Black background
  },
  drawerSubCategoryItemSelected: {
    backgroundColor: '#FF0000', // Red background for selected subcategory
  },
  drawerSubCategoryText: {
    fontSize: 14,
    color: '#FFFFFF', // White text
  },
  drawerSubCategoryTextSelected: {
    color: '#FFFFFF', // White text on red background
  },
});