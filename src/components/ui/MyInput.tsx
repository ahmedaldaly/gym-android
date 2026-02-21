import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

type PropsType = {
  label: string;
  icon?: React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

const MyInput = ({
  label,
  icon,
  value,
  onChangeText,
  secureTextEntry = false,
}: PropsType) => {
  const [hidePassword, setHidePassword] = React.useState(secureTextEntry);

  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <TextInput
        mode="flat"
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={hidePassword}
        style={icon ? [styles.input, styles.inputWithIcon] : styles.input}
        contentStyle={styles.content}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        right={
          secureTextEntry ? (
            <TextInput.Icon
              icon={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              onPress={() => setHidePassword(!hidePassword)}
              color="#1E3A8A"
            />
          ) : null
        }
      />
    </View>
  );
};

export default MyInput;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },

  input: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 60,
    overflow: 'hidden',
  },

  inputWithIcon: {
    paddingLeft: 40,
  },

  content: {
    paddingVertical: 14,
  },

  iconContainer: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
