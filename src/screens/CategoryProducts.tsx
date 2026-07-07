// src/screens/CategoryProducts.tsx

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 6;
const CARD_WIDTH = (width - 24 - CARD_MARGIN) / 2; // 24 for padding, 6 for margin

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "65W GaN Fast Charger",
    code: "ANK-GAN65",
    brand: "ANKER",
    price: 3490.0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVRxDLhoOUb6s3gxbb-fVAX1pQr1jMg46uy4ecDVZn5g&s=10",
    inStock: true,
    category: "Fast Chargers",
    rating: 4.5,
    reviews: 128,
  },
  {
    id: "2",
    name: "100W GaN Super Fast Charger",
    code: "OM4A3",
    brand: "OMS",
    price: 1980.0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuoom73SCcn5FaeIbaIqPQ1--4ZcG6cSJey93HN7izvQ&s=10",
    inStock: false,
    category: "Fast Chargers",
    rating: 4.3,
    reviews: 95,
  },
  {
    id: "3",
    name: "Fast Charger 15W Lightning",
    code: "OM4A2",
    brand: "OMS",
    price: 595.0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTosNUxCO5PKTnk2mLKjxIgau1Mt3AHc3xy0BVcZlqm4A&s=10",
    inStock: true,
    category: "Fast Chargers",
    rating: 4.1,
    reviews: 67,
  },
  {
    id: "4",
    name: "Fast Charger 15W Micro",
    code: "OM4A2",
    brand: "OMS",
    price: 690.0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX704vTe9xVVLGinJvfwEICTi3nToyfViskVRUl5am2Q&s=10",
    inStock: true,
    category: "Fast Chargers",
    rating: 4.0,
    reviews: 52,
  },
  {
    id: "5",
    name: "Fast Charger 15W Type C",
    code: "OM4A2",
    brand: "OMS",
    price: 690.0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8C3ySPqp53HswMQSZl-miv02_jQBGrNxGzdqsHzlzqw&s=10",
    inStock: true,
    category: "Fast Chargers",
    rating: 4.2,
    reviews: 78,
  },
  {
    id: "6",
    name: "Fast Charger 18W Lightning",
    code: "OM4A2",
    brand: "OMS",
    price: 895.0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHfMGIaftZogHYZ3d7qSHa1eG24XiSWUeNAl20TLC7CQ&s=10",
    inStock: true,
    category: "Fast Chargers",
    rating: 4.4,
    reviews: 112,
  },
];

const brands = [
  { id: "all", name: "All Brands", icon: "grid-outline" },
  { id: "oms", name: "OMS", icon: "storefront-outline" },
  { id: "onesam", name: "ONESAM", icon: "phone-portrait-outline" },
  { id: "hottu", name: "HOTTU", icon: "flash-outline" },
  { id: "xpert", name: "XPERT", icon: "shield-checkmark-outline" },
  { id: "anker", name: "ANKER", icon: "battery-full-outline" },
];

const sortOptions = [
  { id: "name-asc", label: "Name: A-Z" },
  { id: "name-desc", label: "Name: Z-A" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
];

export default function CategoryProducts() {
  const params = useLocalSearchParams();
  const { categoryName, subCategoryName } = params as {
    categoryName: string;
    subCategoryName: string;
  };

  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedSort, setSelectedSort] = useState("name-asc");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Handle back navigation
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push({
        pathname: "/",
      });
    }
  };

  // Get quantity for a product
  const getQuantity = (productId: string) => {
    return quantities[productId] || 1; 
  };

  // Increment quantity
  const incrementQuantity = (productId: string, inStock: boolean) => {
    if (!inStock) return;
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };

  // Decrement quantity
  const decrementQuantity = (productId: string) => {
    setQuantities(prev => {
      const currentQty = prev[productId] || 1;
      const newQty = Math.max(1, currentQty - 1); 
      return {
        ...prev,
        [productId]: newQty
      };
    });
  };

  // Add to cart
  const handleAddToCart = (item: any) => {
    const qty = getQuantity(item.id);
    if (qty > 0 && item.inStock) {
      setCartCount(cartCount + qty);
      console.log(`Added ${qty}x ${item.name} to cart`);
      // Reset quantity to 1 after adding to cart
      setQuantities(prev => ({
        ...prev,
        [item.id]: 1
      }));
    }
  };

  const filteredProducts = mockProducts
    .filter((p) => {
      const brandMatch =
        selectedBrand === "all" || p.brand.toLowerCase() === selectedBrand;
      const searchMatch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase());
      return brandMatch && searchMatch;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  // Split brands into two rows
  const midPoint = Math.ceil(brands.length / 2);
  const firstRowBrands = brands.slice(0, midPoint);
  const secondRowBrands = brands.slice(midPoint);

  const renderProductCard = ({ item }: { item: any }) => {
    const quantity = getQuantity(item.id);
    const isOutOfStock = !item.inStock;

    return (
      <View style={styles.productCard}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push({
            pathname: "/product-detail",
            params: { productId: item.id }
          })}
          style={styles.cardContent}
        >
          <View style={styles.productImageContainer}>
            <Image 
              source={{ uri: item.image }} 
              style={styles.productImage}
              resizeMode="contain"
            />
            <View style={styles.productBadge}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>
            {isOutOfStock && (
              <View style={styles.outOfStockOverlay}>
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              </View>
            )}
          </View>

          <View style={styles.productContent}>
            <Text style={styles.productCode}>{item.code}</Text>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>

            <View style={styles.productMeta}>
              <View style={styles.brandContainer}>
                <Ionicons name="business-outline" size={12} color="#8A8AA8" />
                <Text style={styles.brandName}>{item.brand}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={12} color="#F59E0B" />
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Text style={styles.reviewText}>({item.reviews})</Text>
              </View>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.productPrice}>
                LKR {item.price.toLocaleString()}.00
              </Text>
              <View
                style={[
                  styles.stockBadge,
                  isOutOfStock ? styles.outOfStock : styles.inStock,
                ]}
              >
                <Text
                  style={[
                    styles.stockText,
                    isOutOfStock ? styles.outOfStockText2 : styles.inStockText,
                  ]}
                >
                  {isOutOfStock ? "Out of Stock" : "In Stock"}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Quantity Selector and Add to Cart - Same Line at Bottom */}
        {!isOutOfStock ? (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() => decrementQuantity(item.id)}
            >
              <Ionicons name="remove" size={14} color="#FF002B" />
            </TouchableOpacity>
            
            <Text style={styles.qtyText}>{quantity}</Text>
            
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() => incrementQuantity(item.id, item.inStock)}
            >
              <Ionicons name="add" size={14} color="#FF002B" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => handleAddToCart(item)}
            >
              <Ionicons name="cart-outline" size={14} color="#FFFFFF" />
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.quantityBtn, styles.quantityBtnDisabled]}
              disabled={true}
            >
              <Ionicons name="remove" size={14} color="#B0B0B0" />
            </TouchableOpacity>
            
            <Text style={[styles.qtyText, styles.qtyTextDisabled]}>
              {quantity}
            </Text>
            
            <TouchableOpacity
              style={[styles.quantityBtn, styles.quantityBtnDisabled]}
              disabled={true}
            >
              <Ionicons name="add" size={14} color="#B0B0B0" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.addBtn, styles.addBtnDisabled]}
              disabled={true}
            >
              <Ionicons name="cart-outline" size={14} color="#B0B0B0" />
              <Text style={styles.addBtnTextDisabled}>Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          activeOpacity={0.6}
        >
          <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{subCategoryName}</Text>
          <Text style={styles.headerSubtitle}>{categoryName}</Text>
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart-outline" size={24} color="#1A1A2E" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Brand Section */}
      <View style={styles.brandSection}>
        <Text style={styles.sectionLabel}>All Brands</Text>
        
        <View style={styles.brandRow}>
          {firstRowBrands.map((brand) => (
            <TouchableOpacity
              key={brand.id}
              style={[
                styles.brandButton,
                selectedBrand === brand.id && styles.brandButtonActive,
              ]}
              onPress={() => setSelectedBrand(brand.id)}
            >
              <Ionicons
                name={brand.icon as any}
                size={14}
                color={selectedBrand === brand.id ? "#FFFFFF" : "#4A4A6A"}
              />
              <Text
                style={[
                  styles.brandButtonText,
                  selectedBrand === brand.id && styles.brandButtonTextActive,
                ]}
              >
                {brand.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.brandRow}>
          {secondRowBrands.map((brand) => (
            <TouchableOpacity
              key={brand.id}
              style={[
                styles.brandButton,
                selectedBrand === brand.id && styles.brandButtonActive,
              ]}
              onPress={() => setSelectedBrand(brand.id)}
            >
              <Ionicons
                name={brand.icon as any}
                size={14}
                color={selectedBrand === brand.id ? "#FFFFFF" : "#4A4A6A"}
              />
              <Text
                style={[
                  styles.brandButtonText,
                  selectedBrand === brand.id && styles.brandButtonTextActive,
                ]}
              >
                {brand.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Product Stats and Sort */}
      <View style={styles.statsBar}>
        <Text style={styles.productCount}>
          {filteredProducts.length} products
        </Text>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setShowSortOptions(!showSortOptions)}
        >
          <Ionicons name="swap-vertical-outline" size={16} color="#4A4A6A" />
          <Text style={styles.sortButtonText}>
            {sortOptions.find((s) => s.id === selectedSort)?.label}
          </Text>
          <Ionicons
            name={showSortOptions ? "chevron-up" : "chevron-down"}
            size={14}
            color="#4A4A6A"
          />
        </TouchableOpacity>
      </View>

      {/* Sort Options Dropdown */}
      {showSortOptions && (
        <View style={styles.sortDropdown}>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.sortOption,
                selectedSort === option.id && styles.sortOptionActive,
              ]}
              onPress={() => {
                setSelectedSort(option.id);
                setShowSortOptions(false);
              }}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  selectedSort === option.id && styles.sortOptionTextActive,
                ]}
              >
                {option.label}
              </Text>
              {selectedSort === option.id && (
                <Ionicons name="checkmark" size={16} color="#FF002B" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Product List - Updated to show 2 columns */}
      <FlatList
        key="two-columns"
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8F0",
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A2E",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#8A8AA8",
    marginTop: 1,
  },
  cartButton: {
    padding: 4,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#FF002B",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "600",
    paddingHorizontal: 4,
  },
  brandSection: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1A1A2E",
    marginBottom: 8,
  },
  brandRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 6,
  },
  brandButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: "#F0F0F5",
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "transparent",
    gap: 4,
  },
  brandButtonActive: {
    backgroundColor: "#FF002B",
    borderColor: "#FF002B",
  },
  brandButtonText: {
    fontSize: 12,
    color: "#4A4A6A",
    fontWeight: "500",
  },
  brandButtonTextActive: {
    color: "#FFFFFF",
  },
  statsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    marginTop: 1,
  },
  productCount: {
    fontSize: 12,
    color: "#8A8AA8",
    fontWeight: "500",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sortButtonText: {
    fontSize: 12,
    color: "#4A4A6A",
    fontWeight: "500",
  },
  sortDropdown: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8E8F0",
    paddingVertical: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  sortOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  sortOptionActive: {
    backgroundColor: "#FFF5F5",
  },
  sortOptionText: {
    fontSize: 13,
    color: "#4A4A6A",
  },
  sortOptionTextActive: {
    color: "#FF002B",
    fontWeight: "500",
  },
  productList: {
    padding: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 6,
  },
  productCard: {
    flex: 1,
    maxWidth: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    overflow: "hidden",
    height: 340, // Fixed height for all cards
  },
  cardContent: {
    flex: 1,
  },
  productImageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#F5F6FA",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(255, 0, 43, 0.9)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 9,
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  outOfStockOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  outOfStockText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 6,
  },
  productContent: {
    padding: 10,
    flex: 1,
  },
  productCode: {
    fontSize: 10,
    color: "#8A8AA8",
    fontWeight: "500",
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A2E",
    marginBottom: 4,
    lineHeight: 18,
    height: 36, // Fixed height for 2 lines
  },
  productMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  brandName: {
    fontSize: 11,
    color: "#8A8AA8",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingText: {
    fontSize: 11,
    color: "#4A4A6A",
    fontWeight: "500",
  },
  reviewText: {
    fontSize: 10,
    color: "#8A8AA8",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A2E",
  },
  stockBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  inStock: {
    backgroundColor: "#E8F5E9",
  },
  outOfStock: {
    backgroundColor: "#FBE9E7",
  },
  stockText: {
    fontSize: 10,
    fontWeight: "500",
  },
  inStockText: {
    color: "#22C55E",
  },
  outOfStockText2: {
    color: "#EF4444",
  },
  // Horizontal layout styles - everything in one row at bottom
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 4,
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F5",
  },
  quantityBtn: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: "#FFF5F5",
    borderWidth: 1,
    borderColor: "#FFE5E5",
    minWidth: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityBtnDisabled: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E8E8F0",
  },
  qtyText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A2E",
    minWidth: 24,
    textAlign: "center",
  },
  qtyTextDisabled: {
    color: "#B0B0B0",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    backgroundColor: "#FF002B",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    flex: 1,
  },
  addBtnDisabled: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E8E8F0",
  },
  addBtnText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  addBtnTextDisabled: {
    fontSize: 11,
    fontWeight: "600",
    color: "#B0B0B0",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A2E",
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#8A8AA8",
    marginTop: 4,
  },
});