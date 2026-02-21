import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    text: {
        fontSize: 23,
        fontWeight: 500,
        color: '#111827',
        marginVertical: 10,
    },
    boxContainer: {
        flexDirection: 'row',
        flex: 1,
        gap: 16,
    },
    box: {
        flex: 1,
        height: 130,
        backgroundColor: '#5F15E0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    boxText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
        marginTop: 8,
    }
})