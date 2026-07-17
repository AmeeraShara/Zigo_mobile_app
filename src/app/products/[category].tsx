// app/products/[category].tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  RefreshControl,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, Stack } from 'expo-router';
import { productApi, Product } from '../services/api';
import { navigateTo } from '../utils/navigation';

interface ProductWithQuantity extends Product {
  quantity: number;
}

export default function ProductListScreen() {
  const [products, setProducts] = useState<ProductWithQuantity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductWithQuantity[]>([]);
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});
  
  const { category } = useLocalSearchParams<{ category: string }>();

  useEffect(() => {
    fetchProducts();
  }, [category]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getProductsByCategory(category || '');
      // Add quantity property to each product
      const productsWithQuantity = data.map(product => ({
        ...product,
        quantity: 0
      }));
      setProducts(productsWithQuantity);
      setFilteredProducts(productsWithQuantity);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  const handleProductPress = (productId: number) => {
    navigateTo.product(productId);
  };

  const updateQuantity = (productId: number, change: number) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          const newQuantity = Math.max(0, (product.quantity || 0) + change);
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );
    
    // Update filtered products as well
    setFilteredProducts(prevFiltered => 
      prevFiltered.map(product => {
        if (product.id === productId) {
          const newQuantity = Math.max(0, (product.quantity || 0) + change);
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );
  };

  const handleAddToCart = (product: ProductWithQuantity) => {
    if (product.quantity <= 0) {
      Alert.alert('Quantity Required', 'Please select at least 1 item to add to cart.');
      return;
    }

    // Add to cart logic
    setCartItems(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + product.quantity
    }));

    // Reset quantity for this product
    setProducts(prevProducts => 
      prevProducts.map(p => 
        p.id === product.id ? { ...p, quantity: 0 } : p
      )
    );
    setFilteredProducts(prevFiltered => 
      prevFiltered.map(p => 
        p.id === product.id ? { ...p, quantity: 0 } : p
      )
    );

    Alert.alert(
      'Added to Cart',
      `${product.quantity} x ${product.description} added to your cart.`,
      [{ text: 'OK' }]
    );
  };

  const renderProductItem = ({ item }: { item: ProductWithQuantity }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.productImageContainer}>
        {item.primary_image ? (
          <Image
            source={{ uri: item.primary_image }}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="image-outline" size={40} color="#cccccc" />
          </View>
        )}
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.productCode}>Code: {item.code}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>Rs. {item.default_price.toLocaleString()}</Text>
          
          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[styles.quantityButton, styles.quantityMinus]}
              onPress={() => updateQuantity(item.id, -1)}
              disabled={item.quantity <= 0}
            >
              <Ionicons 
                name="remove-outline" 
                size={18} 
                color={item.quantity <= 0 ? '#cccccc' : '#007AFF'} 
              />
            </TouchableOpacity>
            
            <View style={styles.quantityDisplay}>
              <Text style={styles.quantityText}>{item.quantity || 0}</Text>
            </View>
            
            <TouchableOpacity
              style={[styles.quantityButton, styles.quantityPlus]}
              onPress={() => updateQuantity(item.id, 1)}
            >
              <Ionicons name="add-outline" size={18} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            (!item.quantity || item.quantity <= 0) && styles.addToCartButtonDisabled
          ]}
          onPress={() => handleAddToCart(item)}
          disabled={!item.quantity || item.quantity <= 0}
        >
          <Ionicons name="cart-outline" size={18} color="#ffffff" />
          <Text style={styles.addToCartText}>
            Add to Cart {item.quantity > 0 && `(${item.quantity})`}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: category || 'Products',
          headerBackTitle: 'Back',
        }} 
      />
      
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#666666" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.productCount}>{filteredProducts.length} products found</Text>
        {Object.keys(cartItems).length > 0 && (
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => Alert.alert('Cart', `You have ${Object.values(cartItems).reduce((a, b) => a + b, 0)} items in cart`)}
          >
            <Ionicons name="cart" size={20} color="#007AFF" />
            <Text style={styles.cartBadge}>
              {Object.values(cartItems).reduce((a, b) => a + b, 0)}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={60} color="#cccccc" />
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    color: '#666666',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  productCount: {
    fontSize: 13,
    color: '#666666',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cartBadge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    marginLeft: 4,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    width: 100,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#f8f8f8',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
    lineHeight: 20,
  },
  productCode: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityMinus: {
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  quantityPlus: {
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
  },
  quantityDisplay: {
    minWidth: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  addToCartButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 10,
  },
});