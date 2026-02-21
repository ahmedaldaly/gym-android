import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 15,
        paddingVertical:10,
        paddingHorizontal:20,
        height: 100,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    textHi: {
        fontSize: 23,
        fontWeight:500,
        color:'white'
    },
    textReady: {
        fontSize: 15,
        fontWeight: 400,
        color:'white'
    },
    logo: {
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:'#9849B5',
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        textAlignVertical:'center',
        borderWidth:1,
        borderColor:'white',
    }
});