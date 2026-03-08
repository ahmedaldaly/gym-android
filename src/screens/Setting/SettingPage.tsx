import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Style from './Style'
import SettingLink from '../../components/ui/SettingLink'
import SettingOption from '../../components/ui/SettingOption'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native';
import { useAuthStore } from '../../store/UseAuthStore';

export default function SettingPage() {
  const navigation = useNavigation();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView>
      <Text style={Style.mainText}>Settings</Text>
      <View>
        <SettingLink title="Profile" screen="ProfileScreen" />
        <SettingOption title="Notifications" screen="Notifications" />
        <SettingLink title="Refer A Friend" screen="InviteScreen" />
        <SettingLink title="Subscription" screen="SubscriptionScreen" />
        <SettingLink title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  )
} 