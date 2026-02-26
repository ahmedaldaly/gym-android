import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    heroContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
    },
    daySelector: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    dayTab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    activeDayTab: {
        backgroundColor: '#7B2FF7', // Using the primary color from Tabs.tsx
        borderColor: '#7B2FF7',
    },
    dayTabText: {
        color: '#666',
        fontWeight: '600',
    },
    activeDayTabText: {
        color: '#FFF',
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
    },
    exerciseCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    exerciseImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        marginRight: 15,
    },
    exerciseInfo: {
        flex: 1,
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    exerciseDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    detailText: {
        color: '#666',
        fontSize: 14,
        marginLeft: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: '#FF5733',
        fontSize: 16,
        textAlign: 'center',
    },
    // Details Screen Styles
    detailsContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    videoContainer: {
        width: '100%',
        height: 250,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsContent: {
        padding: 20,
    },
    detailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    tag: {
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        marginRight: 10,
        marginBottom: 10,
    },
    tagText: {
        color: '#666',
        fontSize: 12,
        fontWeight: '600',
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 16,
        color: '#444',
        lineHeight: 24,
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#F9F9F9',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#7B2FF7',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: '#E0E0E0',
    }
});