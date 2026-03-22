import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Style';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProgressCircle from '../../components/ui/Circle';
import { moderateScale, scale } from 'react-native-size-matters';

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const currentIndex = 1; // القطع المفعلة
  const total = 3; // عدد القطع الكلي

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {/* Skip */}
      <View style={styles.skipContainer}>
        <Text style={{ color: '#5F5F5F', fontSize: moderateScale(18) }} onPress={() => navigation.navigate('auth')}>Skip</Text>
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/94618c445b4d2d97640e42fbf361886bda3669d1.png')}
          style={styles.image}
        />
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Your Fitness Journey Starts Here</Text>
        <Text style={styles.subtitle}>
          Personalized workouts and nutrition plans made just for you.
        </Text>
      </View>

      {/* 🔥 Next Button */}
      <TouchableOpacity
        style={styles.arrowWrapper}
        onPress={() =>
          navigation.navigate('onboarding', { screen: 'second' } as any)
        }
      >
        <ProgressCircle
          segments={3}
          currentIndex={currentIndex}
          radius={scale(40)}
          strokeWidth={scale(4)}
        />

        {/* arrow */}
        <View style={styles.arrowContainer}>
          <AntDesign name="arrowright" size={moderateScale(26)} color="#fff" />
        </View>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
