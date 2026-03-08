import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

type SettingLinkProps = {
  title: string;
  screen?: string;
  icon?: string;
  onPress?: () => void;
};

export default function SettingLink({
  title,
  screen,
  icon = 'arrow-forward-ios',
  onPress,
}: SettingLinkProps) {

  const navigation = useNavigation<any>();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <TouchableOpacity
      style={Styles.container}
      onPress={handlePress}
    >
      <Text style={Styles.text}>{title}</Text>

      <MaterialIcons name={icon} color="#000" size={20} />
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#B9B9B963',
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
});