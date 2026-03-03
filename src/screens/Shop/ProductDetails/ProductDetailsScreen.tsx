import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ShopStackParamList } from '../Shop.type';
import { useCreateOrder } from '../Shop.api';
import SuccessPopup from '../../../components/ui/SuccessPopup';
import ErrorPopup from '../../../components/ui/ErrorBobup';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen() {
  const route = useRoute<RouteProp<ShopStackParamList, 'productDetails'>>();
  const navigation = useNavigation();
  const { product } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { mutate: createOrder, isPending } = useCreateOrder();

  const handleOrder = () => {
    createOrder(
      {
        productId: product.id,
        quantity: quantity,
      },
      {
        onSuccess: () => {
          setShowSuccess(true);
        },
        onError: (error: any) => {
          setErrorMsg(error?.response?.data?.message || 'Something went wrong. Please try again.');
          setShowError(true);
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#13042D" />
          </TouchableOpacity>
          <Text style={styles.title}>Product Details</Text>
          <TouchableOpacity style={styles.heartButton}>
          </TouchableOpacity>
        </View>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>

          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{product.description || "No description available for this product."}</Text>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => setQuantity(q => Math.max(1, q - 1))}
                style={styles.quantityButton}
              >
                <AntDesign name="minus" size={20} color="#13042D" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity(q => q + 1)}
                style={styles.quantityButton}
              >
                <AntDesign name="plus" size={20} color="#13042D" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer / Buy Button */}
      <View style={styles.footer}>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalValue}>${(product.price * quantity).toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          onPress={handleOrder}
          disabled={isPending}
          style={[styles.buyButton, isPending && { opacity: 0.7 }]}
        >
          <Text style={styles.buyButtonText}>{isPending ? 'Processing...' : 'Place Order'}</Text>
        </TouchableOpacity>
      </View>

      <SuccessPopup
        visible={showSuccess}
        message="Your order has been placed successfully!"
        onClose={() => {
          setShowSuccess(false);
          navigation.goBack();
        }}
      />
      <ErrorPopup
        visible={showError}
        message={errorMsg}
        onClose={() => setShowError(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#13042D',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    top: 40, // Increased top to clear safe area
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    padding: 10,
    borderRadius: 15,
  },
  heartButton: { 
  },
  imageContainer: {
    height: 380,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  productImage: {
    width: '85%',
    height: '85%',
    resizeMode: 'contain',
  },
  content: {
    padding: 24,
    marginTop: -20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#13042D',
    flex: 1,
    marginRight: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F472B6',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#13042D',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 24,
    marginBottom: 30,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  quantityTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#13042D',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#13042D',
    marginHorizontal: 15,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 110, // Account for Tab bar height (100) + extra space
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  totalPriceContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 13,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#13042D',
  },
  buyButton: {
    flex: 1.5,
    backgroundColor: '#F472B6',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F472B6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});