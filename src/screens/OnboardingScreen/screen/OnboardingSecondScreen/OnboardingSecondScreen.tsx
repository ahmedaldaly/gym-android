import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Style';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProgressCircle from '../../../../components/ui/Circle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function OnboardingSecondScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const currentIndex = 2; // القطع المفعلة
  const total = 3; // عدد القطع الكلي

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {/* Skip */}
      <View style={styles.skipContainer}>
        <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.navigate('main', { screen: 'first' } as any)}>
    <SimpleLineIcons name="arrow-left" color="#5F5F5F" size={15} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={{ color: '#5F5F5F',fontSize:18 }} onPress={() => navigation.navigate('auth')}>Skip</Text>
        </TouchableOpacity>
      </View>

     

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Train Smart. Eat Right.</Text>
        <Text style={styles.subtitle}>
          AI-powered workouts and meal plans based on your body and goals.
        </Text>
      </View>
 {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../../assets/images/0c7d05c679cc0f55680c83dee6492afb948254e8.png')}
          style={styles.image}
        />
      </View>
      {/* 🔥 Next Button */}
      <TouchableOpacity
        style={styles.arrowWrapper}
        onPress={() =>
          navigation.navigate('onboarding', { screen: 'third' } as any)
        }
      >
        <ProgressCircle
          segments={3}
          currentIndex={currentIndex}
          radius={40}
          strokeWidth={4}
        />

        {/* arrow */}
        <View style={styles.arrowContainer}>
          <AntDesign name="arrowright" size={26} color="#fff" />
        </View>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
