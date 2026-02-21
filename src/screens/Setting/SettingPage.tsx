import { View, Text } from 'react-native'
import React from 'react'
import {  SafeAreaView } from 'react-native-safe-area-context'
import Style from './Style'
export default function SettingPage() {
  return (
    <SafeAreaView>
      <Text style={Style.mainText}>Settings</Text>
    </SafeAreaView>
  )
} 