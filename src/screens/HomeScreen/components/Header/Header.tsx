import React from 'react'
import { View, Text, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../../../hooks/useThemeColors';
import { styles } from './Style';

export default function Header({name}: {name: string}) {
        const colors = useThemeColors();
    
  return (
    <View>
   <View style={[styles.container, { backgroundColor:'#F472B6' }]}>
           <Text style={styles.logo}>{name.charAt(0).toUpperCase()}</Text>
           {/* text */}
           <View >
            <Text style={styles.textHi}>Hi {name}</Text>
            <Text style={styles.textReady}>Ready to crush your goals today?</Text>
           </View>
        </View>
    </View>
  )
}