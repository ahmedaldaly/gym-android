import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },

    skipContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        marginTop: 20,
        color: '#5F5F5F',
    },

    imageContainer: {
        alignItems: 'center',
        paddingVertical: 30,
    },

    image: {
        width: 375,
        height: 450,
        resizeMode: 'contain',
    },

    textContainer: {
        paddingVertical: 30,
        paddingHorizontal: 15,
    },

    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
        color: '#13042D',
    },

    subtitle: {
        fontSize: 16,
        color: '#79858F',
    },

    /* 🔥 الزر الجديد */
    arrowWrapper: {
        width: 90,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginRight: 20,
        marginBottom: 20,
    },

    arrowContainer: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1E3A8A',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
