import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBack from '../../components/ui/GoBack';
import { useAuthStore } from '../../store/UseAuthStore';
import MyInput from '../../components/ui/MyInput';
import ProfileField from './components/ProfileField';
import GenderSelector from './components/GenderSelector';
import ProfileDropdown from './components/ProfileDropdown';

export default function ProfileScreen() {
  const { user } = useAuthStore();

  const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
  const phone = user?.phone || '+20 1012345678';
  const email = user?.email || '';
  const gender = user?.gender || 'FEMALE';
  const weight = user?.weight || 60;
  const height = user?.height || 170;

  // Note: dateOfBirth is not in the type but let's assume it might be in the object
  const dateOfBirth = (user as any)?.dateOfBirth || '8 July 2004';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <GoBack title="Profile" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ProfileField label="Full Name">
            <MyInput
              label=""
              value={fullName}
              onChangeText={() => { }}
            // Assuming it's editable or just a display
            />
          </ProfileField>

          <ProfileField label="Email">
            <MyInput
              label=""
              value={email}
              onChangeText={() => { }}
            />
          </ProfileField>

          <ProfileField label="Phone">
            <MyInput
              label=""
              icon={<Text style={{ fontSize: 20 }}>🇪🇬</Text>}
              value={phone.startsWith('+20') ? phone : `+20 ${phone}`}
              onChangeText={() => { }}
            />
          </ProfileField>


          <ProfileField label="Date of birth">
            <ProfileDropdown
              value={dateOfBirth}
              onPress={() => console.log('Select Date')}
            />
          </ProfileField>

          <ProfileField label="Gender">
            <GenderSelector
              selectedGender={gender}
              onSelect={(g) => console.log('Select Gender', g)}
            />
          </ProfileField>

          <ProfileField label="Weight(Kg)">
            <ProfileDropdown
              value={weight}
              onPress={() => console.log('Select Weight')}
            />
          </ProfileField>

          <ProfileField label="Height(cm)">
            <ProfileDropdown
              value={height}
              onPress={() => console.log('Select Height')}
            />
          </ProfileField>

          {/* Bottom space */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FAFAFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 12,
    color: '#2F95DC',
    fontWeight: '500',
  },
});