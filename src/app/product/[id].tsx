// app/product/[id].tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { productApi, ProductDetail } from '../services/api';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchProductDetail();
    } else {
      setError('Product ID is missing');
      setLoading(false);
    }
  }, [id]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const productId = parseInt(id);
      if (isNaN(productId)) {
        throw new Error('Invalid product ID');
      }

      const data = await productApi.getProductById(productId);
      
      if (!data || !data.id) {
        throw new Error('Product not found');
      }
      
      setProduct(data);
    } catch (error: any) {
      console.error('❌ Error fetching product:', error);
      
      let errorMessage = 'Failed to load product details';
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'Product not found';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.request) {
        errorMessage = 'Cannot connect to server. Please check your network.';
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      Alert.alert(
        'Add to Cart',
        `Add ${quantity} ${product.description} to cart?\nTotal: Rs. ${(product.default_price * quantity).toLocaleString()}`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Add',
            onPress: () => {

              Alert.alert('Success', 'Item added to cart!');
            },
          },
        ]
      );
    }
  };

  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => increment ? prev + 1 : Math.max(1, prev - 1));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={60} color="#ff6b6b" />
        <Text style={styles.errorTitle}>Error Loading Product</Text>
        <Text style={styles.errorText}>{error || 'Product not found'}</Text>
        <View style={styles.errorButtons}>
          <TouchableOpacity 
            style={[styles.errorButton, styles.retryButton]}
            onPress={fetchProductDetail}
          >
            <Text style={styles.errorButtonText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.errorButton, styles.backButton]}
            onPress={() => router.back()}
          >
            <Text style={[styles.errorButtonText, styles.backButtonText]}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const images = product.images || [];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: product.description || 'Product Details',
          headerBackTitle: 'Back',
        }} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageGallery}>
          {images.length > 0 ? (
            <>
              <Image
                source={{ uri: images[currentImageIndex]?.public_url || images[currentImageIndex]?.url || '' }}
                style={styles.mainImage}
                resizeMode="contain"
              />
              {images.length > 1 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.thumbnailScroll}
                >
                  {images.map((image, index) => (
                    <TouchableOpacity
                      key={image.id}
                      onPress={() => setCurrentImageIndex(index)}
                      style={[
                        styles.thumbnailContainer,
                        currentImageIndex === index && styles.selectedThumbnail,
                      ]}
                    >
                      <Image
                        source={{ uri: image.public_url || image.url || '' }}
                        style={styles.thumbnail}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </>
          ) : (
            <View style={styles.noImageContainer}>
              <Ionicons name="phone-portrait-outline" size={80} color="#cccccc" />
              <Text style={styles.noImageText}>No images available</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.description}</Text>
          <Text style={styles.productCode}>Code: {product.code}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>Rs. {product.default_price.toLocaleString()}</Text>
            {product.default_cost && (
              <Text style={styles.productCost}>
                Cost: Rs. {product.default_cost.toLocaleString()}
              </Text>
            )}
          </View>

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(false)}
              >
                <Ionicons name="remove" size={20} color="#333333" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(true)}
              >
                <Ionicons name="add" size={20} color="#333333" />
              </TouchableOpacity>
            </View>
          </View>

          {product.po_description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description:</Text>
              <Text style={styles.descriptionText}>{product.po_description}</Text>
            </View>
          )}

          {/* Additional Info */}
          <View style={styles.additionalInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Category:</Text>
              <Text style={styles.infoValue}>{product.category_name}</Text>
            </View>
            {product.commision && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Commission:</Text>
                <Text style={styles.infoValue}>{product.commision}%</Text>
              </View>
            )}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status:</Text>
              <Text style={[styles.infoValue, { color: product.status === 1 ? '#4CAF50' : '#ff6b6b' }]}>
                {product.status === 1 ? 'Active' : 'Inactive'}
              </Text>
            </View>
            {product.unit && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Unit:</Text>
                <Text style={styles.infoValue}>{product.unit}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Add to Cart Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Ionicons name="cart-outline" size={24} color="#ffffff" />
            <Text style={styles.addToCartText}>
              Add to Cart - Rs. {(product.default_price * quantity).toLocaleString()}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  errorButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  retryButton: {
    backgroundColor: '#007AFF',
  },
  backButton: {
    backgroundColor: '#f0f0f0',
  },
  errorButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  backButtonText: {
    color: '#333333',
  },
  imageGallery: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
  },
  mainImage: {
    width: width,
    height: 300,
    backgroundColor: '#f8f8f8',
  },
  thumbnailScroll: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
  thumbnailContainer: {
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectedThumbnail: {
    borderColor: '#007AFF',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  noImageContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  noImageText: {
    color: '#666666',
    marginTop: 10,
    fontSize: 14,
  },
  productInfo: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  productCode: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 15,
  },
  productCost: {
    fontSize: 14,
    color: '#666666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  quantityLabel: {
    fontSize: 16,
    color: '#333333',
    marginRight: 15,
    fontWeight: '500',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 20,
    color: '#333333',
  },
  descriptionContainer: {
    marginBottom: 15,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
  },
  additionalInfo: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginBottom: 30,
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});