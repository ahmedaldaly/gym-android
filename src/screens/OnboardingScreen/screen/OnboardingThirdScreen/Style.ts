import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale(15),
    },

    skipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: scale(10),
        marginTop: verticalScale(20),
        color: '#5F5F5F',
    },

    imageContainer: {
        alignItems: 'center',
        paddingVertical: verticalScale(30),
    },

    image: {
        width: scale(340),
        height: verticalScale(350),
        resizeMode: 'contain',
    },

    textContainer: {
        paddingVertical: verticalScale(20),
        paddingHorizontal: scale(15),
    },

    title: {
        fontSize: moderateScale(22),
        fontWeight: '600',
        marginBottom: verticalScale(10),
        color: '#13042D',
    },

    subtitle: {
        fontSize: moderateScale(16),
        color: '#79858F',
    },

    /* 🔥 الزر الجديد */
    arrowWrapper: {
        width: scale(90),
        height: scale(90),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginRight: scale(20),
        marginBottom: verticalScale(20),
    },

    arrowContainer: {
        position: 'absolute',
        width: scale(60),
        height: scale(60),
        borderRadius: scale(30),
        backgroundColor: '#1E3A8A',
        alignItems: 'center',
        justifyContent: 'center',
    },

    backContainer: {
        width: scale(28),
        height: scale(28),
        borderRadius: scale(14),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#5F5F5F',
        borderWidth: 1.5,
    },
});

export default styles;
