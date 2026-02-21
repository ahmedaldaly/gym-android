import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type PropsType = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

export default function ErrorPopup({
  visible,
  message,
  onClose,
}: PropsType) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
    <AntDesign name="warning" color="red" size={30} />

          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 10,
  },

  message: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginVertical: 20,
  },

  button: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
