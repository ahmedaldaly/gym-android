import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#13042D',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  cartButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },

  filterButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
  },

  categoryTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#F472B6',
    marginBottom: 16,
  },

  categoryContainer: {
    paddingHorizontal: 4,
  },

  categoryCard: {
    width: 90,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,

  },

  categoryImage: {
    width: 45,
    height: 45,
    marginBottom: 6,
  },

  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
  },

  // Banner Styles
  bannerContainer: {
    width: '100%',
    height: 140,
    borderRadius: 20,
    backgroundColor: '#1E1B4B',
    marginTop: 20,
    marginBottom: 30, // Extra space for the pop-out image
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    overflow: 'visible',
    zIndex: 10,
  },
  bannerContent: {
    flex: 1,
    zIndex: 2,
  },
  bannerImage: {
    width: 150,
    height: 170,
    position: 'absolute',
    right: -15,
    bottom: -25, // Pop out below the container
    resizeMode: 'contain',
    zIndex: 15,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#F472B6',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },

  // Product Section
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#F472B6',
    marginBottom: 16,
  },
  productList: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    gap: 12,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  productImageContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 15,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  productSmallImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#13042D',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F472B6',
  },
  buyButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: '#13042D',
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadge: {
  position: 'absolute',
  top: 12,
  right: 12,
  backgroundColor: '#F472B6',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 10,
  zIndex: 20,
},

discountText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 12,
},

offerText: {
  color: '#F472B6',
  fontSize: 14,
  fontWeight: '700',
  marginBottom: 4,
},

priceRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  marginTop: 6,
},

newPrice: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
},

saveText: {
  color: '#E5E7EB',
  fontSize: 12,
  marginTop: 4,
},
});