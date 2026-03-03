import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
export default function GoBack({title}: {title: string}) {
  const navigation = useNavigation();
  return (
      <View style={styles.skipContainer}>
        <TouchableOpacity
        style={styles.backContainer}
        onPress={() =>navigation.goBack()}>
    <SimpleLineIcons name="arrow-left" color="#434242ff" size={16} />
        </TouchableOpacity>
        <Text style={styles.text}>{title}</Text>
        <View style={{ width: 40 }} />
      </View>
  )
}

const styles = StyleSheet.create({
    skipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color: '#5F5F5F',
    fontSize:22,
    fontWeight:'600'
  }
})
