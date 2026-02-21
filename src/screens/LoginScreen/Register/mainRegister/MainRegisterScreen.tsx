import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from '../../../../components/ui/ProgressBar';
import { useAuthStore } from '../../../../store/UseAuthStore';

export default function MainRegisterScreen() {
  const navigation = useNavigation();
  const setRegisterData = useAuthStore((state) => state.setRegisterData);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);

  const handleNext = () => {
    setRegisterData({ height, weight });
    navigation.navigate('SacandRegisterScreen' as never);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.HeaderContainer}>
        <SimpleLineIcons
          name="arrow-left"
          color="#000"
          size={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.textHeader}>
          Let's start your fitness journey
        </Text>
        <Text />
      </View>

      <ProgressBar amount={50} number={2} />

      <Text style={styles.text}>
        To gave you a better experience we need to know.......
      </Text>

      {/* Height Slider */}
      <View style={styles.sliderSection}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Height (cm)</Text>
          <Text style={styles.value}>{height}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={250}

          step={1}
          value={height}
          onValueChange={setHeight}
          minimumTrackTintColor="#1E3A8A"
          maximumTrackTintColor="#D1D5DB"
          thumbTintColor="#1E3A8A"
        />
        <View style={styles.scaleRow}>
          <Text style={styles.scaleText}>0</Text>
          <Text style={styles.scaleText}>40</Text>
          <Text style={styles.scaleText}>90</Text>
          <Text style={styles.scaleText}>140</Text>
          <Text style={styles.scaleText}>200</Text>
          <Text style={styles.scaleText}>250</Text>
        </View>
      </View>

      {/* Weight Slider */}
      <View style={styles.sliderSection}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Weight (kg)</Text>
          <Text style={styles.value}>{weight}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={300}
          step={1}
          value={weight}
          onValueChange={setWeight}
          minimumTrackTintColor="#1E3A8A"
          maximumTrackTintColor="#D1D5DB"
          thumbTintColor="#1E3A8A"
        />
        <View style={styles.scaleRow}>
          <Text style={styles.scaleText}>0</Text>
          <Text style={styles.scaleText}>45</Text>
          <Text style={styles.scaleText}>110</Text>
          <Text style={styles.scaleText}>170</Text>
          <Text style={styles.scaleText}>230</Text>
          <Text style={styles.scaleText}>300</Text>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textHeader: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginRight: 20,
  },
  text: {
    fontSize: 12,
    color: '#6B7280',
    marginVertical: 20,
  },
  sliderSection: {
    marginBottom: 40,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 5,
  },
  scaleText: {
    fontSize: 12,
    color: '#6B7280',
  },
  button: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});