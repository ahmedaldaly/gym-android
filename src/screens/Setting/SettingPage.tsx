import { View, Text } from 'react-native'
import React from 'react'
import {  SafeAreaView } from 'react-native-safe-area-context'
import Style from './Style'
import SettingLink from '../../components/ui/SettingLink'
import SettingOption from '../../components/ui/SettingOption'
import { useNavigation } from '@react-navigation/native'
export default function SettingPage() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text style={Style.mainText}>Settings</Text>
      <View>
        <SettingLink title="Profile" screen="ProfileScreen" />
        <SettingOption title="Notifications" screen="Notifications" />
        <SettingLink title="Refer A Friend" screen="InviteScreen" />
        <SettingLink title="Subscription" screen="SubscriptionScreen" />
        <SettingLink title="Logout" screen="Logout" />
      </View>
    </SafeAreaView>
  )
} 