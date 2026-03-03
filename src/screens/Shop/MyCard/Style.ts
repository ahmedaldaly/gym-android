import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 20,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 10,
        backgroundColor: '#fff',
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F1F1',
    },
    topText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#13042D',
    },
    backButton: {
        padding: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
    },
    
    // Cart Item Styles
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    imageContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#F3F4F6',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    details: {
        flex: 1,
        marginLeft: 15,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#13042D',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#F472B6',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 8,
    },
    controlBtn: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantity: {
        fontSize: 16,
        fontWeight: '600',
        color: '#13042D',
    },
    deleteBtn: {
        padding: 8,
    },

    // Footer Styles
    footer: {
        backgroundColor: '#fff',
        padding: 20,
        paddingBottom: 90, // Clear the bottom tab bar
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    totalLabel: {
        fontSize: 16,
        color: '#6B7280',
        fontWeight: '500',
    },
    totalAmount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#13042D',
    },
    checkoutBtn: {
        backgroundColor: '#13042D',
        borderRadius: 18,
        paddingVertical: 16,
        alignItems: 'center',
    },
    checkoutText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // Empty State
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#13042D',
        marginTop: 20,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 8,
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    shopNowBtn: {
        marginTop: 24,
        paddingHorizontal: 30,
        paddingVertical: 12,
        backgroundColor: '#F472B6',
        borderRadius: 12,
    },
    shopNowText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})