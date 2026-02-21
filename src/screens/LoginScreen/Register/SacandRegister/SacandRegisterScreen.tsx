import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from '../../../../components/ui/ProgressBar';
import { useAuthStore } from '../../../../store/UseAuthStore';

export default function SacandRegisterScreen() {
  const navigation = useNavigation();
  const { register, registerData, loading } = useAuthStore();

  const [fitnessGoal, setFitnessGoal] = useState('General Fitness');
  const [level, setLevel] = useState('Beginner');
  const [selectedPlan, setSelectedPlan] = useState('free');

  const fitnessGoals = ['Cutting', 'Bulking', 'General Fitness'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const goalMap: Record<string, 'CUTTING' | 'BULKING' | 'FAT_LOSS'> = {
    'Cutting': 'CUTTING',
    'Bulking': 'BULKING',
    'General Fitness': 'FAT_LOSS',
  };

  const levelMap: Record<string, 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'> = {
    'Beginner': 'BEGINNER',
    'Intermediate': 'INTERMEDIATE',
    'Advanced': 'ADVANCED',
  };

  const handleRegister = async () => {
    try {
      const formattedDate = registerData.dateOfBirth instanceof Date
        ? registerData.dateOfBirth.toISOString().split('T')[0]
        : registerData.dateOfBirth;

      const finalData = {
        ...registerData,
        dateOfBirth: formattedDate,
        goal: goalMap[fitnessGoal],
        level: levelMap[level],
        hasDisease: false,
        diseaseName: 'None',
      } as any;

      await register(finalData);
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => navigation.navigate('LoginScreen' as never) }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Registration failed');
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$00.00',
      color: '#1E3A8A',
      features: [
        'Lorem ipsum dolor sit in tellus',
        'Lorem ipsum dolor sit in tellus',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$49.99',
      color: '#1E3A8A',
      features: [
        'Lorem ipsum dolor sit in tellus',
        'Lorem ipsum dolor sit in tellus',
        'Lorem ipsum dolor sit in tellus',
      ],
    },
    {
      id: 'vip',
      name: 'VIP',
      price: '$99.99',
      color: '#FCD34D',
      features: [
        'Lorem ipsum dolor sit in tellus',
        'Lorem ipsum dolor sit in tellus',
        'Lorem ipsum dolor sit in tellus',
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.HeaderContainer}>
        <SimpleLineIcons
          name="arrow-left"
          color="#000"
          size={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.textHeader}>
          Let's start your fitness journey
        </Text>
        <Text />
      </View>

      <ProgressBar amount={75} number={3} />

      <Text style={styles.text}>
        To gave you a better experience we need to know.......
      </Text>

      {/* Fitness Goal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fitness goal</Text>
        <View style={styles.buttonRow}>
          {fitnessGoals.map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[
                styles.optionButton,
                fitnessGoal === goal && styles.optionButtonActive,
              ]}
              onPress={() => setFitnessGoal(goal)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  fitnessGoal === goal && styles.optionButtonTextActive,
                ]}
              >
                {goal}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Level */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Level</Text>
        <View style={styles.buttonRow}>
          {levels.map((lvl) => (
            <TouchableOpacity
              key={lvl}
              style={[
                styles.levelButton,
                level === lvl && styles.levelButtonActive,
              ]}
              onPress={() => setLevel(lvl)}
            >
              <Text
                style={[
                  styles.levelButtonText,
                  level === lvl && styles.levelButtonTextActive,
                ]}
              >
                {lvl}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Plans */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Plans</Text>
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              selectedPlan === plan.id && styles.planCardActive,
            ]}
            onPress={() => setSelectedPlan(plan.id)}
          >
            <Text style={[styles.planName, { color: plan.color }]}>
              {plan.name}
            </Text>
            <View style={styles.priceRow}>
              <Text style={styles.planPrice}>{plan.price}</Text>
              <Text style={styles.planPeriod}>/Monthly</Text>
            </View>
            {plan.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <View style={[styles.bullet, { backgroundColor: plan.color }]} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </TouchableOpacity>
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textHeader: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginRight: 20,
  },
  text: {
    fontSize: 12,
    color: '#6B7280',
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionButtonActive: {
    backgroundColor: '#fff',
    borderColor: '#1E3A8A',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  optionButtonTextActive: {
    color: '#000',
    fontWeight: '500',
  },
  levelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  levelButtonActive: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  levelButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  levelButtonTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  planCardActive: {
    borderColor: '#1E3A8A',
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  planPeriod: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#6B7280',
  },
  button: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});