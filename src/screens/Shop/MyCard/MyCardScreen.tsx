import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './Style'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useGetMyOrders, useUpdateQuantity, useDeleteOrder } from './MyCard.api';
import { OrderType } from './MyCard.type';

export default function MyCardScreen() {
  const navigation = useNavigation();
  const { data: orders = [], isLoading } = useGetMyOrders();
  const { mutate: updateQuantity } = useUpdateQuantity();
  const { mutate: deleteOrder } = useDeleteOrder();

  const handleIncrement = (item: OrderType) => {
    updateQuantity({ id: item.id, quantity: item.quantity + 1 });
  };

  const handleDecrement = (item: OrderType) => {
    if (item.quantity > 1) {
      updateQuantity({ id: item.id, quantity: item.quantity - 1 });
    } else {
      deleteOrder(item.id);
    }
  };

  const calculateTotal = () => {
    return orders.reduce((acc: number, item: OrderType) => acc + (item.product.price * item.quantity), 0).toFixed(2);
  };

  const renderItem = ({ item }: { item: OrderType }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.product.image }} style={styles.image} />
      </View>
      
      <View style={styles.details}>
        <Text style={styles.itemName} numberOfLines={1}>{item.product.name}</Text>
        <Text style={styles.itemPrice}>${item.product.price}</Text>
        
        <View style={styles.controls}>
          <TouchableOpacity 
            onPress={() => handleDecrement(item)}
            style={styles.controlBtn}
          >
            <AntDesign name="minus" size={16} color="#13042D" />
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity}</Text>
          
          <TouchableOpacity 
            onPress={() => handleIncrement(item)}
            style={styles.controlBtn}
          >
            <AntDesign name="plus" size={16} color="#13042D" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        onPress={() => deleteOrder(item.id)}
        style={styles.deleteBtn}
      >
        <MaterialIcons name="delete-outline" size={24} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.top}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" color="#13042D" size={20} style={{ marginLeft: 5 }} />
        </TouchableOpacity>
        <Text style={styles.topText}>My Cart</Text>
        <View style={{ width: 40 }} />
      </View>

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#F472B6" />
        </View>
      ) : orders.length > 0 ? (
        <>
          <FlatList
            data={orders}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Price</Text>
              <Text style={styles.totalAmount}>${calculateTotal()}</Text>
            </View>
            
            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <AntDesign name="shoppingcart" size={80} color="#E5E7EB" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Looks like you haven't added anything to your cart yet.</Text>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.shopNowBtn}
          >
            <Text style={styles.shopNowText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}