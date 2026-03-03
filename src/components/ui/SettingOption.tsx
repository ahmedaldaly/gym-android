import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-paper';

type SettingLinkProps = {
  title: string;
  screen: string;
  icon?: string;
};

export default function SettingOption({
  title,
  screen,
  icon = 'arrow-forward-ios',
}: SettingLinkProps) {

  const navigation = useNavigation<any>();
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


  return (
    <TouchableOpacity
      style={Styles.container}
      onPress={() => navigation.navigate(screen)}
    >
      <Text style={Styles.text}>{title}</Text>

<Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
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
  }
});