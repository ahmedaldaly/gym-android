import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Style';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProgressCircle from '../../../../components/ui/Circle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { moderateScale, scale } from 'react-native-size-matters';

export default function OnboardingThirdScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const currentIndex = 3; // القطع المفعلة
  const total = 3; // عدد القطع الكلي

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

      {/* Skip */}
      <View style={styles.skipContainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation.navigate('onboarding', { screen: 'second' } as any)}>
          <SimpleLineIcons name="arrow-left" color="#5F5F5F" size={moderateScale(15)} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: '#5F5F5F', fontSize: moderateScale(18) }} onPress={() => navigation.navigate('auth')}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../../assets/images/56dea5593786c74dcd497eea9e5face7723f30b6.png')}
          style={styles.image}
        />
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Track Progress, Achieve More.</Text>
        <Text style={styles.subtitle}>
          Stay motivated with smart tracking, reminders, and expert guidance..
        </Text>
      </View>
      {/* 🔥 Next Button */}
      <TouchableOpacity
        style={styles.arrowWrapper}
        onPress={() =>
          navigation.navigate('auth')
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
