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

export default function ProductDetail() {
  const params = useLocalSearchParams();
  const { productId } = params as { productId: string };
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app, fetch based on productId
  const product = {
    id: productId,
    name: "65W GaN Fast Charger",
    code: "ANK-GAN65",
    brand: "ANKER",
    price: 3490.00,
    description: "High-speed GaN technology charger with 65W power delivery. Compatible with all USB-C devices. Features advanced safety protection and fast charging capabilities.",
    image: "https://via.placeholder.com/400x400/ff002b/ffffff?text=65W+GaN",
    inStock: true,
    category: "Fast Chargers",
    rating: 4.5,
    reviews: 128,
    specifications: [
      "Input: 100-240V AC",
      "Output: 65W USB-C",
      "GaN Technology for efficient charging",
      "Overcharge Protection",
      "Temperature Control System",
      "Short Circuit Protection",
      "Compatible with all USB-C devices",
    ],
  };

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
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.imageBadge}>
            <Text style={styles.imageBadgeText}>{product.category}</Text>
          </View>
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
              >
                <Ionicons name="remove" size={20} color="#1A1A2E" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={20} color="#1A1A2E" />
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
    resizeMode: "cover",
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
  outOfStockText: {
    color: "#EF4444",
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
});