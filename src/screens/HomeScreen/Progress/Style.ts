import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: '#f6f1f1ff',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },
    weightCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 2,
    },
    weightInfo: {
        flex: 1,
    },
    weightLabel: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
        marginBottom: 4,
    },
    weightValue: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 16,
    },
    goalLabel: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
        marginBottom: 4,
    },
    goalRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    goalValue: {
        fontSize: 16,
        color: '#6B7280',
    },
    remainingValue: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    row: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },
    smallCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    progressWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressText: {
        position: 'absolute',
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
});
