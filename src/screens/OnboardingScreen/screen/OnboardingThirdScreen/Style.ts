import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },

    skipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 20,
        color: '#5F5F5F'
    },

    imageContainer: {
        alignItems: 'center',
        paddingVertical: 30,
    },

    image: {
        width: 416.0625941429708,
        height: 411.93683117783235,
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
        position: 'absolute',
        right: 20,
        bottom: 45,
        width: 90,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
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
    backContainer:{
        width:28,
        height:28,
        borderRadius:'50%',
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#5F5F5F',
        borderWidth:1.5
    }
});

export default styles;
