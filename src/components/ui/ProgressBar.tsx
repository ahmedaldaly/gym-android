import * as React from 'react';
import { ProgressBar as PaperProgressBar } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';

interface Props {
  amount: number; // من 0 لـ 100
  number: number;
}

const MyComponent = ({ amount,number }: Props) => {
  return (
    <>
    <PaperProgressBar
      progress={amount / 100}
      color="#1E3A8A"
      style={styles.progress}
      fillStyle={styles.fill}
      />
    <Text style={styles.text}>{number}/5</Text>
      </>
  );
};

const styles = StyleSheet.create({
  progress: {
    height: 10,
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#E5E7EB', // لون الجزء الفاضي (رمادي فاتح)
    overflow: 'hidden', // مهم علشان يخلي الرديوس مظبوط
  },
  fill: {
    borderRadius: 20, // يخلي الجزء المتملّي دائري برضو
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MyComponent;
