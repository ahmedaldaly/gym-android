import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './Style'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

export default function Actions() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Today’s Actions</Text>
      <View style={styles.boxContainer}>
        {/* first card */}
        <TouchableOpacity style={styles.box} activeOpacity={0.7} onPress={() => navigation.navigate('WorkoutPlan' as never)}>
          <Ionicons name="fitness-outline" size={36} color="white" />
          <Text style={styles.boxText}>Workouts</Text>
        </TouchableOpacity>
        {/* second card */}
        <TouchableOpacity style={styles.box} activeOpacity={0.7} onPress={() => navigation.navigate('DaitPlan' as never)}>
          <Ionicons name="fast-food-outline" size={36} color="white" />
          <Text style={styles.boxText}>Diet</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}