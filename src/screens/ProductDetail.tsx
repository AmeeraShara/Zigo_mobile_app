// src/screens/ProductDetail.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

// Mock products data (should be the same as in CategoryProducts)
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
    description: "High-speed GaN technology charger with 65W power delivery. Compatible with all USB-C devices. Features advanced safety protection and fast charging capabilities.",
    specifications: [
      "Input: 100-240V AC",
      "Output: 65W USB-C",
      "GaN Technology for efficient charging",
      "Overcharge Protection",
      "Temperature Control System",
      "Short Circuit Protection",
      "Compatible with all USB-C devices",
    ],
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
    description: "Super fast 100W GaN charger with multiple ports. Perfect for laptops, tablets, and phones. Advanced GaN technology for efficient power delivery.",
    specifications: [
      "Input: 100-240V AC",
      "Output: 100W USB-C PD",
      "GaN Technology",
      "Multiple Port Protection",
      "Smart Power Distribution",
      "Compatible with all USB-C devices",
    ],
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
    description: "Compact 15W fast charger with Lightning cable. Ideal for iPhone users. Fast charging capability with built-in safety features.",
    specifications: [
      "Input: 100-240V AC",
      "Output: 15W Lightning",
      "MFi Certified",
      "Overcharge Protection",
      "Temperature Control",
      "Short Circuit Protection",
      "Compatible with iPhone/iPad",
    ],
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
    description: "Reliable 15W fast charger with Micro USB cable. Great for Android devices. Compact design with efficient charging technology.",
    specifications: [
      "Input: 100-240V AC",
      "Output: 15W Micro USB",
      "Fast Charging Support",
      "Overcharge Protection",
      "Temperature Control",
      "Short Circuit Protection",
      "Compatible with Android devices",
    ],
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
    description: "Versatile 15W Type-C fast charger. Perfect for modern devices. Supports fast charging with universal USB-C compatibility.",
    specifications: [
      "Input: 100-240V AC",
      "Output: 15W USB-C",
      "Universal Compatibility",
      "Overcharge Protection",
      "Temperature Control",
      "Short Circuit Protection",
      "Compatible with all USB-C devices",
    ],
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
    description: "Powerful 18W fast charger with Lightning cable. Optimized for iPhone fast charging. Advanced safety features with sleek design.",
    specifications: [
      "Input: 100-240V AC",
      "Output: 18W Lightning",
      "MFi Certified",
      "Fast Charging Support",
      "Overcharge Protection",
      "Temperature Control",
      "Short Circuit Protection",
      "Compatible with iPhone/iPad",
    ],
  },
];

export default function ProductDetail() {
  const params = useLocalSearchParams();
  const { productId } = params as { productId: string };
  const [quantity, setQuantity] = useState(1);

  // Find the product based on productId
  const product = mockProducts.find(p => p.id === productId);

  // If product not found, show error or redirect
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
            <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Not Found</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={60} color="#FF002B" />
          <Text style={styles.errorText}>Product not found</Text>
          <TouchableOpacity 
            style={styles.goBackButton}
            onPress={() => router.back()}
          >
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="share-outline" size={24} color="#1A1A2E" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image }} 
            style={styles.productImage}
            resizeMode="contain"
          />
          <View style={styles.imageBadge}>
            <Text style={styles.imageBadgeText}>{product.category}</Text>
          </View>
          {!product.inStock && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.productCode}>{product.code}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.ratingRow}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.reviewText}>({product.reviews} reviews)</Text>
            </View>
            <View style={[
              styles.stockBadge,
              product.inStock ? styles.inStock : styles.outOfStock
            ]}>
              <Text style={[
                styles.stockText,
                product.inStock ? styles.inStockText : styles.outOfStockText
              ]}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Text>
            </View>
          </View>

          <Text style={styles.price}>LKR {product.price.toLocaleString()}.00</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Brand</Text>
          <Text style={styles.brandText}>{product.brand}</Text>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.sectionTitle}>Specifications</Text>
          {product.specifications.map((spec, index) => (
            <View key={index} style={styles.specItem}>
              <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
              <Text style={styles.specText}>{spec}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.quantityRow}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={!product.inStock}
              >
                <Ionicons name="remove" size={20} color={product.inStock ? "#1A1A2E" : "#B0B0B0"} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
                disabled={!product.inStock}
              >
                <Ionicons name="add" size={20} color={product.inStock ? "#1A1A2E" : "#B0B0B0"} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.addToCartButton, !product.inStock && styles.disabled]}
            disabled={!product.inStock}
            onPress={handleAddToCart}
          >
            <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
            <Text style={styles.addToCartButtonText}>
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Text>
          </TouchableOpacity>

          <View style={styles.safetySection}>
            <View style={styles.safetyItem}>
              <Ionicons name="shield-checkmark" size={20} color="#22C55E" />
              <Text style={styles.safetyText}>100% Secure Checkout</Text>
            </View>
            <View style={styles.safetyItem}>
              <Ionicons name="time-outline" size={20} color="#22C55E" />
              <Text style={styles.safetyText}>Fast Delivery</Text>
            </View>
            <View style={styles.safetyItem}>
              <Ionicons name="refresh-outline" size={20} color="#22C55E" />
              <Text style={styles.safetyText}>Easy Returns</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8F0",
  },
  headerButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A2E",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "#F5F6FA",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  imageBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(255, 0, 43, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  imageBadgeText: {
    fontSize: 12,
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
    fontSize: 20,
    fontWeight: "700",
    textTransform: "uppercase",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  content: {
    padding: 16,
  },
  productCode: {
    fontSize: 12,
    color: "#8A8AA8",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  productName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A2E",
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#4A4A6A",
    fontWeight: "500",
  },
  reviewText: {
    fontSize: 12,
    color: "#8A8AA8",
  },
  stockBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  inStock: {
    backgroundColor: "#E8F5E9",
  },
  outOfStock: {
    backgroundColor: "#FBE9E7",
  },
  stockText: {
    fontSize: 12,
    fontWeight: "500",
  },
  inStockText: {
    color: "#22C55E",
  },

  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A2E",
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E8E8F0",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A2E",
    marginBottom: 8,
  },
  brandText: {
    fontSize: 14,
    color: "#4A4A6A",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "#4A4A6A",
    lineHeight: 20,
    marginBottom: 16,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  specText: {
    fontSize: 14,
    color: "#4A4A6A",
  },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A2E",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F0F0F5",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A2E",
    minWidth: 20,
    textAlign: "center",
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FF002B",
    paddingVertical: 14,
    borderRadius: 12,
  },
  disabled: {
    backgroundColor: "#B0B0B0",
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  safetySection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E8E8F0",
  },
  safetyItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  safetyText: {
    fontSize: 12,
    color: "#4A4A6A",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A2E",
    marginTop: 12,
  },
  goBackButton: {
    marginTop: 20,
    backgroundColor: "#FF002B",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  goBackButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});