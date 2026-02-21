import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { styles } from './Style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from '../../../components/ui/ProgressBar';
import MyInput from '../../../components/ui/MyInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAuthStore } from '../../../store/UseAuthStore';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const setRegisterData = useAuthStore((state) => state.setRegisterData);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [password, setPassword] = useState('');

  const handleNext = () => {
    setRegisterData({
      firstName,
      lastName,
      email,
      phone,
      gender,
      password,
      dateOfBirth: birthDate,
    });
    navigation.navigate('MainRegisterScreen' as never);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.HeaderContainrt}>
        <SimpleLineIcons
          name="arrow-left"
          color="#000"
          size={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.textHeader}>
          Let’s start your fitness journey
        </Text>
        <Text />
      </View>

      <ProgressBar amount={25} number={1} />

      <Text style={styles.text}>
        To give you a better experience we need to know......
      </Text>

      {/* Form */}
      <View style={styles.form}>
        <MyInput
          label="First name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <MyInput
          label="Last name"
          value={lastName}
          onChangeText={setLastName}
        />

        <MyInput
          label="Email"
          icon={<FontAwesome name="user-o" size={20} color="#1E3A8A" />}
          value={email}
          onChangeText={setEmail}
        />

        <View style={localStyles.genderContainer}>
          <Text style={localStyles.genderLabel}>Gender</Text>
          <View style={localStyles.genderButtons}>
            <TouchableOpacity
              style={[localStyles.genderButton, gender === 'MALE' && localStyles.genderButtonActive]}
              onPress={() => setGender('MALE')}
            >
              <Text style={[localStyles.genderText, gender === 'MALE' && localStyles.genderTextActive]}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[localStyles.genderButton, gender === 'FEMALE' && localStyles.genderButtonActive]}
              onPress={() => setGender('FEMALE')}
            >
              <Text style={[localStyles.genderText, gender === 'FEMALE' && localStyles.genderTextActive]}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>

        <MyInput
          label="Date of birth (YYYY-MM-DD)"
          icon={<FontAwesome name="calendar-o" size={20} color="#1E3A8A" />}
          value={birthDate}
          onChangeText={setBirthDate}
        />

        <MyInput
          label="Phone Number"
          icon={<FontAwesome name="phone" size={20} color="#1E3A8A" />}
          value={phone}
          onChangeText={setPhone}
        />

        <MyInput
          label="Enter your Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Button */}
      <TouchableOpacity
        onPress={handleNext}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  genderContainer: {
    marginBottom: 5,
  },
  genderLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  genderButtonActive: {
    borderColor: '#1E3A8A',
    backgroundColor: '#eff6ff',
  },
  genderText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  genderTextActive: {
    color: '#1E3A8A',
  },
});
