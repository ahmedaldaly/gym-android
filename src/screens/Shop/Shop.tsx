import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './Style';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyInput from '../../components/ui/MyInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getCategories, getProducts ,useCreateOrder} from './Shop.api';
import type { CategoryType, ProductType } from './Shop.type';
import ErrorPopup from '../../components/ui/ErrorBobup';
import SuccessPopup from '../../components/ui/SuccessPopup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShopStackParamList } from './Shop.type';
export default function Shop() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
const navigation = useNavigation<NativeStackNavigationProp<ShopStackParamList>>();
  const {mutate:createOrder} = useCreateOrder()
  const { data: categories = [] } = getCategories();
  const { data: productsData } = getProducts({ 
    category_id: selectedCategoryId || undefined 
  });
  const products: ProductType[] = (() => {
    if (!productsData) return [];
    if (Array.isArray(productsData)) return productsData;
    const dataObj = productsData as any;
    if (dataObj.products && Array.isArray(dataObj.products)) return dataObj.products;
    if (dataObj.data && Array.isArray(dataObj.data)) return dataObj.data;
    if (dataObj.items && Array.isArray(dataObj.items)) return dataObj.items;
    return [];
  })();

  // Apply search filter (case‑insensitive)
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // First product (if any) will be shown in the advertisement banner
  const bannerProduct = filteredProducts[0] || null;
  const renderHeader = () => (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Market</Text>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('myCard')}
        >
          <AntDesign name="shoppingcart" color="#F472B6" size={24} />
        </TouchableOpacity>
      </View>

      {/* search */}
      <View style={styles.searchContainer}>
        <MyInput
          label="Search"
          value={search}
          onChangeText={setSearch}
          icon={<AntDesign name="search1" color="#000" size={24} />}
          width="83%"
        />

        <TouchableOpacity style={styles.filterButton}>
          <AntDesign name="filter" color="#F472B6" size={24} />
        </TouchableOpacity>
      </View>

      {/* category */}
      <Text style={styles.categoryTitle}>Category</Text>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={{ paddingRight: 20 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: CategoryType }) => (
          <TouchableOpacity 
            style={[
              styles.categoryCard,
              { backgroundColor: selectedCategoryId === item.id.toString() ? '#F472B6' : '#fff' }
            ]}
            onPress={() => setSelectedCategoryId(prev => prev === item.id.toString() ? null : item.id.toString())}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.categoryImage}
            />
            <Text style={[
              styles.categoryName,
              { color: selectedCategoryId === item.id.toString() ? '#fff' : '#000' }
            ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Advertisement Banner (dynamic) */}
     {/* Advertisement Banner (dynamic) */}
{bannerProduct && (
  <TouchableOpacity style={styles.bannerContainer}>
    
    {/* Discount Badge */}
    <View style={styles.discountBadge}>
      <Text style={styles.discountText}>-30%</Text>
    </View>

    <View style={styles.bannerContent}>
      <Text style={styles.offerText}> Limited Offer</Text>

      <Text style={styles.bannerTitle}>
        {bannerProduct.name}
      </Text>

      {/* Prices */}
      <View style={styles.priceRow}>
        

        <Text style={styles.newPrice}>
          ${bannerProduct.price}
        </Text>
      </View>

      <Text style={styles.saveText}>
        Save big on this product today!
      </Text>
    </View>

    <Image
      source={{ uri: bannerProduct.image }}
      style={styles.bannerImage}
    />
  </TouchableOpacity>
)}

      <Text style={styles.sectionTitle}>Products</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
            <Text style={{ color: '#F472B6', fontSize: 16 }}>No products found</Text>
          </View>
        )}
        renderItem={({ item }: { item: ProductType }) => (
          <TouchableOpacity 
          onPress={() => navigation.navigate('productDetails', { product: item })}
          style={styles.productCard}>
            <View style={styles.productImageContainer}>
              <Image source={{ uri: item.image }} style={styles.productSmallImage} />
            </View>
            <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <TouchableOpacity
            onPress={() => createOrder({
              productId: item.id,
              quantity: 1
            }, {
              onSuccess: () => {
                setShowSuccess(true);
              },
              onError: (error: any) => {
                setErrorMsg(error?.response?.data?.message || "Something went wrong. Please try again.");
                setShowError(true);
              }
            })}
            style={styles.buyButton}>
              <AntDesign name="plus" color="#fff" size={16} />
            </TouchableOpacity>
          </TouchableOpacity>
        )} 
      />
      <SuccessPopup 
        visible={showSuccess} 
        message="Your order has been placed successfully!" 
        onClose={() => setShowSuccess(false)} 
      />
      <ErrorPopup 
        visible={showError} 
        message={errorMsg} 
        onClose={() => setShowError(false)} 
      />
    </SafeAreaView>
  );
}